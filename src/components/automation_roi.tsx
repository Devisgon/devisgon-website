"use client";

import { useState } from "react";
import { calculateAutomationValue, type AutomationInputs } from "@/lib/automation-roi";

const fields = [
  { key: "tasks", label: "Tasks per month", max: 1000000 },
  { key: "minutesPerTask", label: "Current hands-on minutes per task", max: 480 },
  { key: "coverage", label: "Share of tasks automated (%)", max: 100 },
  { key: "reviewMinutes", label: "Review minutes per automated task", max: 480 },
  { key: "hourlyValue", label: "Value of staff time (USD per hour)", max: 10000 },
  { key: "monthlyCost", label: "Recurring tools and support cost (USD/month)", max: 1000000 },
  { key: "setupCost", label: "Implementation cost (USD)", max: 10000000 },
] as const;

export default function AutomationRoi() {
  const [values, setValues] = useState<AutomationInputs>({ tasks: 1000, minutesPerTask: 10, coverage: 50, reviewMinutes: 2, hourlyValue: 50, monthlyCost: 200, setupCost: 5000 });
  const result = calculateAutomationValue(values);
  const dollars = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
  return <div className="mt-8 grid gap-8 md:grid-cols-2">
    <div className="space-y-4">{fields.map((field) => <label key={field.key} className="block text-sm font-medium">{field.label}<input type="number" min={0} max={field.max} step="any" value={values[field.key]} onChange={(event) => setValues((current) => ({ ...current, [field.key]: Math.min(field.max, Math.max(0, Number(event.target.value) || 0)) }))} className="mt-2 w-full rounded-lg border border-primary bg-bg-secondary p-3 text-t-primary" /></label>)}</div>
    <div className="rounded-2xl bg-bg-secondary p-6" aria-live="polite" aria-atomic="true">
      <h2 className="text-2xl font-semibold">Your illustrative scenario</h2>
      <dl className="mt-6 space-y-5"><div><dt>Hours potentially freed per month</dt><dd className="text-2xl font-bold">{result.hoursFreed.toFixed(1)}</dd></div><div><dt>Value of time freed</dt><dd className="text-2xl font-bold">{dollars(result.grossValue)}</dd></div><div><dt>Value after recurring costs</dt><dd className="text-2xl font-bold">{dollars(result.netValue)}</dd></div><div><dt>Simple implementation payback</dt><dd className="text-2xl font-bold">{result.paybackMonths === null ? "No positive payback in this scenario" : `${result.paybackMonths.toFixed(1)} months`}</dd></div></dl>
      <p className="mt-6 text-sm text-t-secondary">These are assumptions, not a quote or promised saving. Time freed is not necessarily a reduction in payroll or an increase in revenue. Include review, maintenance and exception handling in your estimate.</p>
    </div>
  </div>;
}
