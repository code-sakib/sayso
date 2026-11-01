// Plays the part of the badges for a demo: speaks each rep's lines with macOS `say`, lays them out
// on a timeline with ffmpeg, and uploads the result through the same endpoint a real badge uses.
//
//   node --experimental-strip-types scripts/seed-badges.ts [date] [server]
//
// Needs SAYSO_BADGE_TOKEN (read from .env.local if it's not in the environment).

import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

const run = promisify(execFile);

type Line = { at: number; text: string };
type Recording = { badgeId: string; voice: string; startsAt: string; lines: Line[] };

/** Main St, one evening. Only the reps speak: customer voices are never on a badge recording. */
const RECORDINGS: Recording[] = [
  {
    badgeId: "SB-01", voice: "Rishi", startsAt: "18:40:00",
    lines: [
      { at: 2, text: "Hey, yeah, that's the new one. The camera is way better." },
      { at: 12, text: "Monthly? Uh, there's a couple of plans. Honestly it's all on the website, man. Easier there." },
      { at: 22, text: "Josh, can you grab me the one twenty eight from the back?" },
      { at: 110, text: "Hi there, looking for a case for that one?" },
      { at: 118, text: "These clear ones are fifteen dollars, and this one has a stand built in for twenty." },
    ],
  },
  {
    badgeId: "SB-02", voice: "Tara", startsAt: "18:42:30",
    lines: [
      { at: 1, text: "That one's gorgeous, right? Before we pick one, how far is the sofa from the wall?" },
      { at: 10, text: "About eight feet? Okay, at eight feet the seventy five will feel like the front row at the movies." },
      { at: 20, text: "Come stand here. This is the sixty five at eight feet. See how you can take in the whole screen?" },
      { at: 34, text: "And if dialogue is ever hard to hear, this sound bar fixes that. It's one eighty off with the TV this week." },
    ],
  },
  {
    badgeId: "SB-03", voice: "Aman", startsAt: "18:45:00",
    lines: [
      { at: 1, text: "This one is great for college. It comes with one year of warranty from the brand." },
      { at: 9, text: "If you want two years, there's the care plan for seventy nine dollars. Want me to add it?" },
      { at: 18, text: "No problem at all. One year is included either way. Here's your receipt." },
    ],
  },
];

const today = () => {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

async function badgeToken(): Promise<string> {
  if (process.env.SAYSO_BADGE_TOKEN) return process.env.SAYSO_BADGE_TOKEN;
  const env = await readFile(path.join(process.cwd(), ".env.local"), "utf8").catch(() => "");
  const token = /^SAYSO_BADGE_TOKEN=(.+)$/m.exec(env)?.[1]?.trim();
  if (!token) throw new Error("Set SAYSO_BADGE_TOKEN or add it to .env.local");
  return token;
}

/** One WAV with every line at its offset and silence in between, like a badge's file. */
async function render(rec: Recording, dir: string): Promise<string> {
  const clips = await Promise.all(rec.lines.map(async (line, i) => {
    const file = path.join(dir, `${rec.badgeId}-${i}.aiff`);
    await run("say", ["-v", rec.voice, "-o", file, line.text]);
    return file;
  }));
  const out = path.join(dir, `${rec.badgeId}.wav`);
  const delays = rec.lines.map((l, i) => `[${i}]adelay=${l.at * 1000}|${l.at * 1000}[a${i}]`).join(";");
  const mix = `${rec.lines.map((_, i) => `[a${i}]`).join("")}amix=inputs=${rec.lines.length}:normalize=0`;
  await run("ffmpeg", [
    "-loglevel", "error", "-y", ...clips.flatMap((c) => ["-i", c]),
    "-filter_complex", `${delays};${mix}`, "-ac", "1", "-ar", "16000", "-c:a", "pcm_s16le", out,
  ]);
  return out;
}

async function main() {
  const [date = today(), server = "http://localhost:3100"] = process.argv.slice(2);
  const token = await badgeToken();
  const dir = await mkdtemp(path.join(tmpdir(), "sayso-seed-"));
  try {
    for (const rec of RECORDINGS) {
      const wav = await render(rec, dir);
      const url = `${server}/api/badges/${rec.badgeId}/recordings?startedAt=${date}T${rec.startsAt}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "audio/wav" },
        body: await readFile(wav),
      });
      console.log(`${rec.badgeId} ${rec.startsAt} → ${res.status} ${await res.text()}`);
    }
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
