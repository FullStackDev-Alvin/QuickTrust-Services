/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enables dark mode with 'class' (toggle support)
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // 🌑 Dark Mode - Tactical Military UI
        bg: "rgb(0, 75, 0)", // Deep Military Green (Stealthy)
        primary: "#FFF", // Tactical Light Grey (Text)
        secondary: "#BBA96A", // Desert Khaki (Accent Elements)
        button: "#948B53", // Tactical Olive Drab (Subdued but readable)
        light_grey: "#4A4F47", // Steel Grey (Less harsh contrast)
        text: "#E5E5E5", // Light Sand White (For readability)
        secondary_1: "#222F1F", // Deep Combat Green (Subtle Backgrounds)
        text_2: "#A0A083", // Army Greenish-Grey (Less prominent text)

        // ☀️ Light Mode (Inherits from previous setup)
        light: {
          bg: "#00401A", // Dark Military Green
          primary: "#FFFFFF",
          secondary: "#FFFFFF",
          button: "#A49675",
          light_grey: "#9C9C88",
          text: "#FAFAFA",
          secondary_1: "#A7D7A7",
          text_2: "#B3B3A1",
        },
      },
    },
  },
  plugins: [],
};
