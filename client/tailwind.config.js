/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'primary': 'Poiret One',
    },
    extend: {
      colors: {
        "gold": "#BF9553",
        "light-purple": "#CD92F2",
        "dark-purple": "#7B16B9",
        "black": "#0C0910",
        "white": "#F5F5F5",
      }, 
      backgroundImage: {
        'login': "url('./assets/login.jpg')",
        'register': "url('./assets/register.jpg')"
      }
    },
  },
  plugins: [],
}