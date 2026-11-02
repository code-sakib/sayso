"use client";

import { useRef, useState } from "react";
import { FilmIcon } from "../Icons";

type Props = {
  label: string;
  accept: string;
  file: File | null;
  onChange: (file: File | null) => void;
  hint?: string;
  disabled?: boolean;
  /** Upload progress 0–1, or null before the upload starts. The card fills from the left as it climbs. */
  progress?: number | null;
};

/** A soft drop area for a file: click to browse or drag one in. Once chosen it becomes a card that fills as it uploads. */
export function FileField({ label, accept, file, onChange, hint, disabled, progress = null }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOver, setOver] = useState(false);
  const browse = () => inputRef.current?.click();

  const isUploading = progress !== null && progress < 1;
  const isDone = progress !== null && progress >= 1;
  const state = isUploading ? " is-uploading" : isDone ? " is-done" : "";

  return (
    <div className="ui-field">
      <span className="ui-label">{label}</span>
      <button
        type="button"
        className={`ui-drop${file ? " has-file" : ""}${isOver ? " is-over" : ""}${state}`}
        onClick={browse}
        disabled={disabled}
        aria-label={file ? `${label}: ${file.name}. Change` : `${label}: choose a video`}
        onDragOver={(e) => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setOver(false);
          const dropped = e.dataTransfer.files[0];
          if (dropped && !disabled) onChange(dropped);
        }}
      >
        {file && <span className="ui-drop-fill" style={{ transform: `scaleX(${progress ?? 0})` }} aria-hidden="true" />}
        <span className="ui-drop-icon"><FilmIcon /></span>
        {file ? (
          <>
            <span className="ui-drop-text">
              <b>{label}</b>
              <span role="status">{isUploading ? "Uploading…" : file.name}</span>
            </span>
            <span className="ui-drop-dot" aria-hidden="true" />
          </>
        ) : (
          <span className="ui-drop-text">
            <b>Choose a video</b>
            <span>{hint ?? "or drop it here"}</span>
          </span>
        )}
      </button>
      <input ref={inputRef} type="file" accept={accept} hidden onChange={(e) => onChange(e.target.files?.[0] ?? null)} />
    </div>
  );
}
