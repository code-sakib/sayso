// Cartoon portrait drawn from the same look as the 3D figure, so the card matches who you hovered.

import type { Look } from "../look";

const INK = "#2A211C";
const HEAD = { x: 60, y: 52, r: 22 };
const CAP = "M37 55 C37 35 47 27 60 27 C73 27 83 35 83 55 C78 44 70 40 60 41 C50 40 42 44 37 55 Z";
const CURLS: [number, number][] = [[40, 42], [46, 33], [55, 28], [65, 28], [74, 33], [80, 42]];

function HairBack({ look }: { look: Look }) {
  if (look.hairStyle !== "long") return null;
  return <rect x="35" y="40" width="50" height="50" rx="16" fill={look.hair} />;
}

function HairFront({ look }: { look: Look }) {
  const { hair, hairStyle } = look;
  if (hairStyle === "bald") return null;
  if (hairStyle === "curly") {
    return <g fill={hair}>{CURLS.map(([x, y]) => <circle key={x} cx={x} cy={y} r="9" />)}<path d={CAP} /></g>;
  }
  return (
    <g fill={hair}>
      {hairStyle === "bun" && <circle cx="60" cy="24" r="9" />}
      <path d={CAP} />
    </g>
  );
}

function Face({ beard, glasses, hair }: { beard?: boolean; glasses?: boolean; hair: string }) {
  return (
    <g>
      <circle cx="51" cy="54" r="2.4" fill={INK} />
      <circle cx="69" cy="54" r="2.4" fill={INK} />
      <circle cx="46" cy="61" r="3.5" fill="#E8838A" opacity="0.25" />
      <circle cx="74" cy="61" r="3.5" fill="#E8838A" opacity="0.25" />
      {beard && <path d="M39 56 C41 72 50 78 60 78 C70 78 79 72 81 56 C76 64 70 67 60 67 C50 67 44 64 39 56 Z" fill={hair} />}
      <path d="M54 63 Q60 68 66 63" fill="none" stroke={beard ? "#F4EDE6" : INK} strokeWidth="1.8" strokeLinecap="round" />
      {glasses && (
        <g fill="none" stroke={INK} strokeWidth="1.8">
          <circle cx="51" cy="54" r="6" />
          <circle cx="69" cy="54" r="6" />
          <path d="M57 54 h6" />
        </g>
      )}
    </g>
  );
}

export function Avatar({ look, glasses, beard, tint }: { look: Look; glasses?: boolean; beard?: boolean; tint: string }) {
  return (
    <svg className="ov-portrait" viewBox="0 0 120 120" role="img" aria-hidden="true">
      <circle cx="60" cy="60" r="60" fill={tint} />
      <g clipPath="url(#avatar-clip)">
        <HairBack look={look} />
        <path d="M16 124 C16 98 35 86 60 86 C85 86 104 98 104 124 Z" fill={look.shirt} />
        <path d="M50 87 L60 98 L70 87" fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="2" strokeLinejoin="round" />
        <rect x="52" y="70" width="16" height="18" rx="5" fill={look.skin} />
        <circle cx={HEAD.x - HEAD.r} cy="56" r="4" fill={look.skin} />
        <circle cx={HEAD.x + HEAD.r} cy="56" r="4" fill={look.skin} />
        <circle cx={HEAD.x} cy={HEAD.y} r={HEAD.r} fill={look.skin} />
        <HairFront look={look} />
        <Face beard={beard} glasses={glasses} hair={look.hair} />
        {/* The SaySo badge on the chest */}
        <circle cx="78" cy="102" r="5.5" fill="#FFFFFF" stroke="rgba(0,0,0,0.12)" />
        <circle cx="78" cy="101" r="1.8" fill="#E5484D" />
      </g>
      <defs>
        <clipPath id="avatar-clip"><circle cx="60" cy="60" r="60" /></clipPath>
      </defs>
    </svg>
  );
}
