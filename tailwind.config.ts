import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#f6f1e8",
        ink: "#171717",
        mist: "#f8f6f2",
        panel: "#fffdf9",
        line: "rgba(23, 23, 23, 0.08)",
        accent: {
          DEFAULT: "#1e5c54",
          soft: "#d8ebe5",
          warm: "#b77a52"
        }
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "\"Segoe UI\"",
          "sans-serif"
        ],
        display: ["Iowan Old Style", "Palatino", "\"Book Antiqua\"", "Georgia", "serif"]
      },
      boxShadow: {
        card: "0 24px 60px rgba(28, 26, 23, 0.08)",
        soft: "0 10px 30px rgba(23, 23, 23, 0.06)"
      },
      backgroundImage: {
        glow:
          "radial-gradient(circle at top left, rgba(216, 235, 229, 0.9), transparent 35%), radial-gradient(circle at top right, rgba(183, 122, 82, 0.12), transparent 30%)"
      },
      borderRadius: {
        xl2: "1.5rem"
      }
    }
  },
  plugins: []
};

export default config;
