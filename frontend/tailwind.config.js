/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: '#F2EEEC',
        // Primary dark blue for backgrounds or headers
        accent: '#763A12',  
        // Rich blue, suitable for accents or buttons
        lighterAccent: '#AA4C0A',     
        // Green for success messages or CTA highlights
        orangeee: '#E08600',   
        yellowish: '#EFBF38',
        // Light yellow, ideal for backgrounds or subtle highlights
        lighterYellowish: '#F5DE7A',
        citron: '#d5c67a',        
        gamboge: '#f1a208',
      },
      
    },
  },
  plugins: [],
}

// #763A12
// #AA4C0A
// #E08600
// #EFBF38
// #F5DE7A
// #F2EEEC