"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { StoreLogo } from "../store/overlay/StoreLogo";
import { BadgeIcon, CalendarIcon, CloseIcon, HomeIcon, SettingsIcon, TeamIcon } from "../Icons";
import { branchById } from "../store/branches";
import { weekFor } from "./reports";
import { weekTotals } from "./reports/week";
import { useOwner } from "./stores/ownerStores";

/** Pages for the store being viewed. */
const STORE_PAGES = [
  { label: "Daily reports", path: "", icon: <CalendarIcon /> },
  { label: "Team", path: "/team", icon: <TeamIcon /> },
  { label: "Badges", path: "/badges", icon: <BadgeIcon /> },
];

const DAY_PATH = /\/\d{4}-\d{2}-\d{2}$/;

function storeSummary(id: string) {
  const week = weekFor(id);
  return week ? `${weekTotals(week).walkouts} walkouts this week` : "No reports yet";
}

/** Left drawer: the owner's stores, the pages for the chosen store, settings, and the way back. */
export function DashboardDrawer({ storeId, isOpen, onClose }: { storeId: string; isOpen: boolean; onClose: () => void }) {
  const { stores } = useOwner();
  const pathname = usePathname();
  const link = (href: string, label: string, icon: React.ReactNode, isActive = pathname === href) => (
    <Link key={href} href={href} className={`dash-link${isActive ? " is-active" : ""}`} aria-current={isActive ? "page" : undefined}>
      {icon} {label}
    </Link>
  );
  const reportsHref = `/dashboard/${storeId}`;
  return (
    <aside className="dash-drawer" aria-hidden={!isOpen} inert={!isOpen}>
      <div className="dash-drawer-head">
        <span className="eyebrow">Your stores</span>
        <button className="dash-drawer-close" onClick={onClose} aria-label="Close menu">
          <CloseIcon />
        </button>
      </div>
      <nav className="dash-stores" aria-label="Stores">
        {stores.map((s) => {
          const isActive = s.id === storeId;
          return (
            <Link key={s.id} href={`/dashboard/${s.id}`} className={`dash-store${isActive ? " is-active" : ""}`}>
              <StoreLogo branch={s} size={32} />
              <span className="dash-store-text">
                <b>{s.name}</b>
                <span>{s.kind} · {storeSummary(s.id)}</span>
              </span>
            </Link>
          );
        })}
        <Link href="/dashboard/settings" className="dash-store-add">+ Add a store</Link>
      </nav>
      <div className="dash-drawer-rule" />
      <nav className="dash-links" aria-label="Pages">
        {STORE_PAGES.map((p) => {
          const href = `${reportsHref}${p.path}`;
          // A single day's report still counts as Daily reports
          const isActive = pathname === href || (p.path === "" && DAY_PATH.test(pathname) && pathname.startsWith(`${reportsHref}/`));
          return link(href, p.label, p.icon, isActive);
        })}
        {link("/dashboard/settings", "Settings", <SettingsIcon />)}
      </nav>
      {branchById(storeId) && (
        <Link href={`${reportsHref}/log`} className="btn btn-primary dash-log-btn">
          + Log today&apos;s entry
        </Link>
      )}
      <div className="dash-drawer-rule" />
      <nav className="dash-links" aria-label="Website">
        {link("/", "Back to the website", <HomeIcon />)}
      </nav>
      <p className="dash-drawer-foot">A report arrives every night after closing.</p>
    </aside>
  );
}
