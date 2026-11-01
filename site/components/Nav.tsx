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
          <a href="#try" className="quiet hide-sm is-hidden-for-now" aria-hidden="true" tabIndex={-1}>Try the badge</a>
          <a href="/dashboard" className="btn btn-primary btn-sm">
            Open the dashboard <ArrowRight />
          </a>
        </nav>
      </div>
    </header>
  );
}
