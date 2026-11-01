import { BRANCHES, branchById } from "@/components/store/branches";
import { profilesIn } from "@/components/store/staff";
import { AddedStore } from "@/components/dashboard/AddedStore";
import { initials } from "@/components/dashboard/kinds";

export const generateStaticParams = () => BRANCHES.map((b) => ({ store: b.id }));

/** The store's sales team, with today's numbers and the coaching note each one got. */
export default async function TeamPage({ params }: { params: Promise<{ store: string }> }) {
  const { store } = await params;
  const branch = branchById(store);
  if (!branch) return <AddedStore id={store} what="team" />;
  const team = profilesIn(store);
  return (
    <div className="dash-page">
      <header className="dash-page-head">
        <span className="eyebrow">{branch.street} · {branch.kind}</span>
        <h1>Team</h1>
        <p className="muted">{team.length} people on the floor today.</p>
      </header>
      <div className="team-grid">
        {team.map((p) => (
          <article key={p.id} className="team-card">
            <header>
              <span className="dash-avatar is-soft">{initials(p.name)}</span>
              <span>
                <b>{p.name}</b>
                <span className="muted">{p.role} · {p.section}</span>
              </span>
              <span className="team-rating" aria-label={`Rated ${p.rating} out of 5`}>★ {p.rating.toFixed(1)}</span>
            </header>
            <dl className="day-card-stats">
              <div><dt>Customers</dt><dd>{p.today.customers}</dd></div>
              <div><dt>Sales</dt><dd>{p.today.sales}</dd></div>
              <div><dt>Walkouts</dt><dd className={p.today.walkouts > 0 ? "is-bad" : undefined}>{p.today.walkouts}</dd></div>
            </dl>
            <p className="team-note"><span className="eyebrow">Latest note</span>{p.coaching}</p>
            <span className="muted team-meta">Speaks {p.languages.join(", ")} · badge {p.badge.id}</span>
          </article>
        ))}
      </div>
    </div>
  );
}
