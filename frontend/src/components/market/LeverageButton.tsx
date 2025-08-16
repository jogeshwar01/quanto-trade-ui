function LeverageButton() {
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      aria-expanded="false"
      aria-controls="radix-:r9:"
      data-state="closed"
      disabled
      className="ml-auto flex text-lg h-full max-w-max items-center gap-4 border-l border-border px-8 text-primary transition-colors cursor-not-allowed"
    >
      <span className="inline-block text-vestgrey-100">Leverage:</span>
      <span className="font-mono tracking-widest">-</span>
    </button>
  );
}

export default LeverageButton;