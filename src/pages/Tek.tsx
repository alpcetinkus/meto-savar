import { useState, useEffect, useRef } from "react";

interface Props {
  onBack: () => void;
  players: string[];
  duration: number;
  dealerIndex: number;
}

export default function Tek({ onBack, players, duration, dealerIndex }: Props) {
  // Timer başlangıcı: dealer'dan bir sonraki kişi
  const firstPlayer = (dealerIndex + 1) % 4;
  const [currentDealer, setCurrentDealer] = useState(dealerIndex);
  const [currentPlayer, setCurrentPlayer] = useState(firstPlayer);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft]);

  const handlePass = () => {
    const next = (currentPlayer + 1) % 4;
    setCurrentPlayer(next);
    setTimeLeft(duration);
    setIsRunning(true);
  };

  const handleEndRound = () => {
    // El bitti: dealer bir sonraki kişi, timer ondan sonraki kişiden başlar
    const nextDealer = (currentDealer + 1) % 4;
    const nextFirst = (nextDealer + 1) % 4;
    setCurrentDealer(nextDealer);
    setCurrentPlayer(nextFirst);
    setTimeLeft(duration);
    setIsRunning(true);
  };

  const toggleTimer = () => {
    if (timeLeft === 0) return;
    setIsRunning((r) => !r);
  };

  const isFinished = timeLeft === 0;

  return (
    <div className="min-h-screen flex flex-col">
      {/* %30 - Üst: Timer */}
      <div
        onClick={toggleTimer}
        className={`flex-[3] flex flex-col cursor-pointer select-none transition-colors ${
          isFinished ? "bg-red-500" : isRunning ? "bg-black" : "bg-gray-300"
        }`}
      >
        {/* Üst bar */}
        <div className="flex items-center justify-between px-6 pt-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBack();
            }}
            className="text-white border border-white px-3 py-1 text-sm hover:bg-white hover:text-black transition-colors"
          >
            ← Menü
          </button>
          <div className="flex gap-3">
            {players.map((name, i) => (
              <div
                key={i}
                className={`flex flex-col items-center transition-all ${
                  i === currentPlayer ? "scale-125" : "opacity-40"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white ${
                    i === currentPlayer
                      ? "bg-white text-black"
                      : "bg-transparent text-white"
                  }`}
                >
                  {i === currentDealer ? "🀄" : i + 1}
                </div>
                <span className="text-white text-xs mt-1 max-w-12 truncate">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Timer veya Ceza */}
        <div className="flex-1 flex flex-col items-center justify-center gap-2">
          {isFinished ? (
            <p className="text-5xl font-black text-white text-center leading-tight">
              CEZA 101 !!!
            </p>
          ) : (
            <>
              <p className="text-8xl font-bold text-white">{timeLeft}</p>
              <p className="text-white text-sm opacity-60">
                {isRunning
                  ? "Duraklatmak için dokun"
                  : "Devam etmek için dokun"}
              </p>
            </>
          )}
        </div>

        {/* El Bitti butonu */}
        <div className="flex justify-center pb-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEndRound();
            }}
            className="text-sm font-bold border border-white text-white px-6 py-2 hover:bg-white hover:text-black transition-colors"
          >
            El Bitti 🀄
          </button>
        </div>
      </div>

      {/* %70 - Alt: Sırayı Geç */}
      <div
        onClick={handlePass}
        className="flex-[7] flex items-center justify-center bg-white hover:bg-black hover:text-white transition-colors cursor-pointer select-none border-2 border-black"
        style={{ margin: "5%" }}
      >
        <span className="text-3xl font-bold">
          {isFinished ? "Sırayı Geç → (Cezalı)" : "Sırayı Geç →"}
        </span>
      </div>
    </div>
  );
}
