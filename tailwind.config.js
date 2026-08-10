/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#FFFBF8",
        coral: {
          DEFAULT: "#F28B94",
          dark: "#E96F7A",
        },
        pastel: {
          blue: "#CDEFFB",
          yellow: "#FBECAF",
          green: "#D7F3D3",
          lavender: "#E7D9F5",
          pink: "#FFD5D8",
        },
        ink: "#1A1A1A",
        soft: "#252525",
        body: "#686868",
        border: "#1A1A1A",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
      },
      boxShadow: {
        'sticker': '6px 6px 0px #1A1A1A',
        'sticker-lg': '8px 8px 0px #1A1A1A',
        'sticker-sm': '4px 4px 0px #1A1A1A',
        'sticker-btn': '4px 4px 0px #1A1A1A',
        'sticker-btn-hover': '6px 6px 0px #1A1A1A',
        'sticker-btn-active': '2px 2px 0px #1A1A1A',
      }
    },
  },
  plugins: [],
}
