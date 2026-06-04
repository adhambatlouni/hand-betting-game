"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const LeaderboardHeader = () => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="shrink-0 flex items-center justify-between px-5 py-3 border-b border-white/6 bg-[#0E1E16]/95 backdrop-blur-md"
    >
      <button
        onClick={() => router.push("/")}
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
          className="text-white/30 group-hover:text-white/60 group-hover:-translate-x-0.5 transition-all duration-200"
        >
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        <span className="text-sm text-white/30 group-hover:text-white/60 transition-colors duration-200">
          Back
        </span>
      </button>

      <h1 className="text-lg font-semibold text-white/80 tracking-wide">
        Leaderboard
      </h1>

      <div className="w-12" />
    </motion.div>
  );
};

export default LeaderboardHeader;
