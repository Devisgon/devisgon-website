import { GlobalConfig } from "payload";
import { sendNewsletterCampaign } from "@/lib/newsletter";

const FormSettings: GlobalConfig = {
  slug: "form-settings",
  hooks: {
    afterChange: [
      async ({ doc, previousDoc, req }) => {
        const current = Boolean(doc?.isGetStartedFormActive);
        const previous = Boolean(previousDoc?.isGetStartedFormActive);

        if (current === previous) return;

        const title = current
          ? "Applications Are Open Again"
          : "Application Form Temporarily Closed";

        const message = current
          ? "The get-started application form is now open. You can apply today."
          : "The get-started application form has been temporarily closed. We will notify you when it reopens.";

        await sendNewsletterCampaign(req.payload, {
          subject: title,
          title,
          message,
          ctaText: "Visit Website",
          ctaUrl: "https://www.devisgon.com/get-started",
        });
      },
    ],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "isGetStartedFormActive",
      type: "checkbox",
      defaultValue: true,
      label: "Enable Get Started Form",
      admin: {
        description: "Turn this off to hide the job application form and show a 'no active jobs' message.",
      },
    },
  ],
};

export default FormSettings;
