"use client";

import { FIXTURES } from "../layout";
import { SECTIONS } from "../sections";
import { PinAnchor } from "../../pins";
import { CameraRow, DeviceRow, LaptopRow, Table, WatchRow } from "./Tables";
import { ApplianceWall, AudioShelves, TvWall } from "./WallUnits";
import { Counter, GamingLounge, LaunchStand, SpeakerStand } from "./Zones";

const PHONE = [0.2, 0.4] as [number, number];
const TABLET = [0.44, 0.32] as [number, number];

export function Fixtures({ branchId }: { branchId: string }) {
  const { phoneA, phoneB, tablets, laptops, watches, cameras } = FIXTURES;
  return (
    <group>
      <Table {...phoneA}><DeviceRow w={phoneA.w} d={phoneA.d} count={10} size={PHONE} /></Table>
      <Table {...phoneB}><DeviceRow w={phoneB.w} d={phoneB.d} count={10} size={PHONE} /></Table>
      <Table {...tablets}><DeviceRow w={tablets.w} d={tablets.d} count={6} size={TABLET} tilt={-0.7} /></Table>
      <Table {...laptops}><LaptopRow w={laptops.w} count={5} /></Table>
      <Table {...watches}><WatchRow w={watches.w} count={12} /></Table>
      <Table {...cameras}><CameraRow w={cameras.w} count={7} /></Table>
      <TvWall />
      <AudioShelves />
      <ApplianceWall />
      <SpeakerStand />
      <Counter />
      <GamingLounge />
      <LaunchStand />
      {SECTIONS.map((s) => <group key={s.id} position={s.pin}><PinAnchor id={`${branchId}-section-${s.id}`} /></group>)}
    </group>
  );
}
