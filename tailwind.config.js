// tailwind.config.js
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0B0B0C",
        surface: "#1A1A1D",
        accent: "#8B5E3C",
        highlight: "#C7A27C",
        "text-primary": "#FFFFFF",
        "text-secondary": "#B4B4B8",
        success: "#4CAF50",
        error: "#E53935",
      },
    },
  },
  plugins: [],
};
