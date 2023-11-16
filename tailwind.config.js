/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif']
      },
      colors: {
        primary: {
          light: '#C12C41',
          DEFAULT: '#9E1528',
          dark: '#7D0011',
          disabled: '#DA949D'
        },
        secondary: {
          DEFAULT: '#262223'
        }
      }
    },
  },
  plugins: [],
}

