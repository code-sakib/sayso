// Small file helpers for the engine's data folder: safe names, JSON written atomically, and
// request bodies streamed straight to disk with a size cap.

import { createWriteStream } from "node:fs";
import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { Readable, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import { dataDir } from "../config.ts";

/** Ids and store names become folder names, so only plain characters are allowed. */
const SAFE = /^[A-Za-z0-9_-]{1,64}$/;
export const isSafeName = (s: string) => SAFE.test(s);

/** A path inside the data folder. Every part must be a safe name or a known file name. */
export function dataPath(...parts: string[]): string {
  for (const p of parts) {
    if (!/^[A-Za-z0-9_.-]{1,80}$/.test(p) || p.startsWith(".")) throw new Error(`Unsafe path part: ${p}`);
  }
  return path.join(dataDir(), ...parts);
}

export async function readJson<T>(file: string): Promise<T | null> {
  try {
    return JSON.parse(await readFile(file, "utf8")) as T;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw err;
  }
}

export async function writeJson(file: string, value: unknown): Promise<void> {
  await mkdir(path.dirname(file), { recursive: true });
  const tmp = `${file}.${process.pid}.${Date.now()}.tmp`;
  await writeFile(tmp, JSON.stringify(value, null, 2));
  await rename(tmp, file);
}

export class TooLargeError extends Error {}

/** Stream a request body to `file`, stopping (and removing the file) past `maxBytes`. */
export async function saveBody(body: ReadableStream<Uint8Array>, file: string, maxBytes: number): Promise<number> {
  await mkdir(path.dirname(file), { recursive: true });
  let bytes = 0;
  const cap = new Transform({
    transform(chunk: Buffer, _enc, done) {
      bytes += chunk.length;
      done(bytes > maxBytes ? new TooLargeError("File too large") : null, chunk);
    },
  });
  try {
    await pipeline(Readable.fromWeb(body as import("node:stream/web").ReadableStream), cap, createWriteStream(file));
    return bytes;
  } catch (err) {
    await rm(file, { force: true });
    throw err;
  }
}
