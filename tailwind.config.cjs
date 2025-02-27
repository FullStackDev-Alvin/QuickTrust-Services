/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        clifford: "#da373d",
        bg: "#FAFAFA",
        primary: "#FFFFFF",
        secondary: "#E9B44C",
        button: "#E76F51",
        light_grey: "#F5F5F5",
        text: "#000000",
        secondary_1:"#F4EAE6",
        text_2:"#333333",
      },
    },
  },
  plugins: [],
}
