"use client";

/** Saves the report as a PDF through the browser's print dialog, which drops the menus and inspect-only parts. */
export function DownloadReport() {
  return (
    <div className="report-download">
      <button type="button" className="btn btn-primary btn-sm" onClick={() => window.print()}>Download report (PDF)</button>
      <span className="muted">Opens your browser&apos;s print window. Choose &ldquo;Save as PDF&rdquo;.</span>
    </div>
  );
}
