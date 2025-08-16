import { useContext } from "react";
import { TradesContext } from "../../state/TradesProvider";
import { marketsWithImages } from "../../utils/constants";

const SwapMarket = () => {
  const { ticker } = useContext(TradesContext);

  return (
    <div className="flex justify-between items-center w-full h-[49px] border-b border-dotted border-border">
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
          <span className="text-vestgrey-100 font-semibold">
            {ticker?.symbol?.split("-")?.[0]}
          </span>
          <span className="text-vestgrey-100">-PERP</span>
        </span>
      </div>
      <div className="rounded border flex items-center gap-1 opacity-50 border-border mr-[6px] py-1 px-2">
        <div className="font-mono text-primary text-md align-middle">100x</div>
        <img
          src="/common/discover_tune.svg"
          alt="discover"
          className="w-4 h-4"
        />
      </div>
    </div>
  );
};

export default SwapMarket;
