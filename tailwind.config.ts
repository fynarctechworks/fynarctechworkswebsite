import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette built around the logo's navy-black (#10141D).
        // "brand" is the primary accent; "ink" is text + dark sections.
        brand: {
          DEFAULT: "#10141D", // primary accent — logo navy-black
          dark: "#0a0d14", // slightly darker for hover states
        },
        ink: {
          DEFAULT: "#10141D", // text / dark sections — matches the logo
          900: "#0a0d14",
          800: "#10141D",
          600: "#3a3f4a",
        },
        mist: {
          DEFAULT: "#f5f5f5", // light section bg
          200: "#e5e5e5",
          300: "#c4c4c4",
        },
        mint: {
          DEFAULT: "#adedc4",
          500: "#1abd4b",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        display: [
          "var(--font-alexandria)",
          "var(--font-geist-sans)",
          "sans-serif",
        ],
        outfit: ["var(--font-outfit)", "sans-serif"],
        instrument: ["var(--font-instrument)", "sans-serif"],
      },
      fontSize: {
        // Type scale lifted from the source (px values)
        "display-xl": ["80px", { lineHeight: "1.05", letterSpacing: "-0.04em" }],
        "display-lg": ["52px", { lineHeight: "1.08", letterSpacing: "-0.03em" }],
        "display": ["50px", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
        "h1": ["44px", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "h2": ["36px", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "h3": ["30px", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
      },
      borderRadius: {
        card: "10px",
      },
      maxWidth: {
        container: "1200px",
      },
      transitionTimingFunction: {
        framer: "cubic-bezier(0.44, 0, 0.56, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
