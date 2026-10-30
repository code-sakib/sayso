"use client";

import dynamic from "next/dynamic";
import { useInView, useMedia } from "./useView";

const CityBackdrop = dynamic(() => import("./CityBackdrop"), { ssr: false });

/** The town drifting by, faded and blurred behind the hero text. */
export function HeroBackdrop() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  return (
    <div className="hero-backdrop" ref={ref} aria-hidden="true">
      <CityBackdrop active={inView} still={reduced} />
    </div>
  );
}
