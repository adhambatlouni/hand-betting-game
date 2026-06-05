"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/lib/store/gameStore";
import Tile from "@/components/Tile/Tile";

const CurrentHand = () => {
  const { currentHand, history } = useGameStore();
  const previousHand =
    history.length > 0 ? history[history.length - 1].hand : null;

  if (!currentHand) return null;

  const diff = previousHand
    ? currentHand.totalValue - previousHand.totalValue
    : null;

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-5 px-6 py-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_45%,rgba(52,211,153,0.07),transparent)]" />
      </div>

      <motion.div
        key={history.length}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-3 shrink-0"
      >
        <div className="h-px w-10 bg-white/8" />
        <span className="text-[10px] text-white/30 uppercase tracking-[0.28em] font-medium">
          {history.length === 0
            ? "Opening Hand"
            : `Round ${history.length + 1}`}
        </span>
        <div className="h-px w-10 bg-white/8" />
      </motion.div>

      <div className="flex items-end gap-5 shrink-0">
        <AnimatePresence mode="popLayout">
          {currentHand.tiles.map((tile, index) => (
            <motion.div
              key={`${tile.id}-${history.length}`}
              layout
              initial={{ opacity: 0, y: 28, scale: 0.86 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.86 }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 22,
                delay: index * 0.08,
              }}
            >
              <Tile tile={tile} size="lg" animate={false} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.div
        key={`total-${currentHand.totalValue}-${history.length}`}
        initial={{ opacity: 0, scale: 0.82, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 22,
          delay: 0.28,
        }}
        className="flex flex-col items-center gap-1.5 shrink-0"
      >
        <span className="text-[9px] text-white/25 uppercase tracking-[0.22em] font-medium">
          Hand Total
        </span>

        <div className="flex items-baseline gap-3">
          <span className="text-[56px] font-black text-white font-mono leading-none tracking-tight">
            {currentHand.totalValue}
          </span>

          <AnimatePresence>
            {diff !== null && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.42 }}
                className={`text-sm font-bold font-mono ${
                  diff > 0
                    ? "text-emerald-400"
                    : diff < 0
                      ? "text-rose-400"
                      : "text-white/25"
                }`}
              >
                {diff > 0 ? `↑ +${diff}` : diff < 0 ? `↓ ${diff}` : "= tie"}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="flex gap-1.5 items-center">
          {Array.from({ length: 12 }).map((_, i) => {
            const threshold = ((i + 1) / 12) * 27;
            const filled = currentHand.totalValue >= threshold;
            return (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.32 + i * 0.025,
                  type: "spring",
                  stiffness: 400,
                  damping: 20,
                }}
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                  filled ? "bg-emerald-400/55" : "bg-white/6"
                }`}
              />
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default CurrentHand;
