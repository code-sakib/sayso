// Harbor Blvd, electronics: one week of daily reports. Made-up demo data.

import type { DayReport } from "./types";

export const HARBOR_WEEK: DayReport[] = [
  {
    date: "2026-10-30",
    headline: "Laptop customers kept waiting while Arjun finished demos.",
    summary: "Four walkouts at Laptops, all after waits over three minutes. TVs had a perfect day.",
    customers: 55, conversations: 41, sales: 16, walkouts: 4, lostValue: 3100,
    moments: [
      {
        time: "17:05", repId: "arjun", kind: "wait", title: "Two people waiting, one demo",
        customer: "A mother and a teenage son looking for a school laptop, arrived while Arjun was mid-demo.",
        quote: "Give me five minutes, yeah?",
        transcript: [
          { at: "0:00", who: "rep", text: "(to the other customer) ...so if you open the settings here, you can push the fans to max..." },
          { at: "1:50", who: "rep", text: "Give me five minutes, yeah?" },
          { at: "2:00", who: "customer", text: "The mother checks her watch, the son drifts to the phone table." },
          { at: "3:20", who: "customer", text: "They leave together." },
        ],
        happened: "Arjun was showing fan settings to a customer who'd said they were \"just looking\". The family got one \"five minutes\" over his shoulder and left at the three-minute mark.",
        tryInstead: "Greet them first, then finish the demo: \"Hi! School laptop? These two are the ones I'd look at. I'm with you in a minute.\"",
      },
      {
        time: "18:30", repId: "hannah", kind: "save", title: "Right screen, first time",
        customer: "A retired man replacing a TV that died during the game last weekend.",
        quote: "Which room's it going in, and what do you mostly watch?",
        transcript: [
          { at: "0:00", who: "rep", text: "Oh no, mid-game? That's the worst. Which room's it going in, and what do you mostly watch?" },
          { at: "0:08", who: "customer", text: "Mimes throwing a football, then points to a mid-size screen." },
          { at: "0:12", who: "rep", text: "Sports, got it. Then you want this one. It's built for fast motion. No blur on the ball." },
          { at: "2:45", who: "rep", text: "We can mount it Saturday morning, before the game." },
        ],
        happened: "Hannah found out what he watched before showing screens, picked the model made for sports, and booked wall mounting before Saturday's game.",
        tryInstead: "Keep doing this.",
      },
    ],
    disputes: [],
    notes: [
      { repId: "arjun", note: "Greet new customers first, then finish the demo." },
      { repId: "hannah", note: "Zero walkouts again. Best close rate this week." },
    ],
  },
  {
    date: "2026-10-29",
    headline: "Bundle offers lifted phone sales.",
    summary: "Ryan offered the case and screen-guard bundle on every phone. Five of six phone buyers took it. A delivery-date complaint against Kevin was cleared by his recording.",
    customers: 47, conversations: 36, sales: 17, walkouts: 2, lostValue: 760,
    moments: [
      {
        time: "14:40", repId: "ryan", kind: "save", title: "Bundle while it's in their hand",
        customer: "A construction worker buying a phone after dropping their last one off a ladder.",
        quote: "Okay, so this time we're getting you the tough case, right?",
        transcript: [
          { at: "0:00", who: "rep", text: "Off a ladder? Ouch. Okay, so this time we're getting you the tough case, right?" },
          { at: "0:06", who: "customer", text: "Laughs, nods." },
          { at: "0:09", who: "rep", text: "Case and screen guard are $20 off with the phone today. Saves you this whole trip next time." },
        ],
        happened: "Ryan tied the bundle to the reason they were there. Offered while the phone was still in their hand. Bundle sold.",
        tryInstead: "Keep it up.",
      },
      {
        time: "16:15", repId: "kevin", kind: "walkout", title: "Price before delivery",
        customer: "A landlord buying a washing machine for a rental, comparing three models.",
        quote: "This one is $640.",
        transcript: [
          { at: "0:00", who: "rep", text: "This one is $640." },
          { at: "0:04", who: "customer", text: "Takes a photo of the price tag." },
          { at: "0:10", who: "rep", text: "Yeah, they're all around that." },
          { at: "0:40", who: "customer", text: "Leaves, still looking at their phone." },
        ],
        happened: "Kevin led with price on a washing machine. The landlord photographed the tag and left to compare online. Delivery and install, which matter most for a rental, never came up.",
        tryInstead: "Lead with free delivery and install, then the price: \"We'll deliver it to the rental and take the old one. Your tenant doesn't have to lift a thing.\"",
      },
    ],
    disputes: [
      {
        time: "11:45", repId: "kevin", kind: "promise", title: "\"He promised Saturday delivery\"",
        claim: "A customer called furious that their fridge was booked for Monday. They said Kevin promised Saturday and they'd taken the day off work for it.",
        recording: "Appliances · Oct 26 · 8 min",
        transcript: [
          { at: "5:30", who: "rep", text: "So the earliest slot I've got is Monday morning, eight to twelve." },
          { at: "5:36", who: "customer", text: "Frowns, then nods." },
          { at: "5:40", who: "rep", text: "If a Saturday frees up, I'll call you, but I can't promise it." },
        ],
        finding: "Kevin said Monday and said clearly he couldn't promise Saturday. The customer may have remembered the \"if a Saturday frees up\" part.",
        verdict: "cleared",
        outcome: "Manager explained kindly and checked the board. A Saturday slot had opened, so the store moved them up as a goodwill gesture. Nothing on Kevin's record.",
      },
    ],
    notes: [
      { repId: "ryan", note: "Five bundles today. Great work." },
      { repId: "kevin", note: "Mention free delivery and install before the price. And your clear Monday promise saved a complaint today." },
    ],
  },
  {
    date: "2026-10-28",
    headline: "Quiet day, nothing lost.",
    summary: "A slow Wednesday with no walkouts. Most conversations were questions about next week's offers.",
    customers: 31, conversations: 24, sales: 11, walkouts: 0, lostValue: 0,
    moments: [
      {
        time: "12:20", repId: "jasmine", kind: "save", title: "Protection plan at the till",
        customer: "A nursing student buying a laptop with their first paycheck, nervous about the price.",
        quote: "Do you carry it around a lot? Because most students add the two years.",
        transcript: [
          { at: "0:00", who: "rep", text: "Big purchase! Do you carry it around a lot?" },
          { at: "0:04", who: "customer", text: "Nods, pats their backpack." },
          { at: "0:07", who: "rep", text: "Then most students add the two years of cover. It's $89, and it covers drops and spills." },
          { at: "0:15", who: "rep", text: "No pressure though, totally up to you." },
        ],
        happened: "Jasmine asked one question to see if it fit, then offered the plan with no pressure. The customer added it.",
        tryInstead: "Keep asking at every laptop sale.",
      },
    ],
    disputes: [],
    notes: [{ repId: "jasmine", note: "Two protection plans sold at the till." }],
  },
  {
    date: "2026-10-27",
    headline: "Arjun's demo ran long again.",
    summary: "Two customers at Laptops left after waiting. The rest of the store did well.",
    customers: 44, conversations: 32, sales: 15, walkouts: 2, lostValue: 1480,
    moments: [
      {
        time: "15:55", repId: "arjun", kind: "wait", title: "No greeting",
        customer: "A small-business owner looking for three laptops for their office, a $3,000 order.",
        quote: "One second.",
        transcript: [
          { at: "0:00", who: "customer", text: "Stands at the laptop table holding a printed quote from another store." },
          { at: "1:40", who: "rep", text: "One second." },
          { at: "3:05", who: "customer", text: "Leaves." },
        ],
        happened: "The biggest sale of the day walked in and waited three minutes for a \"one second\". They had a competitor's quote in hand.",
        tryInstead: "A ten-second hello holds most customers. Anyone holding paper is ready to buy.",
      },
    ],
    disputes: [],
    notes: [{ repId: "arjun", note: "Same pattern as Thursday last week. Let's practise the quick greeting." }],
  },
  {
    date: "2026-10-26",
    headline: "Good Monday at TVs and Mobiles.",
    summary: "Hannah and Ryan closed most of the day's sales. One appliance walkout. A customer said Ryan mocked their old phone. The recording showed a friendly joke.",
    customers: 40, conversations: 31, sales: 16, walkouts: 1, lostValue: 520,
    moments: [
      {
        time: "13:30", repId: "kevin", kind: "walkout", title: "No trade-in mention",
        customer: "A couple comparing fridge prices on two phones at once.",
        quote: "That's our best price.",
        transcript: [
          { at: "0:00", who: "customer", text: "Holds up a phone showing a lower price online." },
          { at: "0:04", who: "rep", text: "That's our best price." },
          { at: "0:12", who: "customer", text: "Both leave." },
        ],
        happened: "The customers showed Kevin a lower online price. He didn't mention the trade-in, which would have beaten it.",
        tryInstead: "\"Is your old fridge still working? We'll take it, that's $60 off, and we'll haul it away.\"",
      },
    ],
    disputes: [
      {
        time: "16:20", repId: "ryan", kind: "conduct", title: "\"He made fun of my phone\"",
        claim: "An older customer told the manager Ryan laughed at their phone and made them feel stupid in front of other people.",
        recording: "Mobiles · Oct 26, 15:58 · 4 min",
        transcript: [
          { at: "0:00", who: "rep", text: "Oh wow, that's a classic! I haven't seen one of these in years." },
          { at: "0:05", who: "customer", text: "Pulls the phone back, looks away." },
          { at: "0:08", who: "rep", text: "Honestly, it's lasted you really well. Let's find you something just as simple." },
        ],
        finding: "Ryan wasn't rude. The \"classic\" comment was friendly, and he followed it with a compliment. But the customer clearly felt embarrassed by it, and the camera shows them pulling back.",
        verdict: "cleared",
        outcome: "Nothing on Ryan's record. The manager apologised that it felt that way and helped the customer pick a simple phone. Coaching note: skip jokes about a customer's old things.",
      },
    ],
    notes: [
      { repId: "kevin", note: "Mention trade-in when customers compare prices." },
      { repId: "ryan", note: "You weren't rude today, but skip the jokes about old phones. Some customers feel judged." },
    ],
  },
  {
    date: "2026-10-25",
    headline: "Sunday rush handled well.",
    summary: "Busy all afternoon. Jasmine kept the line under two minutes.",
    customers: 69, conversations: 50, sales: 25, walkouts: 3, lostValue: 1900,
    moments: [
      {
        time: "16:10", repId: "ryan", kind: "walkout", title: "Out of stock",
        customer: "A teenager with a parent, there for the exact phone a friend has.",
        quote: "We're out of that one, sorry.",
        transcript: [
          { at: "0:00", who: "rep", text: "We're out of that one, sorry." },
          { at: "0:04", who: "customer", text: "The parent asks something, pointing at the display." },
          { at: "0:08", who: "rep", text: "That's just the display model, we can't sell that one." },
          { at: "0:20", who: "customer", text: "They leave." },
        ],
        happened: "No alternative offered for the sold-out phone, and no offer to order it.",
        tryInstead: "\"It's back Wednesday. Want me to put it aside for you? Or this one's the same camera for $50 less.\"",
      },
      {
        time: "15:00", repId: "hannah", kind: "save", title: "Let them hear the sound bar",
        customer: "A young couple buying their first big TV. Very excited, very price-conscious.",
        quote: "The speakers on thin TVs are tiny. Want to hear the difference?",
        transcript: [
          { at: "0:00", who: "rep", text: "The speakers on thin TVs are tiny. Want to hear the difference?" },
          { at: "0:05", who: "customer", text: "Both nod." },
          { at: "0:30", who: "rep", text: "That's the TV alone... and that's with the sound bar." },
          { at: "0:40", who: "customer", text: "One of them laughs and gives a thumbs up." },
        ],
        happened: "Hannah played the same scene twice, with and without the sound bar. She didn't have to sell it.",
        tryInstead: "Keep it up.",
      },
    ],
    disputes: [],
    notes: [
      { repId: "ryan", note: "Offer to order out-of-stock phones." },
      { repId: "jasmine", note: "Great line management on the busiest day." },
    ],
  },
  {
    date: "2026-10-24",
    headline: "Solid Saturday.",
    summary: "Good sales across the store, two walkouts at Laptops in the afternoon. A complaint against Arjun couldn't be checked. His badge was off on his break.",
    customers: 63, conversations: 47, sales: 24, walkouts: 2, lostValue: 1350,
    moments: [
      {
        time: "14:25", repId: "arjun", kind: "walkout", title: "Specs before needs",
        customer: "A grandmother buying a laptop so she can video-call her grandkids.",
        quote: "So this one has 32 gigs of RAM and a dedicated GPU.",
        transcript: [
          { at: "0:00", who: "rep", text: "So this one has 32 gigs of RAM and a dedicated GPU." },
          { at: "0:06", who: "customer", text: "Looks confused, smiles politely." },
          { at: "0:30", who: "rep", text: "...and the refresh rate is 165, which is huge." },
          { at: "1:10", who: "customer", text: "Says thank you and leaves." },
        ],
        happened: "The customer only needed video calls. A minute of spec talk lost her. She was polite about it, but she left.",
        tryInstead: "\"What will you use it for?\" first. Then: \"This one has a great camera and it's simple to use. That's all you need.\"",
      },
    ],
    disputes: [
      {
        time: "14:50", repId: "arjun", kind: "conduct", title: "\"He was rude to me in the parking lot\"",
        claim: "A customer said Arjun was rude to them outside the store while they were asking about a laptop return.",
        recording: "No recording · badge on break, 14:00 to 14:30",
        transcript: [],
        finding: "Arjun was on his lunch break and his badge was off, as it should be. There's nothing on the recording either way.",
        verdict: "unclear",
        outcome: "Manager spoke to both. Arjun says he told the customer to come inside to the desk. Logged with no action, and the return was handled at the desk.",
      },
    ],
    notes: [{ repId: "arjun", note: "Ask about use first, specs later." }],
  },
];
