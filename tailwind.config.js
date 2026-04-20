/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#f1f5f9', 
        surface: '#ffffff',    
        primary: '#ea580c',    
        primaryHover: '#c2410c', 
        textMain: '#020617',   
        textMuted: '#475569',  
        borderLight: '#cbd5e1',
        inputBg: '#ffffff',    
      },
      boxShadow: {
        'card': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        'input': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'glow': '0 10px 15px -3px rgba(234, 88, 12, 0.3)', 
      }
    },
  },
  plugins: [],
}