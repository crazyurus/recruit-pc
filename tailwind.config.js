/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.tsx',
    './src/components/**/*.tsx',
  ],
  theme: {
    extend: {
      colors: {
        black: '#1f2329',
        white: '#fff',
      },
      maxWidth: {
        '1/2': '50%',
      },
    },
  },
  plugins: [],
};
