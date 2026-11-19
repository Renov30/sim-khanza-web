import type { Config } from "tailwindcss";

const tingkatWarna = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

function paletDariVariabelCss(nama: "primary" | "secondary" | "tertiary" | "slate") {
  return Object.fromEntries(
    tingkatWarna.map((tingkat) => [
      tingkat,
      `rgb(var(--color-${nama}-${tingkat}) / <alpha-value>)`,
    ]),
  );
}

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: paletDariVariabelCss("primary"),
        secondary: paletDariVariabelCss("secondary"),
        tertiary: paletDariVariabelCss("tertiary"),
        slate: paletDariVariabelCss("slate"),
      },
    },
  },
  plugins: [],
};

export default config;

