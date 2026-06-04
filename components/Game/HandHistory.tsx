"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/lib/store/gameStore";
import Tile from "@/components/Tile/Tile";
import { TrendingDown, TrendingUp } from "lucide-react";

const HandHistory = () => {
  const { history } = useGameStore();
  const lastRound = history[history.length - 1];
  const roundNumber = history.length;

  return (
    <div className="shrink-0 w-full h-20 border-b border-white/6 bg-[#0C1810]/70">
      <AnimatePresence mode="wait">
        {!lastRound ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-2 w-full h-full"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.12, 0.32, 0.12] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3 }}
                className="w-11.5 h-16 rounded-[10px] bg-white/5 border border-white/[0.07] shrink-0"
              />
            ))}
            <span className="text-[10px] text-white/20 uppercase tracking-widest ml-2">
              Opening hand
            </span>
          </motion.div>
        ) : (
          <motion.div
            key={`round-${roundNumber}`}
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 14 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="flex items-center justify-between h-full px-4 gap-3"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="shrink-0 text-[10px] font-bold text-emerald-400/80 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-md leading-none">
                #{roundNumber}
              </span>

              <div className="flex gap-1.5 items-center shrink-0">
                {lastRound.hand.tiles.map((tile, i) => (
                  <Tile
                    key={tile.id}
                    tile={tile}
                    size="sm"
                    animate={false}
                    index={i}
                  />
                ))}
              </div>

              <div className="flex flex-col leading-none shrink-0">
                <span className="text-[8px] text-white/25 uppercase tracking-wider mb-0.5">
                  Total
                </span>
                <span className="text-base font-bold font-mono text-white/60">
                  {lastRound.hand.totalValue}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span
                className={`text-[11px] font-semibold px-2 py-1 rounded-lg border leading-none ${
                  lastRound.bet === "higher"
                    ? "text-emerald-300 border-emerald-500/30 bg-emerald-500/10"
                    : "text-rose-300 border-rose-500/30 bg-rose-500/10"
                }`}
              >
                {lastRound.bet === "higher" ? (
                  <TrendingUp size={11} />
                ) : (
                  <TrendingDown size={11} />
                )}
                {lastRound.bet === "higher" ? "Higher" : "Lower"}{" "}
              </span>

              <motion.span
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                className={`text-[11px] font-bold px-2 py-1 rounded-lg border leading-none ${
                  lastRound.result === "win"
                    ? "text-emerald-300 border-emerald-400/25 bg-emerald-400/10"
                    : "text-rose-400 border-rose-400/25 bg-rose-400/10"
                }`}
              >
                {lastRound.result === "win"
                  ? `+${lastRound.pointsEarned}`
                  : "Miss"}
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HandHistory;
