// Sample sales teams for the three demo branches. Names and numbers are made up.

import type { HairStyle, Look } from "./look";

export type StaffProfile = {
  id: string;
  branch: string;
  name: string;
  role: string;
  section: string;
  rating: number;
  languages: string[];
  look: Look;
  glasses?: boolean;
  beard?: boolean;
  badge: { id: string; battery: number; recording: boolean; talkTime: string };
  today: { customers: number; sales: number; walkouts: number };
  coaching: string;
};

/** Each branch dresses its team differently. */
export const UNIFORMS: Record<string, { shirt: string; pants: string }> = {
  electronics: { shirt: "#1B5E42", pants: "#2D3440" },
  harbor: { shirt: "#1B5E42", pants: "#2D3440" },
  fashion: { shirt: "#F1E6D6", pants: "#3F3A36" },
};

const staffLook = (branch: string, skin: string, hair: string, hairStyle: HairStyle): Look => ({
  skin,
  hair,
  hairStyle,
  ...UNIFORMS[branch],
});

export const STAFF_PROFILES: StaffProfile[] = [
  // Electronics, Main St
  {
    id: "jake", branch: "electronics", name: "Jake Miller", role: "Sales associate", section: "Mobiles", rating: 3.8,
    languages: ["English"], look: staffLook("electronics", "#E8B896", "#8B4A2B", "short"),
    badge: { id: "SB-01", battery: 78, recording: true, talkTime: "2h 41m" },
    today: { customers: 23, sales: 9, walkouts: 3 },
    coaching: "Hand over the financing sheet before stepping away to another customer.",
  },
  {
    id: "priya", branch: "electronics", name: "Priya Nair", role: "Senior associate", section: "TV & Home theater", rating: 4.7,
    languages: ["English", "Hindi"], look: staffLook("electronics", "#A8724E", "#1F1A17", "bun"),
    badge: { id: "SB-02", battery: 64, recording: true, talkTime: "3h 05m" },
    today: { customers: 14, sales: 6, walkouts: 1 },
    coaching: "Great demos. Ask about room size earlier to skip the wrong screen sizes.",
  },
  {
    id: "marcus", branch: "electronics", name: "Marcus Johnson", role: "Sales associate", section: "Laptops", rating: 4.3,
    languages: ["English"], look: staffLook("electronics", "#6B4128", "#1F1A17", "bald"), beard: true,
    badge: { id: "SB-03", battery: 91, recording: true, talkTime: "1h 52m" },
    today: { customers: 17, sales: 5, walkouts: 2 },
    coaching: "Ask what the laptop is for before quoting specs.",
  },
  {
    id: "emily", branch: "electronics", name: "Emily Carter", role: "Appliance specialist", section: "Appliances", rating: 4.6,
    languages: ["English", "Spanish"], look: staffLook("electronics", "#F3CFB3", "#C9A15A", "long"),
    badge: { id: "SB-04", battery: 55, recording: true, talkTime: "2h 18m" },
    today: { customers: 11, sales: 4, walkouts: 1 },
    coaching: "Mention the trade-in offer when customers compare prices.",
  },
  {
    id: "daniel", branch: "electronics", name: "Daniel Kim", role: "Cashier", section: "Checkout", rating: 4.8,
    languages: ["English", "Korean"], look: staffLook("electronics", "#E8B896", "#1F1A17", "short"), glasses: true,
    badge: { id: "SB-05", battery: 83, recording: false, talkTime: "0h 46m" },
    today: { customers: 31, sales: 31, walkouts: 0 },
    coaching: "Checkout line under 2 minutes all day. Keep it up.",
  },

  // Electronics, Harbor Blvd
  {
    id: "ryan", branch: "harbor", name: "Ryan Cooper", role: "Sales associate", section: "Mobiles", rating: 4.1,
    languages: ["English"], look: staffLook("harbor", "#F3CFB3", "#C9A15A", "short"),
    badge: { id: "SB-11", battery: 72, recording: true, talkTime: "2h 12m" },
    today: { customers: 19, sales: 7, walkouts: 2 },
    coaching: "Offer the case and screen-guard bundle while the phone is still in their hand.",
  },
  {
    id: "hannah", branch: "harbor", name: "Hannah Wright", role: "Senior associate", section: "TV & Home theater", rating: 4.8,
    languages: ["English"], look: staffLook("harbor", "#E8B896", "#5A3B24", "long"),
    badge: { id: "SB-12", battery: 58, recording: true, talkTime: "3h 01m" },
    today: { customers: 12, sales: 6, walkouts: 0 },
    coaching: "Best TV close rate this week. Share your room-size question with the team.",
  },
  {
    id: "arjun", branch: "harbor", name: "Arjun Mehta", role: "Sales associate", section: "Laptops", rating: 3.9,
    languages: ["English", "Hindi", "Gujarati"], look: staffLook("harbor", "#A8724E", "#1F1A17", "short"), beard: true,
    badge: { id: "SB-13", battery: 88, recording: true, talkTime: "1h 47m" },
    today: { customers: 16, sales: 4, walkouts: 4 },
    coaching: "Two customers waited over 3 minutes at Laptops. Greet them first, then finish the demo.",
  },
  {
    id: "kevin", branch: "harbor", name: "Kevin Nguyen", role: "Appliance specialist", section: "Appliances", rating: 4.4,
    languages: ["English", "Vietnamese"], look: staffLook("harbor", "#E8B896", "#1F1A17", "short"), glasses: true,
    badge: { id: "SB-14", battery: 41, recording: true, talkTime: "2h 26m" },
    today: { customers: 10, sales: 3, walkouts: 1 },
    coaching: "Mention free delivery and install before the customer asks about price.",
  },
  {
    id: "jasmine", branch: "harbor", name: "Jasmine Hall", role: "Cashier", section: "Checkout", rating: 4.6,
    languages: ["English"], look: staffLook("harbor", "#6B4128", "#1F1A17", "curly"),
    badge: { id: "SB-15", battery: 79, recording: false, talkTime: "0h 58m" },
    today: { customers: 28, sales: 28, walkouts: 0 },
    coaching: "Ask about the protection plan at every laptop sale.",
  },

  // Clothing, Mission St
  {
    id: "chloe", branch: "fashion", name: "Chloe Davis", role: "Personal stylist", section: "Womenswear", rating: 4.6,
    languages: ["English"], look: staffLook("fashion", "#F3CFB3", "#E2C27A", "long"),
    badge: { id: "SB-21", battery: 69, recording: true, talkTime: "2h 33m" },
    today: { customers: 27, sales: 12, walkouts: 2 },
    coaching: "Suggest a second item that completes the outfit before the fitting room.",
  },
  {
    id: "tyler", branch: "fashion", name: "Tyler Brooks", role: "Sales associate", section: "Menswear", rating: 3.9,
    languages: ["English"], look: staffLook("fashion", "#D9A47A", "#5A3B24", "short"),
    badge: { id: "SB-22", battery: 47, recording: true, talkTime: "1h 39m" },
    today: { customers: 19, sales: 5, walkouts: 4 },
    coaching: "Customers asking for sizes left while you checked the stockroom. Offer to hold their spot.",
  },
  {
    id: "maya", branch: "fashion", name: "Maya Thompson", role: "Fitting room lead", section: "Fitting rooms", rating: 4.5,
    languages: ["English", "Spanish"], look: staffLook("fashion", "#8D5A3B", "#1F1A17", "curly"),
    badge: { id: "SB-23", battery: 81, recording: true, talkTime: "2h 10m" },
    today: { customers: 22, sales: 10, walkouts: 1 },
    coaching: "Check in on every room after 2 minutes. It doubled add-on sales last week.",
  },
  {
    id: "ava", branch: "fashion", name: "Ava Wilson", role: "Accessories stylist", section: "Accessories", rating: 4.4,
    languages: ["English"], look: staffLook("fashion", "#F3CFB3", "#8B4A2B", "bun"),
    badge: { id: "SB-25", battery: 63, recording: true, talkTime: "1h 58m" },
    today: { customers: 21, sales: 9, walkouts: 1 },
    coaching: "Suggest a bag or belt once the outfit is chosen. Add-ons are 30% of your sales.",
  },
  {
    id: "luis", branch: "fashion", name: "Luis Garcia", role: "Cashier", section: "Checkout", rating: 4.7,
    languages: ["English", "Spanish"], look: staffLook("fashion", "#C68E62", "#2A211C", "short"), beard: true,
    badge: { id: "SB-24", battery: 74, recording: false, talkTime: "0h 52m" },
    today: { customers: 34, sales: 34, walkouts: 0 },
    coaching: "Ask about the loyalty card at every sale. Sign-ups are up 20%.",
  },
];

export const profileById = (id: string) => STAFF_PROFILES.find((p) => p.id === id);
export const profilesIn = (branch: string) => STAFF_PROFILES.filter((p) => p.branch === branch);
