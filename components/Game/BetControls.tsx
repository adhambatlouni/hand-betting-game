"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/lib/store/gameStore";

const BetControls = () => {
  const { placeBet, status, currentHand } = useGameStore();
  const [pending, setPending] = useState<"higher" | "lower" | null>(null);
  const processingRef = useRef(false);

  useEffect(() => {
    if (status === "betting") {
      setPending(null);
      processingRef.current = false;
    }
  }, [status, currentHand]);

  const handleBet = (bet: "higher" | "lower") => {
    if (processingRef.current) return;
    if (useGameStore.getState().status !== "betting") return;
    processingRef.current = true;
    setPending(bet);
    placeBet(bet);
  };

  const clickDisabled = pending !== null || status !== "betting";
  const visuallyDimmed = status !== "betting";

  return (
    <div className="shrink-0 px-5 pt-3.5 pb-6 bg-[#0A1510]/90 backdrop-blur-md border-t border-white/[0.07]">
      <div className="flex items-center gap-3 mb-3.5">
        <div className="flex-1 h-px bg-white/[0.07]" />
        <span className="text-[9px] text-white/25 uppercase tracking-[0.28em] font-medium shrink-0">
          Will the next hand be…
        </span>
        <div className="flex-1 h-px bg-white/[0.07]" />
      </div>

      <div className="flex gap-3 max-w-lg mx-auto">
        <motion.button
          onClick={() => handleBet("higher")}
          disabled={clickDisabled}
          whileHover={!clickDisabled ? { y: -2, scale: 1.012 } : {}}
          whileTap={!clickDisabled ? { scale: 0.96 } : {}}
          transition={{ type: "spring", stiffness: 520, damping: 26 }}
          className={`
            relative flex-1 flex flex-col items-center justify-center gap-1.5
            py-3.5 sm:py-5 rounded-2xl border-2 overflow-hidden
            transition-colors duration-150 select-none touch-manipulation
            ${visuallyDimmed ? "opacity-40 cursor-not-allowed" : clickDisabled ? "cursor-not-allowed" : "cursor-pointer"}
            ${
              pending === "higher"
                ? "bg-emerald-500/20 border-emerald-400/70"
                : "bg-emerald-500/[0.07] border-emerald-500/25 hover:border-emerald-400/45 hover:bg-emerald-500/10"
            }
          `}
        >
          <AnimatePresence>
            {pending === "higher" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-emerald-400/6"
              />
            )}
          </AnimatePresence>

          <motion.span
            animate={
              pending === "higher"
                ? {
                    y: [-3, 3, -3],
                    transition: { repeat: 4, duration: 0.42 },
                  }
                : { y: 0 }
            }
            className="text-[32px] font-black text-emerald-400 leading-none"
          >
            ↑
          </motion.span>
          <span className="text-[13px] font-bold text-emerald-300 leading-none tracking-wide">
            Higher
          </span>
          <span className="text-[8px] text-emerald-700/80 uppercase tracking-widest leading-none">
            Next &gt; This
          </span>
        </motion.button>

        <div className="flex flex-col items-center justify-center gap-1.5 w-5 shrink-0">
          <div className="flex-1 w-px bg-white/[0.07]" />
          <div className="w-1 h-1 rounded-full bg-white/10" />
          <div className="flex-1 w-px bg-white/[0.07]" />
        </div>

        <motion.button
          onClick={() => handleBet("lower")}
          disabled={clickDisabled}
          whileHover={!clickDisabled ? { y: -2, scale: 1.012 } : {}}
          whileTap={!clickDisabled ? { scale: 0.96 } : {}}
          transition={{ type: "spring", stiffness: 520, damping: 26 }}
          className={`
            relative flex-1 flex flex-col items-center justify-center gap-1.5
            py-3.5 sm:py-5 rounded-2xl border-2 overflow-hidden
            transition-colors duration-150 select-none touch-manipulation
            ${visuallyDimmed ? "opacity-40 cursor-not-allowed" : clickDisabled ? "cursor-not-allowed" : "cursor-pointer"}
            ${
              pending === "lower"
                ? "bg-rose-500/20 border-rose-400/70"
                : "bg-rose-500/[0.07] border-rose-500/25 hover:border-rose-400/45 hover:bg-rose-500/10"
            }
          `}
        >
          <AnimatePresence>
            {pending === "lower" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-rose-400/6"
              />
            )}
          </AnimatePresence>

          <motion.span
            animate={
              pending === "lower"
                ? {
                    y: [3, -3, 3],
                    transition: { repeat: 4, duration: 0.42 },
                  }
                : { y: 0 }
            }
            className="text-[32px] font-black text-rose-400 leading-none"
          >
            ↓
          </motion.span>
          <span className="text-[13px] font-bold text-rose-300 leading-none tracking-wide">
            Lower
          </span>
          <span className="text-[8px] text-rose-800/80 uppercase tracking-widest leading-none">
            Next &lt; This
          </span>
        </motion.button>
      </div>
    </div>
  );
};

export default BetControls;
