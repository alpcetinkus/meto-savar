import { useState } from "react";
import OturmaPlani from "./pages/OturmaPlan";
import Tek from "./pages/Tek";

type Page = "menu" | "game";

export default function App() {
  const [page, setPage] = useState<Page>("menu");
  const [players, setPlayers] = useState<string[]>([]);
  const [duration, setDuration] = useState(30);
  const [dealerIndex] = useState(0);

  const handleStartGame = (names: string[], dur: number) => {
    setPlayers(names);
    setDuration(dur);
    setPage("game");
  };

  if (page === "game") {
    return (
      <Tek
        onBack={() => setPage("menu")}
        players={players}
        duration={duration}
        dealerIndex={dealerIndex}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center gap-8">
      <OturmaPlani onStartGame={handleStartGame} />
      {/* Multiplayer butonu kaldırıldı */}
    </div>
  );
}
