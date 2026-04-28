import { CollectionConfig } from "payload";
import { sendNewsletterCampaign } from "@/lib/newsletter";

const Careers: CollectionConfig = {
  slug: "careers",
  admin: {
    useAsTitle: "title",
  },
  hooks: {
    afterChange: [
      async ({ doc, previousDoc, operation, req }) => {
        const isActiveNow = Boolean(doc?.isActive);
        const wasActive = Boolean(previousDoc?.isActive);

        const becameActive = isActiveNow && !wasActive;
        const activeAndUpdated = operation === "update" && isActiveNow;
        const createdActive = operation === "create" && isActiveNow;

        if (!becameActive && !activeAndUpdated && !createdActive) return;

        const roleType =
          doc?.type === "Internship" ? "Internship" : "Job Opening";
        const headline =
          becameActive || createdActive
            ? `${roleType} Open: ${doc?.title}`
            : `${roleType} Updated: ${doc?.title}`;

        const message =
          becameActive || createdActive
            ? `A new ${doc?.type?.toLowerCase() || "position"} is now open: "${doc?.title}".`
            : `An existing ${doc?.type?.toLowerCase() || "position"} was updated: "${doc?.title}".`;

        await sendNewsletterCampaign(req.payload, {
          subject: headline,
          title: headline,
          message,
          ctaText: "Apply Now",
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
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "type",
      type: "select",
      options: [
        { label: "Job", value: "Job" },
        { label: "Internship", value: "Internship" },
      ],
      required: true,
    },
    {
      name: "isActive",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description: "Uncheck this to hide the position from the get started form.",
      },
    },
  ],
};

export default Careers;
