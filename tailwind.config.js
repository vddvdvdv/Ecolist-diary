/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#13ec5b",
        "primary-dark": "#0fb847",
        "primary-light": "#4aff85",
        "background-light": "#f6f8f6",
        "background-dark": "#102216",
        "card-light": "#ffffff",
        "card-dark": "#1a2c20",
        "text-light": "#0d1b12",
        "text-dark": "#e7f3eb",
        "text-secondary-light": "#4c9a66",
        "text-secondary-dark": "#a3d9b8",
        "border-light": "#cfe7d7",
        "border-dark": "#2a4b35",
        "eco-forest": "#2d6a4f",
        "eco-leaf": "#95d5b2",
        "eco-charcoal": "#343a40",
        "eco-medium-gray": "#adb5bd",
        "green-primary": "#4CAF50",
        "blue-secondary": "#2196F3",
        "yellow-accent": "#FFC107",
        "orange-accent": "#FF9800",
        "red-accent": "#f44336",
      },
      fontFamily: {
        display: ["Lexend", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem",
        full: "9999px",
      },
      boxShadow: {
        'eco': '0 4px 14px 0 rgba(19, 236, 91, 0.15)',
        'eco-lg': '0 10px 40px 0 rgba(19, 236, 91, 0.2)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}

