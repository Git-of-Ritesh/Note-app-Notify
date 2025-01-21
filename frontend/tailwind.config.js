/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Logo: ['Handlee', 'serif'], // Add your Google Font here
      },
    },
  },
  plugins: [],
}