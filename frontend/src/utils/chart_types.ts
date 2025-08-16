export interface CandleData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface UpdatedPrice {
  timestamp: number;
  interval: number | undefined;
  open: number;
  high: number;
  low: number;
  close: number;
}
