"""SaySo server on Modal: the Next.js site with its engine, always on, at one public HTTPS address.

Badges upload over the internet to /api/badges/<id>/recordings, and anyone with the link opens the
dashboard. Recordings, entries and reports live on a Modal Volume, so they survive restarts.

    modal deploy deploy/modal_app.py

Needs a Modal secret named "sayso-secrets" holding MODEL_API_KEY and SAYSO_BADGE_TOKEN.
"""

import subprocess
import threading
import time
from pathlib import Path

import modal

SITE = Path(__file__).resolve().parent.parent / "site"
APP_DIR = "/app"
DATA_DIR = "/data"
PORT = 3000
COMMIT_EVERY_SECONDS = 20  # how often new recordings are saved to the volume

image = (
    modal.Image.from_registry("node:22-bookworm-slim", add_python="3.12")
    .apt_install("ffmpeg")
    .env({"NEXT_TELEMETRY_DISABLED": "1", "SAYSO_DATA_DIR": DATA_DIR, "TZ": "Asia/Kolkata"})
    .add_local_dir(
        SITE,
        APP_DIR,
        copy=True,
        ignore=["node_modules", ".next", "data", ".env*", "tsconfig.tsbuildinfo"],
    )
    .run_commands(f"cd {APP_DIR} && npm ci && npm run build")
)

app = modal.App("sayso", image=image)
volume = modal.Volume.from_name("sayso-data", create_if_missing=True)


def commit_forever() -> None:
    """Uploads and reports are written by the Node server, so save the volume on a timer."""
    while True:
        time.sleep(COMMIT_EVERY_SECONDS)
        try:
            volume.commit()
        except Exception as err:  # keep serving even if one save fails
            print(f"[volume] commit failed: {err}", flush=True)


@app.function(
    volumes={DATA_DIR: volume},
    secrets=[modal.Secret.from_name("sayso-secrets")],
    cpu=2,
    memory=4096,
    min_containers=1,  # always on: background processing jobs live in this one server
    max_containers=1,
    timeout=24 * 60 * 60,
    # Mumbai: badges upload from Indian stores, and the badge's small Wi-Fi bursts crawl over long round trips
    region="ap-south",
    routing_region="ap-south",
)
@modal.concurrent(max_inputs=100)
@modal.web_server(port=PORT, startup_timeout=180)
def web() -> None:
    subprocess.Popen(["npx", "next", "start", "-p", str(PORT), "-H", "0.0.0.0"], cwd=APP_DIR)
    threading.Thread(target=commit_forever, daemon=True).start()
