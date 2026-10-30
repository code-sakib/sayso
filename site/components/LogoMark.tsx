export function LogoMark({ size }: { size?: number }) {
  const style = size ? { width: size, height: size } : undefined;
  return (
    <svg className="logo-mark" style={style} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10.25" stroke="currentColor" strokeWidth="2.5" />
      <circle className="rec-fill" cx="12" cy="12" r="4" />
    </svg>
  );
}
