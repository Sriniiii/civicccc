/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Indian Civic Color Palette
        primary: {
          50: '#e3f2fd',
          100: '#bbdefb',
          200: '#90caf9',
          300: '#64b5f6',
          400: '#42a5f5',
          500: '#1976d2', // Trust & Governance
          600: '#1565c0',
          700: '#0d47a1',
          800: '#0a368a',
          900: '#042562'
        },
        secondary: {
          50: '#e8f5e8',
          100: '#c8e6c8',
          200: '#a5d6a7',
          300: '#81c784',
          400: '#66bb6a',
          500: '#2e7d32', // Sustainability & Progress
          600: '#2c6b2f',
          700: '#1b5e20',
          800: '#2e7d32',
          900: '#1b5e20'
        },
        accent: {
          50: '#fff8e1',
          100: '#ffecb3',
          200: '#ffe082',
          300: '#ffd54f',
          400: '#ffca28',
          500: '#f57c00', // Civic Action & Urgency
          600: '#ef6c00',
          700: '#e65100',
          800: '#d84315',
          900: '#bf360c'
        },
        background: '#f8fafc',
        surface: '#ffffff',
        text: {
          primary: '#1f2937',
          secondary: '#6b7280',
          muted: '#9ca3af'
        },
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        border: '#e5e7eb'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        hindi: ['Hind', 'Noto Sans Devanagari', 'system-ui', 'sans-serif']
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      },
      borderRadius: {
        '4xl': '2rem'
      },
      boxShadow: {
        'civic': '0 4px 20px -2px rgba(25, 118, 210, 0.1)',
        'civic-lg': '0 10px 40px -4px rgba(25, 118, 210, 0.15)',
        'float': '0 8px 32px -8px rgba(0, 0, 0, 0.1)'
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        bounceGentle: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-10px)' },
          '60%': { transform: 'translateY(-5px)' }
        }
      }
    },
  },
  plugins: [],
}
