/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fde8e6',
          100: '#fbd0cd',
          200: '#f7a19b',
          300: '#f37268',
          400: '#ef4336',
          500: '#C33C2D', // Main red
          600: '#9c3024',
          700: '#75241b',
          800: '#4e1812',
          900: '#270c09',
        },
        social: {
          50: '#e7ebf3',
          100: '#cfd6e8',
          200: '#9faed0',
          300: '#6f85b9',
          400: '#3F5CA1',
          500: '#3B5998', // Main blue
          600: '#2f4779',
          700: '#23355a',
          800: '#18243c',
          900: '#0c121e',
        },
        success: {
          50: '#e5f4e9',
          100: '#ccead3',
          200: '#99d4a7',
          300: '#66bf7b',
          400: '#33a94f',
          500: '#28A745', // Main green
          600: '#208637',
          700: '#186429',
          800: '#10431c',
          900: '#08210e',
        },
        info: {
          50: '#e3f4f7',
          100: '#c7e9ef',
          200: '#8fd3df',
          300: '#57becf',
          400: '#1fa8bf',
          500: '#17A2B8', // Main blu-green
          600: '#128293',
          700: '#0e616e',
          800: '#09414a',
          900: '#052025',
        }
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

