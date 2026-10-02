export const ENQUIRY_SERVICES = ["AI & agents", "Automation", "AI-powered app / SaaS", "Web app", "Website", "Mobile app", "SEO & marketing", "Consultancy", "Other"];
export const PROJECT_TYPES = ["New project", "Improve an existing product", "Fix or rescue a project", "Ongoing support", "Help me decide"];
export const PROJECT_SIZES = ["One workflow or feature", "MVP / first version", "Full product or platform", "Multiple systems / enterprise", "Not sure yet"];
export const PROJECT_BUDGETS = ["Under $5,000", "$5,000–$10,000", "$10,000–$25,000", "$25,000–$50,000", "$50,000+", "Need help estimating"];
export const PROJECT_TIMELINES = ["As soon as practical", "Within 1 month", "1–3 months", "3–6 months", "Flexible / exploring"];
export const ENQUIRY_STEPS = ["Service", "Scope", "Budget & timing", "Contact", "Review"];
export type ProjectEnquiryValues = { serviceName: string; projectType: string; projectSize: string; projectDetail: string; budget: string; timeline: string; country: string; name: string; email: string; phone: string };
export const EMPTY_ENQUIRY: ProjectEnquiryValues = { serviceName: "", projectType: "", projectSize: "", projectDetail: "", budget: "", timeline: "", country: "", name: "", email: "", phone: "" };

// The same answers are retained across steps. Review validates the entire
// submission again, so going Back cannot bypass an earlier requirement.
export function enquiryStepError(step: number, answers: ProjectEnquiryValues): string | null {
  if (step === 4) {
    for (let index = 0; index < 4; index++) {
      const error = enquiryStepError(index, answers);
      if (error) return error;
    }
    return null;
  }
  if (step === 0 && !ENQUIRY_SERVICES.includes(answers.serviceName)) return "Choose the service you are looking for.";
  if (step === 1) {
    if (!PROJECT_TYPES.includes(answers.projectType)) return "Choose your project type.";
    if (!PROJECT_SIZES.includes(answers.projectSize)) return "Choose your project size, or select Not sure yet.";
    if (answers.projectDetail.trim().length < 20 || answers.projectDetail.length > 10000) return "Describe your project in 20–10,000 characters.";
  }
  if (step === 2) {
    if (!PROJECT_BUDGETS.includes(answers.budget)) return "Choose a budget range, or ask for help estimating.";
    if (!PROJECT_TIMELINES.includes(answers.timeline)) return "Choose your preferred timeline.";
  }
  if (step === 3) {
    if (!answers.country.trim() || answers.country.length > 100) return "Select your country.";
    if (!answers.name.trim() || answers.name.length > 120) return "Enter your complete name.";
    if (answers.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email.trim())) return "Enter a valid email address.";
    if (!/^\+?[0-9\s().-]{7,20}$/.test(answers.phone.trim()) || answers.phone.replace(/\D/g, "").length < 7 || answers.phone.replace(/\D/g, "").length > 15) return "Enter a valid phone number, including your country code.";
  }
  return null;
}
