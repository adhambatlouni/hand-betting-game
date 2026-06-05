"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Tile as TileType } from "@/lib/types/tile.types";
import {
  getTileImagePath,
  TILE_DISPLAY_NAMES,
} from "@/lib/constants/tile.constants";
import { TILE_SIZES, TILE_TYPES } from "@/lib/config/tile.config";

interface TileProps {
  tile: TileType;
  size?: "sm" | "md" | "lg";
  animate?: boolean;
  index?: number;
}

const Tile = ({ tile, size = "lg", animate = true, index = 0 }: TileProps) => {
  const s = TILE_SIZES[size];
  const t = TILE_TYPES[tile.type];

  const displayName = tile.variant
    ? TILE_DISPLAY_NAMES[tile.variant]
    : tile.suit
      ? TILE_DISPLAY_NAMES[tile.suit]
      : "";

  const card = (
    <div
      className="flex flex-col overflow-hidden shrink-0 select-none cursor-default shadow-[0_4px_16px_rgba(0,0,0,0.45)] bg-[#F8F6F0]"
      style={{
        width: s.w,
        minWidth: s.w,
        height: s.h,
        minHeight: s.h,
        borderRadius: s.r,
        border: `1.5px solid ${t.border}`,
      }}
    >
      <div
        className="flex items-center justify-center shrink-0"
        style={{
          height: s.strip,
          minHeight: s.strip,
          maxHeight: s.strip,
          backgroundColor: t.strip,
        }}
      >
        <span
          className="font-extrabold text-white/90 uppercase tracking-widest"
          style={{ fontSize: s.stripFs }}
        >
          {t.label}
        </span>
      </div>

      <div
        className="flex items-center justify-center shrink-0 bg-[#F8F6F0] relative"
        style={{ height: s.h - s.strip - s.bar }}
      >
        <div style={{ width: s.img, height: s.img, position: "relative" }}>
          <Image
            src={getTileImagePath(tile)}
            alt={displayName}
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      <div
        className="flex items-center justify-center shrink-0 font-bold font-mono tracking-widest"
        style={{
          height: s.bar,
          minHeight: s.bar,
          maxHeight: s.bar,
          backgroundColor: t.bar,
          fontSize: s.barFs,
          color: t.text,
        }}
      >
        {tile.currentValue}
      </div>
    </div>
  );

  if (!animate) return card;

  return (
    <motion.div
      className="shrink-0"
      initial={{ opacity: 0, y: 22, scale: 0.88 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.88 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 24,
        delay: index * 0.08,
      }}
      whileHover={size === "lg" ? { y: -8, scale: 1.05 } : {}}
      whileTap={size === "lg" ? { scale: 0.96 } : {}}
    >
      {card}
    </motion.div>
  );
};

export default Tile;
