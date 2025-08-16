import axios from "axios";
import { KLine, Trade, Ticker } from "../utils/types";
import { PROXY_SERVER_URL } from "../utils/constants";

export async function getTickers(): Promise<Ticker[]> {
  const response = await axios.get(`${PROXY_SERVER_URL}/ticker/latest`);

  return response.data;
}

export async function getTrades(market: string): Promise<Trade[]> {
  const response = await axios.get(
    `${PROXY_SERVER_URL}/trades?symbol=${market}`
  );
  return response.data;
}

export async function getKlines(
  market: string,
  interval: string,
  startTime: number,
  endTime?: number,
  limit?: number
): Promise<KLine[]> {
  if (!endTime) {
    endTime = new Date().getTime();
  }

  if (!limit) {
    if (interval === "1d") limit = 50;
    else limit = 331;
  }

  // Fetching data from the server
  const response = await axios.get(
    `${PROXY_SERVER_URL}/candles?symbol=${market}&interval=${interval}&startTime=${startTime}&endTime=${endTime}&limit=${limit}`
  );

  // Converting the data to the correct KLine format
  const klines: KLine[] = response.data.map((item: Array<string | number>) => {
    // Calculate end time based on interval
    const startTime = Number(item[0]);
    let endTime: number;

    if (interval === "1m") {
      endTime = startTime + 60000; // 1 minute = 60 seconds = 60000 ms
    } else if (interval === "5m") {
      endTime = startTime + 300000; // 5 minutes = 300 seconds = 300000 ms
    } else if (interval === "15m") {
      endTime = startTime + 900000; // 15 minutes = 900 seconds = 900000 ms
    } else if (interval === "1h") {
      endTime = startTime + 3600000; // 1 hour = 3600 seconds = 3600000 ms
    } else if (interval === "4h") {
      endTime = startTime + 14400000; // 4 hours = 14400 seconds = 14400000 ms
    } else if (interval === "1d") {
      endTime = startTime + 86400000; // 1 day = 86400 seconds = 86400000 ms
    } else {
      // Default to 1 hour if interval is unknown
      endTime = startTime + 3600000;
    }

    const kline = {
      start: startTime, // Open time
      open: String(item[1]), // Open price
      high: String(item[2]), // High price
      low: String(item[3]), // Low price
      close: String(item[4]), // Close price
      volume: String(item[5]), // Volume
      end: endTime, // Calculated end time
    };

    return kline;
  });

  // Sorting the data by the end time (ascending order)
  const sortedData = klines.sort((x, y) => (x.end < y.end ? -1 : 1));

  return sortedData;
}
