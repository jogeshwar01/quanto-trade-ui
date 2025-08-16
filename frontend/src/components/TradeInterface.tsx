import { Depth } from "./trade/Depth";
import MarketBar from "../components/MarketBar";
import { OrdersMenu } from "./trade/OrdersMenu";
import { TradeView } from "./trade/TradeView";
import FavouritesBar from "./FavouritesBar";

function TradeInterface({ market }: { market: string }) {
  return (
    <div className="flex flex-col">
      <div className="flex">
        <div className="flex flex-col max-w-[950px]">
          <FavouritesBar />
          <div className="grid h-[50px] shrink-0 grid-cols-4 border-l border-border bg-background">
            <MarketBar market={market as string} />
          </div>
          <TradeView market={market as string} />
        </div>
        <Depth market={market as string} />
      </div>
      <OrdersMenu />
    </div>
  );
}

export default TradeInterface;
