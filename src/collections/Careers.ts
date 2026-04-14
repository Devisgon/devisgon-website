import { CollectionConfig } from "payload";

const Careers: CollectionConfig = {
  slug: "careers",
  admin: {
    useAsTitle: "title",
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
