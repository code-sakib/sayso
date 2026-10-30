import type { Branch } from "../branches";

// One mark per kind of store, drawn white on the store's own colour (outlines in the Lucide style).
const MARKS: Record<Branch["kind"], React.ReactNode> = {
  // A shirt
  Clothing: (
    <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
  ),
  // A screen and a phone
  Electronics: (
    <>
      <path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8" />
      <path d="M10 19v-3.96" />
      <path d="M7 19h5" />
      <rect x="16" y="12" width="6" height="10" rx="2" />
    </>
  ),
};

export function StoreLogo({ branch, size = 34 }: { branch: Branch; size?: number }) {
  return (
    <span className="store-logo" style={{ background: branch.accent, width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 24 24" width={size * 0.55} height={size * 0.55} fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {MARKS[branch.kind]}
      </svg>
    </span>
  );
}
