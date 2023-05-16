/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        black: '#121216',
        primary: {
          '100': '#F9D7DC',
          '300': '#FF7181',
          '400': '#FF495E',
          '500': '#E33347',
        }
      },
      fontFamily: { 
        sans: ['Space Grotesk', ...defaultTheme.fontFamily.mono],
        roobert: ['Roobert', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [],
}