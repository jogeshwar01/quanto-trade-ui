import Github from "./icons/Github";
import Twitter from "./icons/Twitter";

function PromoteBar() {
  return (
    <>
      <div className="text-lg tracking-wider">
        <strong className="mr-2 inline-block">
          🎉{" "}
          <a className="text-primary underline" href="/points">
            Points
          </a>{" "}
          are now live!
        </strong>{" "}
        <span>Trade to earn.</span>
      </div>

      <div className="flex gap-6">
        <a
          href="https://github.com/jogeshwar01/vest-exchange-ui"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center text-sm flex-1 h-full cursor-pointer"
        >
          <Github className="mr-2" />
          <span>Github</span>
        </a>

        <a
          href="https://x.com/jogeshwar01"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center text-sm flex-1 h-full cursor-pointer"
        >
          <Twitter className="mr-2" />
          <span>Twitter</span>
        </a>
      </div>
    </>
  );
}

export default PromoteBar;
