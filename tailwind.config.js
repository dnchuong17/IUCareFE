/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '3/10': '30vh',
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        prata: ['Prata', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [
    //require('daisyui'),
  ],
  
}