// The files a store hands over at closing: one audio file per badge and one video from the camera.

import { profilesIn } from "../store/staff";

export type FlowFile = { key: string; kind: "audio" | "video"; name: string; detail: string; from: string };

export function filesFor(branchId: string): FlowFile[] {
  const audio = profilesIn(branchId).map((p): FlowFile => ({
    key: p.id,
    kind: "audio",
    name: `${p.name.split(" ")[0].toLowerCase()}-${p.badge.id.toLowerCase()}.wav`,
    detail: `${p.name.split(" ")[0]}'s badge · ${p.badge.talkTime}`,
    from: `staff-${p.id}`,
  }));
  const video: FlowFile = { key: "cctv", kind: "video", name: "store-cam-1.mp4", detail: "Store camera · 10h", from: `cctv-${branchId}` };
  return [...audio, video];
}
