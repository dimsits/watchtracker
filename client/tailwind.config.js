/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['"Nunito"', 'sans-serif'], // Custom Nunito font
      },
      colors: {
        granite: {
          dark: "#3D7C98", // Dark blue
          medium: "#73B0CD", // Medium blue
          light: "#A8DFF1", // Light blue
          softWhite: "#F5F5F5", // Soft white
        },
      },
    },
  },
  plugins: [],
};
