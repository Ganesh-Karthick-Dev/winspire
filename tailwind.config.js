/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                outfit: ['Outfit', 'sans-serif'],
                poppins: ['Poppins', 'sans-serif'],
            },
            colors: {
                primary: '#4f9cf9',
                secondary: '#8b5cf6',
            },
        },
    },
    plugins: [],
}
