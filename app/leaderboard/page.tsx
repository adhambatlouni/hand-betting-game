"use client";

import LeaderboardActions from "@/components/Leaderboard/LeaderboardActions";
import LeaderboardEntries from "@/components/Leaderboard/LeaderboardEntries";
import LeaderboardHeader from "@/components/Leaderboard/LeaderboardTopBar";

const LeaderboardPage = () => {
  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-emerald-900/20 blur-[90px] rounded-full" />
      </div>

      <LeaderboardHeader />
      <LeaderboardEntries />
      <LeaderboardActions />
    </div>
  );
};

export default LeaderboardPage;
