import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import path from "node:path";
import { build } from "esbuild";
import { validateInquiry, verifyInquiryChallenge, MAX_ATTACHMENT_BYTES } from "../src/lib/inquiry-validation.ts";
import { calculateAutomationValue } from "../src/lib/automation-roi.ts";
import { buildBlogSitemap } from "../src/lib/blog-sitemap.ts";

const valid = { name: "Test User", email: "test@example.com", phone: "+1 555 123 4567", projectDetail: "Review a workflow" };

test("inquiry validation rejects malformed data and oversized attachments", () => {
  assert.equal(validateInquiry(valid), null);
  assert.equal(validateInquiry({ ...valid, phone: "" }), null);
  const withoutPhone = { ...valid }; delete withoutPhone.phone;
  assert.equal(validateInquiry(withoutPhone), null);
  assert.ok(validateInquiry({ ...valid, phone: 123 }));
  for (const bad of [null, [], { ...valid, email: "bad" }, { ...valid, phone: "abc" }, { ...valid, projectDetail: " " }, { ...valid, name: "x".repeat(121) }]) assert.ok(validateInquiry(bad));
  assert.equal(validateInquiry({ ...valid, fileBase64: Buffer.alloc(MAX_ATTACHMENT_BYTES).toString("base64"), fileType: "application/pdf" }), null);
  assert.ok(validateInquiry({ ...valid, fileBase64: Buffer.alloc(MAX_ATTACHMENT_BYTES + 1).toString("base64"), fileType: "application/pdf" }));
  assert.ok(validateInquiry({ ...valid, fileBase64: "a===", fileType: "application/pdf" }));
  assert.ok(validateInquiry({ ...valid, fileBase64: "AAAA", fileType: "application/javascript" }));
});

test("challenge validation fails closed for rejected, wrong-action and unavailable responses", async () => {
  const response = (body, status = 200) => async () => new Response(JSON.stringify(body), { status });
  assert.equal(await verifyInquiryChallenge("token", "secret", response({ success: true, action: "inquiry" })), true);
  assert.equal(await verifyInquiryChallenge("token", "secret", response({ success: true, action: "other" })), false);
  assert.equal(await verifyInquiryChallenge("token", "secret", response({ success: false, action: "inquiry" })), false);
  assert.equal(await verifyInquiryChallenge("token", "secret", response({ success: true, action: "inquiry" }, 500)), false);
  assert.equal(await verifyInquiryChallenge("", "secret", response({ success: true, action: "inquiry" })), false);
  assert.equal(await verifyInquiryChallenge("token", "secret", async () => { throw new Error("network"); }), false);
});

test("sitemap excludes drafts, invalid slugs and duplicates and retains true updated dates", () => {
  const xml = buildBlogSitemap([
    { slug: "published-guide", status: "published", updatedAt: "2026-09-20T00:00:00Z" },
    { slug: "draft-guide", status: "draft" },
    { slug: "published-guide", status: "published" },
    { slug: "<injected>", status: "published" },
    { slug: "another-guide", status: "published", updatedAt: "bad date" },
  ], "https://www.devisgon.com");
  assert.match(xml, /2026-09-20T00:00:00.000Z/);
  assert.doesNotMatch(xml, /draft-guide|injected|bad date/);
  assert.equal((xml.match(/published-guide/g) || []).length, 1);
  assert.equal((xml.match(/<url>/g) || []).length, 3);
});

test("automation math includes review and recurring costs and handles non-positive scenarios", () => {
  const inputs = { tasks: 1000, minutesPerTask: 10, coverage: 50, reviewMinutes: 2, hourlyValue: 50, monthlyCost: 200, setupCost: 5000 };
  const result = calculateAutomationValue(inputs);
  assert.ok(Math.abs(result.hoursFreed - 66.6666666667) < 1e-6);
  assert.ok(Math.abs(result.netValue - 3133.3333333333) < 1e-6);
  assert.ok(Math.abs(result.paybackMonths - 1.5957446809) < 1e-6);
  assert.equal(calculateAutomationValue({ ...inputs, reviewMinutes: 11 }).paybackMonths, null);
  assert.equal(calculateAutomationValue({ ...inputs, tasks: Number.NaN }).hoursFreed, 0);
  assert.equal(calculateAutomationValue({ ...inputs, coverage: -1 }).hoursFreed, 0);
});

test("contact route reports provider failures truthfully and rejects abuse before sending", async () => {
  const bundled = await build({ entryPoints: ["src/app/(app)/api/contact_mail/route.ts"], bundle: true, write: false, platform: "node", format: "esm", plugins: [{
    name: "isolate-mail-provider", setup(builder) {
      builder.onResolve({ filter: /^(next\/server|resend)$/ }, (args) => ({ path: args.path, namespace: "test-mock" }));
      builder.onLoad({ filter: /.*/, namespace: "test-mock" }, (args) => ({ contents: args.path === "resend"
        ? "export class Resend { emails = { send: async (message) => { globalThis.__sentMail = message; if (globalThis.__mailThrows) throw new Error('private provider detail'); return globalThis.__mailResult; } }; }"
        : "export class NextResponse { static json(body, options = {}) { return new Response(JSON.stringify(body), { status: options.status || 200, headers: { 'Content-Type': 'application/json' } }); } }", loader: "js" }));
    },
  }] });
  const { POST } = await import(`data:text/javascript;base64,${Buffer.from(bundled.outputFiles[0].text).toString("base64")}`);
  const request = (data = valid, headers = {}) => new Request("http://localhost:3000/api/contact_mail", { method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json", ...headers } });
  process.env.RESEND_API_KEY = "validation-only"; process.env.RESEND_DOMAIN = "test@example.com"; process.env.RESEND_EMAIL_USER = "test@example.com";
  delete process.env.TURNSTILE_SECRET_KEY; delete process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  globalThis.__mailResult = { data: { id: "test-message" }, error: null };
  globalThis.__sentMail = null;
  assert.equal((await POST(request({ ...valid, website: "spam.example" }))).status, 400);
  assert.equal(globalThis.__sentMail, null);
  assert.equal((await POST(request(valid, { origin: "https://other.example" }))).status, 403);
  assert.equal((await POST(request(valid, { "content-length": "4000000" }))).status, 413);
  assert.equal((await POST(new Request("http://localhost:3000/api/contact_mail", { method: "POST", body: "{" }))).status, 400);
  process.env.TURNSTILE_SECRET_KEY = "secret";
  assert.equal((await POST(request())).status, 503);
  delete process.env.TURNSTILE_SECRET_KEY;
  globalThis.__mailResult = { data: null, error: { message: "private provider detail" } };
  let response = await POST(request());
  assert.equal(response.status, 502); assert.equal((await response.json()).success, false);
  globalThis.__mailResult = { data: {}, error: null };
  assert.equal((await POST(request())).status, 502);
  globalThis.__mailThrows = true;
  response = await POST(request()); assert.equal(response.status, 500); assert.doesNotMatch(await response.text(), /private provider detail/);
  globalThis.__mailThrows = false; globalThis.__mailResult = { data: { id: "test-message" }, error: null };
  response = await POST(request({ ...valid, name: "<script>test</script>" }));
  assert.equal(response.status, 200); assert.equal((await response.json()).success, true);
  assert.match(globalThis.__sentMail.html, /&lt;script&gt;/); assert.doesNotMatch(globalThis.__sentMail.html, /<script>test/);
  const withoutPhone = { ...valid, sourceType: "homepage" }; delete withoutPhone.phone;
  response = await POST(request(withoutPhone));
  assert.equal(response.status, 200); assert.equal((await response.json()).success, true);
  assert.match(globalThis.__sentMail.html, /Not provided/);
  delete process.env.RESEND_API_KEY;
  assert.equal((await POST(request())).status, 503);
});

test("English industries have distinct metadata and repaired links across languages", () => {
  const walk = (directory) => fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? walk(path.join(directory, entry.name)) : [path.join(directory, entry.name)]);
  const descriptions = new Set();
  const industries = walk("src/data/english_data/industries").filter((file) => file.endsWith(".json"));
  for (const file of industries) {
    const data = JSON.parse(fs.readFileSync(file, "utf8").replace(/^\uFEFF/, ""));
    const description = (data.seo_metadata || data.seo).description || (data.seo_metadata || data.seo).meta_description;
    assert.ok(description, file); assert.ok(!descriptions.has(description), file); descriptions.add(description);
  }
  assert.equal(industries.length, 43);
  const broken = new Set(["/industries/physical-therapy", "/industries/ladies-hairdresser", "/industries/plumber", "/industries/law-firm", "/industries/business-consultant", "/industries/insurance-agency-crm-automation-solutions-agency", "/industries/beauty-salon", "/industries/makeup-artist", "/industries/spa", "/industries/car-wash", "/shared-hosting", "/business-hosting", "/reseller-hosting", "/vps-servers", "/dedicated-servers"]);
  const inspect = (value, file) => { if (typeof value === "string") assert.ok(!broken.has(value), file + ": " + value); else if (value && typeof value === "object") Object.values(value).forEach((item) => inspect(item, file)); };
  for (const file of walk("src/data").filter((file) => file.endsWith(".json"))) inspect(JSON.parse(fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "")), file);
});
