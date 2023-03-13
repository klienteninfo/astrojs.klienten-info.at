/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["InterVariable", "Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'ci-color-1': '#a48544',
        'ci-color-2': '#545a58',
        'footer-bg' : '#545a58',
        'ci-text-color:' : '#333333'
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
