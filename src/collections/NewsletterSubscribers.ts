import type { CollectionConfig } from "payload";

const NewsletterSubscribers: CollectionConfig = {
  slug: "newsletter-subscribers",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "isActive", "createdAt"],
  },
  access: {
    create: () => false,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "email",
      type: "email",
      required: true,
      unique: true,
      index: true,
      hooks: {
        beforeValidate: [
          ({ value }) => {
            if (typeof value !== "string") return value;
            return value.trim().toLowerCase();
          }
        ],
      },
    },
    {
      name: "isActive",
      type: "checkbox",
      defaultValue: true,
      label: "Active Subscriber",
      admin: {
        description:
          "When disabled, this subscriber will not receive update emails.",
      },
    },
  ],
};

export default NewsletterSubscribers;
