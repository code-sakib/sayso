import { profileById } from "../store/staff";
import type { Moment } from "./reports/types";
import { KIND } from "./kinds";
import { Transcript } from "./Transcript";

/** One conversation from the day: who walked in, what was said, what to say next time. */
export function MomentCard({ moment }: { moment: Moment }) {
  const rep = profileById(moment.repId);
  const kind = KIND[moment.kind];
  const firstName = rep?.name.split(" ")[0] ?? "Rep";
  return (
    <article className="moment-card">
      <header className="moment-card-head">
        <span className={`moment-kind is-${moment.kind}`}>
          <span className={`dot ${kind.dot}`} />
          {kind.label}
        </span>
        <span className="mono muted">{moment.time}</span>
        <span className="moment-rep">{rep?.name ?? moment.repId} · {rep?.section}</span>
      </header>
      <h3>{moment.title}</h3>
      <p className="moment-customer">{moment.customer}</p>
      <details className="moment-talk">
        <summary>
          <span className="moment-quote"><span className="who">{firstName} said</span>“{moment.quote}”</span>
          <span className="moment-talk-toggle">
            <span className="when-closed">Read the conversation ↓</span>
            <span className="when-open">Hide the conversation ↑</span>
          </span>
        </summary>
        <Transcript lines={moment.transcript} repName={firstName} />
      </details>
      <p>{moment.happened}</p>
      <div className="try-instead">
        <b>{moment.kind === "save" ? "Keep doing:" : "Try instead:"}</b> {moment.tryInstead}
      </div>
    </article>
  );
}
