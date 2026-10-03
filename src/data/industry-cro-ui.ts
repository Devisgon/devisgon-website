import { localizeContentTree } from "@/lib/content-language";

const english = {
  proofEyebrow: "Proof points",
  proofTitle: "Make the results easy to verify.",
  proofNote:
    "Editable placeholders: replace the figures with measured results and the logo tiles with approved customer or partner logos before publishing.",
  metrics: [
    { value: "XX%", label: "Verified improvement metric" },
    { value: "X hrs", label: "Time returned to the team" },
    { value: "X+", label: "Locations, teams or workflows supported" },
  ],
  logosLabel: "Approved client and partner logos",
  logoSlots: ["YOUR LOGO", "YOUR LOGO", "YOUR LOGO", "YOUR LOGO"],
  architectureCta: "Take a digital dive",
  benefitsCta: "Take your first step",
  servicesEyebrow: "A connected digital toolkit",
  servicesTitle: "The right tools for the work behind the service.",
  servicesIntro:
    "Choose a focused improvement or connect several parts of the customer journey. The solution should fit your team, current systems and operating process.",
  services: [
    {
      title: "AI and intelligent features",
      description:
        "Use AI for information retrieval, enquiry classification, recommendations and routine assistance, with people handling sensitive decisions and exceptions.",
    },
    {
      title: "Workflow automation",
      description:
        "Connect repeatable steps across the tools you already use, reduce manual handoffs and route exceptions to the right person.",
    },
    {
      title: "Website and lead capture",
      description:
        "Give visitors a clear path from their question to the right service, enquiry or booking with a fast, accessible website.",
    },
    {
      title: "AI receptionist",
      description:
        "Respond to common questions, collect enquiry details and route booking requests using approved answers and clear escalation rules.",
    },
    {
      title: "Virtual assistant",
      description:
        "Help customers or staff find approved information, prepare routine responses and complete administrative tasks with appropriate access controls.",
    },
    {
      title: "Management system or web app",
      description:
        "Bring the records, scheduling and operational workflows your team needs into a web app shaped around the way the business runs.",
    },
    {
      title: "Mobile app",
      description:
        "Give customers and staff a practical mobile way to manage the tasks, updates and self-service actions relevant to your industry.",
    },
    {
      title: "Digital marketing",
      description:
        "Support discovery and demand with search-focused content, campaign landing pages and clear reporting on enquiries and actions.",
    },
  ],
  calculatorEyebrow: "Explore the numbers",
  calculatorTitle: "Estimate where automation may free up time.",
  calculatorDescription:
    "Enter your own task volume, handling time, review effort and costs to model a scenario. The calculator uses your assumptions; it does not promise savings or revenue.",
  calculatorLink: "Open the automation value calculator",
  processEyebrow: "A practical starting point",
  processTitle: "Start with one part of the workflow.",
  processSteps: [
    {
      number: "01",
      title: "Map the friction",
      description:
        "Identify a repeated delay, missed handoff or manual task affecting customers or staff.",
    },
    {
      number: "02",
      title: "Choose the right build",
      description:
        "Decide whether the best fit is AI, automation, a website, an app or a connection between existing systems.",
    },
    {
      number: "03",
      title: "Launch and improve",
      description:
        "Agree on scope, test the workflow with real users and refine it using observed results.",
    },
  ],
  finalEyebrow: "Your next step",
  finalTitle: "Ready to improve the way your business runs?",
  finalDescription:
    "Share the opportunity you have in mind. The project brief helps our team understand the industry, scope and best place to begin.",
  finalCta: "Begin the transformation",
};

export type IndustryCroUi = typeof english;

export async function getIndustryCroUi(lang: string): Promise<IndustryCroUi> {
  return localizeContentTree(english, lang);
}
