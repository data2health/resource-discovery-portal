// tailwind.config.js
const colors = require('tailwindcss/colors')

module.exports = {
    mode: 'jit',
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        colors:{
            ...colors,
            main: {
                light: '#786FD8',
                DEFAULT: '#4A3FCA',
                dark: '#251F70',
              },
            secondary: {
                light: '#866AC8',
                DEFAULT: '#6643B5',
                dark: '#5C3DA4',
              },
            tertiary: {
                dark: '#E5E510',
                DEFAULT: '#F4F56E',
                light: '#F4F466',
              }
        },
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
