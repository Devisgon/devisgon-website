"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { COUNTRY_OPTIONS } from "@/lib/inquiry-options";

type DirectInquiryFormProps = {
  buttonText: string;
  industryName?: string;
  serviceName?: string;
  sourcePage?: string;
  sourceType: "industry" | "service";
};

const inputClass =
  "h-12 w-full rounded-xl border border-primary bg-bg-primary px-4 text-sm text-t-primary outline-none transition-all placeholder:text-t-secondary/40 focus:border-btn-primary focus:ring-2 focus:ring-btn-primary/20";

const textAreaClass =
  "w-full rounded-xl border border-primary bg-bg-primary px-4 py-3 text-sm text-t-primary outline-none transition-all placeholder:text-t-secondary/40 focus:border-btn-primary focus:ring-2 focus:ring-btn-primary/20";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: string) {
  return /^\+?[0-9\s().-]{7,20}$/.test(value.trim());
}

export default function DirectInquiryForm({
  buttonText,
  industryName,
  serviceName,
  sourcePage,
  sourceType,
}: DirectInquiryFormProps) {
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const phone = String(formData.get("phone") ?? "");
    let hasError = false;

    if (!isValidEmail(email)) {
      setEmailError("Use a valid email");
      hasError = true;
    } else {
      setEmailError("");
    }

    if (!isValidPhone(phone)) {
      setPhoneError("Use a valid phone number");
      hasError = true;
    } else {
      setPhoneError("");
    }

    if (hasError) {
      return;
    }

    setStatus("");
    setIsSubmitting(true);

    const payload = Object.fromEntries(formData.entries());
    const response = await fetch("/api/contact_mail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();

    setStatus(result.success ? "Thanks for your inquiry. We will get back to you soon." : "Try again");
    setIsSubmitting(false);

    if (result.success) {
      event.currentTarget.reset();
    }
  }

  return (
    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
      <input type="hidden" name="sourceType" value={sourceType} />
      <input type="hidden" name="industryName" value={industryName ?? ""} />
      <input type="hidden" name="serviceName" value={serviceName ?? ""} />
      <input type="hidden" name="sourcePage" value={sourcePage ?? ""} />
      <input type="hidden" name="projectType" value={serviceName ?? "Industry Services"} />

      <div className="grid gap-6 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-xs font-black uppercase tracking-[0.1em] text-t-secondary">
          Name
          <input type="text" name="name" placeholder="Name" required className={inputClass} />
        </label>

        <label className="flex flex-col gap-2 text-xs font-black uppercase tracking-[0.1em] text-t-secondary">
          Email
          <input type="email" name="email" placeholder="name@example.com" required className={inputClass} />
          {emailError && <span className="text-xs font-semibold normal-case tracking-normal text-red-500">{emailError}</span>}
        </label>

        <label className="flex flex-col gap-2 text-xs font-black uppercase tracking-[0.1em] text-t-secondary">
          Phone Number
          <input type="tel" name="phone" placeholder="+92 300 1234567" required className={inputClass} />
          {phoneError && <span className="text-xs font-semibold normal-case tracking-normal text-red-500">{phoneError}</span>}
        </label>

        <label className="flex flex-col gap-2 text-xs font-black uppercase tracking-[0.1em] text-t-secondary">
          Country
          <select name="country" required className={inputClass}>
            <option value="">Select country</option>
            {COUNTRY_OPTIONS.map((country) => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-2 text-xs font-black uppercase tracking-[0.1em] text-t-secondary">
        Message
        <textarea
          name="projectDetail"
          rows={4}
          placeholder="Tell us what you want to build or improve."
          required
          className={textAreaClass}
        />
      </label>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="h-12 w-full rounded-xl bg-btn-primary text-sm font-bold text-btn-secondary shadow-lg transition-all duration-300 hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Sending..." : buttonText}
        </button>
      </div>

      {status && <p className="text-center text-sm font-semibold text-t-primary">{status}</p>}
    </form>
  );
}
