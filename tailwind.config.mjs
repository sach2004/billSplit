/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        glow: "glow 2s ease-in-out infinite", // Define the glow animation
      },
      keyframes: {
        glow: {
          "0%, 100%": {
            textShadow:
                "0 0 5px #E5E5E6, 0 0 10px #E5E5E6, 0 0 20px #8A2BE2, 0 0 40px #8A2BE2",
          },
          "50%": {
            textShadow:
                "0 0 10px #E5E5E6, 0 0 20px #E5E5E6, 0 0 40px #8A2BE2, 0 0 80px #8A2BE2",
          },
        },
      },
    },
  },
  plugins: [],
};