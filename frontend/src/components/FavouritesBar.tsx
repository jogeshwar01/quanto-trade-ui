import { useMemo } from "react";

export default function FavouritesBar() {
  const favoritePairs = ["BTC", "ETH", "SOL"];

  // Calculate a random value between -2 and +2 for each favorite pair, only once on mount (just for testing)
  const randomDeltas = useMemo(() => {
    const deltas: Record<string, number> = {};
    favoritePairs.forEach((pair) => {
      deltas[pair] = Math.random() * 4 - 2; // -2 to +2
    });
    return deltas;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  return (
    <div className="flex items-center h-[32px] text-md pl-[14px] gap-4 border-b border-border">
      <div className="text-vestgrey-50">Favorites</div>
      {favoritePairs.map((pair) => {
        return (
          <div key={pair} className="flex items-center gap-1 ml-4">
            <span>
              <span className="text-vestgrey-100">{pair.split("-")[0]}</span>
            </span>
            <span
              className={randomDeltas[pair] < 0 ? "text-red" : "text-green"}
            >
              {randomDeltas[pair] > 0 ? "+" : ""}
              {randomDeltas[pair].toFixed(2)}%
            </span>
          </div>
        );
      })}
    </div>
  );
}
