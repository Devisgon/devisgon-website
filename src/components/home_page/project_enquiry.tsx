"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Bot, Check, Code2, Globe2, Layers3, MessageSquare, Search, Smartphone, Workflow, Phone, FileText, Headset } from "lucide-react";
import InquiryProtection from "@/components/inquiry_protection";
import { trackInquiryEvent } from "@/lib/analytics";
import { COUNTRY_OPTIONS } from "@/lib/inquiry-options";
import { EMPTY_ENQUIRY, ENQUIRY_SERVICES, ENQUIRY_STEPS, PROJECT_BUDGETS, PROJECT_SIZES, PROJECT_TIMELINES, PROJECT_TYPES, enquiryStepError, type ProjectEnquiryValues } from "@/lib/project-enquiry";
import { getDiscoveryCallHref } from "@/lib/discovery-call";
import styles from "./conversion_home.module.css";

const icons = [Bot, Phone, Headset, Workflow, FileText, Layers3, Code2, Globe2, Smartphone, Search, MessageSquare, ArrowUpRight];
const questions = ["What are you looking to build?", "What does your project look like?", "What budget and timing work for you?", "How can we reach you?", "Ready to send your project brief?"];
const hints = ["Choose your main focus. We can discuss other needs together.", "A few details help us understand the right starting point.", "Estimates are fine. This helps us propose a realistic scope.", "We’ll use these details to follow up on your enquiry.", "Check your answers. You can edit any section before sending."];

export default function ProjectEnquiry() {
  const [answers, setAnswers] = useState<ProjectEnquiryValues>({ ...EMPTY_ENQUIRY });
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [token, setToken] = useState("");
  const [reset, setReset] = useState(0);
  const heading = useRef<HTMLHeadingElement>(null);
  const previousStep = useRef(0);
  const started = useRef(false);
  useEffect(() => {
    if (previousStep.current !== step) heading.current?.focus();
    previousStep.current = step;
  }, [step]);
  function change(field: keyof ProjectEnquiryValues, value: string) {
    setAnswers((current) => ({ ...current, [field]: value }));
    setStatus("");
  }
  function goTo(next: number) {
    if (step === 4 && next !== 4) { setToken(""); setReset((value) => value + 1); }
    setStatus(""); setStep(next);
  }
  function select(field: keyof ProjectEnquiryValues, label: string, options: string[]) {
    return <label className={styles.field}>{label} <span>(required)</span><select name={field} value={answers[field]} required onChange={(event) => change(field, event.target.value)}><option value="">Choose an option</option>{options.map((option) => <option key={option}>{option}</option>)}</select></label>;
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    if (!event.currentTarget.reportValidity()) return;
    const error = enquiryStepError(step, answers);
    if (error) { setStatus(error); return; }
    if (step < 4) {
      if (!started.current) {
        started.current = true;
        trackInquiryEvent("inquiry_start", { source_type: "homepage", page_path: "/" });
      }
      trackInquiryEvent("inquiry_step", { source_type: "homepage", page_path: "/", step_number: step + 2 });
      goTo(step + 1);
      return;
    }
    if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !token) { setStatus("Please complete the verification before sending."); return; }
    const honeypot = String(new FormData(event.currentTarget).get("website") || "");
    setSending(true); setStatus("");
    try {
      const payload = { ...answers, name: answers.name.trim(), email: answers.email.trim(), phone: answers.phone.trim(), projectDetail: answers.projectDetail.trim(), website: honeypot, sourceType: "homepage", sourcePage: "/", turnstileToken: token };
      const response = await fetch("/api/contact_mail", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), signal: AbortSignal.timeout(20000) });
      const result = await response.json();
      if (!response.ok || result.success !== true) throw new Error("Enquiry not accepted");
      trackInquiryEvent("generate_lead", { source_type: "homepage", page_path: "/" });
      setSent(true); setAnswers({ ...EMPTY_ENQUIRY });
    } catch {
      trackInquiryEvent("inquiry_error", { source_type: "homepage", page_path: "/" });
      setStatus("We could not confirm that your enquiry was sent. Your answers are saved here. Please try again or email info@devisgon.com.");
    } finally { setSending(false); setToken(""); setReset((value) => value + 1); }
  }
  if (sent) return <div className={styles.enquiryForm} role="status" aria-live="polite"><div className={styles.successIcon}><Check size={32} /></div><p className={styles.formEyebrow}>PROJECT BRIEF SENT</p><h2>Thank you. Let’s talk about what’s next.</h2><p>Our team has received your enquiry. If you would like to talk through it, choose a discovery-call time.</p><Link href={getDiscoveryCallHref()} className={styles.primaryButton}>Book a discovery call<ArrowUpRight size={18} /></Link><button className={styles.backButton} type="button" onClick={() => { setSent(false); setStep(0); started.current = false; }}>Start another enquiry</button></div>;
  return <form className={styles.enquiryForm} onSubmit={submit} noValidate data-clarity-mask="true" aria-busy={sending}>
    <div className={styles.formTop}><span>YOUR NEXT PROJECT</span><span>Step {step + 1} of 5</span></div>
    <ol className={styles.formProgress} aria-label="Project enquiry progress">{ENQUIRY_STEPS.map((label, index) => <li key={label} aria-current={index === step ? "step" : undefined} className={index <= step ? styles.progressActive : ""}><span className={styles.progressBar} /><span>{label}</span></li>)}</ol>
    <h2 className={styles.questionHeading} ref={heading} tabIndex={-1}>{questions[step]}</h2><p className={styles.questionHint}>{hints[step]}</p>
    <div className={styles.questionBody}>
      {step === 0 && <fieldset className={styles.serviceChoices}><legend className="sr-only">Service (required)</legend>{ENQUIRY_SERVICES.map((service, index) => { const Icon = icons[index]; return <label key={service} className={`${styles.serviceChoice} ${answers.serviceName === service ? styles.choiceSelected : ""}`}><input type="radio" name="serviceName" value={service} checked={answers.serviceName === service} required onChange={() => change("serviceName", service)} /><Icon size={20} strokeWidth={1.6} aria-hidden="true" /><span>{service}</span><span className={styles.choiceCheck} aria-hidden="true">{answers.serviceName === service && <Check size={13} />}</span></label>; })}</fieldset>}
      {step === 1 && <>{select("projectType", "What type of project is this?", PROJECT_TYPES)}{select("projectSize", "How big is the project?", PROJECT_SIZES)}<label className={styles.field}>What would you like it to do? <span>(required)</span><textarea name="projectDetail" value={answers.projectDetail} onChange={(event) => change("projectDetail", event.target.value)} rows={3} minLength={20} maxLength={10000} required aria-describedby="project-detail-hint" /></label><small id="project-detail-hint" className={styles.fieldHint}>Describe the problem, users or workflow in at least 20 characters. Please leave out passwords and sensitive data.</small></>}
      {step === 2 && <>{select("budget", "What is your estimated budget? (USD)", PROJECT_BUDGETS)}{select("timeline", "When would you like to start or launch?", PROJECT_TIMELINES)}<p className={styles.budgetNote}>These are planning ranges, not a quote. We’ll discuss what can fit your priorities.</p></>}
      {step === 3 && <><label className={styles.field}>Country <span>(required)</span><select name="country" autoComplete="country-name" value={answers.country} onChange={(event) => change("country", event.target.value)} required><option value="">Select your country</option>{COUNTRY_OPTIONS.map((country) => <option key={country.value} value={country.value}>{country.label}</option>)}</select></label><label className={styles.field}>Complete name <span>(required)</span><input name="name" autoComplete="name" value={answers.name} onChange={(event) => change("name", event.target.value)} required maxLength={120} /></label><label className={styles.field}>Email address <span>(required)</span><input name="email" type="email" autoComplete="email" value={answers.email} onChange={(event) => change("email", event.target.value)} required maxLength={254} /></label><label className={styles.field}>Phone number <span>(required)</span><input name="phone" type="tel" autoComplete="tel" value={answers.phone} onChange={(event) => change("phone", event.target.value)} required maxLength={20} aria-describedby="phone-hint" /></label><small id="phone-hint" className={styles.fieldHint}>Include your country code, for example +1 555 123 4567.</small></>}
      {step === 4 && <><div className={styles.reviewList}>{[{ title: "Service", value: answers.serviceName, index: 0 }, { title: "Project", value: `${answers.projectType} · ${answers.projectSize}`, index: 1 }, { title: "Budget & timing", value: `${answers.budget} · ${answers.timeline}`, index: 2 }, { title: "Contact", value: `${answers.name} · ${answers.email} · ${answers.phone} · ${answers.country}`, index: 3 }].map((item) => <div key={item.title}><div><strong>{item.title}</strong><p>{item.value}</p></div><button type="button" onClick={() => goTo(item.index)} disabled={sending} aria-label={`Edit ${item.title.toLowerCase()}`}>Edit</button></div>)}<div><div><strong>Project brief</strong><p className={styles.reviewBrief}>{answers.projectDetail}</p></div><button type="button" onClick={() => goTo(1)} disabled={sending} aria-label="Edit project brief">Edit</button></div></div><InquiryProtection onToken={setToken} resetKey={reset} /><p className={styles.formPrivacy}>We use your details to respond to this enquiry. <Link href="/privacy-policies">Privacy policy</Link></p></>}
    </div>
    {status && <p role="alert" className={styles.formStatus}>{status}</p>}
    <div className={styles.formActions}>{step > 0 && <button type="button" className={styles.backButton} onClick={() => goTo(step - 1)} disabled={sending}>Back</button>}<button type="submit" className={styles.formNext} disabled={sending || (step === 4 && Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !token))}>{sending ? "Sending…" : step === 4 ? "Send my project brief" : "Continue"}<ArrowRight size={17} aria-hidden="true" /></button></div>
    <p className={styles.formFootnote}>{step === 4 ? "Your brief goes directly to the Devisgon team." : "No commitment. Review your answers before sending."}</p>
  </form>;
}
