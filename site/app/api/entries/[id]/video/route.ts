import { MAX_VIDEO_BYTES } from "@/engine/config";
import { isRunning } from "@/engine/jobs";
import { entryDir, getEntry, updateEntry } from "@/engine/storage/entries";
import { saveBody, TooLargeError } from "@/engine/storage/files";
import { fail, ok } from "@/engine/http";

export const runtime = "nodejs";

const VIDEO_TYPES = new Set(["video/mp4", "video/quicktime"]);

/** The camera file, streamed to disk as the raw request body. */
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entry = await getEntry(id);
  if (!entry) return fail(404, "No such entry.");
  if (isRunning(id)) return fail(409, "This entry is being processed.");
  const type = (req.headers.get("content-type") ?? "").split(";")[0].trim();
  if (!VIDEO_TYPES.has(type)) return fail(415, "Upload an MP4 or MOV file.");
  if (!req.body) return fail(400, "No file in the request.");
  const name = decodeURIComponent(req.headers.get("x-file-name") ?? "camera").slice(0, 120);
  try {
    const bytes = await saveBody(req.body, entryDir(id, "camera"), MAX_VIDEO_BYTES);
    await updateEntry(id, (e) => ({ ...e, video: { name, bytes } }));
    return ok({ bytes });
  } catch (err) {
    if (err instanceof TooLargeError) return fail(413, "The camera file is over 1 GB. Trim it and try again.");
    console.error("[video upload]", err);
    return fail(500, "The camera file couldn't be saved.");
  }
}
