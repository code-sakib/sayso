// What Muse Spark writes back. The same schema is sent as the structured-output format and used to
// check the reply, so the model and the engine never disagree about the shape.
// Spark points at conversations by id; the engine fills in times, reps and the rep's exact words
// from the transcript, so a report can't quote something nobody said.

import { z } from "zod";

const CameraNote = z.strictObject({
  at: z.string().describe("Seconds into the conversation, like 0:40"),
  text: z.string().describe("What the camera saw the customer do, never words they said"),
});

const SparkMoment = z.strictObject({
  conversationId: z.string(),
  kind: z.enum(["walkout", "save", "wait"]),
  title: z.string().describe("Four to seven words, sentence case, like \"Sent to the website\""),
  customer: z.string().describe("Who walked up and what they were after, from the camera and the rep's words"),
  quote: z.string().describe("The rep's words at the turning point, copied exactly from one of their lines"),
  cameraNotes: z.array(CameraNote),
  happened: z.string(),
  tryInstead: z.string().describe("For a save, what to keep doing"),
});

const SparkDispute = z.strictObject({
  complaintIndex: z.number().int(),
  conversationId: z.string().nullable().describe("The conversation the complaint is about, or null if none matches"),
  title: z.string(),
  finding: z.string(),
  verdict: z.enum(["cleared", "honoured", "unclear"]),
  outcome: z.string().describe("What the store should do next"),
});

export const SparkReport = z.strictObject({
  headline: z.string().describe("One sentence, the day's most useful finding"),
  summary: z.string().describe("Three or four sentences for the owner"),
  walkouts: z.number().int(),
  lostValue: z.number().int().describe("Dollars, from what walkouts were looking at; 0 if unknown"),
  moments: z.array(SparkMoment),
  disputes: z.array(SparkDispute),
  notes: z.array(z.strictObject({ repId: z.string(), note: z.string() })),
});

export type SparkReport = z.infer<typeof SparkReport>;
export type SparkMoment = z.infer<typeof SparkMoment>;
export type SparkDispute = z.infer<typeof SparkDispute>;

/** The response_format block for the chat completions call. */
export const sparkResponseFormat = () => ({
  type: "json_schema" as const,
  json_schema: { name: "sayso_day_report", strict: true, schema: z.toJSONSchema(SparkReport) },
});
