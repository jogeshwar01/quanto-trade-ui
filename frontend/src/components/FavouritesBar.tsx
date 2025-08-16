import { useContext } from "react";
import { TradesContext } from "../state/TradesProvider";

export default function FavouritesBar() {
  const { tickers } = useContext(TradesContext);

  const favoritePairs = ["BTC", "ETH", "SOL"];

  return (
    <div className="flex items-center h-[32px] text-md pl-[14px] gap-4 border-b border-border">
      <div className="text-vestgrey-50">Favorites</div>
      {favoritePairs.map((pair) => {
        const ticker = tickers.find((t) => t.symbol === pair);
        return (
          <div key={pair} className="flex items-center gap-1 ml-4">
            <span>
              <span className="text-vestgrey-100">{pair.split("-")[0]}</span>
            </span>
            <span
              className={
                parseFloat(ticker?.priceChangePercent ?? "0") < 0
                  ? "text-red"
                  : "text-green"
              }
            >
              ${parseFloat(ticker?.markPrice ?? "0").toFixed(2)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
