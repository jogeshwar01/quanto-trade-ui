import {
  ColorType,
  createChart as createLightWeightChart,
  CrosshairMode,
  ISeriesApi,
  LineStyle,
  UTCTimestamp,
  IChartApi,
} from "lightweight-charts";
import { CandleData, UpdatedPrice } from "./chart_types";

export class ChartManager {
  private candleSeries: ISeriesApi<"Candlestick">;
  private chartCreatedTime: number = 0;
  private lastUpdateTime: number = 0;
  private chart: IChartApi;

  constructor(
    ref: HTMLElement | string,
    initialData: CandleData[],
    layout: { background: string; color: string }
  ) {
    const chart = createLightWeightChart(ref, {
      autoSize: true,
      overlayPriceScales: {
        ticksVisible: true,
        borderVisible: true,
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          color: "#707070",
          width: 1,
          style: LineStyle.LargeDashed,
        },
        horzLine: {
          color: "#707070",
          width: 1,
          style: LineStyle.LargeDashed,
        },
      },
      rightPriceScale: {
        visible: true,
        ticksVisible: true,
        entireTextOnly: true,
        borderVisible: true,
        borderColor: "#555",
        textColor: "#fff",
      },
      grid: {
        horzLines: {
          visible: true,
          color: "rgb(41, 41, 41)",
        },
        vertLines: {
          visible: true,
          color: "rgb(41, 41, 41)",
        },
      },
      layout: {
        background: {
          type: ColorType.Solid,
          color: layout.background,
        },
        textColor: "white", // White text for better readability
      },
      timeScale: {
        borderColor: "#555",
      },
    });

    // Create the Candlestick Series with custom colors
    const candleSeries = chart.addCandlestickSeries({
      upColor: "#42C78D", // Green color for bullish candles
      downColor: "#FF1658", // Red color for bearish candles
      borderVisible: false,
      wickUpColor: "#5dd5a0",
      wickDownColor: "#ff887f",
    });

    this.chart = chart;
    this.candleSeries = candleSeries;

    this.candleSeries.setData(
      initialData.map((data) => ({
        ...data,
        time: (data.timestamp / 1000) as UTCTimestamp,
      }))
    );

    this.chartCreatedTime = initialData[initialData.length - 1].timestamp;
  }

  public update(updatedPrice: UpdatedPrice) {
    if (!this.lastUpdateTime) {
      if (updatedPrice.timestamp) {
        this.lastUpdateTime = updatedPrice.timestamp;
      } else {
        this.lastUpdateTime = new Date().getTime();
      }
    }

    if (
      updatedPrice.interval &&
      updatedPrice.timestamp - this.chartCreatedTime >= updatedPrice.interval
    ) {
      this.lastUpdateTime = updatedPrice.timestamp;
      this.chartCreatedTime = updatedPrice.timestamp;
    } else if (updatedPrice.timestamp < this.chartCreatedTime) {
      return;
    }

    this.candleSeries.update({
      time: (this.lastUpdateTime / 1000) as UTCTimestamp,
      close: updatedPrice.close,
      low: updatedPrice.low,
      high: updatedPrice.high,
      open: updatedPrice.open,
    });
  }

  public destroy() {
    this.chart.remove();
  }
}
