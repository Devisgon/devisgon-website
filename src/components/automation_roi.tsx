"use client";

import { useState } from "react";
import { calculateAutomationValue, type AutomationInputs } from "@/lib/automation-roi";
import { automationRoiUi } from "@/data/automation-roi-ui";

const fields = [
  { key: "tasks", max: 1000000 },
  { key: "minutesPerTask", max: 480 },
  { key: "coverage", max: 100 },
  { key: "reviewMinutes", max: 480 },
  { key: "hourlyValue", max: 10000 },
  { key: "monthlyCost", max: 1000000 },
  { key: "setupCost", max: 10000000 },
] as const;

export default function AutomationRoi({ lang = "en" }: { lang?: string }) {
  const ui = automationRoiUi[lang] ?? automationRoiUi.en;
  const [values, setValues] = useState<AutomationInputs>({ tasks: 1000, minutesPerTask: 10, coverage: 50, reviewMinutes: 2, hourlyValue: 50, monthlyCost: 200, setupCost: 5000 });
  const result = calculateAutomationValue(values);
  const dollars = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
  return <div className="mt-8 grid gap-8 md:grid-cols-2">
    <div className="space-y-4">{fields.map((field, index) => <label key={field.key} className="block text-sm font-medium">{ui.fields[index]}<input type="number" min={0} max={field.max} step="any" value={values[field.key]} onChange={(event) => setValues((current) => ({ ...current, [field.key]: Math.min(field.max, Math.max(0, Number(event.target.value) || 0)) }))} className="mt-2 w-full rounded-lg border border-primary bg-bg-secondary p-3 text-t-primary" /></label>)}</div>
    <div className="rounded-2xl bg-bg-secondary p-6" aria-live="polite" aria-atomic="true">
      <h2 className="text-2xl font-semibold">{ui.scenario}</h2>
      <dl className="mt-6 space-y-5"><div><dt>{ui.hours}</dt><dd className="text-2xl font-bold">{result.hoursFreed.toFixed(1)}</dd></div><div><dt>{ui.gross}</dt><dd className="text-2xl font-bold">{dollars(result.grossValue)}</dd></div><div><dt>{ui.net}</dt><dd className="text-2xl font-bold">{dollars(result.netValue)}</dd></div><div><dt>{ui.payback}</dt><dd className="text-2xl font-bold">{result.paybackMonths === null ? ui.noPayback : `${result.paybackMonths.toFixed(1)} ${ui.months}`}</dd></div></dl>
      <p className="mt-6 text-sm text-t-secondary">{ui.disclaimer}</p>
    </div>
  </div>;
}
