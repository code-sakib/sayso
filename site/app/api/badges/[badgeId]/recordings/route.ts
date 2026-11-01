import { BadgeUploadError, saveBadgeRecording } from "@/engine/storage/badgeAudio";
import { TooLargeError } from "@/engine/storage/files";
import { fail, isBadgeAuthorised, ok } from "@/engine/http";

export const runtime = "nodejs";

/**
 * A badge uploads one recording: raw audio in the body, its start time in `?startedAt=`.
 *   curl -X POST -H "Authorization: Bearer $SAYSO_BADGE_TOKEN" -H "Content-Type: audio/wav" \
 *        --data-binary @rec.wav "http://localhost:3100/api/badges/SB-01/recordings?startedAt=2026-11-02T18:40:05"
 */
export async function POST(req: Request, { params }: { params: Promise<{ badgeId: string }> }) {
  if (!isBadgeAuthorised(req)) return fail(401, "This badge isn't allowed to upload.");
  const { badgeId } = await params;
  const startedAt = new URL(req.url).searchParams.get("startedAt") ?? "";
  if (!req.body) return fail(400, "No audio in the request.");
  try {
    const rec = await saveBadgeRecording(badgeId, startedAt, req.headers.get("content-type") ?? "", req.body);
    return ok({ badgeId: rec.badgeId, repId: rec.repId, startSec: rec.startSec, durationSec: rec.durationSec }, 201);
  } catch (err) {
    if (err instanceof BadgeUploadError) return fail(err.status, err.message);
    if (err instanceof TooLargeError) return fail(413, "The recording is too large.");
    console.error("[badge upload]", err);
    return fail(500, "The recording couldn't be saved.");
  }
}
