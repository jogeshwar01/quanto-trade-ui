import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

function ConnectWalletButton() {
  const { publicKey, disconnect } = useWallet();

  const handleClick = () => {
    // Trigger the WalletMultiButton click
    const walletButton = document.querySelector(
      ".wallet-adapter-button.wallet-adapter-button-trigger"
    );
    if (walletButton instanceof HTMLElement) walletButton.click();
  };

  const handleDisconnect = () => {
    disconnect();
  };

  return (
    <div className="relative flex justify-end font-semibold items-center font-mono mr-[12px] text-sm w-[80%] max-w-xs">
      {publicKey ? (
        <button
          onClick={handleDisconnect}
          className="px-[8px] py-[6px] cursor-pointer text-lg font-normal border border-border hover:border-primary w-fit inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-background text-vestgrey-100 shadow hover:bg-background/90 h-[32px] rounded-md font-mono tracking-wider"
        >
          <img src="/icon.png" alt="Wallet" className="w-4 h-4 mr-2" />
          {publicKey.toBase58().substring(0, 4) +
            "..." +
            publicKey.toBase58().substring(publicKey.toBase58().length - 4)}
        </button>
      ) : (
        <button
          onClick={handleClick}
          className="px-[8px] py-[6px] cursor-pointer text-lg inline-flex w-fit items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-background shadow hover:bg-primary/90 h-[32px] rounded-md font-mono tracking-wider"
        >
          Connect Wallet
        </button>
      )}
      <div className="hidden">
        <WalletMultiButton />
      </div>
    </div>
  );
}

export default ConnectWalletButton;
