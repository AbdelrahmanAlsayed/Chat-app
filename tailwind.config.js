
/** @type {import('tailwindcss').Configuration} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        screens: {
            'sm': '520px',
            'md': '768px',
            'lg': '992px',
            'xl': '1280px',
            '2xl': '1536px',
        },
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '1.5rem',
                md: "2rem",
                lg: '2.5rem',
                xl: '3rem',
            },
        },
        extend: {
            colors: { 
                light: {
                    blueColor: "#3b82f6", 
                    mainBg: "#ffffff",
                    secBg: "#e5e5e5",
                    thirdBg: "#cecece",
                    fourthBg: "#b7b7b7",
                    mainColor: "#000000",
                    secColor: "#6a6a6a",
                },
                dark: {
                    blueColor: "#3b82f6",
                    mainBg: "#191919",
                    secBg: "#2f2f2f",
                    thirdBg: "#464646",
                    fourthBg: "#5e5e5e",
                    mainColor: "#F1f1f1",
                    secColor: "#c0c0c0",
                },
            },
        },
    },
    plugins: [],
};
