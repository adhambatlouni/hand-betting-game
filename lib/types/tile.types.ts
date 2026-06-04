export type TileType = "number" | "dragon" | "wind";
export type NumberSuit = "characters" | "bamboo" | "circles";
export type DragonVariant = "red" | "green" | "white";
export type WindVariant = "east" | "west" | "north" | "south";

export interface Tile {
  id: string;
  type: TileType;
  suit?: NumberSuit;
  variant?: DragonVariant | WindVariant;
  faceValue: number;
  currentValue: number;
}
