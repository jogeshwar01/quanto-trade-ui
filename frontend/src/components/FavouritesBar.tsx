import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import { useContext } from "react";
import { TradesContext } from "../state/TradesProvider";

export default function FavouritesBar() {
  const { tickers } = useContext(TradesContext);

  const favoritePairs = ["SOL-PERP", "BTC-PERP", "ETH-PERP"];

  return (
    <div className="flex items-center h-[38px] text-md font-semibold gap-4 pl-[12px] border-l border-b border-border">
      <StarOutlinedIcon className="text-primary mr-2 !text-[18px]" />
      {favoritePairs.map((pair) => {
        const ticker = tickers.find((t) => t.symbol === pair);
        return (
          <div key={pair} className="flex items-center gap-1">
            <span>
              <span className="text-vestgrey-50">{pair.split("-")[0]}</span>
              <span className="text-vestgrey-100">-PERP</span>
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
