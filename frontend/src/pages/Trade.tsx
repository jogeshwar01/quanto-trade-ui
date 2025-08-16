import { Navigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import SwapInterface from "../components/SwapInterface";
import TradeInterface from "../components/TradeInterface";
import { Helmet } from "react-helmet";
import { useContext, useMemo } from "react";
import { TradesContext } from "../state/TradesProvider";

export const Trade = () => {
  const { market } = useParams();
  const { ticker, tickers } = useContext(TradesContext);

  const isTickerValid = useMemo(() => {
    if (!tickers.length) return true;

    return tickers.some((t) => t.symbol === market);
  }, [market, tickers]);

  if (!isTickerValid) {
    return <Navigate to="/trade/SOL-PERP" />;
  }

  return (
    <div className="flex h-full flex-col mx-1">
      <Helmet>
        <title>{`${
          ticker?.symbol && ticker?.markPrice
            ? parseFloat(ticker?.markPrice).toFixed(2) +
              " | " +
              ticker?.symbol +
              " | "
            : ""
        } bullet X`}</title>
        <meta name="description" content="Markets Without Manipulation" />
        <link rel="icon" href="/icon.png" type="image/x-icon" />
      </Helmet>

      <div className="flex flex-col gap-8 lg:hidden uppercase h-[100vh] text-2xl font-mono w-full justify-center items-center">
        <div className="flex gap-2 items-center">
          <img src="/bullet-brandmark-logo.svg" alt="bullet" className="h-6" />
        </div>
        <div>Mobile Trading Coming soon</div>
      </div>

      <header className="hidden h-[48px] shrink-0 grid-cols-5 border-b border-border border-1 bg-background lg:flex">
        <NavBar />
      </header>

      <main className="h-full">
        <div className="hidden h-full lg:block">
          <div className="flex h-full flex-col">
            <div className="flex flex-1">
              <div className="flex flex-1 flex-col">
                <TradeInterface market={market as string} />
              </div>
              <div className="flex w-full max-w-sm flex-col border-l border-border bg-background lg:max-w-xs">
                <SwapInterface />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
