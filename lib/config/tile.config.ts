export const TILE_SIZES = {
  sm: {
    w: 46,
    h: 64,
    strip: 14,
    img: 24,
    bar: 16,
    barFs: 10,
    stripFs: 7,
    r: 10,
  },
  md: {
    w: 58,
    h: 80,
    strip: 16,
    img: 30,
    bar: 20,
    barFs: 11,
    stripFs: 8,
    r: 12,
  },
  lg: {
    w: 88,
    h: 122,
    strip: 20,
    img: 54,
    bar: 30,
    barFs: 14,
    stripFs: 8,
    r: 14,
  },
} as const;

export const TILE_TYPES = {
  number: {
    strip: "#16a34a",
    bar: "#14532d",
    text: "#6ee7b7",
    border: "rgba(52,211,153,0.35)",
    label: "NUMBER",
  },
  dragon: {
    strip: "#dc2626",
    bar: "#450a0a",
    text: "#fca5a5",
    border: "rgba(239,68,68,0.35)",
    label: "DRAGON",
  },
  wind: {
    strip: "#0284c7",
    bar: "#0c1a27",
    text: "#7dd3fc",
    border: "rgba(56,189,248,0.35)",
    label: "WIND",
  },
} as const;
