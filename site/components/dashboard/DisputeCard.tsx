import { profileById } from "../store/staff";
import type { Dispute } from "./reports/types";
import { DISPUTE_KIND, VERDICT } from "./kinds";
import { Transcript } from "./Transcript";

/** A customer's complaint about a rep, next to what the badge actually recorded. */
export function DisputeCard({ dispute }: { dispute: Dispute }) {
  const rep = profileById(dispute.repId);
  const verdict = VERDICT[dispute.verdict];
  const firstName = rep?.name.split(" ")[0] ?? "Rep";
  return (
    <article className={`dispute-card is-${dispute.verdict}`}>
      <header className="moment-card-head">
        <span className="dispute-kind">{DISPUTE_KIND[dispute.kind]}</span>
        <span className="mono muted">{dispute.time}</span>
        <span className="moment-rep">{rep?.name ?? dispute.repId} · {rep?.section}</span>
      </header>
      <h3>{dispute.title}</h3>

      <div className="dispute-claim">
        <span className="dispute-label">The complaint</span>
        <p>{dispute.claim}</p>
      </div>

      <div className="dispute-evidence">
        <span className="dispute-label">What the badge recorded <span className="mono">{dispute.recording}</span></span>
        {dispute.transcript.length > 0
          ? <Transcript lines={dispute.transcript} repName={firstName} />
          : <p className="dispute-empty">No audio for this time.</p>}
      </div>

      <div className="dispute-verdict">
        <span className={`dispute-badge is-${dispute.verdict}`}><span className={`dot ${verdict.dot}`} />{verdict.label}</span>
        <p>{dispute.finding}</p>
      </div>
      <div className="try-instead"><b>What happened next:</b> {dispute.outcome}</div>
    </article>
  );
}
