// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
// tailwind.config.js
export default {
  content: [
    "./app/**/*.{vue,js,ts,jsx,tsx}",
    "./components/**/*.{vue,js,ts,jsx,tsx}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Light Mode Tokens (Default)
        base: "#F8FAFC",
        card: "#FFFFFF",
        elevated: "#F1F5F9",
        "text-primary": "#0F172A",
        "text-muted": "#64748B",

        // Tetap simpan Dark Mode Tokens dengan prefix 'dark-'
        "dark-base": "#0A0F1E",
        "dark-card": "#111827",
        "dark-elevated": "#1F2937",

        // Accent tetap sama (Electric Blue & Cyan)
        "accent-primary": "#3B82F6",
        "accent-cyan": "#06B6D4",
      },
      boxShadow: {
        // Shadow untuk light mode agar terlihat mewah
        soft: "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
        "glow-blue": "0 0 15px rgba(59, 130, 246, 0.2)",
      },
    },
  },
};
