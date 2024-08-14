/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        error: '#ff0033',
        primary: '#0800ff',
        success: '#4bb543'
      }
    }
  },
  plugins: []
};
