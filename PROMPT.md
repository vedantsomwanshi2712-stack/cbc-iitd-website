# How to start in Claude Code

## Once, before the timer
1. Unzip this folder somewhere sensible and open a terminal in it.
2. Check `node -v` is 22 or newer and Chrome is installed (the taste skill's checker needs both).
3. `git init`
4. Start your screen recording and the 2-hour timer, then run `claude`.

The taste skill is already inside `.claude/skills/design-taste-frontend`, and `CLAUDE.md` loads automatically. Nothing to install.

## Prompt 1: plan first (paste as is)
```
Read CLAUDE.md fully, then the design-taste-frontend skill in .claude/skills and the references its SKILL.md tells you to read. Look at the images in reference/ and assets/brand/.

We're building the Claude Builder Club IIT Delhi site from that brief. Before writing any page, give me your plan: the kind and brand setup you'll use, each section as screens with its picture (line drawing, type moment, card), where the URL-typing and fade-ups happen, and every place where the brief overrides the skill. Then wait for my OK.
```

## Prompt 2: build (after you've read the plan)
```
Plan approved. Build it end to end: arm the finish gate, write all the copy first, build the 11 sections reading content/site.config.js, then run the gate and screenshot at 390, 768 and 1440. Fix anything that looks off before you stop. Finish with a short list of what still needs real content.
```

## Prompt 3: check the moving parts
```
Test it like a visitor: every Join button opens the form in a new tab, the FAQ works with the keyboard, the mobile menu opens and closes, and setting nextMeetup.date to "2027-01-15T18:00:00+05:30" in the config shows the countdown. Then set it back to null. Fix what fails.
```

## Prompt 4: polish
```
Read the page as a first-year who has never used Claude. Cut any sentence that sounds like marketing or AI, tighten the copy, then make the 1200x630 Open Graph image and run Lighthouse mobile. Get it to 90+.
```

## Prompt 5: ship
```
Write the README, commit everything, and create a public GitHub repo named cbc-iitd-website with gh and push. Then give me the exact clicks to import it on Vercel as a static site.
```

## After
- Send me the Vercel URL and the prompts you used. I'll turn the session into the LinkedIn post.
- Keep your prompt log open while you work: the post's "how I did it" comes from it.
