// Sends a message to the team's Telegram chat. Alerts are a convenience: if Telegram isn't set up or
// can't be reached, this logs and returns, and recording carries on regardless.

import { telegramBotToken, telegramChatId } from "../config.ts";

const SEND_TIMEOUT_MS = 10_000;

/** @param silent deliver without a sound, for frequent messages */
export async function sendTelegram(text: string, { silent = false } = {}): Promise<void> {
  const token = telegramBotToken();
  const chatId = telegramChatId();
  if (!token || !chatId) return;
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, disable_notification: silent }),
      signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
    });
    if (!res.ok) console.error(`[telegram] send failed (${res.status}): ${await res.text()}`);
  } catch (err) {
    console.error("[telegram] send failed:", err instanceof Error ? err.message : err);
  }
}
