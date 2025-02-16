/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        raleway: ['Raleway', 'serif'],
        roboto: ['Roboto', 'serif'],
      },
      spacing: {
        'xl-padding': '8rem',
        'lg-padding': '4rem',
      },
    },
  },
  plugins: [],
}

