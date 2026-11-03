import { z } from "zod";
import { fail, firstIssue, isBadgeAuthorised, ok } from "@/engine/http";
import { eventMessage, storeClockNow } from "@/engine/notify/messages";
import { sendTelegram } from "@/engine/notify/telegram";
import { badgeOwner } from "@/engine/storage/badgeAudio";

export const runtime = "nodejs";

const badgeEvent = z.discriminatedUnion("event", [
  z.strictObject({ event: z.literal("started") }),
  z.strictObject({ event: z.literal("stopped"), uploaded: z.number().int().min(0).max(100_000).optional() }),
]);

/**
 * A badge says it started or stopped recording, and the team's Telegram chat hears about it.
 *   curl -X POST -H "Authorization: Bearer $SAYSO_BADGE_TOKEN" -H "Content-Type: application/json" \
 *        -d '{"event":"started"}' http://localhost:3100/api/badges/SB-01/events
 */
export async function POST(req: Request, { params }: { params: Promise<{ badgeId: string }> }) {
  if (!isBadgeAuthorised(req)) return fail(401, "This badge isn't allowed to report.");
  const { badgeId } = await params;
  const owner = badgeOwner(badgeId);
  if (!owner) return fail(404, "This badge isn't paired with anyone.");
  const parsed = badgeEvent.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return fail(400, firstIssue(parsed.error));
  // The badge is about to sleep or busy recording, so answer at once and send in the background
  void sendTelegram(eventMessage(parsed.data, badgeId, owner.repName, storeClockNow()));
  return ok({ badgeId, event: parsed.data.event });
}
