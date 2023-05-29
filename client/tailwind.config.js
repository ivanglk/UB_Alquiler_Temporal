/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      colors: {
        primary: '#394867', /*DEFINIMOS CLASE PARA PALETA DE COLORES*/
      }
    },
  },
  plugins: [],
}

