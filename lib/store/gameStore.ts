import { create } from "zustand";
import {
  GameState,
  GameStatus,
  GameOverReason,
  BetType,
} from "@/lib/types/game.types";
import { GAME_CONSTANTS } from "@/lib/constants/game.constants";
import {
  createShuffledDeck,
  drawTiles,
  reshuffleDeck,
  canDraw,
} from "@/lib/engine/deckEngine";
import { buildHand, getHandResult } from "@/lib/engine/handEngine";
import { resolveBet, getPointsEarned } from "@/lib/engine/betEngine";
import {
  applyTileValueChanges,
  findGameOverTile,
  mergeTileUpdates,
} from "@/lib/engine/tileEngine";

interface GameStore extends GameState {
  startGame: () => void;
  placeBet: (bet: BetType) => void;
  resetGame: () => void;
}

const initialState: GameState = {
  drawPile: [],
  discardPile: [],
  currentHand: null,
  previousHand: null,
  history: [],
  score: 0,
  reshuffleCount: 0,
  status: "idle",
  gameOverReason: undefined,
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  startGame: () => {
    const deck = createShuffledDeck();
    const { drawn, remaining } = drawTiles(deck, GAME_CONSTANTS.HAND_SIZE);
    const firstHand = buildHand(drawn);

    set({
      ...initialState,
      drawPile: remaining,
      currentHand: firstHand,
      status: "betting",
    });
  },

  placeBet: (bet: BetType) => {
    const {
      drawPile,
      discardPile,
      currentHand,
      history,
      score,
      reshuffleCount,
    } = get();

    if (!currentHand) return;

    let activeDeck = drawPile;
    let newReshuffleCount = reshuffleCount;

    if (!canDraw(activeDeck, GAME_CONSTANTS.HAND_SIZE)) {
      if (reshuffleCount >= GAME_CONSTANTS.MAX_RESHUFFLES - 1) {
        set({ status: "game-over", gameOverReason: "reshuffle-limit" });
        return;
      }
      activeDeck = reshuffleDeck(discardPile);
      newReshuffleCount += 1;
    }

    const { drawn, remaining } = drawTiles(
      activeDeck,
      GAME_CONSTANTS.HAND_SIZE,
    );
    const nextHand = buildHand(drawn);

    const outcome = getHandResult(currentHand, nextHand);
    const result = resolveBet(bet, outcome);
    const points = getPointsEarned(result, nextHand.totalValue);

    const updatedTiles = applyTileValueChanges(nextHand.tiles, result);
    const updatedHand = buildHand(updatedTiles);
    const mergedDeck = mergeTileUpdates(remaining, updatedTiles);

    const gameOverTile = findGameOverTile([...mergedDeck, ...updatedTiles]);
    if (gameOverTile) {
      const reason: GameOverReason =
        gameOverTile.currentValue <= GAME_CONSTANTS.MIN_TILE_VALUE
          ? "tile-reached-zero"
          : "tile-reached-max";

      set({
        currentHand: updatedHand,
        previousHand: currentHand,
        status: "game-over",
        gameOverReason: reason,
        score: score + points,
      });
      return;
    }

    const newHistory = [
      ...history,
      {
        hand: currentHand,
        bet,
        result,
        pointsEarned: points,
      },
    ];

    set({
      drawPile: mergedDeck,
      discardPile: [...discardPile, ...currentHand.tiles],
      currentHand: updatedHand,
      previousHand: currentHand,
      history: newHistory,
      score: score + points,
      reshuffleCount: newReshuffleCount,
      status: "betting",
    });
  },

  resetGame: () => {
    set(initialState);
  },
}));
