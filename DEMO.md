# Demo branch: Telegram field-test alerts

This branch is a **testing tool, not part of the SaySo product**. It is kept apart from `main` on purpose
and is not meant to be merged.

## Why it exists

A worn badge has one red light and no screen. Out in the field, on a phone hotspot, there is no easy way to
tell whether a recording is really reaching the server. This branch sends short messages to a Telegram
chat so the person testing can check from their phone.

| Message | Sent by | When |
|---|---|---|
| 🔴 Recording started | badge | after it joins Wi-Fi and starts recording |
| 🎙️ Recording arrived | server | each 1-minute piece the server saves (silent, no sound) |
| ⚪ Recording stopped | badge | when the button is held to sleep, with minutes sent |

## What it adds

- `site/engine/notify/`: the message wording (with tests) and the Telegram sender
- `site/app/api/badges/[badgeId]/events/`: where the badge reports started and stopped
- The upload route sends "Recording arrived" after each saved piece
- `firmware/badge/badge.ino`: `sendEvent()`, a tiny HTTPS message on start and before sleep, tried up to 3 times

It is light on the badge: two small messages per session, next to about 1.9 MB of audio uploaded every minute.
If Telegram is down or not set up, nothing breaks: recording and uploads carry on.

## Turning it on

1. Make a bot with @BotFather in Telegram, press Start on it and send it a message.
2. Add `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` to `site/.env.local` (git-ignored) and to the server's
   secrets. Without them the server sends nothing.
3. Deploy the server and flash the badge from this branch.

## Why it is not in the product

Store staff and managers should not get a phone ping every time someone starts work, and recording
alerts in a chat app would spread information about staff beyond the SaySo dashboard. The product
shows badge status on the dashboard instead.
