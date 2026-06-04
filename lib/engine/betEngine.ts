import { BetType, BetResult } from "@/lib/types/game.types";

export function resolveBet(
  bet: BetType,
  outcome: "higher" | "lower" | "equal",
): BetResult {
  if (outcome === "equal") return "lose";
  return bet === outcome ? "win" : "lose";
}

export function getPointsEarned(result: BetResult, handValue: number): number {
  return result === "win" ? handValue : 0;
}
