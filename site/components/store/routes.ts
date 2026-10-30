// Walking routes: a list of floor points with optional pauses. Pure maths, no three.js.

export type Waypoint = {
  x: number;
  z: number;
  /** Seconds to stand still on arrival. */
  wait?: number;
  /** Point to face while waiting (defaults to the walking direction). */
  face?: [number, number];
  /** What the walker is doing while heading to / standing at this point. */
  label?: string;
};

type Leg = { from: Waypoint; to: Waypoint; start: number; walk: number; wait: number };

export type Route = { legs: Leg[]; total: number };

export type RouteSample = {
  x: number;
  z: number;
  heading: number;
  moving: boolean;
  label?: string;
  /** Seconds into the current loop (0..route.total). */
  time: number;
};

const headingBetween = (ax: number, az: number, bx: number, bz: number) => Math.atan2(bx - ax, bz - az);

/** Builds a route; time per leg = distance / speed, plus the wait at its end point. */
export function buildRoute(points: Waypoint[], speed: number): Route {
  if (points.length < 2) throw new Error("A route needs at least two points");
  if (speed <= 0) throw new Error("Walking speed must be positive");

  let clock = 0;
  const legs = points.slice(1).map((to, i) => {
    const from = points[i];
    const walk = Math.hypot(to.x - from.x, to.z - from.z) / speed;
    const leg = { from, to, start: clock, walk, wait: to.wait ?? 0 };
    clock += walk + leg.wait;
    return leg;
  });
  return { legs, total: clock };
}

/** Where the walker is at time t (seconds). Time wraps, so routes loop forever. */
export function sampleRoute(route: Route, t: number): RouteSample {
  const time = ((t % route.total) + route.total) % route.total;
  const leg = route.legs.find((l) => time < l.start + l.walk + l.wait) ?? route.legs[route.legs.length - 1];
  const { from, to } = leg;
  const walkHeading = headingBetween(from.x, from.z, to.x, to.z);
  const local = time - leg.start;

  if (local < leg.walk) {
    const k = leg.walk === 0 ? 1 : local / leg.walk;
    return { x: from.x + (to.x - from.x) * k, z: from.z + (to.z - from.z) * k, heading: walkHeading, moving: true, label: to.label, time };
  }

  const heading = to.face ? headingBetween(to.x, to.z, to.face[0], to.face[1]) : walkHeading;
  return { x: to.x, z: to.z, heading, moving: false, label: to.label, time };
}
