import { WEBSOCKET_SERVER_URL } from "./constants";
import { Ticker, Trade, KLine } from "./types";
import {
  BufferedMessage,
  CallbackMap,
  ChannelType,
  DepthData,
  WsKline,
  WsMessage,
} from "./ws_types";

export class WsManager {
  private ws: WebSocket;
  private static instance: WsManager;
  private bufferedMessages: BufferedMessage[] = [];
  private callbacks: CallbackMap = {
    depth: [],
    trades: [],
    tickers: [],
    kline: [],
  };
  private initialized: boolean = false;

  private constructor() {
    this.ws = new WebSocket(WEBSOCKET_SERVER_URL);
    this.bufferedMessages = [];
    this.init();
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new WsManager();
    }
    return this.instance;
  }

  async init() {
    this.ws.onopen = () => {
      this.initialized = true;
      this.bufferedMessages.forEach((message) => {
        this.ws.send(JSON.stringify(message));
      });
      this.bufferedMessages = [];
    };

    this.ws.onmessage = async (event) => {
      const messageData: Blob = event.data;
      const arrayBuffer = await messageData.arrayBuffer();
      const decoder = new TextDecoder("utf-8");
      const decodedStr = decoder.decode(new Uint8Array(arrayBuffer));

      try {
        const messageJson = JSON.parse(decodedStr);
        const channelType: ChannelType =
          messageJson?.channel?.split("@")?.[1] || messageJson.channel;

        if (this.callbacks[channelType]) {
          this.callbacks[channelType].forEach(
            ({ callback, channel }: { callback: any; channel: string }) => {
              if (channelType === "depth" && channel === messageJson.channel) {
                const updatedBids: DepthData["bids"] = messageJson.data.bids;
                const updatedAsks: DepthData["asks"] = messageJson.data.asks;
                callback({ bids: updatedBids, asks: updatedAsks });
              }

              if (channelType === "trades" && channel === messageJson.channel) {
                const trades: Trade = messageJson.data;
                callback(trades);
              }

              if (
                channelType === "tickers" &&
                channel === messageJson.channel
              ) {
                const tickers: Ticker = messageJson.data;
                callback(tickers);
              }

              if (
                channelType?.startsWith("kline") &&
                channel === messageJson.channel
              ) {
                const klineData: WsKline = messageJson.data;

                const kline: KLine = {
                  start: klineData[0],
                  open: klineData[1],
                  high: klineData[2],
                  low: klineData[3],
                  close: klineData[4],
                  volume: klineData[6],
                  end: klineData[5], // different index than that of api
                  quoteVolume: klineData[7],
                  trades: klineData[8],
                };
                callback(kline);
              }
            }
          );
        }
      } catch (error) {
        console.error("Error parsing message data:", error);
      }
    };
  }

  sendMessage(message: WsMessage) {
    const currentTimeStamp = new Date().getTime();
    const messageToSend = {
      ...message,
      id: currentTimeStamp,
    };
    if (!this.initialized) {
      this.bufferedMessages.push(messageToSend);
      return;
    }
    this.ws.send(JSON.stringify(messageToSend));
  }

  async registerCallback<T>(
    type: string,
    callback: (data: T) => void,
    channel: string
  ) {
    this.callbacks[type] = this.callbacks[type] || [];
    this.callbacks[type].push({ callback, channel });
  }

  async deRegisterCallback(type: string, channel: string) {
    if (this.callbacks[type]) {
      const index = this.callbacks[type].findIndex(
        (callback) => callback.channel === channel
      );
      if (index !== -1) {
        this.callbacks[type].splice(index, 1);
      }
    }
  }
}
