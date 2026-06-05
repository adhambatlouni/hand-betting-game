import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LeaderboardEntry } from "@/lib/types/leaderboard.types";

const MAX_ENTRIES = 5;

interface LeaderboardStore {
  entries: LeaderboardEntry[];
  saveScore: (name: string, score: number) => void;
  clearLeaderboard: () => void;
}

export const useLeaderboardStore = create<LeaderboardStore>()(
  persist(
    (set, get) => ({
      entries: [],

      saveScore: (name: string, score: number) => {
        const newEntry: LeaderboardEntry = {
          name,
          score,
          date: new Date().toLocaleDateString(),
        };

        const updated = [...get().entries, newEntry]
          .sort((a, b) => b.score - a.score)
          .slice(0, MAX_ENTRIES);

        set({ entries: updated });
      },

      clearLeaderboard: () => set({ entries: [] }),
    }),
    {
      name: "mahjong_leaderboard",
    },
  ),
);
