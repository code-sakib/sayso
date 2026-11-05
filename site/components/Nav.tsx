import { ArrowRight } from "./Icons";

export function Nav() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <a href="#" className="logo" aria-label="SaySo home">
          sayso
        </a>
        <nav className="nav-links">
          <a href="#store" className="hide-sm">See it live</a>
          <a href="#flow" className="hide-sm">Sample report</a>
          <a href="#badge" className="quiet hide-sm">Try the badge</a>
          <a href="/dashboard" className="btn btn-primary btn-sm">
            Open the dashboard <ArrowRight />
          </a>
        </nav>
      </div>
    </header>
  );
}
