// Main St, electronics: one week of daily reports. Made-up demo data.

import type { DayReport } from "./types";

export const MAIN_ST_WEEK: DayReport[] = [
  {
    date: "2026-10-30",
    headline: "Three phone buyers left after being sent to the website.",
    summary:
      "A busy Friday evening. Mobiles lost three customers between 6 and 8 PM, all after a monthly-plan question was pointed to the website. TV sales had their best day of the week. A warranty complaint at the service desk was settled with Marcus's recording.",
    customers: 64, conversations: 48, sales: 21, walkouts: 5, lostValue: 2860,
    moments: [
      {
        time: "18:42", repId: "jake", kind: "walkout", title: "Sent to the website",
        customer: "A college student with a cracked older phone, holding the new model for over a minute. Came in with a friend.",
        quote: "Yeah, uh, it's all on the website, man.",
        transcript: [
          { at: "0:00", who: "rep", text: "Hey, that's the new one, yeah. Camera's way better." },
          { at: "0:09", who: "customer", text: "Turns the phone over, checks the price card." },
          { at: "0:14", who: "rep", text: "Monthly? Uh... there's a couple of plans. Honestly it's all on the website, man. Easier there." },
          { at: "0:22", who: "rep", text: "Josh, can you grab me the 128 from the back?" },
          { at: "0:55", who: "customer", text: "Puts the phone back on the stand. Leaves with their friend." },
        ],
        happened: "The customer asked how much the new phone was per month. Jake didn't know the plans, pointed to the website and turned to a colleague mid-sentence. The customer put the phone down 40 seconds later and walked out.",
        tryInstead: "\"It's $37 a month over 24 months, or $29 if you trade that one in. Want me to show you both side by side?\"",
      },
      {
        time: "19:15", repId: "priya", kind: "save", title: "Asked about the room first",
        customer: "A couple in their 30s who had just moved into a smaller apartment. They walked straight to the biggest TV on the wall.",
        quote: "Before we pick one, how far is the sofa from the wall?",
        transcript: [
          { at: "0:00", who: "rep", text: "That one's gorgeous, right? Before we pick one, how far is the sofa from the wall?" },
          { at: "0:08", who: "customer", text: "One of them holds their arms apart, then shrugs." },
          { at: "0:12", who: "rep", text: "About eight feet? Okay, honestly at eight feet the 75 is going to feel like the front row at the movies." },
          { at: "0:21", who: "rep", text: "Come stand here. This is the 65 at eight feet. See how you can take the whole screen in?" },
          { at: "1:40", who: "rep", text: "And if the dialogue's ever hard to hear, this sound bar fixes that. It's $180 off with the TV this week." },
        ],
        happened: "Priya asked about the room before showing screens. She walked them back to eight feet from the 65\" so they could see it for themselves. They bought the 65\" and the sound bar, $420 less than the 75\" alone and a much happier sale.",
        tryInstead: "Keep doing this. Share the \"stand at your sofa distance\" trick at the morning huddle.",
      },
      {
        time: "19:58", repId: "jake", kind: "walkout", title: "The same plan question, an hour later",
        customer: "A dad buying his daughter's first phone. Had already picked the colour.",
        quote: "You can check that online, it's pretty easy.",
        transcript: [
          { at: "0:00", who: "rep", text: "Good choice. The purple's been flying off the shelf." },
          { at: "0:31", who: "rep", text: "Plans... you can check that online, it's pretty easy. They've got a calculator thing." },
          { at: "0:40", who: "customer", text: "Looks at their own phone for a while." },
          { at: "2:12", who: "customer", text: "Hands the phone back to Jake and leaves." },
        ],
        happened: "Same question, same answer, same result. The dad tried to find the plan on his own phone for over a minute while standing at the counter, then gave up.",
        tryInstead: "Keep the plan sheet at the Mobiles table and walk through it while the phone is still in their hand.",
      },
    ],
    disputes: [
      {
        time: "12:20", repId: "marcus", kind: "promise", title: "\"He told me two years of warranty\"",
        claim: "A customer brought back a laptop with a dead keyboard, bought 13 months ago. They said Marcus told them it came with two years of warranty and wanted a free repair.",
        recording: "Laptops · Sep 28, 2025 · 6 min",
        transcript: [
          { at: "3:48", who: "rep", text: "So this one comes with one year from the maker." },
          { at: "3:53", who: "rep", text: "If you want two years, that's our protection plan. It's $89 and covers keyboards and drops too." },
          { at: "4:01", who: "customer", text: "Shakes their head." },
          { at: "4:03", who: "rep", text: "No problem at all. One year it is. Want a bag for it?" },
        ],
        finding: "Marcus clearly said one year, offered the two-year plan, and the customer turned it down. Nothing in the conversation promised two years.",
        verdict: "cleared",
        outcome: "The manager played Marcus's lines at the service desk. The customer remembered and calmed down. Store offered the repair at cost, and the customer took it.",
      },
    ],
    notes: [
      { repId: "jake", note: "Three walkouts on plan questions. Learn the two monthly plans by heart before Saturday." },
      { repId: "priya", note: "Best TV day this week. Your room-size question is worth teaching the team." },
      { repId: "marcus", note: "Your warranty explanation from last year saved a $240 free repair today. Keep saying it that clearly." },
    ],
  },
  {
    date: "2026-10-29",
    headline: "Laptop customers waited too long during a long demo.",
    summary:
      "A steady Thursday. A student at Laptops waited over three minutes while Marcus finished a gaming-laptop demo, and left. Appliances had a strong afternoon.",
    customers: 51, conversations: 39, sales: 17, walkouts: 3, lostValue: 1540,
    moments: [
      {
        time: "15:20", repId: "marcus", kind: "wait", title: "Nobody said hello",
        customer: "A student with a backpack and a printed list from their college, looking for a laptop under $800.",
        quote: "Just a sec, I'm with someone.",
        transcript: [
          { at: "0:00", who: "customer", text: "Waits at the end of the Laptops table, list in hand." },
          { at: "1:10", who: "rep", text: "(to the other customer) ...and see, at 240 hertz, the frame rate stays smooth even when..." },
          { at: "2:05", who: "rep", text: "Just a sec, I'm with someone." },
          { at: "3:30", who: "customer", text: "Folds the list and leaves." },
        ],
        happened: "Marcus was deep in a gaming-laptop demo for a customer who wasn't ready to buy. The student waited three and a half minutes and got one \"just a sec\" without eye contact, then left.",
        tryInstead: "Greet in the first ten seconds: \"Hey! Got a list from school? Have a look at these two, they tick every box. I'll be right with you.\"",
      },
      {
        time: "16:05", repId: "emily", kind: "save", title: "Trade-in on the fridge",
        customer: "A retired couple comparing fridge prices on their phone, clearly about to leave and buy online.",
        quote: "Is your old one still working? Because we'll take it off your hands.",
        transcript: [
          { at: "0:00", who: "rep", text: "That site's cheaper by forty, you're right. Can I ask, is your old one still working?" },
          { at: "0:09", who: "customer", text: "One of them nods, the other puts the phone away." },
          { at: "0:12", who: "rep", text: "Because we'll take it off your hands. That's $60 off, and we deliver and haul the old one out the same day." },
          { at: "0:25", who: "rep", text: "Online, you'd be stuck with it in the garage." },
        ],
        happened: "The couple were about to buy online for $40 less. Emily didn't argue the price. She mentioned the trade-in and the haul-away, which made the store cheaper and easier. Sale closed.",
        tryInstead: "Keep leading with trade-in when a customer compares prices.",
      },
    ],
    disputes: [],
    notes: [
      { repId: "marcus", note: "Greet new customers even mid-demo. A quick hello holds them." },
      { repId: "emily", note: "Trade-in mention closed two sales today." },
    ],
  },
  {
    date: "2026-10-28",
    headline: "A quiet Wednesday, and one promise the store had to keep.",
    summary:
      "Fewer customers than usual and only one walkout, on a price question at Mobiles. A delivery complaint showed Emily had promised free install after the offer ended, so the store refunded the fee.",
    customers: 38, conversations: 30, sales: 15, walkouts: 1, lostValue: 420,
    moments: [
      {
        time: "13:10", repId: "jake", kind: "walkout", title: "Price without the plan",
        customer: "A nurse on a lunch break who had pre-researched the phone and come in to buy it.",
        quote: "That's the price, it is what it is.",
        transcript: [
          { at: "0:00", who: "rep", text: "Yeah, $899 for the 256." },
          { at: "0:06", who: "customer", text: "Winces, puts the box down." },
          { at: "0:08", who: "rep", text: "I mean, that's the price, it is what it is." },
          { at: "0:20", who: "customer", text: "Checks the time and leaves." },
        ],
        happened: "The customer had already decided on the phone. The full price surprised them. Jake didn't mention the monthly plan or the case bundle and they walked out on a sale that was already made.",
        tryInstead: "\"Most people take it on the monthly plan. It comes to $37 a month with the case included.\"",
      },
      {
        time: "17:40", repId: "priya", kind: "save", title: "Booked an evening demo",
        customer: "A man looking at projectors for a backyard movie night, not sure his yard was dark enough.",
        quote: "Shall I book you a time to see it in the evening light?",
        transcript: [
          { at: "0:00", who: "rep", text: "You know what, the only honest answer is to see it at dusk." },
          { at: "0:07", who: "rep", text: "We dim the demo room at seven on Saturdays. Shall I book you a time to see it in the evening light?" },
          { at: "0:15", who: "customer", text: "Nods, takes out phone." },
          { at: "0:18", who: "rep", text: "Perfect, Saturday 7:15. I'll have the 4K one set up for you." },
        ],
        happened: "The customer wasn't ready to buy. Instead of pushing, Priya booked a Saturday evening demo and wrote it on the board.",
        tryInstead: "Keep offering a booked demo when a customer says \"not today\".",
      },
    ],
    disputes: [
      {
        time: "11:05", repId: "emily", kind: "promise", title: "\"She said install was free\"",
        claim: "A customer phoned in angry. The delivery crew charged $49 to install their washing machine, but they said Emily had told them install was free.",
        recording: "Appliances · Oct 27 · 9 min",
        transcript: [
          { at: "6:12", who: "rep", text: "And the good news is we deliver and install it free this week." },
          { at: "6:17", who: "customer", text: "Smiles, shakes Emily's hand." },
          { at: "6:20", who: "rep", text: "I'll put you down for Wednesday morning." },
        ],
        finding: "Emily did promise free install. The offer had ended on Sunday, the day before, and the sign was still up at Appliances.",
        verdict: "honoured",
        outcome: "Store refunded the $49 the same day and took down the old offer sign. Emily wasn't at fault for the sign. The real fix is checking the offer board each morning.",
      },
    ],
    notes: [
      { repId: "jake", note: "Mention the monthly plan whenever price comes up." },
      { repId: "priya", note: "Good follow-up. Saturday 7:15 demo is on the board." },
      { repId: "emily", note: "Check the offer board before your shift. An old sign cost us $49 today." },
    ],
  },
  {
    date: "2026-10-27",
    headline: "Long checkout line at lunch cost two sales.",
    summary:
      "Only one till was open between 1 and 2 PM. Two customers holding headphones left the line. A customer accused Daniel of swearing at them over a coupon. The recording showed he was polite the whole time.",
    customers: 46, conversations: 33, sales: 16, walkouts: 2, lostValue: 380,
    moments: [
      {
        time: "13:25", repId: "daniel", kind: "wait", title: "A line of seven",
        customer: "Two office workers, each holding a pair of headphones, near the back of the line.",
        quote: "Next, please. Sorry about the wait, folks.",
        transcript: [
          { at: "0:00", who: "rep", text: "Next, please. Sorry about the wait, folks." },
          { at: "2:40", who: "customer", text: "One of them checks the time, puts the headphones on the impulse shelf." },
          { at: "3:15", who: "customer", text: "The second one does the same and leaves." },
        ],
        happened: "The line reached seven people. Daniel worked fast and apologised, but he was alone. Two lunch-break customers ran out of time and left their headphones behind.",
        tryInstead: "Call a second rep to the till when the line passes four. Daniel did nothing wrong here, it's a staffing fix.",
      },
      {
        time: "16:50", repId: "marcus", kind: "save", title: "Asked what it was for",
        customer: "A freelance designer who said their old laptop \"just got slow\".",
        quote: "What do you use it for most, day to day?",
        transcript: [
          { at: "0:00", who: "rep", text: "Before I show you anything, what do you use it for most, day to day?" },
          { at: "0:05", who: "customer", text: "Mimes drawing on a tablet, then carrying a bag." },
          { at: "0:12", who: "rep", text: "Got it, design work and you carry it everywhere. Then skip the big gaming ones. This one's 2.9 pounds with a colour-accurate screen." },
          { at: "2:30", who: "rep", text: "A sleeve's $25 if you want to protect the screen in that bag." },
        ],
        happened: "Marcus asked about use before talking specs. The customer picked a lighter laptop plus a sleeve in under five minutes.",
        tryInstead: "Keep starting with the question. It cut the demo time in half.",
      },
    ],
    disputes: [
      {
        time: "14:40", repId: "daniel", kind: "conduct", title: "\"The cashier swore at me\"",
        claim: "A customer came to the manager shouting that Daniel had sworn at them and called them a cheapskate when their coupon was rejected. They wanted Daniel written up.",
        recording: "Checkout · Oct 27, 14:31 · 3 min",
        transcript: [
          { at: "0:00", who: "rep", text: "I'm really sorry, this coupon expired on the 20th." },
          { at: "0:06", who: "customer", text: "Raises voice, points at the coupon, leans over the counter." },
          { at: "0:14", who: "rep", text: "I understand. Let me check if there's a current one on the same item." },
          { at: "0:40", who: "rep", text: "There's 10% off with the loyalty card. It's free to sign up. Would that help?" },
          { at: "0:48", who: "customer", text: "Takes the receipt and walks to the service desk." },
        ],
        finding: "Daniel stayed calm and polite the whole time. He apologised, looked for a current offer and suggested the loyalty discount. No swearing, no name-calling.",
        verdict: "cleared",
        outcome: "Complaint closed. Nothing goes on Daniel's record. The manager thanked him for staying calm with an upset customer at a busy till.",
      },
    ],
    notes: [
      { repId: "daniel", note: "You handled an angry customer perfectly today. And raise a hand for help when the line passes four." },
      { repId: "marcus", note: "Good opening question today. Keep it." },
    ],
  },
  {
    date: "2026-10-26",
    headline: "Strong Monday, led by appliances.",
    summary:
      "The washing machine offer brought in families. Emily closed four appliance sales and nobody walked out at Appliances.",
    customers: 42, conversations: 35, sales: 18, walkouts: 1, lostValue: 650,
    moments: [
      {
        time: "12:30", repId: "emily", kind: "save", title: "Delivery before price",
        customer: "A young family with a toddler in a stroller. Their washer broke over the weekend.",
        quote: "Oh no, with a little one? Let's get you sorted by Wednesday.",
        transcript: [
          { at: "0:00", who: "rep", text: "Oh no, with a little one? Let's get you sorted by Wednesday." },
          { at: "0:10", who: "rep", text: "We deliver and install it free this week, and we take the broken one away." },
          { at: "0:22", who: "customer", text: "Both parents look at each other and nod." },
          { at: "3:40", who: "rep", text: "This one does a full load in 28 minutes. Trust me, you'll love that." },
        ],
        happened: "Emily understood the urgency before talking price. She led with fast delivery and haul-away. The sale closed in six minutes.",
        tryInstead: "Keep leading with what the customer needs fixed. Share it with Appliances at Harbor Blvd.",
      },
      {
        time: "18:05", repId: "jake", kind: "walkout", title: "Stepped away mid-sale",
        customer: "A woman upgrading her phone on the financing plan, reading the terms sheet.",
        quote: "Hold on, let me check on something.",
        transcript: [
          { at: "0:00", who: "rep", text: "So this is the 24-month one, zero percent." },
          { at: "0:30", who: "rep", text: "Hold on, let me check on something." },
          { at: "0:32", who: "customer", text: "Reads the sheet alone at the counter." },
          { at: "4:10", who: "customer", text: "Puts the sheet down and leaves." },
          { at: "4:45", who: "rep", text: "Okay, sorry about that... oh." },
        ],
        happened: "Jake left the customer mid-financing to help someone else and didn't say when he'd be back. She waited four minutes alone and left.",
        tryInstead: "Say how long you'll be: \"Two minutes, have a read and I'll be right back.\"",
      },
    ],
    disputes: [],
    notes: [
      { repId: "emily", note: "Four appliance sales, zero walkouts. Great day." },
      { repId: "jake", note: "Don't leave a customer mid-sale without saying when you'll return." },
    ],
  },
  {
    date: "2026-10-25",
    headline: "Busy Sunday, two walkouts at TVs during the rush.",
    summary:
      "The busiest day of the week. TV & Home theater was short a rep from 4 PM, and a family left after waiting. A customer said Priya told them to wait outside. The recording showed otherwise.",
    customers: 78, conversations: 55, sales: 26, walkouts: 4, lostValue: 2120,
    moments: [
      {
        time: "16:35", repId: "priya", kind: "wait", title: "Alone at TVs",
        customer: "A family of four looking at TVs for a game room, the kids already picking one.",
        quote: "I'll be right with you, I'm so sorry, it's mad today.",
        transcript: [
          { at: "0:00", who: "rep", text: "I'll be right with you, I'm so sorry, it's mad today." },
          { at: "2:10", who: "rep", text: "(to another customer) The wall mount's in aisle four, I'll meet you there." },
          { at: "4:05", who: "customer", text: "The parents round up the kids and leave." },
        ],
        happened: "Priya had three customers at once and greeted everyone, but she couldn't get to the family in time. They waited four minutes and left.",
        tryInstead: "Not Priya's fault. Ask Marcus to cover TVs during the Sunday rush. Laptops is quiet then.",
      },
      {
        time: "14:10", repId: "jake", kind: "save", title: "Bundle while it's in their hand",
        customer: "A teenager buying a phone with birthday money, mum standing nearby.",
        quote: "Want the case and screen guard with it? It's $20 off together.",
        transcript: [
          { at: "0:00", who: "rep", text: "Happy birthday, man! Good pick." },
          { at: "0:05", who: "rep", text: "Want the case and screen guard with it? It's $20 off together, and honestly, a screen costs $200 to fix." },
          { at: "0:14", who: "customer", text: "The mum nods before the teen can answer." },
        ],
        happened: "Jake offered the bundle while the phone was still in the customer's hand, and gave a real reason. He sold all three.",
        tryInstead: "This is the move. Do it on every phone sale.",
      },
    ],
    disputes: [
      {
        time: "17:10", repId: "priya", kind: "conduct", title: "\"She told me to wait outside\"",
        claim: "A customer told the manager Priya was rude, ignored them, and told them to \"wait outside if you're in a hurry\". They said they'd post a review.",
        recording: "TV & Home theater · Oct 25, 16:44 · 5 min",
        transcript: [
          { at: "0:00", who: "rep", text: "Hi! I'm with this family, I'll be with you in two minutes, I promise." },
          { at: "2:20", who: "customer", text: "Taps on the TV stand, arms crossed." },
          { at: "2:24", who: "rep", text: "Sorry for the wait, nearly there. Grab a seat on the sofa if you like." },
          { at: "4:30", who: "rep", text: "Thank you so much for waiting. What can I help you with?" },
        ],
        finding: "Priya greeted the customer straight away, apologised twice and offered them the demo sofa. She never said \"wait outside\". The wait was real, but it was a staffing gap, not rudeness.",
        verdict: "cleared",
        outcome: "Manager apologised for the wait, not for Priya. The customer bought the wall mount they came for. Nothing goes on Priya's record.",
      },
    ],
    notes: [
      { repId: "priya", note: "Not your fault. We need two people at TVs on Sundays after 4. And thanks for staying kind under pressure." },
      { repId: "jake", note: "Bundle offer worked three times today." },
    ],
  },
  {
    date: "2026-10-24",
    headline: "Saturday ran well with one missed upsell.",
    summary:
      "Good conversion all day. One laptop sale went through without the protection plan. A customer said Jake promised an unlocked phone. The recording showed he'd explained the lock.",
    customers: 70, conversations: 52, sales: 27, walkouts: 2, lostValue: 900,
    moments: [
      {
        time: "11:50", repId: "marcus", kind: "save", title: "Closed in five minutes",
        customer: "A remote worker who had already narrowed it down to two laptops online.",
        quote: "Is this mostly for work, or games too?",
        transcript: [
          { at: "0:00", who: "rep", text: "Is this mostly for work, or games too?" },
          { at: "0:04", who: "customer", text: "Points at the work laptop." },
          { at: "0:06", who: "rep", text: "Then the 14-inch. Better battery, better webcam for calls. Done." },
          { at: "4:50", who: "rep", text: "Okay, you're all set. Enjoy it!" },
        ],
        happened: "A quick, clear sale. But the protection plan was never mentioned, and remote workers are the customers who need it most.",
        tryInstead: "Add one line before the till: \"Most people who work from home add the two-year plan. It's $89.\"",
      },
      {
        time: "17:20", repId: "jake", kind: "walkout", title: "Out of stock, no alternative",
        customer: "A woman who had come in specifically for the blue phone she'd seen in the ad.",
        quote: "Nah, we don't have that colour.",
        transcript: [
          { at: "0:00", who: "rep", text: "Nah, we don't have that colour." },
          { at: "0:05", who: "customer", text: "Waits, looking at Jake." },
          { at: "0:09", who: "rep", text: "Just the black and the white right now." },
          { at: "0:15", who: "customer", text: "Leaves." },
        ],
        happened: "The customer clearly wanted to buy. Jake didn't offer to order the blue one or hold it for her. A sale walked out.",
        tryInstead: "\"We can have the blue one here on Tuesday. Want me to put your name on it?\"",
      },
    ],
    disputes: [
      {
        time: "15:30", repId: "jake", kind: "promise", title: "\"He said it was unlocked\"",
        claim: "A customer came back angry that their new phone wouldn't take a SIM from another carrier. They said Jake promised it was unlocked and wanted a full refund.",
        recording: "Mobiles · Oct 10 · 7 min",
        transcript: [
          { at: "5:02", who: "rep", text: "One thing, this one's locked to the carrier for 60 days." },
          { at: "5:07", who: "rep", text: "After that you just call them and they unlock it, free." },
          { at: "5:12", who: "customer", text: "Nods, signs the screen." },
        ],
        finding: "Jake explained the 60-day lock clearly, and the customer agreed and signed. The phone will unlock in 46 days.",
        verdict: "cleared",
        outcome: "Manager showed the customer the date their unlock opens and helped them set a reminder. No refund needed, and the customer left calm.",
      },
    ],
    notes: [
      { repId: "marcus", note: "Offer the protection plan at every laptop sale." },
      { repId: "jake", note: "When something is out of stock, offer to order it. And good job explaining the lock on the 10th, it saved a refund today." },
    ],
  },
];
