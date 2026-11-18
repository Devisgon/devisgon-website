/** Illustrative routing rules. Scenario values are independent of enquiry data. */
export const automationExamples = {
  heading: 'Try a workflow',
  choose: 'Choose a workflow example',
  explore: 'Explore this capability',
  rule: 'Route changes at',
  outcome: 'Next action',
  examples: [
    { id: 'leads', label: 'New enquiry', measure: 'Project budget', maximum: 20000, increment: 1000, sample: 8000, threshold: 10000,
      low: 'Queue a follow-up', high: 'Notify the sales lead', lowDetail: 'Create a CRM entry and queue a follow-up email.', highDetail: 'Create a priority CRM entry and alert the person handling larger projects.' },
    { id: 'invoices', label: 'Invoice intake', measure: 'Invoice amount', maximum: 5000, increment: 100, sample: 2400, threshold: 2000,
      low: 'Send to bookkeeping', high: 'Request approval', lowDetail: 'The invoice is below the approval threshold. Send it to bookkeeping.', highDetail: 'Hold the invoice and send an approval request to the budget owner.' },
    { id: 'support', label: 'Support request', measure: 'Hours waiting', maximum: 24, increment: 1, sample: 6, threshold: 8,
      low: 'Keep in support queue', high: 'Escalate the ticket', lowDetail: 'Keep the ticket with the assigned support team.', highDetail: 'Flag the waiting ticket and notify the duty manager.' },
  ],
};
export type AutomationCopy = typeof automationExamples;
