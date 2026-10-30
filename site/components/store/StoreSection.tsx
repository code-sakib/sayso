"use client";

import dynamic from "next/dynamic";
import { DragIcon } from "../Icons";
import { useInView, useMedia } from "./useView";
import { PinLayer } from "./pins";
import { StorePanel } from "./overlay/StorePanel";
import { StoreList } from "./overlay/StoreList";
import { StaffCard } from "./overlay/StaffCard";
import { ZoomControls } from "./overlay/Controls";

// three.js needs the browser, so the scene is loaded on the client only.
const StoreCanvas = dynamic(() => import("./StoreCanvas"), {
  ssr: false,
  loading: () => <div className="store-loading">Opening the store…</div>,
});

export function StoreSection() {
  const [stageRef, inView] = useInView<HTMLDivElement>();
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  // On touch screens dragging would trap page scrolling, so there the store buttons move the camera.
  const finePointer = useMedia("(pointer: fine)");
  return (
    <section className="store-section" id="store" ref={stageRef}>
      <StoreCanvas active={inView} still={reduced} interactive={finePointer} />
      <PinLayer />
      <StorePanel />
      <StoreList />
      <StaffCard />
      <ZoomControls />
      {finePointer && <div className="store-hint"><DragIcon />Drag to jump to the next store · right-drag to turn</div>}
    </section>
  );
}
