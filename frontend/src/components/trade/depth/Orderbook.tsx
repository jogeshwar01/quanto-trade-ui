import { useContext, useEffect, useRef, useState, useMemo } from "react";
import { TradesContext } from "../../../state/TradesProvider";
import {
  VerticalView,
  HorizontalView,
  GreenView,
  RedView,
} from "../../icons/ViewModes";

export const OrderBook = () => {
  const { ticker, bids, asks, totalBidSize, totalAskSize, trades } =
    useContext(TradesContext);

  const bidsRef = useRef<HTMLDivElement | null>(null);
  const asksRef = useRef<HTMLDivElement | null>(null);

  const [spread, setSpread] = useState<number>(0);
  const [spreadPercentage, setSpreadPercentage] = useState<number>(0);
  const [viewMode, setViewMode] = useState<number>(1); // 1: combined, 2: bids only, 3: asks only, 4: side by side

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

  const renderViewToggle = (
    mode: number,
    icon: React.ReactNode,
    title: string
  ) => (
    <div
      key={mode}
      onClick={() => setViewMode(mode)}
      className={`w-6 h-6 flex items-center justify-center cursor-pointer rounded ${
        viewMode === mode ? "" : "opacity-50"
      }`}
      title={title}
    >
      {icon}
    </div>
  );

  const renderCombinedView = () => (
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
              <div className="w-full h-5 flex items-center relative box-border text-xs leading-7 mt-1 justify-between font-display mr-0">
                <div className="flex flex-row mx-2 justify-between  w-full">
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
              <div className="w-full h-5 flex items-center relative box-border text-xs leading-7 mt-1 justify-between font-display ml-0">
                <div className="flex flex-row mx-2 justify-between  w-full">
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
  );

  const renderBidsOnlyView = () => (
    <div className="flex-1 overflow-y-auto flex flex-col">
      {bids?.slice(0, 26)?.map((order, index) => {
        const size = parseFloat(order[1]);
        cumulativeBidSize += size;
        const totalValue = cumulativeBidSize * parseFloat(order[0]);

        return (
          <div key={index} className="relative w-full">
            <div className="w-full h-5 flex items-center relative box-border text-xs leading-7 mt-1 justify-between font-display">
              <div className="flex flex-row mx-2 justify-between w-full">
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
  );

  const renderAsksOnlyView = () => (
    <div className="flex-1 overflow-y-auto flex flex-col-reverse">
      {asks?.slice(0, 26)?.map((order, index) => {
        const size = parseFloat(order[1]);
        cumulativeAskSize += size;
        const totalValue = cumulativeAskSize * parseFloat(order[0]);

        return (
          <div key={index} className="relative w-full">
            <div className="w-full h-5 flex items-center relative box-border text-xs leading-7 mt-1 justify-between font-display">
              <div className="flex flex-row mx-2 justify-between w-full">
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
  );

  const renderSideBySideView = () => (
    <div className="flex-1 flex relative overflow-hidden">
      {/* Bids (Left Side) */}
      <div className="flex-1 border-r border-border">
        <div className="text-center text-xs text-green py-1 border-b border-border">
          Bids
        </div>
        <div
          className="overflow-y-auto"
          style={{ height: "calc(100% - 24px)" }}
        >
          {bids?.slice(0, 20)?.map((order, index) => (
            <div
              key={index}
              className="flex justify-between px-2 py-1 text-xs hover:bg-container-bg-hover"
            >
              <span className="text-green">
                {parseFloat(order[0]).toFixed(2)}
              </span>
              <span className="text-white">
                {parseFloat(order[1]).toFixed(4)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Asks (Right Side) */}
      <div className="flex-1">
        <div className="text-center text-xs text-red py-1 border-b border-border">
          Asks
        </div>
        <div
          className="overflow-y-auto"
          style={{ height: "calc(100% - 24px)" }}
        >
          {asks?.slice(0, 20)?.map((order, index) => (
            <div
              key={index}
              className="flex justify-between px-2 py-1 text-xs hover:bg-container-bg-hover"
            >
              <span className="text-red">
                {parseFloat(order[0]).toFixed(2)}
              </span>
              <span className="text-white">
                {parseFloat(order[1]).toFixed(4)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderHeaders = () => {
    if (viewMode === 4) {
      // Side by side view has its own headers
      return null;
    }

    return (
      <div className="flex justify-between text-sm px-2 py-1 mb-1 text-vestgrey-100">
        <div className=" text-[12px] text-center  w-fit">Price</div>
        <div className=" text-[12px]  w-fit">
          Amount {ticker?.symbol?.split("-")?.[0]}
        </div>
        <div className=" text-[12px] text-left  w-fit">
          Sum {ticker?.symbol?.split("-")?.[0]}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (viewMode) {
      case 1:
        return renderCombinedView();
      case 2:
        return renderBidsOnlyView();
      case 3:
        return renderAsksOnlyView();
      case 4:
        return renderSideBySideView();
      default:
        return renderCombinedView();
    }
  };

  return (
    <div className="h-full">
      {/* Order Book */}
      <div className="relative h-full bg-background text-vestgrey-100">
        <div className="flex flex-col h-full fadein-floating-element bg-background xs:min-h-[25vh] md:min-h-0">
          {/* View Mode Toggles */}
          <div className="flex items-center gap-2 px-2 py-1">
            {renderViewToggle(4, <VerticalView />, "Combined View")}
            {renderViewToggle(1, <HorizontalView />, "Side by Side")}
            {renderViewToggle(2, <GreenView />, "Bids Only")}
            {renderViewToggle(3, <RedView />, "Asks Only")}
          </div>

          {/* Headers */}
          {renderHeaders()}

          {/* Content */}
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
