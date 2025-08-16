import { Ticker, Trade, KLine } from "./types";

export type DepthData = {
  bids: [string, string][];
  asks: [string, string][];
};

export type MessageCallback<T> = {
  callback: (data: T) => void;
  channel: string;
};

// Old websocket message format (for backward compatibility)
export type WsKeys = "method" | "params";
export type WsMethods = "SUBSCRIBE" | "UNSUBSCRIBE" | string[];

export type WsMessage = {
  [key in WsKeys]: WsMethods;
};

// New websocket message format
export type NewWsMessage = {
  op: "subscribe" | "unsubscribe";
  args: string[];
  tag?: string;
};

// Union type for both old and new formats
export type WsMessageUnion = WsMessage | NewWsMessage;

export type BufferedMessage = WsMessageUnion;

export type CallbackMap = {
  depth: MessageCallback<DepthData>[];
  trades: MessageCallback<Trade>[];
  tickers: MessageCallback<Ticker>[];
  kline: MessageCallback<KLine>[];
  [key: string]: MessageCallback<any>[]; // For any other channel types
};

export type ChannelType = "depth" | "trades" | "tickers" | "kline";

export type WsKline = [
  number,
  string,
  string,
  string,
  string,
  number,
  string,
  string,
  number
];

// New channel mapping for the new format
export type NewChannelMapping = {
  "ticker:app": "tickers";
  "futures/depth:BTC-USD-SWAP-LIN": "depth";
  "trade:BTC-USD-SWAP-LIN": "trades";
  "candles3600s:BTC-USD-SWAP-LIN": "kline";
  "marketCap3600s:BTC-USD-SWAP-LIN": "tickers";
  [key: string]: string;
};
