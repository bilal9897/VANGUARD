import type { SiteMeta, Theme } from "@/lib/site";

// Settings for THIS site: Vanguard, a (fictional) watch maison. Direction: site/DESIGN.md.

export const meta: SiteMeta = {
  name: "Vanguard",
  title: "Vanguard — Timeless Interiors.",
  description: "Vanguard designs timeless interiors that combine architecture and emotion to create homes that inspire everyday living.",
  loaderText: "VANGUARD",
  loader: false,
};

export const theme: Theme = {
  bg: "#f6f1e9",
  surface: "#fffcf7",
  text: "#1d1a16",
  muted: "#6b645b",
  accent: "#8b5e34",
  accentText: "#f6f1e9",
  line: "#ddd3c4",
  fontDisplay: "'Bodoni Moda Variable', serif",
  fontBody: "'Manrope Variable', sans-serif",
  radius: 0,
  uppercaseHeadings: false,
  heroText: "#f3ece1",
};
