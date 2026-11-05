import { ArrowRight, LockIcon } from "./Icons";
import { HeroDevice } from "./hero/HeroDevice";
import { HeroBackdrop } from "./store/HeroBackdrop";

export function Hero() {
  return (
    <section className="hero">
      <HeroBackdrop />
      <div className="container hero-grid">
        <div>
          <span className="pill">
            <span className="dot is-rec live" />
            Built on Meta SAM + Muse <span className="tag">v0.1</span>
          </span>
          <h1 className="display">
            <span>Increase your sales</span>
            <br />
            <span className="accent">with one device.</span>
          </h1>
          <ul className="hero-features">
            <li><b>Coach every rep.</b> See how each salesperson really handles customers, and what lost the sale.</li>
            <li><b>Answer false complaints.</b> When a customer blames a rep, the recording shows what was said.</li>
            <li><b>Know your ideal customer.</b> Learn who buys, what they ask for, and how to serve them better.</li>
          </ul>
          <div className="row cta">
            <a href="/dashboard" className="btn btn-primary btn-lg">
              Try a sample report <ArrowRight />
            </a>
            <a href="#store" className="play-link">
              <span className="circle">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 4l14 8-14 8z" />
                </svg>
              </span>
              See it in a store
            </a>
          </div>
          <p className="row hero-note"><LockIcon />Customer voices are removed by default.</p>
        </div>

        <HeroDevice />
      </div>
    </section>
  );
}
