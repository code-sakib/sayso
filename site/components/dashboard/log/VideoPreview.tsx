"use client";

import { useEffect, useState } from "react";

const MB = 1024 ** 2;

/** "640 KB", "4.2 MB", "312 MB". */
const megabytes = (bytes: number) =>
  bytes < MB ? `${Math.round(bytes / 1024)} KB` : `${(bytes / MB).toFixed(bytes < 10 * MB ? 1 : 0)} MB`;

/** The chosen camera file, playable, with its name and size. Upload progress shows on the file card above. */
export function VideoPreview({ file }: { file: File }) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const next = URL.createObjectURL(file);
    setUrl(next);
    return () => URL.revokeObjectURL(next);
  }, [file]);

  return (
    <figure className="log-video">
      {url && <video src={url} controls muted playsInline preload="metadata" />}
      <figcaption>
        <span className="log-video-name">{file.name}</span>
        <span className="mono">{megabytes(file.size)}</span>
      </figcaption>
    </figure>
  );
}
