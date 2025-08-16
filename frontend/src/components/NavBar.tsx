import ConnectWalletButton from "./navbar/ConnectWalletButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Phone from "./icons/Phone";
import Globe from "./icons/Globe";

function NavBar() {
  return (
    <>
      <div className="relative col-span-4 grid flex-1 text-md grid-cols-[1fr_max-content_max-content] ">
        <div className="flex items-center">
          <a
            href="https://quanto.trade/"
            target="_blank"
            rel="noreferrer"
            className="mr-[16px] flex items-center gap-2 ml-[44px]"
          >
            <img src="/quanto-logo.png" alt="Quanto" />
          </a>

          {/* Navigation Options */}
          <div className="flex items-center space-x-6 ml-10">
            <a
              className="text-white hover:text-gray-300 transition-colors duration-200 cursor-pointer"
              href="#"
            >
              Quanto Trade
            </a>
            <a
              className="text-white hover:text-gray-300 transition-colors duration-200 cursor-pointer"
              href="#"
            >
              USDC-Perps
            </a>
            <a
              className="text-gray-500 hover:text-gray-400 transition-colors duration-200 cursor-pointer"
              href="#"
            >
              Spot
            </a>
            <a
              className="text-white hover:text-gray-300 transition-colors duration-200 cursor-pointer"
              href="#"
            >
              Portfolio
            </a>
            <a
              className="text-white hover:text-gray-300 transition-colors duration-200 cursor-pointer"
              href="#"
            >
              Rewards
            </a>
            <a
              className="text-white hover:text-gray-300 transition-colors duration-200 cursor-pointer"
              href="#"
            >
              QLP
            </a>
            <div className="flex items-center text-white hover:text-gray-300 transition-colors duration-200 cursor-pointer">
              <span>More</span>
              <KeyboardArrowDownIcon className="ml-1 h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <ConnectWalletButton />
        <div className="h-4 border-l border-gray-700"></div>
        <div className="flex items-center text-gray-400 gap-2 mr-4 hover:text-gray-300 transition-colors duration-200 cursor-pointer">
          <Phone />
          <Globe />
        </div>
      </div>
    </>
  );
}

export default NavBar;
