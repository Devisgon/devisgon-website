import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import vm from "node:vm";
import { JSDOM } from "jsdom";
import { build } from "esbuild";
import { EMPTY_ENQUIRY, enquiryStepError } from "../src/lib/project-enquiry.ts";
import { CONSENT_BOOTSTRAP, GA4_MEASUREMENT_ID, analyticsPageUrl } from "../src/lib/analytics-config.ts";

const complete = { serviceName: "AI & agents", projectType: "New project", projectSize: "MVP / first version", projectDetail: "Connect our support knowledge to an AI assistant.", budget: "$10,000–$25,000", timeline: "1–3 months", country: "United States", name: "Test Customer", email: "customer@example.com", phone: "+1 555 123 4567" };

test("review revalidates all five steps and requires every requested qualification field", () => {
  assert.equal(enquiryStepError(4, complete), null);
  for (const field of Object.keys(EMPTY_ENQUIRY)) assert.ok(enquiryStepError(4, { ...complete, [field]: "" }), field);
  assert.ok(enquiryStepError(4, { ...complete, email: "wrong", phone: "abc" }));
  assert.ok(enquiryStepError(4, { ...complete, projectDetail: "short" }));
  assert.equal(enquiryStepError(4, { ...complete, projectSize: "Not sure yet", budget: "Need help estimating" }), null);
});

test("Google consent defaults to denied before tagging and strips queries from page URLs", () => {
  const context = { window: {} };
  vm.runInNewContext(CONSENT_BOOTSTRAP, context);
  const command = Array.from(context.window.dataLayer[0]);
  assert.equal(command[0], "consent"); assert.equal(command[1], "default");
  assert.ok(Object.values(command[2]).every((state) => state === "denied"));
  assert.equal(GA4_MEASUREMENT_ID, "G-VYTLPTGT2N");
  assert.equal(analyticsPageUrl("https://www.devisgon.com/contact?email=private@example.com#private"), "https://www.devisgon.com/contact");
  assert.equal(analyticsPageUrl(""), "");
});

async function componentModule(entry) {
  const result = await build({ entryPoints: [entry], bundle: true, write: false, platform: "node", format: "esm", jsx: "automatic", external: ["react", "react/jsx-runtime", "lucide-react"], plugins: [{ name: "render-without-next-runtime", setup(builder) {
    builder.onResolve({ filter: /^(next\/link|next\/script|next\/navigation)$/ }, ({ path }) => ({ path, namespace: "ui-test" }));
    builder.onLoad({ filter: /.*/, namespace: "ui-test" }, ({ path }) => ({ loader: "js", contents: path === "next/navigation" ? 'export const usePathname=()=>globalThis.__testPath || "/";'
      : path === "next/link" ? 'import React from "react"; export default function Link(props){return React.createElement("a",props)}'
      : 'import React,{useEffect} from "react";export default function Script(props){useEffect(()=>{props.onReady?.()},[]);return React.createElement("script",{id:props.id,src:props.src})}' }));
    builder.onLoad({ filter: /\.module\.css$/ }, () => ({ contents: 'export default new Proxy({}, {get:(_,key)=>key});', loader: "js" }));
  } }] });
  const directory = path.resolve(".next/homepage-tests");
  await fs.mkdir(directory, { recursive: true });
  const file = path.join(directory, `.homepage-test-${Date.now()}-${Math.random().toString(16).slice(2)}.mjs`);
  await fs.writeFile(file, result.outputFiles[0].text);
  try { return await import(pathToFileURL(file).href); } finally { await fs.unlink(file); }
}

// This exercises the real React components, with only framework routing/script
// loading stubbed. No real enquiries or analytics network requests are sent.
test("wizard keeps Back answers, sends the entire brief, retains failed submissions and tracks only accepted leads", async () => {
  const dom = new JSDOM('<div id="root"></div>', { url: "https://www.devisgon.com/" });
  const globals = ["window", "document", "navigator", "HTMLElement", "Element", "FormData", "IS_REACT_ACT_ENVIRONMENT", "fetch"];
  const previous = globals.map((key) => Object.getOwnPropertyDescriptor(globalThis, key));
  for (const key of globals.slice(0,6)) Object.defineProperty(globalThis, key, { value: dom.window[key], writable: true, configurable: true });
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  delete process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const React = await import("react"); const { createRoot } = await import("react-dom/client"); const { act } = React;
  const { default: Form } = await componentModule("src/components/home_page/project_enquiry.tsx");
  const root = createRoot(document.getElementById("root"));
  const events = []; window.localStorage.setItem("devisgon-analytics-consent", "granted"); window.gtag = (...args) => events.push(args);
  let payload; let accepted = false;
  globalThis.fetch = async (_url, options) => { payload = JSON.parse(options.body); return new Response(JSON.stringify({ success: accepted }), { status: accepted ? 200 : 502 }); };
  const click = async (element) => act(async () => { element.click(); });
  const fill = async (name, value) => act(async () => {
    const element = document.querySelector(`[name="${name}"]`);
    const proto = element.tagName === "SELECT" ? window.HTMLSelectElement.prototype : element.tagName === "TEXTAREA" ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(proto,"value").set.call(element,value);
    element.dispatchEvent(new window.Event(element.tagName === "SELECT" ? "change" : "input", { bubbles: true }));
  });
  const next = () => click(document.querySelector('button[type="submit"]'));
  try {
    await act(async () => root.render(React.createElement(Form)));
    await click(document.querySelector('input[value="AI & agents"]')); await next();
    await fill("projectType", complete.projectType); await fill("projectSize", complete.projectSize); await fill("projectDetail", complete.projectDetail); await next();
    assert.match(document.querySelector("h2").textContent, /budget and timing/);
    await click([...document.querySelectorAll("button")].find((button) => button.textContent === "Back"));
    assert.equal(document.querySelector('[name="projectDetail"]').value, complete.projectDetail); await next();
    await fill("budget", complete.budget); await fill("timeline", complete.timeline); await next();
    for (const name of ["country","name","email","phone"]) await fill(name,complete[name]); await next();
    assert.match(document.querySelector("h2").textContent, /Ready to send/);
    await next();
    assert.match(document.querySelector('[role="alert"]').textContent, /answers are saved/);
    assert.match(document.querySelector("form").textContent, /customer@example.com/);
    assert.equal(events.filter((event)=>event[1]==="generate_lead").length,0);
    assert.equal(payload.sourceType,"homepage");
    for (const [key,value] of Object.entries(complete)) assert.equal(payload[key],value,key);
    accepted = true; await next();
    assert.match(document.querySelector('[role="status"]').textContent,/PROJECT BRIEF SENT/);
    assert.equal(events.filter((event)=>event[1]==="generate_lead").length,1);
    assert.ok(events.every((event)=>!JSON.stringify(event).includes("customer@example.com")));
  } finally { await act(async()=>root.unmount()); dom.window.close(); globals.forEach((key,index)=>{ if(previous[index]) Object.defineProperty(globalThis,key,previous[index]); else delete globalThis[key]; }); }
});

test("GA4 stays blocked until consent, configures once and sends one safe page view per route", async () => {
  const dom = new JSDOM('<div id="root"></div>', { url: "https://www.devisgon.com/?email=private@example.com", referrer: "https://example.com/source?private=123" });
  const globals = ["window","document","navigator","Element","IS_REACT_ACT_ENVIRONMENT"];
  const previous = globals.map((key)=>Object.getOwnPropertyDescriptor(globalThis,key));
  for (const key of globals.slice(0,4)) Object.defineProperty(globalThis,key,{value:dom.window[key],writable:true,configurable:true});
  globalThis.IS_REACT_ACT_ENVIRONMENT=true;
  const React=await import("react");const {createRoot}=await import("react-dom/client");const {act}=React;
  const {default:Analytics}=await componentModule("src/components/analytics_consent.tsx");
  const root=createRoot(document.getElementById("root"));const commands=[];
  window.gtag=(...args)=>commands.push(args);globalThis.__testPath="/";
  try {
    await act(async()=>root.render(React.createElement(Analytics)));
    assert.equal(document.querySelector("script"),null);
    await act(async()=>document.querySelector('[aria-label="Analytics preference"] button').click());
    assert.equal(document.querySelectorAll('script[src*="googletagmanager"]').length,1);
    assert.equal(commands.filter((item)=>item[0]==="config").length,1);
    assert.equal(commands.find((item)=>item[0]==="config")[1],GA4_MEASUREMENT_ID);
    assert.equal(commands.filter((item)=>item[1]==="page_view").length,1);
    globalThis.__testPath="/our-work"; await act(async()=>root.render(React.createElement(Analytics)));
    assert.equal(commands.filter((item)=>item[0]==="config").length,1);
    assert.equal(commands.filter((item)=>item[1]==="page_view").length,2);
    assert.ok(commands.every((item)=>!JSON.stringify(item).includes("private=")));
    assert.ok(commands.every((item)=>!JSON.stringify(item).includes("private@example.com")));
  } finally { await act(async()=>root.unmount()); dom.window.close();delete globalThis.__testPath;globals.forEach((key,index)=>{if(previous[index]) Object.defineProperty(globalThis,key,previous[index]);else delete globalThis[key];}); }
});
