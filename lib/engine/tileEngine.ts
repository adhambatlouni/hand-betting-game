import { Tile } from "@/lib/types/tile.types";
import { BetResult } from "@/lib/types/game.types";
import { GAME_CONSTANTS } from "@/lib/constants/game.constants";

/** Increments or decrements the value of non-number tiles based on the round result */
export function applyTileValueChanges(
  tiles: Tile[],
  result: BetResult,
): Tile[] {
  return tiles.map((tile) => {
    if (tile.type === "number") return tile;
    return {
      ...tile,
      currentValue: tile.currentValue + (result === "win" ? 1 : -1),
    };
  });
}

/** Scans all tiles and returns the first one that has breached the min or max value limit */
export function findGameOverTile(tiles: Tile[]): Tile | null {
  return (
    tiles.find(
      (tile) =>
        tile.currentValue <= GAME_CONSTANTS.MIN_TILE_VALUE ||
        tile.currentValue >= GAME_CONSTANTS.MAX_TILE_VALUE,
    ) ?? null
  );
}

/** Syncs updated tile values back into the deck by matching on tile id */
export function mergeTileUpdates(deck: Tile[], updatedTiles: Tile[]): Tile[] {
  return deck.map((tile) => {
    const updated = updatedTiles.find((t) => t.id === tile.id);
    return updated ?? tile;
  });
}
