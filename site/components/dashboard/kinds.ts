// How each kind of moment is labelled and coloured in the reports.

import type { DisputeKind, MomentKind, Verdict } from "./reports/types";

export const KIND: Record<MomentKind, { label: string; dot: "is-rec" | "is-good" | "is-warn" }> = {
  walkout: { label: "Walkout", dot: "is-rec" },
  save: { label: "Saved sale", dot: "is-good" },
  wait: { label: "Long wait", dot: "is-warn" },
};

export const money = (n: number) => `$${n.toLocaleString("en-US")}`;

export const initials = (name: string) => name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();

export const DISPUTE_KIND: Record<DisputeKind, string> = {
  conduct: "Rudeness claim",
  promise: "What was promised",
};

export const VERDICT: Record<Verdict, { label: string; dot: "is-good" | "is-warn" | "is-info" }> = {
  cleared: { label: "Rep was right", dot: "is-good" },
  honoured: { label: "Rep said it · store made it right", dot: "is-warn" },
  unclear: { label: "Not on the recording", dot: "is-info" },
};
