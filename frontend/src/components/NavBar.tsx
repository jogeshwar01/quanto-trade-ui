import ConnectWalletButton from "./navbar/ConnectWalletButton";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import SyncAltOutlinedIcon from "@mui/icons-material/SyncAltOutlined";

function NavBar() {
  return (
    <>
      <div className="relative col-span-4 grid flex-1 grid-cols-[1fr_max-content_max-content] font-mono">
        <div className="flex px-[12px]">
          <a
            href="https://app.bullet.xyz/"
            target="_blank"
            rel="noreferrer"
            className="mr-[16px] flex items-center gap-2"
          >
            <img src="/bullet-brandmark-logo.svg" alt="Vest" />
          </a>
          <a
            className="flex items-center gap-1 px-2 text-center text-md font-[600]"
            href="/trade/SOL-PERP"
          >
            <SyncAltOutlinedIcon fontSize="small" />
            <div>Trade</div>
          </a>
          <a
            className="flex items-center justify-center gap-1 px-2 text-center text-md font-[600] text-vestgrey-100"
            href="/borrow-lend"
          >
            <AccountBalanceWalletOutlinedIcon fontSize="small" />
            <div>Borrow/Lend</div>
          </a>
          <a
            className="flex items-center gap-1 px-2 text-center text-md font-[600] text-vestgrey-100"
            href="/competition"
          >
            <img src="/common/swords.svg" alt="" className="h-5 w-5" />
            <div>Competition</div>
          </a>
          <a
            className="flex items-center gap-1 px-2 text-center text-md font-[600] text-vestgrey-100"
            href="/referral"
          >
            <img src="/common/referral.svg" alt="" className="h-5 w-5" />
            <div>Referrals</div>
          </a>
        </div>
      </div>
      <ConnectWalletButton />
    </>
  );
}

export default NavBar;
