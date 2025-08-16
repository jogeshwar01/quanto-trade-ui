import { WEBSOCKET_SERVER_URL } from "./constants";
import { Ticker, Trade, KLine } from "./types";
import {
  BufferedMessage,
  CallbackMap,
  ChannelType,
  DepthData,
  WsKline,
  WsMessageUnion,
  NewWsMessage,
  NewChannelMapping,
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

  // Channel mapping for new format
  private channelMapping: NewChannelMapping = {
    "ticker:app": "tickers",
    "futures/depth:BTC-USD-SWAP-LIN": "depth",
    "trade:BTC-USD-SWAP-LIN": "trades",
    "candles3600s:BTC-USD-SWAP-LIN": "kline",
    "marketCap3600s:BTC-USD-SWAP-LIN": "tickers",
  };

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
      try {
        let messageJson;

        // Handle both text and binary message formats
        if (typeof event.data === "string") {
          // Plain text message (new Quanto format)
          messageJson = JSON.parse(event.data);
        } else {
          // Binary message (old format - for backward compatibility)
          const messageData: Blob = event.data;
          const arrayBuffer = await messageData.arrayBuffer();
          const decoder = new TextDecoder("utf-8");
          const decodedStr = decoder.decode(new Uint8Array(arrayBuffer));
          messageJson = JSON.parse(decodedStr);
        }

        // Handle new websocket response format
        if (messageJson.table) {
          this.handleNewFormatMessage(messageJson);
          return;
        }

        // Handle old websocket response format
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

  private handleNewFormatMessage(messageJson: {
    table: string;
    data: any;
    action?: string;
  }) {
    const { table, data } = messageJson;

    if (table === "ticker") {
      this.handleTickerMessage(data);
    } else if (table === "futures/depth") {
      this.handleDepthMessage(data);
    } else if (table === "trades") {
      this.handleTradesMessage(data);
    } else if (table === "kline" || table === "klines") {
      this.handleKlineMessage(data);
    } else {
      console.log(`Unknown table type: ${table}`);
    }
  }

  private handleTickerMessage(data: any) {
    if (data && data.data && Array.isArray(data.data)) {
      data.data.forEach(
        (tickerItem: {
          mc?: string;
          symbol?: string;
          mp?: string;
          markPrice?: string;
          ip?: string;
          indexPrice?: string;
          lq?: string;
          imbalance?: string;
          cv?: string;
          cumFunding?: string;
          lt: string;
          o: string;
        }) => {
          // Transform to match old Ticker interface
          const transformedTicker: Ticker = {
            symbol: tickerItem.mc || tickerItem.symbol || "",
            markPrice: tickerItem.mp || tickerItem.markPrice || "0",
            indexPrice: tickerItem.ip || tickerItem.indexPrice || "0",
            imbalance: tickerItem.lq || tickerItem.imbalance || "0",
            oneHrFundingRate: "0", // Not available in new format
            cumFunding: tickerItem.cv || tickerItem.cumFunding || "0",
            priceChange: this.calculatePriceChange(tickerItem.lt, tickerItem.o),
            priceChangePercent: this.calculatePriceChangePercent(
              tickerItem.lt,
              tickerItem.o
            ),
            status: "TRADING", // Default status
          };

          // Call all ticker callbacks
          this.callbacks.tickers.forEach(({ callback }) => {
            callback(transformedTicker);
          });
        }
      );
    }
  }

  private handleDepthMessage(data: any) {
    if (Array.isArray(data)) {
      data.forEach(
        (depthItem: {
          asks?: [number, number][];
          bids?: [number, number][];
        }) => {
          if (depthItem.asks && depthItem.bids) {
            // Transform depth data format
            const transformedDepth: DepthData = {
              bids: depthItem.bids.map((bid: [number, number]) => [
                bid[0].toString(),
                bid[1].toString(),
              ]),
              asks: depthItem.asks.map((ask: [number, number]) => [
                ask[0].toString(),
                ask[1].toString(),
              ]),
            };

            // Call all depth callbacks
            this.callbacks.depth.forEach(({ callback }) => {
              callback(transformedDepth);
            });
          }
        }
      );
    }
  }

  private handleTradesMessage(data: any) {
    if (Array.isArray(data)) {
      data.forEach(
        (tradeItem: {
          id?: number;
          price?: string;
          p?: string;
          qty?: string;
          q?: string;
          quoteQty?: string;
          time?: number;
          t?: number;
          side?: string;
          s?: string;
        }) => {
          // Transform to match old Trade interface if needed
          const transformedTrade: Trade = {
            id: tradeItem.id || Date.now(),
            price: tradeItem.price || tradeItem.p || "0",
            qty: tradeItem.qty || tradeItem.q || "0",
            quoteQty: tradeItem.quoteQty || "0",
            time: tradeItem.time || tradeItem.t || Date.now(),
            side: tradeItem.side || tradeItem.s || "BUY",
          };

          // Call all trade callbacks
          this.callbacks.trades.forEach(({ callback }) => {
            callback(transformedTrade);
          });
        }
      );
    }
  }

  private handleKlineMessage(data: any) {
    if (Array.isArray(data)) {
      data.forEach(
        (klineItem: {
          start?: number;
          t?: number;
          open?: string;
          o?: string;
          high?: string;
          h?: string;
          low?: string;
          l?: string;
          close?: string;
          c?: string;
          volume?: string;
          v?: string;
          end?: number;
          quoteVolume?: string;
          trades?: number;
        }) => {
          // Transform to match old KLine interface if needed
          const transformedKline: KLine = {
            start: klineItem.start || klineItem.t || Date.now(),
            open: klineItem.open || klineItem.o || "0",
            high: klineItem.high || klineItem.h || "0",
            low: klineItem.low || klineItem.l || "0",
            close: klineItem.close || klineItem.c || "0",
            volume: klineItem.volume || klineItem.v || "0",
            end: klineItem.end || klineItem.t || Date.now(),
            quoteVolume: klineItem.quoteVolume || "0",
            trades: klineItem.trades || 0,
          };

          // Call all kline callbacks
          this.callbacks.kline.forEach(({ callback }) => {
            callback(transformedKline);
          });
        }
      );
    }
  }

  private calculatePriceChange(lastPrice: string, openPrice: string): string {
    const last = parseFloat(lastPrice);
    const open = parseFloat(openPrice);
    if (isNaN(last) || isNaN(open)) return "0";
    return (last - open).toFixed(8);
  }

  private calculatePriceChangePercent(
    lastPrice: string,
    openPrice: string
  ): string {
    const last = parseFloat(lastPrice);
    const open = parseFloat(openPrice);
    if (isNaN(last) || isNaN(open) || open === 0) return "0";
    return (((last - open) / open) * 100).toFixed(2);
  }

  sendMessage(message: WsMessageUnion) {
    if (!this.initialized) {
      this.bufferedMessages.push(message);
      return;
    }
    this.ws.send(JSON.stringify(message));
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

  // Method to create new format subscription messages
  createNewFormatSubscription(channels: string[]): NewWsMessage {
    return {
      op: "subscribe",
      args: channels,
      tag: Date.now().toString(),
    };
  }

  // Method to create new format unsubscription messages
  createNewFormatUnsubscription(channels: string[]): NewWsMessage {
    return {
      op: "unsubscribe",
      args: channels,
      tag: Date.now().toString(),
    };
  }

  // Method to subscribe using new format
  subscribeToChannels(channels: string[]) {
    const message = this.createNewFormatSubscription(channels);
    this.sendMessage(message);
  }

  // Method to unsubscribe using new format
  unsubscribeFromChannels(channels: string[]) {
    const message = this.createNewFormatUnsubscription(channels);
    this.sendMessage(message);
  }

  // Helper method to get channel type from new format channel string
  private getChannelTypeFromNewFormat(channel: string): ChannelType | null {
    return (this.channelMapping[channel] as ChannelType) || null;
  }

  // Helper method to convert market symbols from -PERP to -USD-SWAP-LIN format
  public convertMarketSymbol(market: string): string {
    // Convert BTC-PERP to BTC-USD-SWAP-LIN
    if (market.endsWith("-PERP")) {
      return market.replace("-PERP", "-USD-SWAP-LIN");
    }
    // Convert ETH-PERP to ETH-USD-SWAP-LIN
    if (market.endsWith("-PERP")) {
      return market.replace("-PERP", "-USD-SWAP-LIN");
    }
    // If it's already in the correct format, return as is
    if (market.includes("-USD-SWAP-LIN")) {
      return market;
    }
    // For any other format, assume it needs conversion
    return market.replace("-PERP", "-USD-SWAP-LIN");
  }

  // Method to subscribe using new format with automatic channel mapping
  subscribeWithNewFormat(channels: string[]) {
    const newChannels = channels.map(
      (channel) => this.mapOldChannelToNew(channel) || channel
    );
    console.log(`Subscribing to channels: ${newChannels.join(", ")}`);
    this.subscribeToChannels(newChannels);
  }

  // Method to subscribe using new format with automatic market symbol conversion
  subscribeToChannelsWithMarketConversion(channels: string[]) {
    const convertedChannels = channels.map((channel) => {
      // Handle different channel types
      if (channel.startsWith("futures/depth:")) {
        const market = channel.replace("futures/depth:", "");
        return `futures/depth:${this.convertMarketSymbol(market)}`;
      }
      if (channel.startsWith("trade:")) {
        const market = channel.replace("trade:", "");
        return `trade:${this.convertMarketSymbol(market)}`;
      }
      if (channel.startsWith("candles3600s:")) {
        const market = channel.replace("candles3600s:", "");
        return `candles3600s:${this.convertMarketSymbol(market)}`;
      }
      if (channel.startsWith("marketCap3600s:")) {
        const market = channel.replace("marketCap3600s:", "");
        return `marketCap3600s:${this.convertMarketSymbol(market)}`;
      }
      // For other channels like ticker:app, return as is
      return channel;
    });

    console.log(
      `Subscribing to converted channels: ${convertedChannels.join(", ")}`
    );
    this.subscribeToChannels(convertedChannels);
  }

  // Method to unsubscribe using new format with automatic market symbol conversion
  unsubscribeFromChannelsWithMarketConversion(channels: string[]) {
    const convertedChannels = channels.map((channel) => {
      // Handle different channel types
      if (channel.startsWith("futures/depth:")) {
        const market = channel.replace("futures/depth:", "");
        return `futures/depth:${this.convertMarketSymbol(market)}`;
      }
      if (channel.startsWith("trade:")) {
        const market = channel.replace("trade:", "");
        return `trade:${this.convertMarketSymbol(market)}`;
      }
      if (channel.startsWith("candles3600s:")) {
        const market = channel.replace("candles3600s:", "");
        return `candles3600s:${this.convertMarketSymbol(market)}`;
      }
      if (channel.startsWith("marketCap3600s:")) {
        const market = channel.replace("marketCap3600s:", "");
        return `marketCap3600s:${this.convertMarketSymbol(market)}`;
      }
      // For other channels like ticker:app, return as is
      return channel;
    });

    console.log(
      `Unsubscribing from converted channels: ${convertedChannels.join(", ")}`
    );
    this.unsubscribeFromChannels(convertedChannels);
  }

  // Method to register callback for new format channels
  async registerCallbackForNewFormat<T>(
    channels: string[],
    callback: (data: T) => void
  ) {
    channels.forEach((channel) => {
      const channelType = this.getChannelTypeFromNewFormat(channel);
      if (channelType) {
        this.registerCallback(channelType, callback, channel);
      } else {
        console.warn(`Unknown channel type for channel: ${channel}`);
      }
    });
  }

  // Helper method to migrate from old format to new format
  // This method helps convert old channel formats to new ones
  private mapOldChannelToNew(oldChannel: string): string | null {
    // Map old format channels to new format
    const channelMappings: { [key: string]: string } = {
      // Old format: "BTC-USD-SWAP-LIN@depth" -> New format: "futures/depth:BTC-USD-SWAP-LIN"
      [`${oldChannel.split("@")[0]}@depth`]: `futures/depth:${
        oldChannel.split("@")[0]
      }`,
      // Old format: "BTC-USD-SWAP-LIN@trades" -> New format: "trade:BTC-USD-SWAP-LIN"
      [`${oldChannel.split("@")[0]}@trades`]: `trade:${
        oldChannel.split("@")[0]
      }`,
      // Old format: "BTC-USD-SWAP-LIN@kline_1m" -> New format: "candles3600s:BTC-USD-SWAP-LIN"
      [`${oldChannel.split("@")[0]}@kline_1m`]: `candles3600s:${
        oldChannel.split("@")[0]
      }`,
      // Old format: "tickers" -> New format: "ticker:app"
      tickers: "ticker:app",
    };

    return channelMappings[oldChannel] || null;
  }
}
