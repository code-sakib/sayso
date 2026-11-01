"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { Person } from "../Person";
import { buildRoute } from "../routes";
import { DOOR_IN, OFF_RIGHT, leave, stop } from "../routing";
import { shopperLook } from "../look";
import type { Walker } from "../people";
import { caseById, talkSeconds, type StoreCase } from "./cases";
import { caseElapsed, setTimings, usePlayback } from "./playback";

import { CASE_CUSTOMER_ID } from "./cases";
export { CASE_CUSTOMER_ID };
const WALK_SPEED = 1.9;
/** Index of the customer's stop in the route below, to work out when they arrive. */
const SPOT_INDEX = 2;

function customerWalker(c: StoreCase, seq: number): Walker {
  const route = buildRoute(
    [
      // Fades in just inside the door so the demo gets to the conversation quickly
      DOOR_IN,
      c.via,
      stop(c.customerSpot, talkSeconds(c), [c.repSpot.x, c.repSpot.z]),
      c.via,
      ...leave(OFF_RIGHT),
    ],
    WALK_SPEED,
  );
  return { id: CASE_CUSTOMER_ID, branch: c.branch, route, offset: 0, look: shopperLook(seq * 7 + 3), fadeEnds: true };
}

/** The customer in the demo case playing in this branch: walks in, talks to the rep, leaves. */
export function CaseCustomer({ branchId }: { branchId: string }) {
  const playback = usePlayback();
  const c = caseById(playback.id);
  const isHere = c?.branch === branchId;
  const walker = useMemo(() => (c && isHere ? customerWalker(c, playback.seq) : null), [c, isHere, playback.seq]);
  const group = useRef<Group>(null);

  useEffect(() => {
    if (!walker) return;
    const leg = walker.route.legs[SPOT_INDEX - 1];
    setTimings(playback.seq, leg.start + leg.walk, walker.route.total);
  }, [walker, playback.seq]);

  // Gone once they have walked off (routes loop, so hide rather than start again)
  useFrame(() => {
    if (group.current && walker) group.current.visible = caseElapsed() < walker.route.total;
  });

  if (!walker) return null;
  return (
    <group ref={group}>
      <Person key={playback.seq} walker={walker} time={caseElapsed} />
    </group>
  );
}
