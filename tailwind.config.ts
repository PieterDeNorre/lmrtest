import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "blue-dark": "var(--blue-dark)",
        blue: "var(--blue)",
        "blue-light": "var(--blue-light)",
        "blue-lighter": "var(--blue-lighter)",
        "yellow-dark": "var(--yellow-dark)",
        yellow: "var(--yellow)",
        teal: "var(--teal)",
        "pink-dark": "var(--pink-dark)",
        "grey-light": "var(--grey-light)",
        valid: "var(--valid)",
        error: "var(--error)",
      },
      fontFamily: {
        sans: ["FlandersArtSans-Regular", "system-ui", "sans-serif"],
        mono: ["FlandersArtSans-Regular", "Consolas", "monospace"],
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
        sm: "8px",
        md: "16px",
        lg: "24px",
      },
      screens: {
        xs: "475px",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-in": "slideIn 0.3s ease-out",
        "bounce-light": "bounceLight 1s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        bounceLight: {
          "0%, 100%": { transform: "translateY(-5%)" },
          "50%": { transform: "translateY(0)" },
        },
      },
      radius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
      },
    },
  },
  plugins: [],
};

export default config;
