"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useGameStore } from "@/lib/store/gameStore";
import { useLeaderboardStore } from "@/lib/store/leaderboardStore";
import { reasonMessages } from "@/lib/config/gameOver.config";
import { Check } from "lucide-react";

const GameOverPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [saved, setSaved] = useState(false);
  const { score, history, gameOverReason, resetGame } = useGameStore();
  const { saveScore } = useLeaderboardStore();

  const [finalScore] = useState(score);
  const [finalRounds] = useState(history.length);
  const [finalReason] = useState(gameOverReason);

  const handleSave = () => {
    if (!name.trim() || saved) return;
    saveScore(name.trim(), finalScore);
    setSaved(true);
    setTimeout(() => {
      router.push("/leaderboard");
      resetGame();
    }, 600);
  };

  const handleRestart = () => {
    resetGame();
    router.push("/game");
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-6 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-red-900/20 blur-[80px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/10"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
        <span className="text-[10px] text-red-400 font-bold uppercase tracking-[0.25em]">
          Game Over
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold text-white tracking-tight">
          Well <span className="text-rose-400 italic">Played</span>
        </h1>
        {finalReason && (
          <p className="text-white/50 text-sm mt-2">
            {reasonMessages[finalReason]}
          </p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18 }}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 px-8 py-6 text-center"
      >
        <p className="text-xs text-white/40 uppercase tracking-widest mb-2">
          Final Score
        </p>
        <motion.p
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 220,
            damping: 16,
            delay: 0.3,
          }}
          className="text-7xl font-black text-white font-mono tabular-nums leading-none"
        >
          {finalScore.toLocaleString()}
        </motion.p>
        <p className="text-white/30 text-xs mt-3">
          {finalRounds} round{finalRounds !== 1 ? "s" : ""} played
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-sm flex flex-col gap-3"
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          placeholder="Enter your name…"
          maxLength={20}
          className="
            w-full bg-white/6 border border-white/10
            focus:border-emerald-500/50 focus:bg-white/8
            rounded-xl text-white text-base px-4 py-3.5 outline-none
            placeholder:text-white/25 text-center tracking-wide
            transition-all duration-200
          "
        />

        <button
          onClick={handleSave}
          disabled={!name.trim() || saved}
          className="
            w-full py-3.5 rounded-xl font-bold text-sm text-white tracking-wide
            bg-emerald-600 hover:bg-emerald-500
            disabled:opacity-30 disabled:cursor-not-allowed
            transition-all duration-200
            shadow-[0_4px_20px_rgba(52,211,153,0.25)]
            flex items-center justify-center gap-2
          "
        >
          {saved ? (
            <>
              <Check className="w-4 h-4" strokeWidth={3} />
              Saved
            </>
          ) : (
            "Save to Leaderboard"
          )}
        </button>

        <button
          onClick={handleRestart}
          className="
            w-full py-3 rounded-xl text-sm font-medium tracking-wide
            border border-white/10 hover:border-white/20
            text-white/40 hover:text-white/70
            transition-all duration-200
          "
        >
          Play Again
        </button>
      </motion.div>
    </div>
  );
};

export default GameOverPage;
