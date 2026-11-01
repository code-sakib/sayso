"use client";

import dynamic from "next/dynamic";
import { useInView, useMedia } from "./useView";
import type { Placement } from "./CityBackdrop";

const CityBackdrop = dynamic(() => import("./CityBackdrop"), { ssr: false });

/** The town around the store view, faded behind a section: above the store (hero) or below it. */
export function HeroBackdrop({ placement = "above" }: { placement?: Placement }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  return (
    <div className={`hero-backdrop is-${placement}`} ref={ref} aria-hidden="true">
      <CityBackdrop active={inView} still={reduced} placement={placement} />
    </div>
  );
}
