import { Tile } from "./tile.types";

export type BetType = "higher" | "lower";
export type BetResult = "win" | "lose";
export type GameStatus = "idle" | "betting" | "revealing" | "game-over";
export type GameOverReason =
  | "tile-reached-zero"
  | "tile-reached-max"
  | "reshuffle-limit";

export interface Hand {
  tiles: Tile[];
  totalValue: number;
}

export interface RoundHistory {
  hand: Hand;
  bet: BetType;
  result: BetResult;
  pointsEarned: number;
}

export interface GameState {
  drawPile: Tile[];
  discardPile: Tile[];
  currentHand: Hand | null;
  previousHand: Hand | null;
  history: RoundHistory[];
  score: number;
  reshuffleCount: number;
  status: GameStatus;
  gameOverReason?: GameOverReason;
}
