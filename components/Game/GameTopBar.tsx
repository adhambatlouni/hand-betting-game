"use client";

import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/lib/store/gameStore";
import { GAME_CONSTANTS } from "@/lib/constants/game.constants";
import { AlertTriangle } from "lucide-react";

const GameTopBar = () => {
  const router = useRouter();
  const { score, drawPile, discardPile, reshuffleCount, resetGame } =
    useGameStore();
  const handleExit = () => {
    resetGame();
    router.push("/");
  };

  const reshufflesLeft = GAME_CONSTANTS.MAX_RESHUFFLES - reshuffleCount - 1;

  const totalTiles = drawPile.length + discardPile.length;
  const drawPercent =
    totalTiles > 0 ? Math.min((drawPile.length / totalTiles) * 100, 100) : 0;
  const isCritical = reshufflesLeft === 0 && reshuffleCount > 0;

  return (
    <div className="shrink-0">
      <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 sm:py-3 bg-[#0E1E16]/95 backdrop-blur-md border-b border-white/6">
        <button
          onClick={handleExit}
          className="flex items-center gap-1.5 group"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="text-white/35 group-hover:text-white/70 group-hover:-translate-x-0.5 transition-all duration-200"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          <span className="text-sm text-white/35 group-hover:text-white/70 transition-colors duration-200 tracking-wide">
            Exit
          </span>
        </button>

        <div className="flex flex-col items-center gap-0.5">
          <span className="text-[9px] text-emerald-500/50 uppercase tracking-[0.2em] font-semibold">
            Score
          </span>
          <motion.span
            key={score}
            initial={{ scale: 1.35, color: "#34d399" }}
            animate={{ scale: 1, color: "#e2e8f0" }}
            transition={{ duration: 0.28 }}
            className="text-xl sm:text-2xl font-bold font-mono leading-none tracking-tight"
          >
            {score.toLocaleString()}
          </motion.span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex flex-col items-end gap-0.5">
            <span className="text-[9px] text-white/25 uppercase tracking-wider hidden sm:block">
              Draw
            </span>
            <span className="text-xs sm:text-sm font-mono font-semibold text-white/60">
              {drawPile.length}
            </span>
          </div>
          <div className="w-px h-4 sm:h-5 bg-white/[0.07]" />
          <div className="flex flex-col items-end gap-0.5">
            <span className="text-[9px] text-white/25 uppercase tracking-wider hidden sm:block">
              Discard
            </span>
            <span className="text-xs sm:text-sm font-mono font-semibold text-white/60">
              {discardPile.length}
            </span>
          </div>
        </div>
      </div>

      <div className="relative h-0.75 bg-white/4 overflow-hidden">
        <motion.div
          className={`h-full ${
            isCritical
              ? "bg-linear-to-r from-amber-600 to-amber-400"
              : "bg-linear-to-r from-emerald-600 to-emerald-400"
          }`}
          initial={{ width: `${drawPercent}%` }}
          animate={{ width: `${drawPercent}%` }}
          transition={{
            type: "spring",
            bounce: 0,
            duration: 0.85,
          }}
        />
      </div>

      <AnimatePresence>
        {reshuffleCount > 0 && (
          <motion.div
            key="reshuffle-banner"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div
              className={`flex items-center justify-center gap-2.5 px-4 py-2 border-b ${
                isCritical
                  ? "bg-red-950/50 border-red-700/25"
                  : "bg-amber-950/40 border-amber-700/20"
              }`}
            >
              <div className="flex gap-1.5">
                {Array.from({ length: GAME_CONSTANTS.MAX_RESHUFFLES - 1 }).map(
                  (_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: i * 0.06,
                        type: "spring",
                        stiffness: 400,
                        damping: 20,
                      }}
                      className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                        i < reshuffleCount
                          ? isCritical
                            ? "bg-red-400"
                            : "bg-amber-400"
                          : "bg-white/10"
                      }`}
                    />
                  ),
                )}
              </div>
              <span
                className={`flex items-center gap-1.5 text-[11px] font-medium tracking-wide ${
                  isCritical ? "text-red-400/90" : "text-amber-400/90"
                }`}
              >
                <AlertTriangle size={12} />
                {isCritical
                  ? "Final reshuffle — last chance!"
                  : `${reshufflesLeft} reshuffle${reshufflesLeft !== 1 ? "s" : ""} remaining`}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameTopBar;
