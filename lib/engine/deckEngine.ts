import { Tile } from "@/lib/types/tile.types";
import { buildDeck } from "@/lib/constants/tile.constants";

export function shuffleTiles<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function createShuffledDeck(): Tile[] {
  return shuffleTiles(buildDeck());
}

export function drawTiles(drawPile: Tile[], count: number) {
  return {
    drawn: drawPile.slice(0, count),
    remaining: drawPile.slice(count),
  };
}

export function reshuffleDeck(discardPile: Tile[]): Tile[] {
  return shuffleTiles([...discardPile, ...buildDeck()]);
}

export function canDraw(drawPile: Tile[], count: number): boolean {
  return drawPile.length >= count;
}
