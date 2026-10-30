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
            <span>Hear the sale.</span>
            <br />
            <span className="accent">See the walkout.</span>
          </h1>
          <p className="lead">One badge on your salesperson. AI on your store camera. A coaching note after every lost sale.</p>
          <div className="row cta">
            <a href="#report" className="btn btn-primary btn-lg">
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
          <p className="row hero-note"><LockIcon />Staff voices only. Customer voices are removed.</p>
        </div>

        <HeroDevice />
      </div>
    </section>
  );
}
