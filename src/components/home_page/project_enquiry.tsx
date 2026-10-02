"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import InquiryProtection from "@/components/inquiry_protection";
import { trackInquiryEvent } from "@/lib/analytics";
import { COUNTRY_OPTIONS } from "@/lib/inquiry-options";
import styles from "./conversion_home.module.css";

export default function ProjectEnquiry() {
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const [token, setToken] = useState("");
  const [reset, setReset] = useState(0);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSending(true); setStatus("");
    try {
      const payload = { ...Object.fromEntries(new FormData(form)), sourceType: "homepage", sourcePage: "/", turnstileToken: token };
      const response = await fetch("/api/contact_mail", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json();
      if (!response.ok || result.success !== true) throw new Error("Enquiry not accepted");
      trackInquiryEvent("generate_lead", { source_type: "homepage", page_path: "/" });
      setStatus("Thank you. Your enquiry has been sent to our team.");
      form.reset();
    } catch {
      trackInquiryEvent("inquiry_error", { source_type: "homepage", page_path: "/" });
      setStatus("We could not send your enquiry. Please try again or email info@devisgon.com.");
    } finally { setSending(false); setToken(""); setReset((value) => value + 1); }
  }
  return <form className={styles.enquiryForm} onSubmit={submit} data-clarity-mask="true">
    <InquiryProtection onToken={setToken} resetKey={reset} />
    <h3>Tell us what you want to build.</h3>
    <div className={styles.formRow}>
      <label>Your name<input name="name" autoComplete="name" required maxLength={120} placeholder="Alex Morgan" /></label>
      <label>Email address<input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="alex@company.com" /></label>
    </div>
    <label>What do you need?<select name="projectType" defaultValue=""><option value="">Select a project focus (optional)</option><option>AI agents</option><option>Business automation</option><option>AI-powered app / SaaS / MVP</option><option>Web app / website</option><option>Mobile app</option><option>Other services</option></select></label>
    <label>Project or workflow<textarea name="projectDetail" rows={4} required minLength={20} maxLength={10000} placeholder="What should your product do, or which repetitive process would you like to improve?" /></label>
    <details className={styles.optionalFields}><summary>Add project details (optional)</summary><div className={styles.formRow}><label>Phone number<input name="phone" type="tel" autoComplete="tel" pattern="\+?[0-9\s\(\)\.\-]{7,20}" maxLength={20} placeholder="+1 555 123 4567" /></label><label>Country<select name="country" defaultValue=""><option value="">Select country</option>{COUNTRY_OPTIONS.map((country) => <option key={country.value} value={country.value}>{country.label}</option>)}</select></label></div><label>Budget / timeframe<input name="budget" maxLength={100} placeholder="If you have a budget or launch date in mind" /></label></details>
    <p className={styles.formPrivacy}>We use your details to respond to your enquiry. <Link href="/privacy-policies">Privacy policy</Link></p>
    <button type="submit" className={styles.primaryButton} disabled={sending || Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !token)}>{sending ? "Sending…" : "Send project enquiry"}<ArrowUpRight size={17} aria-hidden="true" /></button>
    {status && <p role="status" aria-live="polite" className={styles.formStatus}>{status}</p>}
  </form>;
}
