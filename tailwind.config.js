/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '3/10': '30vh', // Custom height class for 3/10 of the viewport height
      },
    },
  },
  plugins: [
    //require('daisyui'),
  ],
  
}