import { useContext } from "react";
import { TradesContext } from "../../../state/TradesProvider";

export const RecentTrades = () => {
  const { ticker, trades } = useContext(TradesContext);

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="h-full flex flex-col py-1 pl-2 pr-2 text-xs text-center recent-trades-header text-vestgrey-100 font-display bg-background">
      {/* Recent Trades Header */}
      <div className="flex justify-between mb-2">
        <span className="font-semibold text-[12px] text-left border-b-2 border-dashed border-blue-900 w-fit">
          Price
        </span>
        <span className="font-semibold text-[12px] pr-1 text-center border-b-2 border-dashed border-blue-900 w-fit">
          Size ({ticker?.symbol?.split("-")?.[0]})
        </span>
        <span className="font-semibold text-[12px] text-right border-b-2 border-dashed border-blue-900 w-fit">
          Time
        </span>
      </div>

      {/* Scrollable Trades Data */}
      <div
        className="flex-1 overflow-y-auto font-mono"
        style={{
          scrollbarWidth: "none" /* For Firefox */,
          msOverflowStyle: "none" /* For Internet Explorer and Edge */,
        }}
      >
        {trades.map((trade, index) => (
          <div
            key={index}
            className="grid grid-cols-3 py-0.5 text-vestgrey-100 hover:cursor-pointer hover:bg-vestgrey-800"
          >
            <span
              className={`font-[300] text-[13px] leading-[16px] text-left ${
                parseFloat(trade.qty) > 0 ? "text-green" : "text-red"
              }`}
            >
              {parseFloat(trade.price).toFixed(2)}
            </span>
            <span className="font-[300] text-[13px] leading-[16px] text-center">
              {parseFloat(trade.qty) > 0
                ? parseFloat(trade.qty).toFixed(2)
                : (parseFloat(trade.qty) * -1).toString()}
            </span>
            <span className="font-[300] text-[13px] leading-[16px] text-right text-nowrap">
              {formatTime(trade.time)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
