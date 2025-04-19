/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        postit: '8px 8px 8px 2px rgba(0, 0, 0, 0.1)',
      },
      backgroundColor: {
        cardBackground: '#f2fefe',
      },
      borderRadius: {
        cardRounded: '32px',
      },
      width: {
        cardWidth: '600px',
      },
      height: {
        cardHeight: '300px',
      },
      padding: {
        'canvas-x': '20px',
        'canvas-y': '20px',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
};
