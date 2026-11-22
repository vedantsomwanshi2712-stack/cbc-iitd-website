# Claude Builder Club IIT Delhi — website brief

You are building the website for the Claude Builder Club (CBC) at IIT Delhi. Read this whole file before writing code. Where this brief and the taste skill disagree, **this brief wins**; say so in your plan instead of breaking it.

## Goal
One page where any IIT Delhi student learns what CBC is, joins in one click, and sees what members build.
- Main action: **Join the club** → the official sign-up form (`SITE.joinUrl`). Every join button goes there.
- Phone first: most visitors come from LinkedIn/WhatsApp links on a phone, on campus Wi-Fi.
- Lighthouse mobile 90+.

## Stack
- Static HTML/CSS/JS, built with the `design-taste-frontend` skill in `.claude/skills/` (start from its starter, its kit copied into `assets/`). No framework, no UI kit, no Tailwind.
- Everything that changes (next meetup, updates, perks, team, projects, links) is read from `content/site.config.js` (`window.SITE`). Never hard-code those in the HTML. A `null` value hides its part of the page.
- Deploy target: Vercel from GitHub, as a plain static site.

## Brand (fixed: do not deal a palette)
Use the skill's `start.mjs brand` with these values instead of `start.mjs deal`:
- Background cream `#FAF9F5` · ink `#1F1E1D` · accent terracotta `#DA7757` · muted warm grey for secondary text.
- Terracotta sparingly: one block per screen at most, plus buttons and links.
- Headings: a serif with a real italic (pick the closest pairing the skill offers, e.g. Newsreader or Source Serif 4). Body: a plain sans.
- Logo files in `assets/brand/`: `claude-spark.png`, `claude-wordmark.png`, `claude-logo-lockup.png` (transparent), `claude-logo-original.png`. Use them as they are: never redraw, recolour, stretch or animate the mark.
- Nav lockup: the spark + "Claude Builder Club" with "IIT Delhi" under it, set in our heading font.
- Look and tone reference: `reference/official-cbc-join-post.jpg` (warm, editorial, italic serif questions, single-stroke hand-drawn line art).
- Structure reference only: `reference/iitm-screenshot-*.jpg` (IIT Madras's CBC site). Copy its section order, **not** its dark theme or coloured icon tiles.

## Overrides of the taste skill
- **Kind:** treat it as a service page (site-kind `other`): flat grounds, no shader effects, no WebGL, no dark page.
- **No stock or stand-in photographs.** We have no club photos yet and must not show strangers as if they were members. Use type-led moments and original single-stroke line drawings (inline SVG) in the official post's style. Leave clearly marked photo slots in the team section for real photos later.
- **No invented facts:** no member counts, quotes, dates, venues or testimonials beyond what is in this brief and `site.config.js`.
- Gate warnings caused only by these overrides (photo counts, palette not dealt) are expected: list them in your report, don't break the brief to clear them.

## Sections, in order
1. **Nav** (sticky): lockup; links About, What we do, Perks, Projects, Team, FAQ; "Join the club" button; menu on mobile.
2. **Hero:** small label "Claude Builder Club · IIT Delhi". Headline: *Build real things with Claude, at IIT Delhi.* Italic lines: *New to AI? Veteran coder? Never written a line of code?* then "Everyone is a builder with AI." The site URL types itself out once with a blinking caret. Next-meetup card from `SITE.nextMeetup` (shows `note` while `date` is null; live countdown once a date is set). Buttons: Join the club / See what we do.
3. **What is CBC:** Claude Builder Clubs are Anthropic's official student-led campus communities; this is IIT Delhi's. Four points: open to every branch and year · for beginners and experienced coders · build what you care about · meet people at meetups, workshops and talks.
4. **What we do:** Monthly meetups (learn, build, show your project) · Hands-on workshops, two a term: Claude Code + Skills first, then Building Agents, Building with MCP, AI Research Salon · Campus-wide hackathon in spring · Campus sessions: a 10-minute demo for your club, class or hostel ("Invite us" → join form).
5. **Perks:** from `SITE.perks`. Do **not** mention Claude Pro anywhere.
6. **Updates:** three cards from `SITE.updates`.
7. **Projects:** cards from `SITE.projects`; empty state "Be the first to show what you built" + submit button (hidden while `submitProjectUrl` is null). Voting comes later; don't build it now.
8. **Team:** from `SITE.team`: name and role only, no bios. Photo slot shows initials until a photo is set.
9. **FAQ** (accordion, keyboard friendly): Do I need to be from CS? No, every branch and year · Does it cost anything? No, it's free · How do I get the API credits? Make an account on platform.claude.com with your IIT Delhi email, then fill the check-in form at a meetup with your Org ID (Settings → Organization) · What happens at a meetup? A short talk or workshop, building time, and members showing what they made · Is this official? It's a student-led club, part of Anthropic's Claude Builder Club program · How do I join? Fill the join form.
10. **Closing CTA:** "Ready to build?" + one line + Join button + one line drawing.
11. **Footer:** lockup, section links, join link, socials from `SITE.social` (hidden while null), "Built with Claude by CBC IIT Delhi", © 2026.

## Rules from the ambassador program (non-negotiable)
- Educational, never promotional. No hype words, no comparing Claude with other AI tools.
- Never speak for Anthropic on pricing, policy or future models. State perks exactly as in `site.config.js`.
- Claude-branded only ("Claude Builder Club IIT Delhi"); any partner is "supported by X".
- Never put on the site: the ambassador API-credit form, Claude Cash forms, the check-in form link, or any hub password.

## Motion
The hero URL typing, sections fading up once on scroll, and the skill's quiet hover layer. Nothing else moves. Respect `prefers-reduced-motion`.

## Also ship
- `<title>`, meta description, and a 1200×630 Open Graph image in the brand style (LinkedIn shows this card).
- Alt text on every image and drawing; contrast checked on cream.
- `README.md` saying how to edit `content/site.config.js` and deploy.

## Done when
The finish gate has run, the page looks right at 390, 768, 1024 and 1440 wide, every Join button opens the form, setting `nextMeetup.date` in the config shows the countdown, and you've listed what still needs real content (photos, socials, meetup date).
