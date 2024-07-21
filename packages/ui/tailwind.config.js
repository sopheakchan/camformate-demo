/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,stories.js,stories.jsx,stories.ts,stories.tsx}',
    './stories/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      primary: {
        // DEFAULT: '#3b82f6',
        DEFAULT: '#f97316',
        200: '#fff7ed',
        300: '#fb923c',
      },
      danger: {
        DEFAULT: '#f43f5e',
        100: '#fee2e2',
        400: '#f87171',
        500: '#ec4899',
      },

      //not in used yet
      warning: {
        DEFAULT: '#eab308',
        300: '#fde047',
        500: '#eab308',
      },
      white: {
        DEFAULT: '#ffffff', //background
        500: '#eeeeee',
        100: '#f3f4f6',
      },
      black: {
        DEFAULT: '#1e1e1e',
      },
      blue: {
        DEFAULT: '#2563eb',
        100: '#dbeafe',
        300: '#85d1f7',
      },
      gray: {
        DEFAULT: '#383838', //opacity 0.6
        100: '#f1f5f9',
        200: '#cbd5e1',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#73777B',
      },
      green: {
        DEFAULT: '#ADE792',
        500: '#4ade80',
        100: '#dcfce7',
      },
      violet: {
        DEFAULT: '#9333ea',
        100: '#ede9fe',
      },
    },
    screens: {
      mobile: '280px',
      tablet: '768px',
      desktop: '1248px',
    },
    weight: {
      normal: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
    },
    boxShadow: {
      sm: '0px 2px 4px 0px rgba(11, 10, 55, 0.15)',
      lg: '0px 8px 20px 0px rgba(18, 16, 99, 0.06)',
    },
    fontSize: {
      xs: ['0.8rem', { lineHeight: '1rem', letterSpacing: '-0.032em' }], // subTitle des content nav (mobile)
      sm: ['1rem', { lineHeight: '1rem', letterSpacing: '-0.032em' }], // subTitle des content nav
      md: ['1.25rem', { lineHeight: '1.5rem', letterSpacing: '-0.03em' }], // title
      lg: ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.03em' }], //sub header
      xl: ['2rem', { lineHeight: '2.5rem', letterSpacing: '-0.032em' }], //header , other icons
      xxl: ['3rem', { lineHeight: '3.5rem', letterSpacing: '-0.032em' }], // Main icons
    },
    extend: {
      fontFamily: {
        Ubuntu: ['Ubuntu', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss'), require('autoprefixer')],
}
