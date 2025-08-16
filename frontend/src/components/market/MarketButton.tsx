import { useContext, useState } from "react";
import { TradesContext } from "../../state/TradesProvider";
import SelectTickerTable from "./SelectTickerTable";
import { marketsWithImages } from "../../utils/constants";

function MarketButton() {
  const { ticker } = useContext(TradesContext);
  const [isSelectOpen, setIsSelectOpen] = useState(false); // State for open/close select
  const [isRotated, setIsRotated] = useState(false); // State for SVG rotation

  const toggleSelect = () => {
    setIsSelectOpen(!isSelectOpen);
    setIsRotated(!isRotated); // Rotate the SVG
  };

  return (
    <div>
      <div className="flex h-full pl-[12px]">
        <div className="self-center">
          <div className="cursor-pointer"></div>
        </div>

        <div className="grid grow">
          <button
            className="flex items-center justify-between gap-3 pr-8 mr-2"
            onClick={toggleSelect}
          >
            <div className="flex items-center gap-3">
              {marketsWithImages.find((t) => t == ticker?.symbol) && (
                <img
                  src={`/tokens/${ticker?.symbol
                    ?.split("-")?.[0]
                    ?.toLowerCase()}.png`}
                  alt="token"
                  className="w-5 h-5"
                />
              )}
              <span className="text-font text-xl w-fit text-nowrap">
                <span className="text-vestgrey-50 font-semibold">
                  {ticker?.symbol?.split("-")?.[0]}
                </span>
                <span className="text-vestgrey-100">-PERP</span>
              </span>
              <div className="rounded border border-border px-1 py-0.5 mr-2">
                <div className="font-mono text-primary text-md align-middle">
                  100x
                </div>
              </div>
            </div>
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              strokeWidth="1.5"
              className={`text-vestgrey-100 transition-transform duration-300 mx-2 ${
                isRotated ? "rotate-180" : ""
              }`}
            >
              <path
                d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>

          {isSelectOpen && (
            <SelectTickerTable setIsSelectOpen={setIsSelectOpen} />
          )}
        </div>
      </div>
    </div>
  );
}

export default MarketButton;
