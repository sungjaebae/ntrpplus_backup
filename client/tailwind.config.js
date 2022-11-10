/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { 400: "#21942c", 600: "#1a7623" },
        secondary: { 400: "#942146", 600: "#761a38" },
        border: { 400: "#4d4c4c", 600: "#353535" },
        accent: { 400: "#f1d100", 600: "#d8bc00" },
        info: "#B8B8B8",
        text: "#4d4c4c",
        next: "#7a7a7a",
      },
    },
  },
  plugins: [],
};
