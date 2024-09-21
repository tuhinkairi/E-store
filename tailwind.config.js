/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:"class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      Ga_Maamli:'Ga Maamli',
      Margarine: 'Margarine',
      Caveat:'Caveat',
      ShadowsIntoLight:['Shadows Into Light', 'cursive']
    },
  

    extend: {
      dropShadow: {
        glow: [
        "0 0px 20px rgba(255,255, 255, 0.35)",
        "0 0px 65px rgba(255, 255,255, 0.2)"
        ]
        },
        screens: {  
          'sm': '640px',  
          'md': '768px',  
          'upmd': '1440px', // Your custom breakpoint  
          'lg': '1024px',  
          'xl': '1280px',  
        }, 
    },
  },
  plugins: [],
}

