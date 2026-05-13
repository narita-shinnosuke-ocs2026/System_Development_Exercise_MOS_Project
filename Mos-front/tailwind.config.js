export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // 必須: スキャン対象ファイル
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss'), // または import tailwindcss from 'tailwindcss'; tailwindcss()
    require('autoprefixer'), // 同様
  ],
}