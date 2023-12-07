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
          DEFAULT: '#083D77',
          dark: '#12335e'
        },
        dark: {
          DEFAULT: '#262223'
        },
        success: {
          DEFAULT: '#10b981',
          dark: '#059669'
        },
        warning: {
          DEFAULT: '#f59e0b',
          dark: '#BF7902'
        },
        danger: {
          DEFAULT: '#ef4444',
          dark: '#dc2626'
        }
      },
      screens: {
        xs: '375px'
      }
    },
  },
  plugins: [],
}

