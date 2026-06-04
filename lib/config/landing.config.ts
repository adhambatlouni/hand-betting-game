import { Tile } from "@/lib/types/tile.types";

export const previewTiles: Tile[] = [
  {
    id: "preview-bamboo-7",
    type: "number",
    suit: "bamboo",
    faceValue: 7,
    currentValue: 7,
  },
  {
    id: "preview-dragon-red",
    type: "dragon",
    variant: "red",
    faceValue: 5,
    currentValue: 6,
  },
  {
    id: "preview-wind-east",
    type: "wind",
    variant: "east",
    faceValue: 5,
    currentValue: 5,
  },
];

export const bgTiles = [
  { w: 44, h: 60, x: "7%", y: "10%", rot: -14, dur: 5.2, delay: 0.0 },
  { w: 56, h: 76, x: "78%", y: "7%", rot: 12, dur: 6.6, delay: 0.8 },
  { w: 38, h: 52, x: "88%", y: "52%", rot: -7, dur: 4.8, delay: 1.5 },
  { w: 50, h: 68, x: "4%", y: "62%", rot: 20, dur: 7.0, delay: 0.4 },
  { w: 44, h: 60, x: "60%", y: "76%", rot: -5, dur: 5.6, delay: 1.1 },
  { w: 56, h: 76, x: "20%", y: "78%", rot: 14, dur: 6.8, delay: 2.0 },
  { w: 38, h: 52, x: "70%", y: "20%", rot: -18, dur: 4.5, delay: 0.6 },
  { w: 44, h: 60, x: "34%", y: "3%", rot: 8, dur: 5.8, delay: 1.8 },
];
