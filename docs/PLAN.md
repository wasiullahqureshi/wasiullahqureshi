# Speak21: research notes and product plan

## The idea
A free mobile app for a **21-day English challenge** that combines two methods from Instagram:

1. **The 10-10-10 rule**: 30 minutes a day, split into 10 min reading, 10 min writing and 10 min speaking.
2. **The self-recording loop**: record a video of yourself speaking, then watch it with the **sound off** (body language), listen with **audio only** (pronunciation, fillers, pace), watch it **with sound**, and reflect on what to improve.

## What the research says

| Claim | Verdict |
|---|---|
| "21 days builds a habit" | **Not backed by research.** The number comes from Maxwell Maltz (1960), who was writing about self-image, not habits. Lally et al. (UCL) found a median of **66 days**, with a range of 18–254 days. A single missed day did **not** break habit formation. |
| 10-10-10 rule | **No formal source**, but it matches common advice to practise all four skills daily in short sessions. It's a good, simple structure. |
| Recording yourself | Widely recommended (shadowing apps, tutors). Watching with sound off, then sound only, splits one hard review into two easier ones. |

**What this means for the product:** keep "21 days" as the marketing hook, because it's short enough that people start. But:
- never reset progress for a missed day (Lally: one missed day doesn't matter),
- frame Day 21 as "a beginning", and offer **Round 2** straight away so people get closer to the ~66 days that build a real habit.

## Competitors
- **Duolingo**: gamified daily habit; little real speaking.
- **ELSA Speak**: pronunciation scoring at the phoneme level; not conversation.
- **Praktika / Speak / Loora**: AI conversation partners; mostly paid.
- **SmallTalk2Me**: has a free 21-day speaking challenge with AI feedback. **This is the closest competitor.**
- **TubeShad / Speak Pro**: shadowing YouTube clips with record-and-compare.

**Our angle:** no other app turns the viral "record → watch muted → listen only → watch → reflect" loop into a guided daily ritual, together with read and write tasks and a **Day 1 vs Day 21 video comparison**. That before-and-after video is also built to be shared on Instagram and Reels, which is how the app can grow for free.

## What's built (MVP in `/app`)
- Sign-up (name, optional email, level, goal), free
- 21 days of content: a reading passage, 5 words, a comprehension check, a writing prompt and a speaking prompt for each day
- 10-minute timer for each task
- Writing editor with a word-count goal (30 words for beginners, 60 for others)
- Video recording (or audio only) with the 4-step guided review and a self-rating
- One day unlocks per calendar day, plus a streak counter and a 21-cell progress grid
- Day 1 vs Day 21 side-by-side video, a confidence chart and Round 2
- Share button, export of all writing, delete all data, dark mode
- Installable PWA that works offline after the first visit

Everything is stored **on the device** (localStorage + IndexedDB). There's no server, so there's no cost and no privacy risk from videos.

## Roadmap
**Phase 1: Launch (free hosting)**
- Host on GitHub Pages, Netlify or Vercel. Users open the link and tap *Add to Home Screen*.
- Get 20–50 people from Instagram to try it, and watch where they drop off.

**Phase 2: Real accounts and app stores**
- Add **Supabase** or **Firebase** (both have free tiers) for email or Google sign-in and cloud backup of progress. Videos should stay on the device by default.
- Wrap the app with **Capacitor** to publish to Google Play ($25 one-time) and the App Store ($99/year).
- Daily reminder push notifications. These matter most for whether people finish.

**Phase 3: Make it smarter**
- AI feedback: speech-to-text transcript, a filler-word count, words per minute and grammar suggestions on the writing.
- Content for each level (beginner, intermediate, advanced), and Urdu or Hindi explanations for beginners.
- Group challenges: start on the same day with friends and see each other's streaks.
- Optional paid tier (AI feedback and a certificate); the core challenge stays free.

## Sources
- Lally et al. habit study summaries: https://jamesclear.com/new-habit, https://nesslabs.com/creating-habits, https://yourstory.com/2025/04/habit-formation-66-days-vs-21-day-myth
- 21-day challenges: https://smalltalk2.me/english-speaking-challenge, https://www.talkdrill.com/blog/guides/challenges/21-day-english-speaking-challenge/
- Shadowing apps: https://apps.apple.com/us/app/id6741210342, https://apps.apple.com/app/apple-store/id6746413897
- App landscape: https://www.talkdrill.com/blog/compare/best-ai-english-speaking-apps-2026/, https://getfluently.app/blog/best-apps-for-english-speaking-practice
- 10-10-10: https://gist.ly/youtube-summarizer/10-10-10-system-master-english-in-30-minutes-a-day
