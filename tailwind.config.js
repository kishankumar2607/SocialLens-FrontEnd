module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      colors: {
        // Primary colors
        primary: "var(--color-primary)", // #4F46E5 - indigo-600
        "primary-hover": "var(--color-primary-hover)", // #4338CA - indigo-700
        "primary-light": "var(--color-primary-light)", // #818CF8 - indigo-400
        "neon-blue": "#60A5FA",
        "neon-purple": "#C084FC",

        // Neutral colors
        "background-dark": "var(--color-background-dark)", // #030712 - gray-950
        "surface-dark": "var(--color-surface-dark)", // #111827 - gray-900
        "surface-medium": "var(--color-surface-medium)", // #1F2937 - gray-800
        "border-dark": "var(--color-border-dark)", // #374151 - gray-700
        "text-primary": "var(--color-text-primary)", // #FFFFFF - white
        "text-secondary": "var(--color-text-secondary)", // #D1D5DB - gray-300
        "text-tertiary": "var(--color-text-tertiary)", // #6B7280 - gray-500

        // Semantic colors
        success: "var(--color-success)", // #10B981 - emerald-500
        warning: "var(--color-warning)", // #F59E0B - amber-500
        error: "var(--color-error)", // #F43F5E - rose-500
        info: "var(--color-info)", // #06B6D4 - cyan-500
        "neon-blue": "var(--color-neon-blue)", // #60A5FA - blue-400
        "neon-purple": "var(--color-neon-purple)", // #C084FC - purple-400
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        display: ["Inter", "ui-sans-serif", "system-ui"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      boxShadow: {
        "glow-sm": "0 0 5px 0 rgba(79, 70, 229, 0.3)",
        "glow-md": "0 0 15px 0 rgba(79, 70, 229, 0.5)",
        "glow-lg": "0 0 25px 0 rgba(79, 70, 229, 0.7)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        glow: "glow 2s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-primary":
          "linear-gradient(to right, var(--color-primary), var(--color-primary-hover))",
        "gradient-neon":
          "linear-gradient(to right, var(--color-neon-blue), var(--color-neon-purple))",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/forms")],
};
