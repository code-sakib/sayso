import { branchById } from "@/components/store/branches";
import { createEntry } from "@/engine/storage/entries";
import { entryInput, fail, firstIssue, ok } from "@/engine/http";

export const runtime = "nodejs";

/** Start a day's entry: the details first, the camera file next, then processing. */
export async function POST(req: Request, { params }: { params: Promise<{ store: string }> }) {
  const { store } = await params;
  if (!branchById(store)) return fail(404, "Logging works for the three demo stores for now.");
  const body = await req.json().catch(() => null);
  const parsed = entryInput(store).safeParse(body);
  if (!parsed.success) return fail(400, firstIssue(parsed.error));
  const entry = await createEntry({ store, ...parsed.data });
  return ok({ id: entry.id }, 201);
}
