import { LogoMark } from "./LogoMark";
import { ArrowRight } from "./Icons";

export function Nav() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <a href="#" className="logo" aria-label="SaySo home">
          <LogoMark />
          sayso
        </a>
        <nav className="nav-links">
          <a href="#store" className="hide-sm">See it live</a>
          <a href="#report" className="hide-sm">Sample report</a>
          <a href="#try" className="quiet hide-sm">Try the badge</a>
          <a href="#try" className="btn btn-primary btn-sm">
            Upload a sale <ArrowRight />
          </a>
        </nav>
      </div>
    </header>
  );
}
