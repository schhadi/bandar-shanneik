I have an existing Next.js website (deployed at https://bandar-shanneik.vercel.app, source likely in this repo) for Bandar Shanneik. I want a redesign + content overhaul based on the attached developer brief (developer-brief.docx).

CORE MESSAGE: Bandar is a legal expert AND an academic — two parallel identities. NOT a typical "Spießer" lawyer. The site must feel cool, minimal, and personal, with open flowing layout and generous white space. Design references: www.michelefinck.eu and www.pascalmichaillat.org.

IMPORTANT — DO THIS FIRST:
1. Read the brief at developer-brief.docx in full before touching code.
2. Explore the repo, map every page/component to the brief's checklist items, and identify the stack (framework, styling, routing).
3. Produce a written PLAN and wait for my approval before editing. Break the work into the phases below. For each phase, list the exact files you'll touch and the changes per item. Do not start coding until I approve the plan.

Work in PHASES, committing after each so changes are reviewable:

PHASE 0 — Audit & Plan (no code)
- Inventory pages, components, the footer, the duplicate header, custom cursor, scroll/parallax animations, numbered labels [01]/[02], divider lines, the scrolling ticker.
- Map each brief item to its location in code. Output the plan and stop for my approval.

PHASE 1 — Sitewide cleanup (all pages)
- Remove the footer entirely (name/contact/connect/explore/copyright).
- Remove the duplicate stacked header; keep ONE clean nav bar.
- Remove all numbered labels ([01], 02 /, 03 /, "08 disciplines" count, etc.).
- Remove horizontal divider/section-separator lines.
- Reset cursor to the default browser arrow; strip custom cursor styling.
- Remove ALL scroll animations/transitions/parallax/fade-ins — everything loads static.
- Nav links: About · Expertise · Research · Contact. Add a small LinkedIn icon (→ linkedin.com/in/bandar-shanneik). Leave room to add Google Scholar later.
- Typography & colour: max two colours (near-black text + one accent), single font throughout, open flowing layout, no boxed/card feel.

PHASE 2 — Home / Opener
- One screen, NO scrolling (fit viewport, disable scroll).
- Make the portrait large and prominent; design layout around it (new photo TBD — leave a clean placeholder).
- Display name boldly with a clean descriptor.
- Remove the scrolling ticker ("Cross-border counsel ✦ …") entirely.
- Remove all "services"/consultancy/advice language.
- Small unobtrusive LinkedIn icon. Confirm no footer.
- Give me 1–2 concrete layout suggestions for the hero (this should be the coolest page).

PHASE 3 — About
- Two-column layout, equal weight: LEFT = legal profile, RIGHT = academic profile.
- Legal: short prose; "Senior Counsel at Daburon & Partners" (link daburon-partners.com); Jurisdictions: Germany · England & Wales · UAE; Languages: German · Arabic · English.
- Academic: short prose; "Research Fellow, SOAS University of London", RELI-GENE project (religene.eu); research areas.
- Remove Education section. Remove jurisdiction icons/flags (bank/wig/skyline). Keep "Download CV →" link. No footer. (Flag the optional second photo as a question to me.)

PHASE 4 — Expertise (was "Legal")
- Rename page Legal → Expertise everywhere: nav, title, and URL slug (/expertise not /legal). Add redirect if feasible.
- Remove all services language ("Legal Services", "Need Legal Advice?", "Get in touch" CTAs, meta-description).
- Heading → "Areas of Expertise" / "Legal Expertise".
- Intro (copy TBC): "Bandar's legal background spans corporate and commercial matters, real estate, arbitration and governance across German, English and UAE law. He is Senior Counsel at Daburon & Partners."
- Keep practice-areas list as areas of KNOWLEDGE, not services; remove dead → arrow links. No "08 disciplines" count. No footer.

PHASE 5 — Research
- Top line: "Research Fellow, SOAS University of London — affiliated with the RELI-GENE project (religene.eu), an ERC Consolidator Grant project led by Prof. Yafa Shanneik." Link RELI-GENE to https://religene.eu/.
- 3–4 sentence research profile paragraph.
- Publications as a simple dated list (year + title + journal), tight spacing, no heavy cards. No footer.

PHASE 6 — Contact
- Rewrite meta-description (remove "legal consultancy").
- Intro → "For research collaboration or general enquiries, get in touch."
- Add note directing professional matters to Daburon & Partners (link daburon-partners.com/en/home). No footer.

PHASE 7 — Verify
- Build and run locally; check each page against the brief checklist; confirm no scroll on home, no footer anywhere, single nav, default cursor, no animations. Report anything in the brief that needs my input (copy, photos, second-photo decision).

Constraints: don't invent credentials/publications — leave clearly marked TBD placeholders where the brief defers copy. Preserve i18n routing (/en) if present.
