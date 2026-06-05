import { Tile } from "@/lib/types/tile.types";
import { Hand } from "@/lib/types/game.types";

/** Sums the current value of all tiles in a hand */
export function getTotalValue(tiles: Tile[]): number {
  return tiles.reduce((sum, tile) => sum + tile.currentValue, 0);
}

/** Wraps a tile array into a Hand object with a pre-calculated total */
export function buildHand(tiles: Tile[]): Hand {
  return {
    tiles,
    totalValue: getTotalValue(tiles),
  };
}

/** Compares two hands and returns whether the current is higher, lower, or equal */
export function getHandResult(
  previous: Hand,
  current: Hand,
): "higher" | "lower" | "equal" {
  if (current.totalValue > previous.totalValue) return "higher";
  if (current.totalValue < previous.totalValue) return "lower";
  return "equal";
}
