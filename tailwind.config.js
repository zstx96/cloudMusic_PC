const appColor = {
  red: "#fd544e",
  gray:"#a6a6a6",
  bg_gray:"#f6f6f7"
};
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        app:appColor,
        
      },
      animation:{
        'spin-slow':'spin 3s linear infinite'
      }
    },
  },

  plugins: [],
};
