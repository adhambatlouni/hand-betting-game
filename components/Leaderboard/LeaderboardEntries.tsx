"use client";

import { motion } from "framer-motion";
import { Crown, Trophy, Medal } from "lucide-react";
import { useLeaderboardStore } from "@/lib/store/leaderboardStore";
import { defaultRank, rankConfig } from "@/lib/config/leaderboard.config";
import LeaderboardRankIcon from "./LeaderboardRankIcon";

const LeaderboardEntries = () => {
  const { entries } = useLeaderboardStore();

  return (
    <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-2.5 min-h-0">
      <div className="flex items-center gap-3 mb-1">
        <div className="flex-1 h-px bg-white/5" />
        <span className="text-[9px] text-white/20 uppercase tracking-[0.28em] shrink-0">
          Top 5 All-Time
        </span>
        <div className="flex-1 h-px bg-white/5" />
      </div>

      {entries.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 flex flex-col items-center justify-center gap-3"
        >
          <div className="w-14 h-14 rounded-2xl bg-white/3 border border-white/6 flex items-center justify-center">
            <Crown size={24} className="text-white/15" />
          </div>
          <p className="text-sm text-white/20 font-medium">No scores yet</p>
          <p className="text-xs text-white/10">
            Play a game to claim the top spot
          </p>
        </motion.div>
      ) : (
        entries.map((entry, index) => {
          const cfg = rankConfig[index] ?? defaultRank;
          return (
            <motion.div
              key={`${entry.name}-${index}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.07,
                type: "spring",
                stiffness: 320,
                damping: 28,
              }}
              className={`
                flex items-center gap-4 rounded-2xl px-4 py-3.5
                border ${cfg.border} ${cfg.bg}
                ${index === 0 ? "shadow-[0_0_0_1px_rgba(250,204,21,0.08),0_4px_20px_rgba(0,0,0,0.3)]" : ""}
              `}
            >
              <div className="w-7 flex items-center justify-center shrink-0">
                <LeaderboardRankIcon index={index} />
              </div>

              <div className="w-px h-8 bg-white/6 shrink-0" />

              <div className="flex-1 min-w-0">
                <p className="text-white/85 font-semibold text-sm truncate leading-none">
                  {entry.name}
                </p>
                <p className="text-white/20 text-[10px] mt-1 leading-none">
                  {entry.date}
                </p>
              </div>

              <div className="flex flex-col items-end shrink-0">
                <span
                  className={`text-2xl font-black font-mono tabular-nums leading-none ${cfg.scoreColor}`}
                >
                  {entry.score.toLocaleString()}
                </span>
                {index === 0 && (
                  <span className="text-[8px] text-yellow-600/70 uppercase tracking-wider mt-0.5">
                    Best
                  </span>
                )}
              </div>
            </motion.div>
          );
        })
      )}
    </div>
  );
};

export default LeaderboardEntries;
