import express from "express";
import cors from "cors";
import { QUANTO_PROD_API } from "./constants";
import axios from "axios";
import { quanto_headers } from "./headers";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/ticker/latest", async (req, res) => {
  try {
    const url = `${QUANTO_PROD_API}/v2/ticker`;
    const response = await axios.get(url, { headers: quanto_headers });

    // Transform the response to match the old expected format
    const transformedTickers = response.data.map((ticker: any) => ({
      symbol: ticker.marketCode.replace("USD-SWAP-LIN", "PERP"),
      markPrice: ticker.markPrice,
      indexPrice: ticker.indexPrice,
      imbalance: "0.0",
      oneHrFundingRate: "0.000000",
      cumFunding: "0.000000000000",
      status: "TRADING",
    }));

    res.json(transformedTickers);
  } catch (error) {
    console.error("Error fetching tickers:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch tickers from Quanto Trade API" });
  }
});

app.get("/trades", async (req, res) => {
  // last 1 day
  const after = new Date().getTime() - 24 * 60 * 60 * 1000;

  try {
    // Use Quanto Trade API for trades similar to candles
    const url = `${QUANTO_PROD_API}/v2/interohlc/public/BTC-USD-SWAP-LIN/exchange/trades?after=${after}&limit=50`;

    const response = await axios.get(url, {
      headers: quanto_headers,
    });

    // Transform the response to match the expected format
    if (response.data.success && response.data.data) {
      const transformedTrades = response.data.data.map((trade: any) => ({
        id: trade.matchId,
        price: trade.matchPrice,
        qty: trade.matchQuantity,
        quoteQty: (
          parseFloat(trade.matchPrice) * parseFloat(trade.matchQuantity)
        ).toFixed(12),
        time: trade.timestamp,
        side: trade.side,
        matchType: trade.matchType,
      }));
      res.json(transformedTrades);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.error("Error fetching trades:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch trades from Quanto Trade API" });
  }
});

app.get("/candles", async (req, res) => {
  const { symbol, interval, startTime, endTime, limit } = req.query;

  try {
    // Convert interval string to granularity in seconds
    let granularity: number;
    switch (interval) {
      case "1m":
        granularity = 60;
        break;
      case "5m":
        granularity = 300;
        break;
      case "15m":
        granularity = 900;
        break;
      case "1h":
        granularity = 3600;
        break;
      case "4h":
        granularity = 14400;
        break;
      case "1d":
        granularity = 86400;
        break;
      default:
        granularity = 3600; // Default to 1 hour
    }
    const url = `${QUANTO_PROD_API}/v2/dbworker/public/BTC-USD-SWAP-LIN/exchange/candles?granularity=${granularity}&start=${startTime}&end=${endTime}`;

    const response = await axios.get(url, {
      headers: quanto_headers,
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching candles:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch candles from Quanto Trade API" });
  }
});

app.listen(7000, () => {
  console.log("Server is running on port 7000");
});
