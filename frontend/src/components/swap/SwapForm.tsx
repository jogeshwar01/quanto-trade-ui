import "./swapStyles.css";
import PlaceOrderButton from "./PlaceOrderButton";
import { useState } from "react";

const SwapForm = () => {
  const [positionType, setPositionType] = useState<"long" | "short">("long");
  const [orderType, setOrderType] = useState("limit");
  const [entryPrice, setEntryPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [positionValue, setPositionValue] = useState("");
  const [leverage, setLeverage] = useState(0);
  const [reduceOnly, setReduceOnly] = useState(false);
  const [tpSl, setTpSl] = useState(false);

  return (
    <form className="relative flex-1">
      <div className="h-full w-full">
        <div className="relative overflow-hidden h-full">
          <div className="h-full w-full overflow-y-auto text-xs">
            <div className="flex h-full flex-col">
              {/* Long/Short Tabs */}
              <div className="flex h-[28px] w-full justify-center text-muted-foreground">
                <button
                  type="button"
                  className={`inline-flex cursor-pointer flex-1 items-center justify-center whitespace-nowrap px-4 py-2 text-lg font-medium transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-t border-border ${
                    positionType === "long"
                      ? "border-teal-400 border-t-2 text-teal-400"
                      : "bg-input-background border border-l-0 text-gray-400"
                  }`}
                  onClick={() => setPositionType("long")}
                >
                  Long
                </button>
                <button
                  type="button"
                  className={`inline-flex flex-1 cursor-pointer items-center justify-center whitespace-nowrap px-4 py-2 text-lg font-medium transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-t border-border ${
                    positionType === "short"
                      ? "border-red-500 border-t-2 text-red-500"
                      : "bg-input-background border border-r-0 text-gray-400"
                  }`}
                  onClick={() => setPositionType("short")}
                >
                  Short
                </button>
              </div>

              {/* Order Type Dropdown */}
              <div className="px-4 py-3">
                <select
                  value={orderType}
                  onChange={(e) => setOrderType(e.target.value)}
                  className="w-[50%] text-center bg-input-background text-gray-400 rounded text-xs py-1 outline-none"
                >
                  <option value="limit">Limit Order</option>
                  <option value="market">Market Order</option>
                </select>
              </div>

              {/* Available Balance */}
              <div className="px-4 pb-3">
                <span className="text-gray-400 text-sm">
                  Available: 0.00 USD
                </span>
              </div>

              {/* Entry Price Input */}
              <div className="px-4 pb-3">
                <div className="relative">
                  <input
                    type="number"
                    value={entryPrice}
                    onChange={(e) => setEntryPrice(e.target.value)}
                    placeholder="Entry Price (USD)"
                    className="w-full bg-input-background text-gray-400 px-3 py-2 pr-12 rounded outline-none placeholder:text-gray-400"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                    USD
                  </span>
                </div>
              </div>

              <div className="px-4 pb-3">
                <span className="text-gray-400 text-sm">Quantity</span>
              </div>

              {/* Quantity Input */}
              <div className="px-4 pb-3">
                <div className="relative">
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Quantity"
                    className="w-full bg-input-background text-gray-400 px-3 py-2 pr-12 rounded outline-none placeholder:text-gray-400"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                    BTC
                  </span>
                </div>
              </div>

              {/* Position Value Input */}
              <div className="px-4 pb-3">
                <div className="relative">
                  <input
                    type="number"
                    value={positionValue}
                    onChange={(e) => setPositionValue(e.target.value)}
                    placeholder="Position Value"
                    className="w-full bg-input-background text-gray-400 px-3 py-2 pr-12 rounded outline-none placeholder:text-gray-400"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
                    <span className="text-gray-400 text-sm mr-1">USD</span>
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Leverage Slider */}
              <div className="px-4 pb-3">
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    id="lever-input"
                    min="0"
                    max="100"
                    value={leverage}
                    onChange={(e) => setLeverage(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-input-background rounded-lg appearance-none cursor-pointer slider"
                  />
                  <span className="text-gray-400 text-sm min-w-[20px] text-center bg-input-background rounded-md p-2">
                    {leverage}%
                  </span>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="px-4 pb-3 space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={reduceOnly}
                    onChange={(e) => setReduceOnly(e.target.checked)}
                    className=""
                  />
                  <label className="ml-2 text-gray-400 text-sm">
                    Reduce only
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={tpSl}
                    onChange={(e) => setTpSl(e.target.checked)}
                    className=""
                  />
                  <label className="ml-2 text-gray-400 text-sm">TP/SL</label>
                </div>
              </div>

              {/* Order Info */}
              <div className="px-4 pb-3 space-y-4 mt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-400 text-sm">
                      Liquidation Price
                    </span>
                  </div>
                  <span className="text-gray-400 text-sm">$0</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-400 text-sm">Order Value</span>
                  </div>
                  <span className="text-gray-400 text-sm">$-</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-400 text-sm">Slippage</span>
                  </div>
                  <span className="text-gray-400 text-sm">
                    Est. 0.5% / Max: -%
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="px-4 pb-4 mt-28">
                <PlaceOrderButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SwapForm;
