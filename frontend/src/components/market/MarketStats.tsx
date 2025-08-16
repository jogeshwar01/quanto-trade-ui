import { useContext, useMemo } from "react";
import { TradesContext } from "../../state/TradesProvider";

function MarketStats() {
  const { ticker } = useContext(TradesContext);

  const stats = useMemo(() => {
    if (!ticker) return [];

    return [
      { label: "Mark Price", value: parseFloat(ticker.markPrice).toFixed(2) },
      {
        label: "24h Change",
        value:
          ticker?.priceChange && ticker?.priceChangePercent
            ? `${
                parseFloat(ticker?.priceChange) > 0
                  ? "+" + parseFloat(ticker.priceChange).toFixed(2)
                  : parseFloat(ticker.priceChange).toFixed(2)
              } (${parseFloat(ticker?.priceChangePercent).toFixed(2)}%)`
            : "-",
        className:
          parseFloat(ticker.priceChangePercent) >= 0
            ? "text-green"
            : "text-red",
      },
      { label: "24h Volume", value: "$3,157,834.47" }, // Assuming volume is static
      { label: "Open Interest", value: "$137,625.79" }, // Assuming open interest is static
      {
        label: "1h Funding/Countdown",
        value: `${ticker?.oneHrFundingRate}%`, // Add the percentage sign here
        className:
          parseFloat(ticker?.oneHrFundingRate) >= 0
            ? "text-primary"
            : "text-red",
      },
    ];
  }, [ticker]);

  return (
    <div className="flex items-center gap-4 px-8 ml-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`flex flex-col gap-0.5 min-w-16 text-nowrap ${
            stat.className || ""
          }`}
        >
          <div
            className={`flex flex-1 items-center justify-start text-md font-semibold ${
              stat.className || "text-vestgrey-50"
            }`}
          >
            {stat.value}

            {stat.label == "1h Funding/Countdown" && (
              <div className="text-white ml-1">
                / 00:00:00
              </div>
            )}
          </div>
          <div className="flex flex-1 w-fit items-center justify-start font-mono text-md capitalize text-vestgrey-100 border-b-2 border-dashed border-blue-900">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MarketStats;
