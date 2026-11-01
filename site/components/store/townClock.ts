// One clock for the street, shared by every canvas that draws the town (the store, the hero and the
// section below), so cars and passers-by line up where two views meet.

/** Seconds since the page loaded. */
export const townTime = () => performance.now() / 1000;
