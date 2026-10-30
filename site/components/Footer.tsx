import { LogoMark } from "./LogoMark";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span className="row" style={{ gap: 12 }}>
          <span className="logo" style={{ fontSize: 15 }}><LogoMark size={16} />sayso</span>© 2026
        </span>
        <span className="mono" style={{ fontSize: 11 }}>Built for the Meta Global AI Developer Hackathon</span>
      </div>
    </footer>
  );
}
