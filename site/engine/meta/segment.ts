// SAM 3.1 on a camera clip: upload once, ask for one concept per call, read the frame stream.
// The upload is deleted afterwards so store footage doesn't sit on Meta's side.

import { readFile } from "node:fs/promises";
import { MODELS } from "../config.ts";
import { metaFetch } from "./client.ts";
import { parseFrames, sseTextDeltas, type Frame } from "./samParse.ts";

export async function uploadVideo(file: string): Promise<string> {
  const video = await readFile(file);
  const res = await metaFetch("/files", {
    body: () => {
      const form = new FormData();
      form.append("purpose", "user_data");
      form.append("file", new Blob([video], { type: "video/mp4" }), "camera.mp4");
      return form;
    },
  });
  const { id } = (await res.json()) as { id: string };
  return id;
}

export async function deleteUpload(fileId: string): Promise<void> {
  try {
    await metaFetch(`/files/${encodeURIComponent(fileId)}`, { method: "DELETE" });
  } catch (err) {
    console.error(`[sam] could not delete upload ${fileId}`, err);
  }
}

/** Every frame where SAM finds `concept`, e.g. "person". */
export async function segmentVideo(fileId: string, concept: string): Promise<Frame[]> {
  const body = JSON.stringify({
    model: MODELS.segment,
    stream: true,
    metadata: { mask_encoding: "one_bit", include_confidence: "true" },
    input: [{
      type: "message",
      role: "user",
      content: [{ type: "input_text", text: concept }, { type: "input_video", file_id: fileId }],
    }],
  });
  const res = await metaFetch("/responses", {
    headers: { "Content-Type": "application/json", Accept: "text/event-stream" },
    body: () => body,
  });
  const deltas = sseTextDeltas(await res.text());
  return parseFrames(deltas.join("\n"));
}
