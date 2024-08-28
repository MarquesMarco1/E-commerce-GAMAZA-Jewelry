/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      primary: "Poiret One",
      secondary: "Thasadith",
    },
    colors: {
      gold: "#BF9553",
      "light-purple": "#CD92F2",
      "dark-purple": "#7B16B9",
      "dark-mode-purple": "#150536",
      "dark-mode-light-purple": "#6D4FAE",
      black: "#0C0910",
      white: "#F5F5F5",
      grey: "#DEDEE0",
      navbar: "#111827",
    },
    backgroundImage: {
      login: "url('./assets/login.jpg')",
      register: "url('./assets/register.jpg')",
    },
    transitionProperty: {
      "width-height": "width, height",
    },
    transform: {
      "translate-20p": "translateX(20%)",
      "translate-100n": "translateX(-100%)",
      "translate-0": "translateX(0)",
    },
    translate: {
      "-1/5": "-20%",
    },
    zIndex: {
      10: "10",
      20: "20",
    },
    boxShadow: {
      myShadow1: "4.1px -5px 0 0 rgba(205, 146, 242)",
      myShadow2: "-4.1px -5px 0 0 rgba(205, 146, 242)",
      myShadow3: "4.1px -5px 0 0 rgba(21 5 54)",
      myShadow4: "-4.1px -5px 0 0 rgba(21 5 54)",
    },
  },
  variants: {
    extend: {
      transform: ["responsive", "hover", "focus"],
      transitionProperty: ["responsive", "hover", "focus"],
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".button-primary": {
          backgroundColor: "#CD92F2",
          backgroundOpacity: "0.2",
          color: "#BF9553",
          padding: "0.5rem 1rem",
          borderRadius: "0.375rem",
          "&:hover": {
            backgroundColor: "#BF9553",
          },
        },
      });
    },
  ],
};
