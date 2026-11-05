import { readFile } from "node:fs/promises";
import { dataPath, isSafeName } from "@/engine/storage/files";
import { fail } from "@/engine/http";

export const runtime = "nodejs";

const NAME = /^SB-\d{2}_\d{6}$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const RANGE = /^bytes=(\d*)-(\d*)$/;

/** Start and end byte of a "Range: bytes=a-b" header, or null when it is missing or out of bounds. */
function byteRange(header: string | null, size: number): [number, number] | null {
  const m = header ? RANGE.exec(header) : null;
  if (!m || (!m[1] && !m[2])) return null;
  const start = m[1] ? Number(m[1]) : Math.max(0, size - Number(m[2]));
  const end = m[1] && m[2] ? Math.min(Number(m[2]), size - 1) : size - 1;
  return start <= end && start < size ? [start, end] : null;
}

/** One badge recording as WAV, for the developer view's players. Answers Range requests so the player knows the length and can seek. */
export async function GET(req: Request, { params }: { params: Promise<{ store: string; date: string; name: string }> }) {
  const { store, date, name } = await params;
  if (!isSafeName(store) || !DATE.test(date) || !NAME.test(name)) return fail(400, "No such recording.");
  let wav: Buffer;
  try {
    wav = await readFile(dataPath("badges", store, date, `${name}.wav`));
  } catch {
    return fail(404, "No such recording.");
  }
  const base = { "Content-Type": "audio/wav", "Accept-Ranges": "bytes", "Cache-Control": "private, max-age=3600" };
  const range = byteRange(req.headers.get("range"), wav.length);
  if (!range) return new Response(new Uint8Array(wav), { headers: { ...base, "Content-Length": String(wav.length) } });
  const [start, end] = range;
  return new Response(new Uint8Array(wav.subarray(start, end + 1)), {
    status: 206,
    headers: { ...base, "Content-Length": String(end - start + 1), "Content-Range": `bytes ${start}-${end}/${wav.length}` },
  });
}
