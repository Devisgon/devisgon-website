/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        
        // Consistent Kebab-case naming
        "bg-primary": "var(--bg-primary)",
        "bg-secondary": "var(--bg-secondary)",
        
        "t-primary": "var(--t-primary)",
        "t_secondary": "var(--t_secondary)",
         "btn-primary": "var(--btn-primary)",
        "btn-secondary": "var(--btn-secondary)",

        
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        axcend: "var(--axcend)",

      },
    },
  },
  plugins: [],
};