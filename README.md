# Claude Builder Club IIT Delhi: website

One static page (HTML, CSS and a little JavaScript; no framework and no build step). Everything that changes week to week lives in **one file: `content/site.config.js`**.

```
index.html               the page (sections, fixed copy, line drawings)
content/site.config.js   everything that changes: join link, meetup, perks, updates, projects, team, socials
js/site.js               reads the config and fills the page (you shouldn't need to touch it)
css/site.css             the page's own styles
assets/                  the design kit (copied unchanged from .claude/skills/design-taste-frontend) + assets/brand logos
share.jpg                the 1200x630 link preview (LinkedIn/WhatsApp); its source is og/og.html
screenshots/             the page at 1440, 1024, 768 and 390 wide
vercel.json              cache headers for Vercel
```

## Edit the content

Open `content/site.config.js`, change a value, save, commit and push. Vercel redeploys in about a minute. **Set a value to `null` (or an empty list `[]`) to hide that part of the page.** Keep the quotes and the commas.

| What | Field | Notes |
|---|---|---|
| Join form | `joinUrl` | Every "Join the club", "Invite us" and "Join form" link opens this in a new tab. |
| The address typed in the hero | `siteUrl` | e.g. `"cbc.iitd.ac.in"` once you have a domain. `null` hides the line. |
| Next meetup | `nextMeetup.title`, `date`, `venue`, `note` | While `date` is `null`, the hero shows `note`. Set `date` to show the date and a countdown, for example `date: "2027-01-15T18:00:00+05:30"` (always with the `+05:30`). Optional `title: "From prompt to product with Claude Code"`, `venue: "LHC 108"`. |
| Updates | `updates` | The first three are shown. Each `{ tag, title, body, url }`. Tags `Meetup`, `Workshop` and `Hackathon` get their own small drawing; any other tag gets a note drawing. `url: null` makes a card that doesn't link anywhere. |
| Perks | `perks` | Each `{ title, body }`. State perks exactly as the program gives them. |
| Projects | `projects` | Empty (`[]`) shows "Be the first to show what you built." Add `{ title: "…", by: "Name, branch", body: "One or two lines.", url: "https://…" }` for each approved project. |
| Project submissions | `submitProjectUrl` | The "Submit your project" button appears only once this is set to a form link. |
| Team | `team` | Each `{ name, role, photo, linkedin }`. While `photo` is `null` the card shows the initials. To add a photo, put the file in `assets/team/` (square or 4:5, about 800px, under 200 KB) and set `photo: "assets/team/vedant.jpg"`. |
| Socials | `social.instagram`, `social.linkedin` | Full URLs. Each link appears in the footer once it's set. |

### Example: announce a meetup

```js
nextMeetup: {
  title: "From prompt to product with Claude Code",
  date: "2027-01-15T18:00:00+05:30",
  venue: "LHC 108",
  note: "Date coming soon. Join the club to get the invite."
},
```

Once the meetup has passed, the card says so. Set the next date, or set `date` back to `null`.

## Preview on your computer

Any static server works. From the repo folder:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000. Use a server: opened straight from disk, the browser blocks the kit's scripts, so the menu and hover effects won't run.

## Deploy to Vercel

1. Merge the `site-build` branch into `main` (or pick `site-build` as the production branch in step 4).
2. On vercel.com: **Add New… → Project → Import** this repository.
3. Framework Preset: **Other**. Leave Build Command and Install Command empty. Output Directory: **`.`** (the repository root).
4. Click **Deploy**. Every push to the branch you choose (Settings → Git → Production Branch, e.g. `main`) redeploys the site.
5. Optional: Settings → Domains to add your own domain.

The site is set up for **https://iitd.claudebuilders.club** (`siteUrl` in the config, and `og:url`, `og:image` and the canonical link in `index.html`). If the address ever changes, update those four places and rebuild `share.jpg`.

To point the domain at the site: on Vercel, Settings → Domains → add `iitd.claudebuilders.club`; Vercel shows the record the domain owner adds (a CNAME for the `iitd` subdomain).

## Open Graph image

`share.jpg` is a screenshot of `og/og.html` at 1200×630. To rebuild it after changing the URL or the wording, open `og/og.html` in Chrome at 1200×630 and screenshot it, or with Playwright:

```bash
node -e "const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1200,height:630}});await p.goto('file://'+process.cwd()+'/og/og.html');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(800);await p.screenshot({path:'share.jpg',type:'jpeg',quality:88});await b.close()})()"
```

## Checks

The page was built with the `design-taste-frontend` skill and passes its finish gate:

```bash
node .claude/skills/design-taste-frontend/scripts/gate.mjs index.html
```

`.taste-skill/waivers.json` lists the four findings waived because the brief (`CLAUDE.md`) asks for something the skill normally doesn't allow. `PLAN.md` has the plan and the full list of places where the brief overrides the skill.

## Rules to keep (Claude ambassador program)

- Educational, never promotional. No hype words and no comparisons with other AI tools.
- Don't speak for Anthropic on pricing, policy or future models. State perks exactly as given. Don't mention Claude Pro.
- Never put on the site: the ambassador API-credit form, Claude Cash forms, the meetup check-in form link, or any hub password.
- No stock photos of strangers. Use real club photos only.
