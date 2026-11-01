import Link from "next/link";
import { branchById } from "@/components/store/branches";
import { profilesIn } from "@/components/store/staff";
import { AddedStore } from "@/components/dashboard/AddedStore";
import { LogEntry } from "@/components/dashboard/log/LogEntry";
import { ArrowLeft } from "@/components/Icons";

/** Log a day: the camera file, the till's sales and any complaints. Badge audio is already on the server. */
export default async function LogPage({ params }: { params: Promise<{ store: string }> }) {
  const { store } = await params;
  const branch = branchById(store);
  if (!branch) return <AddedStore id={store} what="reports" />;
  const team = profilesIn(store).map((p) => ({ id: p.id, name: p.name }));
  return (
    <div className="dash-page">
      <Link href={`/dashboard/${store}`} className="dash-back"><ArrowLeft /> This week</Link>
      <header className="dash-page-head">
        <span className="eyebrow">{branch.street} · {branch.kind}</span>
        <h1>Log today&apos;s entry</h1>
        <p className="lead">Add the camera file. SaySo lines it up with what the badges heard and writes tonight&apos;s report.</p>
      </header>
      <LogEntry store={store} storeName={branch.street} team={team} />
      <p className="dash-note">The camera file is deleted once the report is written. Only the reps&apos; words are used: any customer voice a badge picks up is dropped before the report is written.</p>
    </div>
  );
}
