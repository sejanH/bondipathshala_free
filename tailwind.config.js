/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    screens: {
      sm: "640px",
      "min-sm": "767px",
      md: { max: "768px" },
      "max-md": { max: "1023px" },
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      web: "1440px",
      tab: "834px",
      "tab-max":{max:"833px"}
    },
    fontFamily: {
      body: "Baloo Da 2",
      montserrat:['Montserrat', 'sans-serif']
    },
    extend: {
      colors: {
        "inactive": "#203a4a",
        "footer-bg-top": "#203a4a",
        "footer-bg-bottom": "#203a4a",
        "btn-bg-top": "#FF4B00",
        "btn-bg-bottom": "#932000",
        "border-color": "#C5CBC9",
        "title-color": "#154C74",
        "border-color-2": "#FFF2ED",
        "border-color-3": "#FF9E7F",
        "border-color-4": "#FFA488",
        "border-color-5": "#E2E2E2",
        "table-header": "#224156",
        "table-row-even": "#FFEBE4",
        "table-row-odd": "#E8F8FF",
        "color-one": "#FF4B00",
        "color-two": "#2CC4FF",
        "color-three": "#224156",
        "color-four": "#5BD1FF",
        "color-five": "#A7B3BB",
        "color-six": "#FFB799",
        "color-seven": "#FFEEE9",
        "color-eight": "#DCE1E4",
        "color-nine": "#D0F2FF",
        "color-ten": "#F1FBFF",
        "color-eleven": "#1FB875",
        "border-one": "#F1F1F1",
        "title-1": "#01b8fb",
        "title-2": "#f26f21",
      },
    },
  },
  plugins: [{
    'postcss-import': {},
    'tailwindcss/nesting': 'postcss-nesting',
    'tailwindcss': {}
  }, { 'autoprefixer': {} }, require('postcss-nested'),require("daisyui")],
  // daisyUI config (optional)
  daisyui: {
    styled: true,
    themes: [
      "light", "dark"],
    base: true,
    utils: true,
    logs: false,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
  variants: {
    extend: {
      backgroundColor: ["even"],
      backgroundColor: ["odd"],
    },
  },
};
