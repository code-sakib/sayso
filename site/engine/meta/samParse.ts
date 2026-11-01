// SAM 3.1 streams one text line per video frame:
//   <12f>3<|box;x1=211;y1=228;x2=270;y2=254;w=320;h=334|><|mask;x=0;y=0;data=…|>, 7<|box;…|><|mask;…|>
// Masks are base85 and may contain commas, so records are found by their box token, never by splitting.

export type Box = { x1: number; y1: number; x2: number; y2: number };
export type Detection = { id: number; box: Box; frameW: number; frameH: number; confidence?: number };
export type Frame = { index: number; objects: Detection[] };

const FRAME_MARK = /^\s*<(\d+)f>/;
const BOX = /(\d+)\s*<\|box;([^|]*)\|>/g;

function fields(body: string): Record<string, number> {
  return Object.fromEntries(
    body.split(";").flatMap((pair) => {
      const [k, v] = pair.split("=");
      const n = Number(v);
      return k && Number.isFinite(n) ? [[k.trim(), n]] : [];
    }),
  );
}

/** One streamed line to a frame, or null when the line has no frame marker. */
export function parseFrameLine(line: string): Frame | null {
  const mark = FRAME_MARK.exec(line);
  if (!mark) return null;
  const rest = line.slice(mark[0].length);
  const objects = [...rest.matchAll(BOX)].flatMap((m): Detection[] => {
    const f = fields(m[2]);
    if ([f.x1, f.y1, f.x2, f.y2].some((n) => n === undefined)) return [];
    return [{
      id: Number(m[1]),
      box: { x1: f.x1, y1: f.y1, x2: f.x2, y2: f.y2 },
      frameW: f.w ?? 0,
      frameH: f.h ?? 0,
      ...(f.c === undefined ? {} : { confidence: f.c }),
    }];
  });
  return { index: Number(mark[1]), objects };
}

/** Every frame in a whole SAM output text, in frame order. */
export const parseFrames = (text: string): Frame[] =>
  text
    .split("\n")
    .map(parseFrameLine)
    .filter((f): f is Frame => f !== null)
    .sort((a, b) => a.index - b.index);

/**
 * Server-sent events to the text deltas they carry. Each event is "data: {json}" lines followed by
 * a blank line; only `response.output_text.delta` events hold SAM's frames. A failed response
 * arrives as an `error` or `response.failed` event and is thrown.
 */
export function sseTextDeltas(stream: string): string[] {
  return stream.split(/\r?\n\r?\n/).flatMap((event) => {
    const data = event
      .split(/\r?\n/)
      .filter((l) => l.startsWith("data:"))
      .map((l) => l.slice(5).trimStart())
      .join("\n");
    if (!data || data === "[DONE]") return [];
    let parsed: { type?: string; delta?: string; error?: { message?: string }; response?: { error?: { message?: string } } };
    try {
      parsed = JSON.parse(data);
    } catch {
      return [];
    }
    if (parsed.type === "error" || parsed.type === "response.failed") {
      throw new Error(parsed.error?.message ?? parsed.response?.error?.message ?? "SAM could not read the video");
    }
    return parsed.type === "response.output_text.delta" && typeof parsed.delta === "string" ? [parsed.delta] : [];
  });
}
