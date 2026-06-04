import { Tile } from "@/lib/types/tile.types";
import { buildDeck } from "@/lib/constants/tile.constants";

/** Shuffles an array in-place using the Fisher-Yates algorithm */
export function shuffleTiles<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Creates a full deck and returns it shuffled — used on game start */
export function createShuffledDeck(): Tile[] {
  return shuffleTiles(buildDeck());
}

/** Draws N tiles from the draw pile, returns drawn tiles and the remainder */
export function drawTiles(drawPile: Tile[], count: number) {
  return {
    drawn: drawPile.slice(0, count),
    remaining: drawPile.slice(count),
  };
}

/** Merges discard pile with a fresh deck and reshuffles — called when draw pile is empty */
export function reshuffleDeck(discardPile: Tile[]): Tile[] {
  return shuffleTiles([...discardPile]);
}

/** Returns true if the draw pile has enough tiles to complete a draw */
export function canDraw(drawPile: Tile[], count: number): boolean {
  return drawPile.length >= count;
}
