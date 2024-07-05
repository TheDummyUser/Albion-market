/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        theme: {
          base00: "var(--color-base00)",
          base01: "var(--color-base01)",
          base02: "var(--color-base02)",
          base03: "var(--color-base03)",
          base04: "var(--color-base04)",
          base05: "var(--color-base05)",
          base06: "var(--color-base06)",
          base07: "var(--color-base07)",
          base08: "var(--color-base08)",
          base09: "var(--color-base09)",
          base0A: "var(--color-base0A)",
          base0B: "var(--color-base0B)",
          base0C: "var(--color-base0C)",
          base0D: "var(--color-base0D)",
          base0E: "var(--color-base0E)",
          base0F: "var(--color-base0F)",
        },
      },
    },
  },
  plugins: [],
};
