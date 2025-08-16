import { useContext, useEffect, useState } from "react";
import { OrderBook } from "./depth/Orderbook";
import { RecentTrades } from "./depth/RecentTrades";
import { TradesContext } from "../../state/TradesProvider";
import { getTrades } from "../../services/api";
import { WsManager } from "../../utils/ws_manager";
import { Trade } from "../../utils/types";
import { DepthData } from "../../utils/ws_types";

export const Depth = ({ market }: { market: string }) => {
  const [activeTab, setActiveTab] = useState("orderbook"); // 'orderbook' or 'recentTrades'
  const { setTrades, setAsks, setBids, setTotalAskSize, setTotalBidSize } =
    useContext(TradesContext);

  useEffect(() => {
    getTrades(market).then((trades) => {
      trades = trades.filter((trade) => parseFloat(trade.qty) !== 0);
      trades = trades.slice(0, 100);
      setTrades(trades);
    });

    WsManager.getInstance().registerCallback<DepthData>(
      "depth",
      (data: DepthData) => {
        setBids(data.bids);
        setAsks(data.asks);
        setTotalBidSize(
          data.bids.reduce(
            (acc: number, bid: [string, string]) => acc + parseFloat(bid[1]),
            0
          )
        );

        setTotalAskSize(
          data.asks.reduce(
            (acc: number, ask: [string, string]) => acc + parseFloat(ask[1]),
            0
          )
        );
      },
      `${market}@depth`
    );

    WsManager.getInstance().registerCallback<Trade>(
      "trades",
      (data: Trade) => {
        const newTrade: Trade = {
          id: data.id,
          price: data.price,
          qty: data.qty,
          quoteQty: data.quoteQty,
          time: data.time,
        };

        setTrades((oldTrades) => {
          const newTrades = [...oldTrades];
          newTrades.unshift(newTrade);
          newTrades.pop();
          return newTrades;
        });
      },
      `${market}@trades`
    );

    WsManager.getInstance().sendMessage({
      method: "SUBSCRIBE",
      params: [`${market}@depth`],
    });

    WsManager.getInstance().sendMessage({
      method: "SUBSCRIBE",
      params: [`${market}@trades`],
    });

    return () => {
      WsManager.getInstance().deRegisterCallback("depth", `${market}@depth`);
      WsManager.getInstance().sendMessage({
        method: "UNSUBSCRIBE",
        params: [`${market}@depth`],
      });

      WsManager.getInstance().deRegisterCallback("trades", `${market}@trades`);
      WsManager.getInstance().sendMessage({
        method: "UNSUBSCRIBE",
        params: [`${market}@trades`],
      });
    };
  }, [market, setAsks, setBids, setTotalAskSize, setTotalBidSize, setTrades]);

  return (
    <div className="flex w-full max-w-[300px] flex-col border-l border-border">
      <div className="flex flex-col">
        {/* Tabs Section */}
        <div className="relative">
          <div className="flex border-b border-border">
            <div
              onClick={() => setActiveTab("orderbook")}
              className={`py-1 px-1 flex items-center relative hover:cursor-pointer hover:bg-container-bg-hover justify-center leading-[16px] flex-1 ${
                activeTab === "orderbook"
                  ? "text-text-emphasis bg-container-bg-selected"
                  : "text-text-label"
              }`}
            >
              <span
                className={`flex items-center justify-center overflow-hidden text-vestgrey-100 whitespace-nowrap px-8 py-1 font-mono text-md font-semibold transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none" ${
                  activeTab === "orderbook" && "border-primary !text-white"
                }`}
              >
                Order Book
              </span>
              {activeTab === "orderbook" && (
                <div className="absolute left-0 bottom-0 w-full z-10 h-[2px] bg-primary"></div>
              )}
            </div>

            <div
              onClick={() => setActiveTab("recentTrades")}
              className={`py-1 px-1 flex items-center relative hover:cursor-pointer hover:bg-container-bg-hover justify-center leading-[16px] flex-1 ${
                activeTab === "recentTrades"
                  ? "text-text-emphasis bg-container-bg-selected"
                  : "text-text-label"
              }`}
            >
              <span
                className={`flex items-center justify-center overflow-hidden whitespace-nowrap text-vestgrey-100 px-8 py-1 font-mono text-md font-semibold transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none" ${
                  activeTab === "recentTrades" && "border-primary !text-white"
                }`}
              >
                Recent Trades
              </span>
              {activeTab === "recentTrades" && (
                <div className="absolute left-0 bottom-0 w-full z-10 h-[2px] bg-primary"></div>
              )}
            </div>
          </div>
        </div>

        {/* Custom style for WebKit-based browsers to hide scrollbar */}
        <style>{`
          div::-webkit-scrollbar {
            display: none; /* For Chrome, Safari, and Opera */
          }
        `}</style>

        {/* Tab Content */}
        {activeTab === "orderbook" ? <OrderBook /> : <RecentTrades />}
      </div>
    </div>
  );
};
