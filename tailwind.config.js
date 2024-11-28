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
      width: {
        '1/5.5': '18.18%', // 100% / 5.5 = 18.18%
      },
      colors: {
        lightblue: {
          500: '#3B82F6', // You can adjust the color code as needed
        },
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