import { Ticker, Trade, KLine } from "./types";

export type DepthData = {
  bids: [string, string][];
  asks: [string, string][];
};

export type MessageCallback<T> = {
  callback: (data: T) => void;
  channel: string;
};

export type WsKeys = "method" | "params";
export type WsMethods = "SUBSCRIBE" | "UNSUBSCRIBE" | string[];

export type WsMessage = {
  [key in WsKeys]: WsMethods;
};

export type BufferedMessage = WsMessage & { id: number };

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
