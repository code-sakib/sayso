// Muse Voice Transcribe: one WAV (16 kHz mono, at most 10 minutes) to timed turns with speaker labels.

import { readFile } from "node:fs/promises";
import { MODELS } from "../config.ts";
import type { SpeechTurn } from "../timeline/conversations.ts";
import { metaFetch } from "./client.ts";

type TranscribeResponse = {
  transcript: string;
  audioDurationMs: number;
  turns: { turnId: number; startMs: number; endMs: number; transcript: string; speaker?: string }[];
};

export async function transcribeWav(file: string): Promise<SpeechTurn[]> {
  const audio = await readFile(file);
  const request = JSON.stringify({ model: MODELS.transcribe, audioEncoding: "WAV", mode: "DIARIZATION" });
  const res = await metaFetch("/asr/transcribe", {
    headers: { Accept: "application/json" },
    body: () => {
      const form = new FormData();
      form.append("request", new Blob([request], { type: "application/json" }));
      form.append("audio", new Blob([audio], { type: "audio/wav" }), "badge.wav");
      return form;
    },
  });
  const data = (await res.json()) as TranscribeResponse;
  if (data.turns.length > 0) {
    return data.turns.map((t) => ({ startMs: t.startMs, endMs: t.endMs, text: t.transcript, speaker: t.speaker }));
  }
  return data.transcript.trim() ? [{ startMs: 0, endMs: data.audioDurationMs, text: data.transcript }] : [];
}
