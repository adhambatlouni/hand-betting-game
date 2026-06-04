"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Tile from "@/components/Tile/Tile";
import { previewTiles, bgTiles } from "@/lib/config/landing.config";
import { ArrowRight } from "lucide-react";

const LandingPage = () => {
  const router = useRouter();

  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none select-none">
        {bgTiles.map((t, i) => (
          <motion.div
            key={i}
            className="absolute rounded-xl border border-white/[0.07] bg-white/2.5"
            style={{
              width: t.w,
              height: t.h,
              left: t.x,
              top: t.y,
              rotate: t.rot,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              y: [0, -18, 0],
              rotate: [t.rot, t.rot + 6, t.rot],
            }}
            transition={{
              opacity: { duration: 1.4, delay: t.delay },
              y: {
                duration: t.dur,
                repeat: Infinity,
                ease: "easeInOut",
                delay: t.delay,
              },
              rotate: {
                duration: t.dur * 1.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: t.delay + 0.3,
              },
            }}
          />
        ))}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg,  transparent, transparent 80px, rgba(52,211,153,0.5) 80px, rgba(52,211,153,0.5) 81px),
              repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(52,211,153,0.5) 60px, rgba(52,211,153,0.5) 61px)
            `,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_50%,rgba(52,211,153,0.10),transparent)]" />
        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-emerald-500/[0.07] blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-72 h-72 rounded-full bg-emerald-600/5 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center gap-6 px-6 w-full max-w-sm mx-auto">
        <motion.span
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-[10px] text-emerald-400/80 font-bold tracking-[0.35em] uppercase px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/8]"
        >
          Mahjong Hi-Lo
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="text-5xl font-bold text-white leading-tight tracking-tight"
        >
          Bet the{" "}
          <span className="text-emerald-400 italic font-extrabold">Hand</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-white/40 leading-relaxed max-w-60"
        >
          Read the tiles. Predict higher or lower. Survive the reshuffle.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-end gap-5 py-2"
        >
          {previewTiles.map((tile, index) => (
            <motion.div
              key={tile.id}
              initial={{ y: 24, opacity: 0 }}
              animate={{
                y: index === 1 ? [-12, -20, -12] : [0, -8, 0],
                opacity: 1,
              }}
              transition={{
                opacity: { duration: 0.4, delay: 0.42 + index * 0.1 },
                y: {
                  duration: 2.6 + index * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8 + index * 0.15,
                },
              }}
            >
              <Tile tile={tile} size="lg" animate={false} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48 }}
          className="flex flex-col items-center gap-3 w-full"
        >
          <motion.button
            onClick={() => router.push("/game")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="
              w-full py-4 rounded-2xl
              bg-emerald-600 hover:bg-emerald-500
              text-white font-bold text-base tracking-wide
              shadow-[0_6px_28px_rgba(52,211,153,0.28)]
              hover:shadow-[0_6px_36px_rgba(52,211,153,0.42)]
              transition-all duration-200
            "
          >
            Start Game
          </motion.button>

          <button
            onClick={() => router.push("/leaderboard")}
            className="flex items-center gap-1.5 text-sm text-white/30 hover:text-white/55 transition-colors duration-200 tracking-wide py-1"
          >
            View Leaderboard
            <ArrowRight size={14} />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
