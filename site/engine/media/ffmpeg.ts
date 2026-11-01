// ffmpeg and ffprobe: badge audio to transcription-ready WAV chunks, camera video to the small,
// low-frame-rate MP4 SAM is billed for.

import { execFile } from "node:child_process";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { AUDIO_CHUNK_SECONDS, VIDEO_FPS, VIDEO_MAX_WIDTH } from "../config.ts";

const run = promisify(execFile);
const FFMPEG_TIMEOUT_MS = 15 * 60 * 1000;

async function ffmpeg(args: string[]) {
  try {
    await run("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", ...args], { timeout: FFMPEG_TIMEOUT_MS });
  } catch (err) {
    const stderr = (err as { stderr?: string }).stderr ?? "";
    console.error("[ffmpeg] failed", args.join(" "), stderr);
    throw new Error("The file couldn't be read. Is it a normal audio or video file?");
  }
}

/** Length of an audio or video file in seconds, or null if ffprobe can't read it. */
export async function probeSeconds(file: string): Promise<number | null> {
  try {
    const { stdout } = await run("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file]);
    const seconds = Number(stdout.trim());
    return Number.isFinite(seconds) && seconds > 0 ? seconds : null;
  } catch {
    return null;
  }
}

/** 16 kHz mono 16-bit WAV, cut into chunks short enough for one transcription call each. */
export async function toSpeechChunks(input: string, outDir: string): Promise<{ file: string; offsetSec: number }[]> {
  const base = path.basename(input, path.extname(input));
  await ffmpeg([
    "-i", input, "-vn", "-ac", "1", "-ar", "16000", "-c:a", "pcm_s16le",
    "-f", "segment", "-segment_time", String(AUDIO_CHUNK_SECONDS), "-reset_timestamps", "1",
    path.join(outDir, `${base}-%03d.wav`),
  ]);
  const chunks = (await readdir(outDir)).filter((f) => f.startsWith(`${base}-`) && f.endsWith(".wav")).sort();
  return chunks.map((f, i) => ({ file: path.join(outDir, f), offsetSec: i * AUDIO_CHUNK_SECONDS }));
}

/** Silent H.264 at VIDEO_FPS, no wider than VIDEO_MAX_WIDTH, with the index up front for SAM. */
export async function toSamVideo(input: string, output: string): Promise<void> {
  await ffmpeg([
    "-i", input, "-an",
    "-vf", `fps=${VIDEO_FPS},scale='min(${VIDEO_MAX_WIDTH},iw)':-2`,
    "-c:v", "libx264", "-preset", "veryfast", "-crf", "26", "-pix_fmt", "yuv420p",
    "-movflags", "+faststart", output,
  ]);
}
