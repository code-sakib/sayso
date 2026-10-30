import { useEffect, useState } from "react";

const TICK_MS = 500;

/** Re-reads a live value from the 3D scene a couple of times a second. */
export function useLive<T>(read: () => T): T {
  const [value, setValue] = useState(read);
  useEffect(() => {
    const id = window.setInterval(() => setValue(read()), TICK_MS);
    return () => window.clearInterval(id);
  }, [read]);
  return value;
}
