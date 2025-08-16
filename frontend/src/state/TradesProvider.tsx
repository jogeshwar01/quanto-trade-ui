import {
  ReactNode,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import { Ticker, Trade } from "../utils/types";

interface TradesProviderProps {
  children: ReactNode;
}

interface TradesContextType {
  ticker: Ticker | undefined;
  setTicker: Dispatch<SetStateAction<Ticker | undefined>>;
  tickers: Ticker[];
  setTickers: Dispatch<SetStateAction<Ticker[]>>;
  trades: Trade[];
  setTrades: Dispatch<SetStateAction<Trade[]>>;
  bids: [string, string][];
  asks: [string, string][];
  setBids: Dispatch<SetStateAction<[string, string][]>>;
  setAsks: Dispatch<SetStateAction<[string, string][]>>;
  totalBidSize: number;
  setTotalBidSize: Dispatch<SetStateAction<number>>;
  totalAskSize: number;
  setTotalAskSize: Dispatch<SetStateAction<number>>;
}

const TradesContext = createContext<TradesContextType>({
  ticker: undefined,
  setTicker: () => {},
  tickers: [],
  setTickers: () => {},
  trades: [],
  setTrades: () => {},
  bids: [],
  setBids: () => {},
  asks: [],
  setAsks: () => {},
  totalBidSize: 0,
  setTotalBidSize: () => {},
  totalAskSize: 0,
  setTotalAskSize: () => {},
});

const TradesProvider = ({ children }: TradesProviderProps) => {
  const [ticker, setTicker] = useState<Ticker | undefined>(undefined);
  const [tickers, setTickers] = useState<Ticker[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);

  const [bids, setBids] = useState<[string, string][]>([]); // [price, quantity]
  const [asks, setAsks] = useState<[string, string][]>([]); // [price, quantity]
  const [totalBidSize, setTotalBidSize] = useState<number>(0);
  const [totalAskSize, setTotalAskSize] = useState<number>(0);

  return (
    <TradesContext.Provider
      value={{
        ticker,
        setTicker,
        tickers,
        setTickers,
        trades,
        setTrades,
        bids,
        setBids,
        asks,
        setAsks,
        totalBidSize,
        setTotalBidSize,
        totalAskSize,
        setTotalAskSize,
      }}
    >
      {children}
    </TradesContext.Provider>
  );
};

export { TradesContext, TradesProvider };
