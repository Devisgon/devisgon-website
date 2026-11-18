/** Illustrative workflows, not live integrations or customer performance claims. */
export const automationExamples = {
  heading: 'Automation, in motion',
  label: 'Interactive example',
  choose: 'Choose a workflow example',
  run: 'Run example', pause: 'Pause', resume: 'Resume', replay: 'Run again',
  ready: 'Choose an example. See the handoffs happen.',
  running: 'Following the workflow…',
  paused: 'Paused. Continue whenever you like.',
  reduced: 'Motion reduced. The result appears instantly.',
  stages: ['Trigger', 'Intelligence', 'Action'],
  examples: [
    { id: 'leads', label: 'New enquiry', nodes: ['Enquiry received', 'Understand intent', 'Prepare follow-up'], result: 'A CRM entry and a draft reply, ready for your team to review.' },
    { id: 'invoices', label: 'Invoice intake', nodes: ['Invoice arrives', 'Extract & check', 'Send for approval'], result: 'Invoice details organised and routed to the right person for approval.' },
    { id: 'support', label: 'Support request', nodes: ['Question received', 'Find context', 'Draft an answer'], result: 'An answer grounded in your knowledge base, with a human handoff.' },
  ],
};
export type AutomationCopy = typeof automationExamples;
