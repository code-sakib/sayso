"use client";

import { REPORT_TIMES, updateSettings, useOwner } from "../stores/ownerStores";

function Switch({ isOn, onChange, label, isLocked = false }: { isOn: boolean; onChange?: (on: boolean) => void; label: string; isLocked?: boolean }) {
  return (
    <button
      type="button" role="switch" aria-checked={isOn} aria-label={label} disabled={isLocked}
      className={`set-switch${isOn ? " is-on" : ""}`} onClick={() => onChange?.(!isOn)}
    >
      <span />
    </button>
  );
}

/** When the daily report arrives and who else gets it. */
export function ReportSettings() {
  const { settings } = useOwner();
  return (
    <>
      <section className="set-card">
        <header className="set-card-head">
          <h2>Daily report</h2>
          <p className="muted">One report per store, written after closing.</p>
        </header>
        <div className="set-row">
          <span><b>Send the report at</b><span className="muted">Times are in the store's own time zone.</span></span>
          <select value={settings.reportTime} onChange={(e) => updateSettings({ reportTime: e.target.value })} aria-label="Report time">
            {REPORT_TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="set-row">
          <span><b>Send coaching notes to staff</b><span className="muted">Each rep gets their own note on their phone the next morning.</span></span>
          <Switch label="Send coaching notes to staff" isOn={settings.sendNotesToStaff} onChange={(on) => updateSettings({ sendNotesToStaff: on })} />
        </div>
        <div className="set-row">
          <span><b>Tell me about walkouts during the day</b><span className="muted">A short message within an hour of each walkout.</span></span>
          <Switch label="Walkout alerts" isOn={settings.walkoutAlerts} onChange={(on) => updateSettings({ walkoutAlerts: on })} />
        </div>
      </section>
      <section className="set-card">
        <header className="set-card-head">
          <h2>Privacy</h2>
          <p className="muted">These stay on for every store.</p>
        </header>
        <div className="set-row">
          <span><b>Remove customer voices on the badge</b><span className="muted">Only the staff voice ever leaves the badge.</span></span>
          <Switch label="Remove customer voices" isOn isLocked />
        </div>
        <div className="set-row">
          <span><b>Light on while recording</b><span className="muted">Customers and staff can always see when a badge is on.</span></span>
          <Switch label="Recording light" isOn isLocked />
        </div>
      </section>
    </>
  );
}
