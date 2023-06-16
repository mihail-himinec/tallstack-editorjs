/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./resources/views/**/*.blade.php"],
  darkMode: "class",
  important: ".tallstack-editorjs",
  theme: {
    extend: {},
  },
  plugins: [
      require("@tailwindcss/typography")
  ],
  corePlugins: {
    preflight: false,
  },
};