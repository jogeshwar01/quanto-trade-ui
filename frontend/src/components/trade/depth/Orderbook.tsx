import { useContext, useEffect, useRef, useState, useMemo } from "react";
import { TradesContext } from "../../../state/TradesProvider";

export const OrderBook = () => {
  const { ticker, bids, asks, totalBidSize, totalAskSize, trades } =
    useContext(TradesContext);

  const bidsRef = useRef<HTMLDivElement | null>(null);
  const asksRef = useRef<HTMLDivElement | null>(null);

  const [spread, setSpread] = useState<number>(0);
  const [spreadPercentage, setSpreadPercentage] = useState<number>(0);

  const calculateCumulativeWidth = (
    cumulativeSize: number,
    totalSize: number
  ): string => {
    return totalSize ? `${(cumulativeSize * 100) / totalSize}%` : "0%";
  };

  // Calculate the highest bid and lowest ask, and then calculate the spread
  const { highestBid, lowestAsk } = useMemo(() => {
    const highestBid = bids && bids[0] ? parseFloat(bids[0][0]) : 0;
    const lowestAsk = asks && asks[0] ? parseFloat(asks[0][0]) : 0;
    return { highestBid, lowestAsk };
  }, [bids, asks]);

  // Update spread whenever highestBid or lowestAsk changes
  useEffect(() => {
    if (highestBid && lowestAsk) {
      const newSpread = lowestAsk - highestBid;
      setSpread(newSpread);
      setSpreadPercentage(
        newSpread && highestBid ? (newSpread / highestBid) * 100 : 0
      );
    } else {
      setSpread(0);
      setSpreadPercentage(0);
    }
  }, [highestBid, lowestAsk]);

  // Cumulative calculation for bids and asks
  let cumulativeBidSize = 0;
  let cumulativeAskSize = 0;

  return (
    <div className="h-full">
      {/* Order Book */}
      <div className="relative h-full bg-background text-vestgrey-100">
        <div className="flex flex-col h-full  fadein-floating-element bg-background xs:min-h-[25vh] md:min-h-0">
          <div className="flex justify-between text-sm px-2 py-1 mb-1 text-vestgrey-100">
            <div className="font-semibold text-[12px] text-center border-b-2 border-dashed border-blue-900 w-fit">
              Price
            </div>
            <div className="font-semibold text-[12px] border-b-2 border-dashed border-blue-900 w-fit">
              Total ({ticker?.symbol?.split("-")?.[0]})
            </div>
            <div className="font-semibold text-[12px] text-left border-b-2 border-dashed border-blue-900 w-fit">
              Total ($)
            </div>
          </div>

          <div className="flex-1 flex flex-col relative overflow-hidden">
            {/* Asks Scrollable Area (now at top and red) */}
            <div
              ref={asksRef}
              className="flex-1 overflow-y-auto flex flex-col-reverse"
              style={{
                scrollBehavior: "smooth",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {asks?.slice(0, 13)?.map((order, index) => {
                const size = parseFloat(order[1]);
                cumulativeAskSize += size; // Keep track of cumulative size
                const totalValue = cumulativeAskSize * parseFloat(order[0]);

                return (
                  <div key={index} className="relative w-full">
                    <div className="w-full h-5 flex items-center relative box-border text-xs leading-7 justify-between font-display mr-0">
                      <div className="flex flex-row mx-2 justify-between font-mono w-full">
                        <div className="z-10 text-xs leading-6 text-red min-w-[80px]">
                          {parseFloat(order[0]).toFixed(2)}
                        </div>
                        <div className="z-10 text-xs leading-6 min-w-[80px] text-center">
                          {cumulativeAskSize.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </div>
                        <div className="z-10 text-xs leading-6 min-w-[80px] text-right">
                          {totalValue.toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                          })}
                        </div>
                      </div>
                      {/* Cumulative background */}
                      <div className="absolute opacity-10 w-full h-full flex justify-start">
                        <div
                          className="h-full brightness-80 bg-red"
                          style={{
                            width: calculateCumulativeWidth(
                              cumulativeAskSize,
                              totalAskSize
                            ),
                            transition: "width 0.3s ease-in-out",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Orderbook Spread */}
            <div className="relative w-full px-2 inline-flex font-mono justify-between gap-4 items-center py-1 min-h-[26px] border-y border-border  z-20">
              <div
                className={`text-xs flex items-center gap-1 ${
                  trades?.[1] &&
                  trades?.[0] &&
                  parseFloat(trades[0].price) > parseFloat(trades[1].price)
                    ? "text-green"
                    : "text-red"
                }`}
              >
                {parseFloat(trades?.[0]?.price || "0").toFixed(4)}
                {trades?.[1] &&
                  trades?.[0] &&
                  (parseFloat(trades[0].price) > parseFloat(trades[1].price) ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-3 h-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-3 h-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                      />
                    </svg>
                  ))}
              </div>
              <div className="font-[300] text-[13px] leading-[16px] ">
                {spread > 0 && `${spreadPercentage.toFixed(4)}%`} Spread
              </div>
            </div>

            {/* Bids Scrollable Area (now at bottom and green) */}
            <div
              ref={bidsRef}
              className="flex-1 overflow-y-auto flex flex-col"
              style={{
                scrollBehavior: "smooth",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {bids?.slice(0, 13)?.map((order, index) => {
                const size = parseFloat(order[1]);
                cumulativeBidSize += size; // Keep track of cumulative size
                const totalValue = cumulativeBidSize * parseFloat(order[0]);

                return (
                  <div key={index} className="relative w-full">
                    <div className="w-full h-5 flex items-center relative box-border text-xs leading-7 justify-between font-display ml-0">
                      <div className="flex flex-row mx-2 justify-between font-mono w-full">
                        <div className="z-10 text-xs leading-6 text-green min-w-[80px]">
                          {parseFloat(order[0]).toFixed(2)}
                        </div>
                        <div className="z-10 text-xs leading-6 min-w-[80px] text-center">
                          {cumulativeBidSize.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </div>
                        <div className="z-10 text-xs leading-6 min-w-[80px] text-right">
                          {totalValue.toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                          })}
                        </div>
                      </div>
                      {/* Cumulative background */}
                      <div className="absolute opacity-10 w-full h-full flex justify-start">
                        <div
                          className="h-full brightness-80 bg-green"
                          style={{
                            width: calculateCumulativeWidth(
                              cumulativeBidSize,
                              totalBidSize
                            ),
                            transition: "width 0.3s ease-in-out",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
