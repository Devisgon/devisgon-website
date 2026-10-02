import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import { buildNavigation, flattenNavigation } from "../src/lib/navigation-model.ts";
import { getDiscoveryCallHref } from "../src/lib/discovery-call.ts";

const files = ["src/data/navbar.json", ...["urdu", "arabic", "french", "german", "spanish", "chinese"].map((language) => `src/data/${language}_data/navbar.json`)];
for (const file of files) test(`every original navigation destination remains reachable: ${file}`, () => {
  const { navbar } = JSON.parse(fs.readFileSync(file, "utf8").replace(/^\uFEFF/, ""));
  const model = buildNavigation(navbar);
  const original = new Set(flattenNavigation(navbar).map((link) => link.href));
  const reachable = new Set(["/", "/our-process", ...model.company.map((link) => link.href), ...model.partners.map((link) => link.href), ...model.resources.map((link) => link.href), ...model.catalogs.flatMap((catalog) => [catalog.href, ...catalog.groups.flatMap((group) => group.links.map((link) => link.href))])]);
  assert.ok(original.size > 100, "audit must cover the entire catalogue");
  assert.deepEqual([...original].filter((href) => !reachable.has(href)), []);
  assert.ok(model.catalogs[0].groups[0].links.some((link) => link.href === "/services/ai-agent-development-automation-services"));
  assert.ok(model.catalogs[0].groups[0].links.some((link) => link.href === "/services/business-process-automation-services"));
  assert.ok(model.catalogs[0].groups[1].links.some((link) => link.href === "/services/ai-software-development-automation-services"));
});

test("new uncategorized destinations remain available rather than silently disappearing", () => {
  assert.ok(buildNavigation([{ name: "New page", href: "/new-page" }]).company.some((link) => link.href === "/new-page"));
});

test("discovery calls use configured HTTPS Calendly links or the real contact booking section", () => {
  const keys = ["NEXT_PUBLIC_CALENDLY_30_MIN_MEETING", "NEXT_PUBLIC_CALENDLY_15_MIN_MEETING"];
  const previous = keys.map((key) => process.env[key]);
  try {
    keys.forEach((key) => delete process.env[key]);
    assert.equal(getDiscoveryCallHref(), "/contact#book-a-call");
    process.env[keys[0]] = "javascript:alert(1)";
    process.env[keys[1]] = "https://calendly.com/example/discovery";
    assert.equal(getDiscoveryCallHref(), "https://calendly.com/example/discovery");
    process.env[keys[0]] = "https://calendly.com.evil.example/test";
    assert.equal(getDiscoveryCallHref(), "https://calendly.com/example/discovery");
    process.env[keys[0]] = "https://calendly.com/example/30-minutes";
    assert.equal(getDiscoveryCallHref(), "https://calendly.com/example/30-minutes");
  } finally { keys.forEach((key, index) => { if (previous[index] === undefined) delete process.env[key]; else process.env[key] = previous[index]; }); }
});

test("Company groups partner destinations under a non-navigation label", () => {
  const { navbar } = JSON.parse(fs.readFileSync("src/data/navbar.json", "utf8").replace(/^\uFEFF/, ""));
  const model = buildNavigation(navbar);
  assert.equal(model.partnerHeading, "Partners");
  assert.deepEqual(model.partners.map(({ name, href }) => ({ name, href })), [{ name: "DoctorHoster", href: "/partners/doctorhoster" }, { name: "Jotform", href: "/partners/jotform" }]);
  assert.ok(model.company.every((item) => !item.href.startsWith("/partners/")));
});


test("all languages link to the dedicated Team page and the three new services", () => {
  const required=["/team","/services/voice-agent-development-services","/services/invoice-automation-services","/services/ai-receptionist-services"];
  for(const file of files){const {navbar}=JSON.parse(fs.readFileSync(file,"utf8").replace(/^\uFEFF/,""));const links=flattenNavigation(navbar);for(const href of required)assert.equal(links.filter((link)=>link.href===href).length,1,file+": "+href);assert.ok(!links.some((link)=>link.href==="/#team"));}
});

test("new service pages have unique metadata, complete scope guides and real referenced assets", () => {
  const pages=["ai_and_ml/voice_agents.json","ai_and_ml/ai_receptionist.json","workflow_automations/invoice_automation.json"].map((file)=>JSON.parse(fs.readFileSync("src/data/english_data/services/"+file,"utf8")));
  assert.equal(new Set(pages.map((page)=>page.seo_metadata.title)).size,3);assert.equal(new Set(pages.map((page)=>page.seo_metadata.description)).size,3);
  for(const page of pages){assert.ok(page.hero_section.title);for(const field of ["inputs","deliverables","acceptance"])assert.ok(page.buyer_guide[field].length>=3);assert.ok(page.faq_section.questions.length>=4);assert.ok(page.case_study_section.content.result.text.includes("not a published client result"));for(const asset of [page.hero_section.hero_image,page.introduction_section.side_image,page.what_you_get_section.image,page.case_study_section.image])assert.ok(fs.existsSync("public"+asset),asset);}
  const company=JSON.parse(fs.readFileSync("src/data/company.json","utf8"));assert.equal(company.team.length,8);for(const person of company.team)assert.ok(fs.existsSync("public"+person.image),person.image);
});
