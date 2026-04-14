import { GlobalConfig } from "payload";

const FormSettings: GlobalConfig = {
  slug: "form-settings",
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
