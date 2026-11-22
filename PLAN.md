# Plan: Claude Builder Club IIT Delhi website

**Line 1, kind:** service (page type `service`, site-kind `other`): a student club people join. Flat grounds, no shader, no WebGL, no dark page (CLAUDE.md overrides).

**Line 2, the deal:** brand colours through `start.mjs brand --page service --bg #FAF9F5 --ink #1F1E1D --accent #DA7757 --type newsreader --radius soft` (not `deal`: the brief fixes Anthropic's own cream, ink and terracotta, the colours of the official join post). Pairing `newsreader` (Newsreader for headings with its real italic, Hanken Grotesk for text). Hero `statement` (deal.mjs `--type service --has ground`: no photographs exist, so the photo/film heroes are out; the first deal printed `film`, which needs a film or a strong photograph, so it was dealt again per sections.md §2). Nav `nav-split` → dealt again to `nav-centre` (the brief asks for six nav words; nav-split holds four and its panel needs photographs). Footer `footer-dark`, close `close-type`, rhythm `dark-band` (one ink section mid-page: Perks), buttons `solid`, mark `ring` → replaced by the client's own logo (the Claude spark PNG, unchanged). Moments: none (brief override, below).

**Voice card:** Facts only (copy-registers.md 1). Pairs: plain, not chatty; welcoming, not salesy. Person: "you" for the student, "we" for the club. Sentences 8 to 16 words. Humour: none. House words: meetup, workshop, hackathon, build, members, API credits (always the same word). Never: hype, comparisons with other AI tools, anything Anthropic hasn't said about pricing or policy, Claude Pro.

## Sections as screens (1440x900; phone in brackets)

| # | id | One idea | Picture (kind) | Screens |
|---|---|---|---|---|
| 1 | nav | Lockup (spark PNG + "Claude Builder Club" / "IIT Delhi" in Newsreader), six words, "Join the club" | the client's logo | fixed bar |
| 2 | `top` hero | What it is and who it's for; join in one click | **type moment**: the headline, the italic questions from the official post, the site URL typing itself with a blinking caret; the next-meetup card (config) | 1 (1) |
| 3 | `about` | What a Claude Builder Club is; four points | **line drawing**: a hand holding up a spark-like loose shape (single brush stroke, cream and terracotta flat fills, in the post's style; not the Claude mark) | 1 (2) |
| 4 | `what-we-do` | Meetups, workshops, hackathon, campus sessions | four **cards**, each with its own small single-stroke drawing (table and laptops, terminal, flag, megaphone) | 1 (2) |
| 5 | `perks` | What members get (from `SITE.perks`) | dark band: perks as rows, a **line drawing** of a cap and sticker sheet | 1 (2) |
| 6 | `updates` | Three updates (from `SITE.updates`) | three **cards**, the tag set large as a small type moment | 1 (2) |
| 7 | `projects` | What members build (from `SITE.projects`); empty state | **line drawing**: an empty workbench with a laptop; the empty-state line; submit button only when `submitProjectUrl` is set | 1 (1) |
| 8 | `team` | Who runs the club (from `SITE.team`) | portrait **slots**: initials until a photo is set (client slot) | 1 (1) |
| 9 | `faq` | Six questions, accordion | split: h2 and a **line drawing** (a raised hand) left, accordion right | 1 (1–2) |
| 10–11 | footer.closing | "Ready to build?", the big Join button, one line drawing; footer-dark links, socials (config), "Built with Claude by CBC IIT Delhi", © 2026 | **line drawing** (hand releasing a paper plane) | 1 (2) |

## Motion (and why)

- ~~Hero entrance~~: removed during the build. The brief lists only the URL typing, fade-ups and hover ("Nothing else moves"), and the entrance held the hero's words back long enough to drop Lighthouse mobile from 99 to 85.
- URL typing in the hero, once, caret blinks a few times then rests (brief).
- Sections fade up 16px once as they enter (brief), via one IntersectionObserver; off under reduced motion and without script.
- The kit's hover layer on every button, link and linked card.
- The countdown changes once a minute when `nextMeetup.date` is set (brief). Nothing else moves.

## Config → page

Everything in `content/site.config.js` is rendered by `js/site.js` (a classic script loaded before the kit's modules): join links (every `[data-join]` gets `SITE.joinUrl`, `target=_blank`, `rel=noopener`), next meetup card + countdown, perks, updates, projects / empty state / submit button, team, socials, site URL text. A `null` hides its part. Added one field: `siteUrl` (the text the hero types; the domain isn't bought yet). No config value is written in the HTML.

## Where the brief overrides the skill (expected gate findings)

1. **No photographs** (skill wants real/stand-in photos leading a service page): original inline-SVG line drawings and type moments instead; team photo slots show initials. Expect photo-count / photo-set warnings.
2. **Palette not dealt**: `start.mjs brand` with the fixed brand colours.
3. **No dealt moment** (skill: one or two): brief says only the URL typing, fade-ups and hover move. Expect `moment-none` (gate holds it as a FAIL → waived with the brief as the reason).
4. **Sections fade up on scroll** (skill bans scroll reveals): brief asks for it. Expect `scroll-reveal` (waived, brief).
5. **FAQ as an accordion** (skill: answers always open): brief asks for an accordion, keyboard friendly. Built as buttons with `aria-expanded` and `aria-controls`.
6. **Blinking caret** on the URL (skill: no blinking): brief asks for it; it blinks a few times then rests.
7. **Live countdown** (skill: nothing moves outside the hero entrance/moment): brief asks for it; updates once a minute.
8. **Six nav words** (nav-split recipe: four): nav re-dealt to nav-centre.
9. **Italic** in the h1 area (skill: italic only for quotes): the brief and the official post set the questions in italic serif.
10. Join links open the external form in a new tab (skill: links go to #ids on the page): brief's main action is the official sign-up form.
11. Font link adds Newsreader's italic axis to the line start.mjs printed (brief: "a serif with a real italic").
12. **No hero entrance** (skill: every hero enters once on load): the brief's motion list leaves it out, and it cost 14 Lighthouse points. Gate finding `hero-enter`, waived.
13. **Two-line nav lockup** (the checker reads "IIT Delhi" under the name as a wrapping nav link): the brief asks for exactly this. Gate finding `nav`, waived.
14. The FAQ questions are buttons inside `role="heading" aria-level="3"` (the accordion pattern), so the checker's "every heading names a thing" rule doesn't read them as section headings; the skill itself allows FAQ entries to be questions.

## What changed while building (from the checker and the screenshots)

- The four "What we do" cards and the three update cards each got a drawing panel (the checker wants a picture in every section, and the cards were half empty).
- About is two groups, so a phone shows it as two full screens; at 1024 its four points run in one row under the drawing.
- One plain facts line under the hero buttons (monthly meetups, 2 workshops a term, a hackathon in spring, free to join), from the brief, so the first screen carries hard facts.
- "Invite us" moved from inside the Campus sessions card to a line under the cards.
- Perks are a definition list; the team names are plain text (names and roles only, as the brief asks).
- Focus ring drawn in the ink: terracotta on cream is under 3:1.
