/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte,md,mdx,scss}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF00AA",
        secondary: "#2F2F2F",
        background: "#F0F0F0",
      },
      fontFamily: {
        primary: ["'Roboto'", "Nexa", "sans-serif"],
        secondary: ["Nexa", "'Roboto'", "sans-serif"],
      },
      maxWidth: {
        container: "90rem", // 1440px
      },
    },
  },
  plugins: [],
};
