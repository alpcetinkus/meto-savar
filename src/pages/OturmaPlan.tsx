import { useState } from "react";

interface Props {
  onBack: () => void;
  onStartGame: (names: string[], duration: number) => void;
}

export default function OturmaPlan({ onBack, onStartGame }: Props) {
  const [names, setNames] = useState(["", "", "", ""]);
  const [shuffled, setShuffled] = useState<string[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [duration, setDuration] = useState(30);

  const allFilled = names.every((n) => n.trim() !== "");
  const isReady = allFilled && shuffled.length === 4;

  const handleShuffle = () => {
    if (!allFilled) return;
    setIsShuffling(true);
    setShuffled([]);

    let count = 0;
    const interval = setInterval(() => {
      const arr = [...names].sort(() => Math.random() - 0.5);
      setShuffled(arr);
      count++;
      if (count >= 10) {
        clearInterval(interval);
        setIsShuffling(false);
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-8 p-8">
      {/* <button
        onClick={onBack}
        className="absolute top-8 left-8 text-lg border-2 border-black px-4 py-2 hover:bg-black hover:text-white transition-colors"
      >
        ← Geri
      </button> */}

      <h1 className="text-4xl font-bold">Oturma Planı</h1>

      {/* İsim inputları */}
      <div className="flex flex-col gap-4 w-full max-w-sm">
        {names.map((name, i) => (
          <input
            key={i}
            value={name}
            onChange={(e) => {
              const updated = [...names];
              updated[i] = e.target.value;
              setNames(updated);
              setShuffled([]);
            }}
            placeholder={`${i + 1}. Kişi`}
            className="border-2 border-black px-4 py-3 text-xl focus:outline-none focus:bg-gray-50"
          />
        ))}
      </div>

      {/* Karıştır butonu */}
      <button
        onClick={handleShuffle}
        disabled={!allFilled || isShuffling}
        className="text-xl font-bold border-2 border-black px-8 py-4 hover:bg-black hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        {isShuffling ? "Karıştırılıyor..." : "Karıştır 🔀"}
      </button>

      {/* Sıralama sonucu */}
      {shuffled.length > 0 && (
        <div className="flex flex-col gap-3 w-full max-w-sm">
          {shuffled.map((name, i) => (
            <div
              key={i}
              className="flex items-center gap-4 border-2 border-black px-6 py-4 bg-gray-50"
            >
              <span className="w-8 h-8 flex items-center justify-center font-bold text-lg">
                {i === 0 ? "🀄" : `${i + 1}.`}
              </span>
              <span className="text-xl font-semibold">{name}</span>
              {i === 0 && (
                <span className="ml-auto text-sm text-gray-500 font-medium">
                  taş dağıtır
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Süre slider */}
      {shuffled.length > 0 && (
        <div className="flex flex-col items-center gap-4 w-full max-w-sm">
          <p className="text-xl font-semibold">
            Süre: <span className="font-bold">{duration}s</span>
          </p>
          <input
            type="range"
            min={5}
            max={120}
            step={5}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full h-2 accent-black cursor-pointer"
          />
          <div className="flex justify-between w-full text-sm text-gray-500">
            <span>5s</span>
            <span>120s</span>
          </div>
        </div>
      )}

      {/* Meto Savar butonu */}
      <button
        onClick={() => onStartGame(shuffled, duration)}
        disabled={!isReady}
        className="text-2xl font-bold border-2 border-black px-12 py-5 hover:bg-black hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Meto Savar 🎮
      </button>
    </div>
  );
}
