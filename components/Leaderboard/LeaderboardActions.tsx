"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const LeaderboardActions = () => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="shrink-0 px-5 pb-7 pt-4 border-t border-white/5"
    >
      <div className="flex gap-3 max-w-sm mx-auto">
        <button
          onClick={() => router.push("/")}
          className="
            flex-1 py-3.5 rounded-xl
            border border-white/8 hover:border-white/15
            bg-transparent hover:bg-white/3
            text-white/35 hover:text-white/60
            text-sm font-medium tracking-wide
            transition-all duration-200
          "
        >
          Home
        </button>

        <motion.button
          onClick={() => router.push("/game")}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="
            flex-2 py-3.5 rounded-xl
            bg-emerald-600 hover:bg-emerald-500
            text-white font-bold text-sm tracking-wide
            shadow-[0_4px_20px_rgba(52,211,153,0.2)]
            hover:shadow-[0_4px_28px_rgba(52,211,153,0.35)]
            transition-all duration-200
          "
        >
          Play Again
        </motion.button>
      </div>
    </motion.div>
  );
};

export default LeaderboardActions;
