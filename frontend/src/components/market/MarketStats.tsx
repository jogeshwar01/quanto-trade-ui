import { useContext, useMemo } from "react";
import { TradesContext } from "../../state/TradesProvider";
import Setting from "../icons/Setting";

function MarketStats() {
  const { ticker } = useContext(TradesContext);

  const stats = useMemo(() => {
    if (!ticker) return [];

    return [
      {
        label: "Mark",
        value: `$${parseFloat(ticker.markPrice).toLocaleString()}`,
        className: "text-red-500",
      },
      {
        label: "Oracle",
        value: parseFloat(ticker.indexPrice).toLocaleString(),
        className: "text-white",
      },
      {
        label: "24h Change",
        value: `${
          parseFloat(ticker.priceChange) > 0
            ? "+" + parseFloat(ticker.priceChange).toLocaleString()
            : parseFloat(ticker.priceChange).toLocaleString()
        } ${parseFloat(ticker.priceChangePercent).toFixed(2)}%`,
        className:
          parseFloat(ticker.priceChangePercent) >= 0
            ? "text-green"
            : "text-red",
      },
      {
        label: "24h Volume (USD)",
        value: "$24,052,850.52", // This would come from actual volume data
        className: "text-white",
      },
      {
        label: "Open Interest (USD)",
        value: "$802,376.78", // This would come from actual open interest data
        className: "text-white",
      },
    ];
  }, [ticker]);

  return (
    <div className="flex items-center gap-4 pr-4 ml-2">
      <div className="h-8 border-l border-gray-700"></div>

      {stats.map((stat, index) => (
        <div
          key={index}
          className={`flex flex-col gap-1 ${
            index > 2 ? "w-28" : index > 1 ? "w-20" : "w-16"
          }`}
        >
          <div className="text-xs text-gray-400 font-normal">{stat.label}</div>
          <div
            className={`text-sm font-medium ${
              stat.className || "text-gray-400"
            }`}
          >
            {stat.value}
          </div>
        </div>
      ))}
      <div className="flex items-center text-gray-400">
        <Setting />
      </div>
    </div>
  );
}

export default MarketStats;
