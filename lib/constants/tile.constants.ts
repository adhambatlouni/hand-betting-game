import {
  Tile,
  NumberSuit,
  DragonVariant,
  WindVariant,
} from "@/lib/types/tile.types";
import { GAME_CONSTANTS } from "./game.constants";

export const NUMBER_SUITS: NumberSuit[] = ["characters", "bamboo", "circles"];
export const DRAGON_VARIANTS: DragonVariant[] = ["red", "green", "white"];
export const WIND_VARIANTS: WindVariant[] = ["east", "west", "north", "south"];

export const TILE_DISPLAY_NAMES: Record<string, string> = {
  characters: "Characters",
  bamboo: "Bamboo",
  circles: "Circles",
  red: "Red Dragon",
  green: "Green Dragon",
  white: "White Dragon",
  east: "East Wind",
  west: "West Wind",
  north: "North Wind",
  south: "South Wind",
};

export function buildDeck(): Tile[] {
  const tiles: Tile[] = [];

  NUMBER_SUITS.forEach((suit) => {
    for (let face = 1; face <= 9; face++) {
      for (let copy = 0; copy < GAME_CONSTANTS.TILES_PER_TYPE; copy++) {
        tiles.push({
          id: `${suit}-${face}-${copy}`,
          type: "number",
          suit,
          faceValue: face,
          currentValue: face,
        });
      }
    }
  });

  DRAGON_VARIANTS.forEach((variant) => {
    for (let copy = 0; copy < GAME_CONSTANTS.TILES_PER_TYPE; copy++) {
      tiles.push({
        id: `dragon-${variant}-${copy}`,
        type: "dragon",
        variant,
        faceValue: GAME_CONSTANTS.NON_NUMBER_BASE_VALUE,
        currentValue: GAME_CONSTANTS.NON_NUMBER_BASE_VALUE,
      });
    }
  });

  WIND_VARIANTS.forEach((variant) => {
    for (let copy = 0; copy < GAME_CONSTANTS.TILES_PER_TYPE; copy++) {
      tiles.push({
        id: `wind-${variant}-${copy}`,
        type: "wind",
        variant,
        faceValue: GAME_CONSTANTS.NON_NUMBER_BASE_VALUE,
        currentValue: GAME_CONSTANTS.NON_NUMBER_BASE_VALUE,
      });
    }
  });

  return tiles;
}

export const TILE_IMAGE_PATHS: Record<string, string> = {
  "characters-1": "/tiles/Man1.svg",
  "characters-2": "/tiles/Man2.svg",
  "characters-3": "/tiles/Man3.svg",
  "characters-4": "/tiles/Man4.svg",
  "characters-5": "/tiles/Man5.svg",
  "characters-6": "/tiles/Man6.svg",
  "characters-7": "/tiles/Man7.svg",
  "characters-8": "/tiles/Man8.svg",
  "characters-9": "/tiles/Man9.svg",

  "circles-1": "/tiles/Pin1.svg",
  "circles-2": "/tiles/Pin2.svg",
  "circles-3": "/tiles/Pin3.svg",
  "circles-4": "/tiles/Pin4.svg",
  "circles-5": "/tiles/Pin5.svg",
  "circles-6": "/tiles/Pin6.svg",
  "circles-7": "/tiles/Pin7.svg",
  "circles-8": "/tiles/Pin8.svg",
  "circles-9": "/tiles/Pin9.svg",

  "bamboo-1": "/tiles/Sou1.svg",
  "bamboo-2": "/tiles/Sou2.svg",
  "bamboo-3": "/tiles/Sou3.svg",
  "bamboo-4": "/tiles/Sou4.svg",
  "bamboo-5": "/tiles/Sou5.svg",
  "bamboo-6": "/tiles/Sou6.svg",
  "bamboo-7": "/tiles/Sou7.svg",
  "bamboo-8": "/tiles/Sou8.svg",
  "bamboo-9": "/tiles/Sou9.svg",

  red: "/tiles/Chun.svg",
  green: "/tiles/Hatsu.svg",
  white: "/tiles/Haku.svg",

  east: "/tiles/Ton.svg",
  south: "/tiles/Nan.svg",
  west: "/tiles/Shaa.svg",
  north: "/tiles/Pei.svg",
};

// helper to get the correct image path for any tile
export function getTileImagePath(tile: Tile): string {
  if (tile.type === "number") {
    return TILE_IMAGE_PATHS[`${tile.suit}-${tile.faceValue}`];
  }
  return TILE_IMAGE_PATHS[tile.variant!];
}
