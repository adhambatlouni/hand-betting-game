import { BetType, BetResult } from "@/lib/types/game.types";

/** Resolves the player's bet against the actual outcome — equal result counts as a loss */
export function resolveBet(
  bet: BetType,
  outcome: "higher" | "lower" | "equal",
): BetResult {
  if (bet === outcome) return "win";
  return "lose";
}

/** Returns points earned — winner gets the hand's total value, loser gets zero */
export function getPointsEarned(result: BetResult, handValue: number): number {
  return result === "win" ? handValue : 0;
}
