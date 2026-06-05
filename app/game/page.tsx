"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/lib/store/gameStore";
import TopBar from "@/components/Game/GameTopBar";
import HandHistory from "@/components/Game/HandHistory";
import CurrentHand from "@/components/Game/CurrentHand";
import BetControls from "@/components/Game/BetControls";

const GamePage = () => {
  const router = useRouter();
  const { startGame, status } = useGameStore();

  useEffect(() => {
    startGame();
  }, []);
  useEffect(() => {
    if (status === "game-over") router.push("/game-over");
  }, [status]);

  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      <div className="shrink-0">
        <TopBar />
      </div>

      <div className="shrink-0">
        <HandHistory />
      </div>

      <div className="flex-1 min-h-0 overflow-hidden">
        <CurrentHand />
      </div>

      <div className="shrink-0">
        <BetControls />
      </div>
    </div>
  );
};

export default GamePage;
