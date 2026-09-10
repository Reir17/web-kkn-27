/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFD12E',     // Primary Sunflower
        secondary: '#FF5733',   // Secondary Electric Coral
        tertiary: '#00C49F',    // Tertiary Fresh Mint
        ink: '#1E1B4B',         // Ink Navy / Dark Neutral
        cream: '#FFFDF9',       // Crisp Paper Cream
        surface: '#fcf8ff',     // Surface Light
        'surface-dim': '#dad6ff',
        tape: '#FEF08A',        // Tape Wash Yellow
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
        grotesk: ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
};