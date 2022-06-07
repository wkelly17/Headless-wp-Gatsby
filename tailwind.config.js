module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      tp: "600px",
      tl: "900px",
      d: "1200px",
      dl: "1600px",
    },
    extend: {
      gridTemplateColumns: {
        20: "repeat(20, minmax(0, 1fr))",
        auto: "repeat(auto-fit, minmax(300px, 1fr)",
      },
      colors: {
        primary: "#E34626",
        secondary: "#EAD930",
        tertiary: "#c9e9eb",
        grayDarker: "#414042",
        grayDark: "#666",
        grayLight: "#eee",
        grayLighter: "#f7f7f7",
      },
      fontFamily: {
        compressed: ["obviously-compressed", "sans-serif"],
        condensed: ["obviously-condensed", "sans-serif"],
        regular: ["obviously", "sans-serif"],
        extended: ["obviously-extended", "sans-serif"],
      },
    },
  },
  plugins: [],
}
