// PlaceOrderButton.tsx
import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";

const PlaceOrderButton = () => {
  const { publicKey, disconnect } = useWallet();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const walletButton = document.querySelector(
      ".wallet-adapter-button.wallet-adapter-button-trigger"
    );
    if (walletButton instanceof HTMLElement) walletButton.click();
  };

  const handleDisconnect = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    disconnect();
  };

  return (
    <div className="w-[95%] mx-auto border-b border-border pb-4">
      {publicKey ? (
        <button
          onClick={handleDisconnect}
          className="w-full h-10 border border-border hover:border-primary inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-background text-vestgrey-100 shadow hover:bg-background/90 rounded-sm font-semibold tracking-wider"
        >
          <img src="/icon.png" alt="Wallet" className="w-4 h-4 mr-2" />
          {publicKey.toBase58().substring(0, 4) +
            "..." +
            publicKey.toBase58().substring(publicKey.toBase58().length - 4)}
        </button>
      ) : (
        <button
          onClick={handleClick}
          className="w-full h-10 cursor-pointer inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-background shadow hover:bg-primary/90 rounded-sm font-semibold tracking-wider"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default PlaceOrderButton;
