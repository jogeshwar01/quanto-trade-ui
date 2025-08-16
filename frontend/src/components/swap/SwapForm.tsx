import "./swapStyles.css";
import PlaceOrderButton from "./PlaceOrderButton";
import { useContext } from "react";
import { TradesContext } from "../../state/TradesProvider";

const SwapForm = () => {
  const { ticker } = useContext(TradesContext);

  const infoSections = [
    { label: "Position", value: "0.00 SOL" },
    { label: "Available Margin", value: "$ -" },
  ];

  const accountHealthInfo = [
    { label: "Account Leverage", value: "-x" },
    { label: "Liquidation Risk", value: "0%" },
    { label: "Account Equity", value: "$ -" },
    { label: "Unrealized PnL", value: "+$0.00" },
  ];

  const checkboxes = ["Reduce Only", "TP/SL"];

  return (
    <form className="relative flex-1">
      <div className="h-full w-full">
        <div className="relative overflow-hidden h-full">
          <div className="h-full w-full overflow-y-auto">
            <div className="flex h-full flex-col">
              {/* Funds & Price */}

              <div className="flex flex-col px-2 py-1.5 mt-2">
                <div className="flex items-center gap-14 py-1.5 text-white h-9">
                  <div className="flex flex-col">
                    <p className="text-vestgrey-100 w-fit text-md border-b-2 border-dashed border-blue-900">
                      Order Type
                    </p>
                    <select
                      disabled
                      className="bg-transparent w-[120px] text-white outline-none text-lg mt-2 border border-border rounded-md px-1 pb-1 hover:border-primary"
                    >
                      <option value="market">Market</option>
                      <option value="limit">Limit</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-vestgrey-100 text-md border-b-2 border-dashed border-blue-900">
                      Market Price
                    </p>
                    <span className="text-white mt-2 text-lg">
                      $
                      {ticker?.markPrice
                        ? parseFloat(ticker.markPrice).toFixed(2)
                        : "-"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col px-2 py-1.5">
                {/* Size Input */}
                <div className="mt-1.5">
                  <div className="flex items-center justify-between py-1.5 text-white h-9">
                    <p className="text-vestgrey-100 text-md border-b-2 border-dashed border-blue-900">
                      Trade Value
                    </p>
                  </div>
                  <div className="flex items-center justify-between py-1.5 text-md text-vestgrey-100 h-9">
                    <div className="flex items-center w-full mr-2">
                      <input
                        disabled
                        className="h-9 w-full px-2.5 py-1.5 border-b border-border font-mono outline-none"
                        placeholder="0"
                      />
                      <span className="border-b border-border h-9 px-2 py-1.5 font-mono">
                        SOL
                      </span>
                    </div>
                    <div className="flex items-center w-full">
                      <input
                        disabled
                        className="h-9 w-full px-2.5 py-1.5 border-b border-border font-mono outline-none"
                        placeholder="0"
                      />
                      <span className="border-b border-border h-9 px-2 py-1.5 font-mono">
                        USD
                      </span>
                    </div>
                  </div>
                </div>

                {/* Leverage Slider */}
                <div className="flex flex-col py-1.5">
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      id="lever-input"
                      disabled
                      min="0"
                      max="100"
                      defaultValue="0"
                      className="w-full cursor-pointer"
                    />
                    <input
                      disabled
                      className="h-7 w-full px-2.5 border border-border rounded-lg text-white font-mono text-lg max-w-[50px] outline-none"
                      placeholder="0%"
                    />
                  </div>
                </div>

                {infoSections.map((item, index) => (
                  <div
                    key={index}
                    className="flex h-6 items-center justify-between text-vestgrey-100"
                  >
                    <p className="text-md">{item.label}</p>
                    <p className="font-mono text-md">{item.value}</p>
                  </div>
                ))}

                {/* Checkboxes */}
                <div className="flex flex-col gap-2 mt-3 font-semibold mb-4 py-4 border-y-2 border-border border-dotted">
                  <div className="text-white text-lg mb-2">Advanced</div>
                  {checkboxes.map((label, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between w-full"
                    >
                      <span className="text-vestgrey-100 text-md border-b-2 border-dashed border-blue-900">
                        {label}
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-8 h-4 bg-vestgrey-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-vestgrey-100 after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <PlaceOrderButton />

              {/* Account Health */}
              <div className="py-3 border-b border-border font-semibold">
                <div className="text-white text-lg ml-[8px] pb-2 border-b-2 border-dotted border-border">
                  Account Details
                </div>
                <div className="flex flex-col">
                  {accountHealthInfo.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between px-2.5 py-1.5 text-gray-400 text-md"
                    >
                      <p className="border-b-2 border-dashed border-blue-900">
                        {item.label}
                      </p>
                      <p className="font-mono text-white">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SwapForm;
