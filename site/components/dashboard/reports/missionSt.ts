// Mission St, clothing: one week of daily reports. Made-up demo data.

import type { DayReport } from "./types";

export const MISSION_ST_WEEK: DayReport[] = [
  {
    date: "2026-10-30",
    headline: "Size requests turned into walkouts at Menswear.",
    summary: "Tyler went to the stockroom for sizes four times. Three customers left before he came back. A customer said Maya commented on their size. The recording showed she didn't.",
    customers: 72, conversations: 50, sales: 24, walkouts: 4, lostValue: 640,
    moments: [
      {
        time: "18:10", repId: "tyler", kind: "walkout", title: "Gone to the stockroom",
        customer: "A guy buying a jacket for a job interview on Monday. Holding a large, needed a medium.",
        quote: "Let me check in the back.",
        transcript: [
          { at: "0:00", who: "rep", text: "Medium? Let me check in the back." },
          { at: "0:03", who: "customer", text: "Stands alone holding the large, looks around." },
          { at: "2:30", who: "customer", text: "Hangs the jacket on the nearest rack." },
          { at: "4:10", who: "rep", text: "Found it! ...Hello?" },
        ],
        happened: "Tyler left without giving the customer anything to do. He was gone four minutes and the customer was gone when he came back, medium in hand.",
        tryInstead: "\"I'll grab a medium. Try the shirt that goes with it while I'm gone. Room three's free.\"",
      },
      {
        time: "17:20", repId: "chloe", kind: "save", title: "Completed the outfit",
        customer: "A woman shopping for a friend's wedding next weekend. Had a dress, unsure about it.",
        quote: "Can I show you something? This belt would pull it together.",
        transcript: [
          { at: "0:00", who: "rep", text: "That colour is so good on you. Can I show you something?" },
          { at: "0:05", who: "rep", text: "This belt would pull it together. It gives you a waist, and it's great for dancing." },
          { at: "0:12", who: "customer", text: "Holds the belt against the dress in the mirror, smiles." },
        ],
        happened: "Chloe suggested the belt before the fitting room, so the customer tried the whole look at once. Bought both.",
        tryInstead: "Keep suggesting the second item early.",
      },
    ],
    disputes: [
      {
        time: "16:05", repId: "maya", kind: "conduct", title: "\"She made a comment about my size\"",
        claim: "A customer told the manager, upset, that Maya made a comment about their weight at the fitting room and they felt humiliated.",
        recording: "Fitting rooms · Oct 30, 15:48 · 6 min",
        transcript: [
          { at: "0:00", who: "rep", text: "How's the fit? Want me to grab you anything?" },
          { at: "0:06", who: "customer", text: "Hands a pair of jeans over the door." },
          { at: "0:09", who: "rep", text: "No problem. This brand runs really small, honestly everyone sizes up in it." },
          { at: "1:20", who: "rep", text: "Here you go, and I brought the other wash too in case you like it better." },
        ],
        finding: "Maya didn't comment on the customer's size or body. She said the brand runs small, which is true and is in the brand's own size guide. She was kind throughout.",
        verdict: "cleared",
        outcome: "Nothing on Maya's record. The manager listened, apologised that it felt that way, and the customer bought the jeans. Team note: say \"this one runs small\" before handing the size over, not after.",
      },
    ],
    notes: [
      { repId: "tyler", note: "Give the customer something to do before you go to the stockroom." },
      { repId: "chloe", note: "Add-on before the fitting room worked four times." },
      { repId: "maya", note: "You did nothing wrong today. Try mentioning a brand runs small before they try it on." },
    ],
  },
  {
    date: "2026-10-29",
    headline: "Fitting room check-ins doubled add-ons.",
    summary: "Maya checked on every room after two minutes. Add-on sales were the best this week.",
    customers: 58, conversations: 42, sales: 23, walkouts: 1, lostValue: 120,
    moments: [
      {
        time: "15:45", repId: "maya", kind: "save", title: "Two-minute check-in",
        customer: "A college student trying on jeans alone, two pairs in the room.",
        quote: "How's the fit? I can grab the next size so you don't have to get dressed again.",
        transcript: [
          { at: "0:00", who: "rep", text: "How's the fit in there? I can grab the next size so you don't have to get dressed again." },
          { at: "0:06", who: "customer", text: "Opens the door a crack, holds up the jeans." },
          { at: "0:40", who: "rep", text: "Here's the 28. And this top's on the 2-for-1 rack, it'd look great with the light wash." },
        ],
        happened: "Maya brought a different size and a matching top without being asked. Customer bought both.",
        tryInstead: "Keep checking in at two minutes.",
      },
    ],
    disputes: [],
    notes: [{ repId: "maya", note: "Add-ons doubled. Teach the two-minute check-in at the huddle." }],
  },
  {
    date: "2026-10-28",
    headline: "A calm Wednesday.",
    summary: "Steady traffic, one walkout at Accessories. A customer said Luis allowed 60-day returns. He'd said 30.",
    customers: 45, conversations: 31, sales: 18, walkouts: 1, lostValue: 85,
    moments: [
      {
        time: "13:05", repId: "ava", kind: "walkout", title: "No help with the bag",
        customer: "A woman looking for a work bag that fits a laptop, on a lunch break.",
        quote: "Those are all on the wall over there.",
        transcript: [
          { at: "0:00", who: "rep", text: "Bags? Those are all on the wall over there." },
          { at: "0:04", who: "customer", text: "Walks to the wall, picks up three bags one at a time." },
          { at: "3:00", who: "customer", text: "Puts the last one back and leaves." },
        ],
        happened: "The customer asked about bags and was pointed to the wall. She tried three on her own, couldn't tell which fit a laptop and left.",
        tryInstead: "Walk over with them: \"For a laptop? These two fit a 15-inch. Want to try them with yours?\"",
      },
    ],
    disputes: [
      {
        time: "17:30", repId: "luis", kind: "promise", title: "\"He said I had 60 days to return it\"",
        claim: "A customer tried to return a coat bought 41 days ago and was refused. They said Luis told them they had 60 days.",
        recording: "Checkout · Sep 17 · 2 min",
        transcript: [
          { at: "1:10", who: "rep", text: "Returns are 30 days with the tags on, receipt's in the bag." },
          { at: "1:15", who: "rep", text: "Over the holidays it's 60, but that starts in November." },
          { at: "1:20", who: "customer", text: "Nods, takes the bag." },
        ],
        finding: "Luis said 30 days. He also mentioned the 60-day holiday window, which may be where the mix-up came from, but he was clear it starts in November.",
        verdict: "cleared",
        outcome: "Manager offered store credit as a one-off, and the customer accepted. Team note: skip the holiday policy unless the customer asks. It confuses people.",
      },
    ],
    notes: [
      { repId: "ava", note: "Walk customers to the wall instead of pointing." },
      { repId: "luis", note: "Your return explanation was right. Only mention the holiday window if they're buying a gift." },
    ],
  },
  {
    date: "2026-10-27",
    headline: "Loyalty sign-ups up at checkout, and one wrong promise about leather.",
    summary: "Luis asked about the loyalty card at every sale. Eleven sign-ups. A customer said Tyler called a faux-leather jacket real leather. The recording showed he did, so the store refunded it.",
    customers: 50, conversations: 36, sales: 21, walkouts: 2, lostValue: 210,
    moments: [
      {
        time: "16:30", repId: "luis", kind: "save", title: "Loyalty card at every sale",
        customer: "A regular who'd shopped here for years but never signed up.",
        quote: "You're in here all the time! Want 10% off today with the free card?",
        transcript: [
          { at: "0:00", who: "rep", text: "You're in here all the time! Want 10% off today with the free card?" },
          { at: "0:05", who: "customer", text: "Laughs, takes out their phone." },
          { at: "0:08", who: "rep", text: "Just your number, takes ten seconds. That's $8 back already." },
        ],
        happened: "Luis made it personal and quick. Eleven customers signed up today.",
        tryInstead: "Keep asking every time.",
      },
      {
        time: "18:40", repId: "tyler", kind: "walkout", title: "Stockroom again",
        customer: "A dad buying chinos for a school event, in a hurry.",
        quote: "Back in a bit.",
        transcript: [
          { at: "0:00", who: "rep", text: "32 waist? Back in a bit." },
          { at: "3:40", who: "customer", text: "Checks the time and leaves." },
        ],
        happened: "Another size request, another walkout while Tyler was in the back.",
        tryInstead: "Check the size on the handheld first, or ask Luis to cover for a minute. Then give them something to try meanwhile.",
      },
    ],
    disputes: [
      {
        time: "12:10", repId: "tyler", kind: "promise", title: "\"He told me it was real leather\"",
        claim: "A customer returned a jacket after finding the label said faux leather. They said Tyler told them it was real leather and they paid more because of it.",
        recording: "Menswear · Oct 19 · 5 min",
        transcript: [
          { at: "2:14", who: "customer", text: "Rubs the sleeve between their fingers, asks something." },
          { at: "2:17", who: "rep", text: "Yeah, it's leather, feels great right?" },
          { at: "2:22", who: "rep", text: "That'll last you years." },
        ],
        finding: "Tyler did say it was leather. It's faux leather. It looks like an honest mistake, but the customer was told something wrong.",
        verdict: "honoured",
        outcome: "Full refund given straight away with an apology. Tyler is learning the materials on the Menswear rails this week.",
      },
    ],
    notes: [
      { repId: "luis", note: "Eleven sign-ups. Great day." },
      { repId: "tyler", note: "Same stockroom pattern as last week. And check the label before saying what a jacket is made of." },
    ],
  },
  {
    date: "2026-10-26",
    headline: "Good Monday, no walkouts.",
    summary: "Every customer who talked to staff either bought or left with a hold.",
    customers: 40, conversations: 30, sales: 19, walkouts: 0, lostValue: 0,
    moments: [
      {
        time: "12:15", repId: "chloe", kind: "save", title: "Held the dress",
        customer: "A woman who loved a dress but wanted to check her bank balance first.",
        quote: "Totally get it. I'll keep it aside for you until Wednesday.",
        transcript: [
          { at: "0:00", who: "customer", text: "Holds the dress, then hands it back with a shrug." },
          { at: "0:04", who: "rep", text: "Totally get it. I'll keep it aside for you until Wednesday, no pressure." },
          { at: "0:10", who: "rep", text: "What's your first name? I'll pop it on the tag." },
        ],
        happened: "The customer wasn't ready. Chloe held the dress without any pressure, and the customer came back Wednesday and bought it.",
        tryInstead: "Keep offering holds.",
      },
    ],
    disputes: [],
    notes: [{ repId: "chloe", note: "Hold offer turned a maybe into a sale." }],
  },
  {
    date: "2026-10-25",
    headline: "Sunday rush, fitting rooms full.",
    summary: "Fitting rooms had a queue from 3 PM. Two customers gave up waiting.",
    customers: 81, conversations: 56, sales: 30, walkouts: 3, lostValue: 330,
    moments: [
      {
        time: "15:25", repId: "maya", kind: "wait", title: "Fitting room queue",
        customer: "Two friends with arms full of clothes, sixth in the queue.",
        quote: "There's a bit of a wait for the rooms, sorry.",
        transcript: [
          { at: "0:00", who: "rep", text: "There's a bit of a wait for the rooms, sorry." },
          { at: "4:00", who: "customer", text: "One of them puts the pile on a chair." },
          { at: "4:15", who: "customer", text: "Both leave." },
        ],
        happened: "The queue reached six. Two customers with full arms put everything down and left.",
        tryInstead: "Hand out a numbered tag: \"You're number six, about ten minutes. Keep browsing and I'll call you.\"",
      },
    ],
    disputes: [],
    notes: [{ repId: "maya", note: "Try numbered tags on Sundays." }],
  },
  {
    date: "2026-10-24",
    headline: "Strong Saturday for womenswear.",
    summary: "Chloe and Ava paired outfits with accessories all day.",
    customers: 76, conversations: 54, sales: 31, walkouts: 2, lostValue: 190,
    moments: [
      {
        time: "14:50", repId: "ava", kind: "save", title: "Bag with the outfit",
        customer: "A woman buying an outfit for her first day at a new job on Monday.",
        quote: "First day? Then you need a bag that says you've got it together.",
        transcript: [
          { at: "0:00", who: "rep", text: "First day? Congrats! Then you need a bag that says you've got it together." },
          { at: "0:06", who: "rep", text: "This one fits a laptop and matches the blazer you picked." },
          { at: "0:12", who: "customer", text: "Tries it on her shoulder in the mirror, nods." },
        ],
        happened: "Ava waited until the outfit was chosen, then suggested a bag that matched it. Added $65 to the sale.",
        tryInstead: "Keep suggesting once the outfit is chosen.",
      },
    ],
    disputes: [],
    notes: [{ repId: "ava", note: "Add-ons were a third of your sales today." }],
  },
];
