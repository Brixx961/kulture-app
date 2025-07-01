/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        zoom: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
      },
      animation: {
        zoom: 'zoom 2s ease-in-out infinite',
      },
      perspective: {
        none: 'none',
        1000: '1000px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    function ({ addUtilities }) {
      addUtilities({
        '.perspective': {
          perspective: '1000px',
        },
      });
    },
  ],
};
