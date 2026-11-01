// What the badge is and does. Prototype targets, shown in the badge section at the bottom of the page.

export type BadgeSpec = { label: string; value: string; detail: string };

export const BADGE_SPECS: BadgeSpec[] = [
  { label: "Size", value: "Ø56 × 14 mm", detail: "About the size of a large coin." },
  { label: "Weight", value: "32 g", detail: "Light enough to forget it is there." },
  { label: "Battery", value: "14 h", detail: "A full shift of recording, with room to spare." },
  { label: "Charging", value: "USB-C", detail: "Full in about 90 minutes." },
  { label: "Microphones", value: "2 mics", detail: "Aimed at the wearer, not the room." },
  { label: "Storage", value: "16 GB", detail: "Encrypted. Uploads over store Wi-Fi after closing." },
];

export type BadgeFeature = { title: string; text: string };

export const BADGE_FEATURES: BadgeFeature[] = [
  { title: "Red light while recording", text: "Everyone can see when it is on. No light, no recording." },
  { title: "One button", text: "Press to stop or start. The mute switch on the side cuts the mics." },
  { title: "Magnet clip", text: "Snaps onto any shirt or lanyard. No pins, no holes." },
  { title: "Customer voices removed", text: "The badge keeps only the staff voice before anything leaves it." },
];
