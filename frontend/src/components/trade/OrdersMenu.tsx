import PlaceOrderButton from "../swap/PlaceOrderButton";

export const OrdersMenu = () => {
  return (
    <div className="bg-container-bg border-border border-t overflow-visible text-lg">
      <div
        className="relative flex flex-col h-full"
        id="tutorial_step_positions_table_highlight"
      >
        <div className="relative w-full">
          <div
            id="trade_page_table_tabs"
            className="relative flex items-center justify-between w-full overflow-auto thin-scroll"
          >
            <div className="flex border-b bg-container-bg border-border border-none whitespace-nowrap [&amp;>div]:py-2">
              <div className="py-1 px-1 my-1 mx-3 flex items-center relative hover:cursor-pointer hover:bg-container-bg-hover text-text-label leading-3 h-[34px]">
                <div className="flex items-center w-full">
                  <div className="flex items-center gap-1 mx-auto text-vestgrey-100">
                    <span className="font-normal">Balance</span>
                  </div>
                </div>
              </div>
              <div className="py-1 px-1 flex my-1 mx-3 items-center relative hover:cursor-pointer hover:bg-container-bg-hover text-text-label leading-3 h-[34px] bg-container-bg-hover">
                <div className="flex items-center w-full">
                  <div className="flex items-center gap-1 mx-auto">
                    <span className="font-normal text-primary">Positions</span>
                    <span className="flex items-center text-primary justify-center w-5 h-5 rounded-full">
                      (0)
                    </span>
                  </div>
                </div>
              </div>
              <div className="py-1 px-1 my-1 mx-3 flex items-center relative hover:cursor-pointer hover:bg-container-bg-hover text-text-label leading-3 h-[34px]">
                <div className="flex items-center w-full">
                  <div className="flex items-center gap-1 mx-auto text-vestgrey-100">
                    <span className="font-normal">Open Orders</span>
                    <span className="flex items-center justify-center w-5 h-5 rounded-full">
                      (0)
                    </span>
                  </div>
                </div>
              </div>
              <div className="py-1 px-1 my-1 mx-3 flex items-center relative hover:cursor-pointer hover:bg-container-bg-hover text-text-label leading-3 h-[34px]">
                <div className="flex items-center w-full">
                  <div className="flex items-center gap-1 mx-auto text-vestgrey-100">
                    <span className="font-normal">TWAP</span>
                  </div>
                </div>
              </div>
              <div className="py-1 px-1 my-1 mx-3 flex items-center relative hover:cursor-pointer hover:bg-container-bg-hover text-text-label leading-3 h-[34px]">
                <div className="flex items-center w-full">
                  <div className="flex items-center gap-1 mx-auto text-vestgrey-100">
                    <span className="font-normal">Trade History</span>
                  </div>
                </div>
              </div>
              <div className="py-1 px-1 my-1 mx-3 flex items-center relative hover:cursor-pointer hover:bg-container-bg-hover text-text-label leading-3 h-[34px]">
                <div className="flex items-center w-full">
                  <div className="flex items-center gap-1 mx-auto text-vestgrey-100">
                    <span className="font-normal">Funding Payments</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-hidden h-[250px]">
          <div
            id="user_balances_portfolio_table"
            className="flex flex-col flex-grow h-full overflow-x-auto thin-scroll"
          >
            <div className="h-full overflow-auto thin-scroll">
              <div className="align-middle inline-block min-w-full h-full">
                <div className="flex flex-col justify-center items-center h-full w-full text-center">
                  <div className="xs:py-8 sm:py-0">
                    <PlaceOrderButton />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
