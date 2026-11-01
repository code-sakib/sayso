import { StoreSettings } from "@/components/dashboard/settings/StoreSettings";
import { ReportSettings } from "@/components/dashboard/settings/ReportSettings";

export default function SettingsPage() {
  return (
    <div className="dash-page">
      <header className="dash-page-head">
        <span className="eyebrow">Account</span>
        <h1>Settings</h1>
        <p className="muted">Saved in this browser for the demo.</p>
      </header>
      <div className="set-grid">
        <StoreSettings />
        <div className="set-col">
          <ReportSettings />
        </div>
      </div>
    </div>
  );
}
