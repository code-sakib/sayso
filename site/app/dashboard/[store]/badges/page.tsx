import { BRANCHES, branchById } from "@/components/store/branches";
import { profilesIn } from "@/components/store/staff";
import { AddedStore } from "@/components/dashboard/AddedStore";

export const generateStaticParams = () => BRANCHES.map((b) => ({ store: b.id }));

/** Below this battery level a badge is flagged for charging. */
const LOW_BATTERY = 50;

/** Every badge in the store: who wears it, battery, and whether it is recording. */
export default async function BadgesPage({ params }: { params: Promise<{ store: string }> }) {
  const { store } = await params;
  const branch = branchById(store);
  if (!branch) return <AddedStore id={store} what="badges" />;
  const team = profilesIn(store);
  const recording = team.filter((p) => p.badge.recording).length;
  return (
    <div className="dash-page">
      <header className="dash-page-head">
        <span className="eyebrow">{branch.street} · {branch.kind}</span>
        <h1>Badges</h1>
        <p className="muted">{recording} of {team.length} recording now. The light on each badge shows the same.</p>
      </header>
      <div className="badge-list">
        {team.map((p) => {
          const isLow = p.badge.battery < LOW_BATTERY;
          return (
            <article key={p.badge.id} className="badge-row">
              <span className="mono badge-row-id">{p.badge.id}</span>
              <span className="badge-row-who"><b>{p.name}</b><span className="muted">{p.section}</span></span>
              <span className={`badge-row-status${p.badge.recording ? " is-on" : ""}`}>
                <span className={`dot ${p.badge.recording ? "is-rec live" : "is-idle"}`} />
                {p.badge.recording ? "Recording" : "Stopped"}
              </span>
              <span className="badge-row-battery">
                <span className="badge-battery"><span style={{ width: `${p.badge.battery}%` }} className={isLow ? "is-low" : undefined} /></span>
                <span className={`mono${isLow ? " is-warn-text" : ""}`}>{p.badge.battery}%</span>
              </span>
              <span className="mono muted badge-row-time">{p.badge.talkTime} talk today</span>
            </article>
          );
        })}
      </div>
    </div>
  );
}
