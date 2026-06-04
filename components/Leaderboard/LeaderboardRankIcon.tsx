import { Crown, Medal, Trophy } from "lucide-react";

const LeaderboardRankIcon = ({ index }: { index: number }) => {
  if (index === 0) return <Crown size={18} className="text-yellow-400" />;
  if (index === 1) return <Trophy size={17} className="text-slate-300" />;
  if (index === 2) return <Medal size={17} className="text-amber-500" />;
  return (
    <span className="text-xs font-bold text-white/25 w-4 text-center tabular-nums">
      {index + 1}
    </span>
  );
};

export default LeaderboardRankIcon;
