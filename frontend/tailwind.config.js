/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Roboto', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'mono': ['Roboto', 'sans-serif'], // Override monospace to use Roboto
      },
      spacing: {
        '1': '0.325rem', // Override default `1` padding/margin value
      },
    },
  },
  plugins: [],
};
