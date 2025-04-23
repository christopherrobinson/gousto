/** @type {import('tailwindcss').Config} */
import { fontFamily } from 'tailwindcss/defaultTheme';

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
           50: '#fff0f3',
          100: '#ffdde4',
          200: '#ffc0cc',
          300: '#ff94a9',
          400: '#ff5778',
          500: '#ff234e',
          600: '#ff0032', // DEFAULT
          700: '#d7002a',
          800: '#b10325',
          900: '#920a25',
          950: '#500010',
        },
        secondary: {
           50: '#f3f7f8',
          100: '#e0e9ed',
          200: '#c5d4dc',
          300: '#9db5c3',
          400: '#6e8fa2',
          500: '#527488',
          600: '#476073',
          700: '#3e5160',
          800: '#394651',
          900: '#333d47', // DEFAULT
          950: '#1e252e',
        },
        tertiary: {
           50: '#ecf0ff',
          100: '#dde3ff',
          200: '#c2ccff',
          300: '#9ca9ff',
          400: '#757bff',
          500: '#615cff', // DEFAULT
          600: '#4b36f5',
          700: '#402ad8',
          800: '#3425ae',
          900: '#2e2689',
          950: '#1d1650',
        },
      },
      fontFamily: {
        sans: ['Geist Sans', ...fontFamily.sans],
        serif: ['Noto Serif', ...fontFamily.serif],
      },
      transitionDuration: {
        DEFAULT: '300ms',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.primary.600'),
              fontWeight: theme('fontWeight.light'),
              textDecoration: 'none',
              '&:hover': {
                color: theme('colors.primary.800'),
                textDecoration: 'underline',
              },
            },
            color: theme('colors.secondary.950'),
            h2: {
              fontWeight: theme('fontWeight.medium'),
            },
            strong: {
              fontWeight: theme('fontWeight.normal'),
            },
          },
        },
      }),
    },
  },
}
