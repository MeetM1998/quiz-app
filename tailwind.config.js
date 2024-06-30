/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90.04deg, #800080 0.03%, #ffc0cb 99.96%)',
        'custom-gradient-2': 'linear-gradient(135deg, rgba(128, 0, 128, 0.4) 0%, rgba(128, 0, 128, 0.4) 50%, rgba(255, 192, 203, 0.4) 100%)',
        "custom-gradient-3": "linear-gradient(135deg, #800080 0%, #800080 50%, #ffc0cb 100%)",
      },
    },
  },
  plugins: [],
}
