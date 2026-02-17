export default {
  darkMode: 'class',
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#0066FF', 50: '#F0F7FF', 600: '#0052CC', 700: '#003D99' },
        secondary: { DEFAULT: '#7C3AED', 600: '#6D28D9' },
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0066FF 0%, #7C3AED 100%)',
      }
    }
  },
  plugins: []
}
