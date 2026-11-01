// Muse Spark writes the day's report as structured JSON, checked against the same schema.

import { MODELS } from "../config.ts";
import { SYSTEM_PROMPT } from "../report/prompt.ts";
import { SparkReport, sparkResponseFormat } from "../report/schema.ts";
import { metaFetch, MetaApiError } from "./client.ts";

/** Room for Spark's reasoning plus a full report. */
const MAX_COMPLETION_TOKENS = 32_000;

type ChatResponse = { choices: { finish_reason: string; message: { content: string | null; refusal?: string | null } }[] };

export async function writeReport(prompt: string): Promise<SparkReport> {
  const body = JSON.stringify({
    model: MODELS.report,
    reasoning_effort: "medium",
    max_completion_tokens: MAX_COMPLETION_TOKENS,
    response_format: sparkResponseFormat(),
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: prompt },
    ],
  });
  const res = await metaFetch("/chat/completions", { headers: { "Content-Type": "application/json" }, body: () => body });
  const choice = ((await res.json()) as ChatResponse).choices[0];
  if (!choice?.message.content) {
    const why = choice?.message.refusal ?? (choice?.finish_reason === "length" ? "it ran out of room" : "it returned nothing");
    throw new MetaApiError(`Muse Spark couldn't write the report: ${why}.`, 200);
  }
  let json: unknown;
  try {
    json = JSON.parse(choice.message.content);
  } catch {
    throw new MetaApiError("Muse Spark's report wasn't valid JSON.", 200, choice.message.content.slice(0, 300));
  }
  const parsed = SparkReport.safeParse(json);
  if (!parsed.success) throw new MetaApiError("Muse Spark's report was missing parts.", 200, parsed.error.message.slice(0, 500));
  return parsed.data;
}
