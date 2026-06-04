export const rankConfig: Record<
  number,
  { border: string; bg: string; scoreColor: string }
> = {
  0: {
    border: "border-yellow-400/20",
    bg: "bg-yellow-400/[0.04]",
    scoreColor: "text-yellow-400",
  },
  1: {
    border: "border-slate-400/15",
    bg: "bg-slate-400/[0.03]",
    scoreColor: "text-slate-300",
  },
  2: {
    border: "border-amber-500/15",
    bg: "bg-amber-500/[0.03]",
    scoreColor: "text-amber-500",
  },
};

export const defaultRank = {
  border: "border-white/[0.06]",
  bg: "bg-white/[0.02]",
  scoreColor: "text-white/40",
};
