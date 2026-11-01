"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoMark } from "../LogoMark";
import { MenuIcon } from "../Icons";
import { DashboardDrawer } from "./DashboardDrawer";
import { MAIN_BRANCH } from "../store/branches";

/** Below this width the drawer floats over the page and starts closed. */
const NARROW = "(max-width: 900px)";
/** Dashboard pages that belong to the account, not to one store. */
const ACCOUNT_PAGES = ["settings"];

/** The owner's area: header with the menu button, the drawer on the left, and the page. */
export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(true);
  const [isNarrow, setNarrow] = useState(false);
  // No sliding until the drawer has its starting position, so it doesn't animate shut on a phone
  const [isReady, setReady] = useState(false);
  const pathname = usePathname();
  // Settings isn't a store, so the drawer keeps showing the last store you looked at
  const segment = pathname.split("/")[2];
  const [storeId, setStoreId] = useState(MAIN_BRANCH.id as string);
  useEffect(() => {
    if (segment && !ACCOUNT_PAGES.includes(segment)) setStoreId(segment);
  }, [segment]);

  useEffect(() => {
    const media = window.matchMedia(NARROW);
    const sync = () => {
      setNarrow(media.matches);
      setOpen(!media.matches);
    };
    sync();
    const frame = requestAnimationFrame(() => setReady(true));
    media.addEventListener("change", sync);
    return () => {
      cancelAnimationFrame(frame);
      media.removeEventListener("change", sync);
    };
  }, []);

  // On a phone the drawer closes once you pick something in it
  useEffect(() => {
    if (isNarrow) setOpen(false);
  }, [pathname, isNarrow]);

  return (
    <div className={`dash${isOpen ? " is-open" : ""}${isReady ? " is-ready" : ""}`}>
      <header className="dash-header">
        <button className="dash-menu" onClick={() => setOpen(!isOpen)} aria-label={isOpen ? "Close menu" : "Open menu"} aria-expanded={isOpen}>
          <MenuIcon />
        </button>
        <Link href="/" className="logo" aria-label="SaySo home">
          <LogoMark />
          sayso
        </Link>
        <div className="dash-header-end">
          <span className="dash-owner">
            <span className="dash-avatar">SO</span>
            <span className="hide-sm">
              <b>Store owner</b>
              <span>Demo account</span>
            </span>
          </span>
        </div>
      </header>
      <DashboardDrawer storeId={storeId} isOpen={isOpen} onClose={() => setOpen(false)} />
      {isOpen && isNarrow && <div className="dash-scrim" onClick={() => setOpen(false)} aria-hidden="true" />}
      <main className="dash-main">{children}</main>
    </div>
  );
}
