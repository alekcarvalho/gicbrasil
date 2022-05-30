import { defineConfig } from 'windicss/helpers'
import defaultTheme from 'windicss/defaultTheme'
import typography from 'windicss/plugin/typography'

export default defineConfig({
  darkMode: 'class',
  plugins: [typography()],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        md: '0 1px 4px rgba(0, 0, 0, 0.05), 0 4px 16px rgba(0, 0, 0, 0.06)',
      },
      colors: {
        primary: '#5f25a8',
        secondary: '#ff9240',
        third: '#ffd31a',
      },
      screens: {
        xs: '320px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
  },
})
