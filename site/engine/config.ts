// Models, limits and paths for the SaySo engine: one place to tune cost and safety.

import path from "node:path";

export const META_API_BASE = "https://api.meta.ai/v1";

export const MODELS = {
  transcribe: "muse-voice-transcribe-1.0",
  segment: "sam-3.1",
  report: "muse-spark-1.3",
} as const;

/** SAM bills per frame, so camera video is cut to this many frames a second before it is sent. */
export const VIDEO_FPS = 2;
/** Widest frame sent to SAM, in pixels. People stay easy to find at this size. */
export const VIDEO_MAX_WIDTH = 640;
/** Longest camera clip one entry takes. At 2 fps that is 3,600 frames a prompt, about $0.72. */
export const MAX_VIDEO_SECONDS = 30 * 60;
export const MAX_VIDEO_BYTES = 1024 ** 3;

/** Transcription takes at most 10 minutes of audio a request, so badge audio is cut a little under. */
export const AUDIO_CHUNK_SECONDS = 9 * 60;
export const MAX_BADGE_UPLOAD_BYTES = 200 * 1024 ** 2;

/** Silence longer than this between a rep's lines starts a new conversation. */
export const CONVERSATION_GAP_SECONDS = 45;
/** People seen for less than this are passers-by, not customers. */
export const MIN_VISIT_SECONDS = 4;

/** How each store's staff look on camera, so SAM can tell them from customers. */
export const STAFF_LOOK: Record<string, string> = {
  electronics: "person wearing a dark green shirt",
  harbor: "person wearing a dark green shirt",
  fashion: "person wearing a cream shirt",
};

/** Stores are in India; badge alerts show this local time. */
export const STORE_TIME_ZONE = "Asia/Kolkata";

/** Entries one visitor may process an hour: every run spends real model credit. */
export const RUNS_PER_HOUR = 6;

export const dataDir = () => process.env.SAYSO_DATA_DIR ?? path.join(process.cwd(), "data");
export const modelApiKey = () => process.env.MODEL_API_KEY || null;
export const badgeToken = () => process.env.SAYSO_BADGE_TOKEN || null;
export const telegramBotToken = () => process.env.TELEGRAM_BOT_TOKEN || null;
export const telegramChatId = () => process.env.TELEGRAM_CHAT_ID || null;
