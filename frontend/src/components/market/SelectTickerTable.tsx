import { useContext, useState } from "react";
import { TradesContext } from "../../state/TradesProvider";
import { Ticker } from "../../utils/types";
import { useNavigate } from "react-router-dom";

function SelectTickerTable({
  setIsSelectOpen,
}: {
  setIsSelectOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { tickers } = useContext(TradesContext);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value); // Update search query
  };

  const handleSelectTicker = (ticker: Ticker) => {
    setIsSelectOpen(false);
    navigate(`/trade/${ticker.symbol}`); // Navigate to the selected ticker's route
  };

  // Filter the tickers based on the search query
  const filteredTickers = tickers
    .filter((ticker) =>
      ticker.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.symbol.localeCompare(b.symbol));

  return (
    <div className="absolute left-0 mt-14 z-100 h-full max-h-[400px] w-[800px] overflow-hidden bg-vestgrey-900 border border-border text-xs">
      <div className="flex justify-center items-center gap-1 h-[50px]">
        <img src="/common/search.svg" alt="Vest" className="ml-4 h-3" />
        <input
          type="text"
          placeholder="SEARCH"
          className="w-full p-2 rounded z-200 focus:outline-none"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="overflow-y-auto max-h-[400px]">
        <table className="text-nowrap border-t border-border">
          <thead className="sticky -top-1 z-10 bg-vestgrey-800">
            <tr className="text-left text-mono text-sm uppercase">
              <th className="w-1/5 cursor-pointer border-b-2 border-border px-6 py-2">
                Symbol
              </th>
              <th className="w-1/5 cursor-pointer border-b-2 border-border px-6 py-2">
                Mark Price
              </th>
              <th className="w-1/5 cursor-pointer border-b-2 border-border px-6 py-2">
                24h Change
              </th>
              <th className="w-1/5 cursor-pointer border-b-2 border-border px-6 py-2">
                1h Funding
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTickers.length > 0 ? (
              filteredTickers.map((ticker) => (
                <tr
                  key={ticker.symbol}
                  className="group cursor-pointer"
                  onClick={() => handleSelectTicker(ticker)}
                >
                  <td className="px-6 py-1.5 font-mono text-vestgrey-50 group-hover:bg-primary/5">
                    <div className="flex items-center gap-3">
                      <img
                        src="/common/star.svg"
                        alt="symbol"
                        className="h-4 w-4"
                      />
                      <span className="font-sans">{ticker.symbol}</span>
                      <div className="rounded border border-border px-1">
                        <span className="font-mono text-primary">100x</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-1.5 font-mono text-vestgrey-50 group-hover:bg-primary/5">
                    <span className="text-green">{ticker.markPrice}</span>
                  </td>
                  <td className="px-6 py-1.5 font-mono text-vestgrey-50 group-hover:bg-primary/5">
                    <span
                      className={
                        parseFloat(ticker.priceChangePercent) < 0
                          ? "text-red"
                          : "text-green"
                      }
                    >
                      {ticker.priceChange} / {ticker.priceChangePercent}%
                    </span>
                  </td>
                  <td className="px-6 py-1.5 font-mono text-vestgrey-50 group-hover:bg-primary/5">
                    <span className="text-green">
                      {ticker.oneHrFundingRate}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-1.5 text-center text-gray-500"
                >
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SelectTickerTable;
