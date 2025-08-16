export const OrdersMenu = () => {
  return (
    <div className="bg-container-bg border-border border-t overflow-visible">
      <div
        className="relative flex flex-col h-full"
        id="tutorial_step_positions_table_highlight"
      >
        <div className="relative w-full">
          <div
            id="trade_page_table_tabs"
            className="relative flex items-center justify-between w-full overflow-auto border-b border-border thin-scroll"
          >
            <div className="flex border-b bg-container-bg border-border border-none whitespace-nowrap [&amp;>div]:py-2">
              <div className="py-1 px-4 border-b-2 border-primary sm:px-3 flex my-1  mx-3 items-center relative hover:cursor-pointer hover:bg-container-bg-hover text-text-label leading-3 h-[34px] bg-container-bg-hover">
                <div className="flex items-center w-full ">
                  <div className="flex items-center gap-1 mx-auto ">
                    <span className="font-normal text-sm ">Positions </span>
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-vestgrey-800 text-sm">
                      0
                    </span>
                  </div>
                </div>
              </div>
              <div className="py-1 px-4 sm:px-3 my-1 mx-3 flex items-center relative hover:cursor-pointer hover:bg-container-bg-hover text-text-label leading-3 h-[34px]">
                <div className="flex items-center w-full">
                  <div className="flex items-center gap-1 mx-auto text-vestgrey-100">
                    <span className="font-normal text-sm">Limit Orders</span>
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-vestgrey-800 text-sm">
                      0
                    </span>
                  </div>
                </div>
              </div>
              <div className="py-1 px-4 sm:px-3 my-1 mx-3 flex items-center relative hover:cursor-pointer hover:bg-container-bg-hover text-text-label leading-3 h-[34px]">
                <div className="flex items-center w-full">
                  <div className="flex items-center gap-1 mx-auto text-vestgrey-100">
                    <span className="font-normal text-sm">Trigger Orders</span>
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-vestgrey-800 text-sm">
                      0
                    </span>
                  </div>
                </div>
              </div>
              <div className="py-1 px-4 sm:px-3 my-1 mx-3 flex items-center relative hover:cursor-pointer hover:bg-container-bg-hover text-text-label leading-3 h-[34px]">
                <div className="flex items-center w-full">
                  <div className="flex items-center gap-1 mx-auto text-vestgrey-100">
                    <span className="font-normal text-sm">Balances</span>
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-vestgrey-800 text-sm">
                      0
                    </span>
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
                    <button className="disabled:cursor-not-allowed bg-transparent hover:bg-button-secondary-bg-hover disabled:text-text-disabled font-display text-text-default h-[32px] text-sm py-[8px] px-[12px] flex items-center justify-center">
                      <a className="flex items-center">
                        <span className="text-xs text-text-default">
                          Coming soon...
                        </span>
                      </a>
                    </button>
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
