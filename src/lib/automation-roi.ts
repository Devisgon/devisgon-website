export type AutomationInputs = { tasks: number; minutesPerTask: number; coverage: number; reviewMinutes: number; hourlyValue: number; monthlyCost: number; setupCost: number };
export function calculateAutomationValue(inputs: AutomationInputs) {
  const bounded = (value: number, maximum: number) => Math.min(maximum, Math.max(0, Number.isFinite(value) ? value : 0));
  const tasks = bounded(inputs.tasks, 1000000);
  const minutes = bounded(inputs.minutesPerTask, 480);
  const coverage = bounded(inputs.coverage, 100) / 100;
  const reviewMinutes = bounded(inputs.reviewMinutes, 480);
  const hoursFreed = tasks * coverage * Math.max(0, minutes - reviewMinutes) / 60;
  const grossValue = hoursFreed * bounded(inputs.hourlyValue, 10000);
  const netValue = grossValue - bounded(inputs.monthlyCost, 1000000);
  const paybackMonths = netValue > 0 ? bounded(inputs.setupCost, 10000000) / netValue : null;
  return { hoursFreed, grossValue, netValue, paybackMonths };
}
