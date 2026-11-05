import type { Line } from "./reports/types";

/** A stretch of conversation: the rep's words, and what the camera saw the customer do. */
export function Transcript({ lines, repName }: { lines: Line[]; repName: string }) {
  return (
    <ol className="transcript">
      {lines.map((l, i) => (
        <li key={`${i}-${l.at}`} className={`is-${l.who}`}>
          <span className="mono transcript-at">{l.at}</span>
          <span className="transcript-who">{l.speaker ? `Speaker ${l.speaker.split("/").pop()}` : l.who === "rep" ? repName : "Customer"}</span>
          <span className="transcript-text">
            {l.who === "rep" ? `“${l.text}”` : l.text}
          </span>
        </li>
      ))}
    </ol>
  );
}
