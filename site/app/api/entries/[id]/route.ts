import { isRunning } from "@/engine/jobs";
import { getEntry } from "@/engine/storage/entries";
import { fail, ok } from "@/engine/http";

export const runtime = "nodejs";

/** An entry and where its processing is up to. */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entry = await getEntry(id);
  if (!entry) return fail(404, "No such entry.");
  // A run cut short by a server restart would otherwise look busy forever
  if (entry.status === "processing" && !isRunning(id)) {
    return ok({ ...entry, status: "failed" as const, error: "Processing stopped when the server restarted. Run it again." });
  }
  return ok(entry);
}
