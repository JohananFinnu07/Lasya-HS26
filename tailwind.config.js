/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0e1715',
        forest: '#15221e',
        moss: '#1d2d27',
        pine: '#24352d',
        teal: '#18272a',
        deep: '#1c2a25',
        gold: '#E2A91C',
        goldsoft: '#F2CF6B',
        goldmuted: '#B88A1F',
        cream: '#F6F1E4',
        ivory: '#FBF7EC',
        sage: '#A9BC8A',
        olive: '#7F9A5A',
        leaf: '#5E7D43',
        bud: '#FFFDF5',
      },
      fontFamily: {
        display: ['Marcellus', 'Georgia', 'serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['Allura', 'cursive'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
        telugu: ['"Noto Serif Telugu"', 'serif'],
      },
    },
  },
  plugins: [],
}
