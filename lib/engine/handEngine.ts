import { Tile } from "@/lib/types/tile.types";
import { Hand } from "@/lib/types/game.types";

export function getTotalValue(tiles: Tile[]): number {
  return tiles.reduce((sum, tile) => sum + tile.currentValue, 0);
}

export function buildHand(tiles: Tile[]): Hand {
  return {
    tiles,
    totalValue: getTotalValue(tiles),
  };
}

export function getHandResult(
  previous: Hand,
  current: Hand,
): "higher" | "lower" | "equal" {
  if (current.totalValue > previous.totalValue) return "higher";
  if (current.totalValue < previous.totalValue) return "lower";
  return "equal";
}
