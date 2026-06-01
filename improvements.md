# Improve bandar-shanneik.vercel.app — SEO + heavy design overhaul (Next.js / Vercel)

This is the personal site of Bandar Shanneik, a senior cross-border legal consultant
(corporate/M&A, real estate, arbitration, governance) working across Germany, the
Middle East, and Europe, advising in German, Arabic, and English. The site is
bilingual (EN + AR) and currently lives on a Vercel preview domain.

Audit the repo and live behavior first, then propose a plan, then implement. Work in
small, reviewable commits, one logical group per commit. Build + lint + typecheck
must pass on every commit. Never invent biographical or professional facts — the
verified facts are below. Wait for my "go" on destructive changes; proceed on
non-destructive ones.

This site needs BOTH technical SEO fixes AND a heavy visual redesign. The current
design is sparse and generic for a high-end legal consultant. Treat the design work
as a real upgrade, not polish — but keep it credible, restrained, and appropriate
for a senior lawyer (trust and authority over flashiness).

=== PHASE 1: AUDIT (write it first, no code changes) ===
Score each area 1–10 with file+line evidence. Prioritize P0 / P1 / P2.
1. Metadata & SEO: there are currently NO og: tags, NO twitter: tags, NO canonical,
   NO JSON-LD, and likely no sitemap/robots. Confirm and inventory.
2. i18n/SEO: bilingual EN/AR — check hreflang tags, locale routing, and whether AR
   renders correctly RTL.
3. Performance: LCP portrait is served at w=3840 — almost certainly oversized. Check
   next/image sizes/priority/formats.
4. Accessibility (WCAG 2.2 AA): contrast, focus states, alt text, heading order,
   landmarks, prefers-reduced-motion (the marquee of practice areas and "Scroll"
   cue), keyboard nav, the language toggle.
5. Design/UX: typography, spacing, hierarchy, the numbered nav (01–04), the hero,
   the practice-area marquee, mobile layout, and whether the CTA path (→ Contact)
   is clear.

=== PHASE 2: TECHNICAL SEO ===
1. Decide canonical host. If a custom domain exists or is planned, define a SITE_URL
   constant/env var and derive ALL canonical + OG URLs from it. If still on the
   vercel.app domain, set canonical to the current production URL consistently and
   leave a clearly-marked TODO/env hook to swap in the real domain later. Search the
   repo for hardcoded hosts.
2. Add full metadata to every page (home, about, legal, research, contact), per
   locale: unique title + description, canonical, Open Graph (og:title, og:description,
   og:image, og:url, og:locale + og:locale:alternate), Twitter card.
3. Add hreflang alternates linking EN and AR versions of each page (+ x-default).
4. Add sitemap.ts listing all routes in both locales; ensure robots.txt points to it.
5. Add Person JSON-LD on home + about (shared object, rendered via
   <script type="application/ld+json"> + JSON.stringify). Verified values:
   - name: "Bandar Shanneik"
   - jobTitle: "Senior Legal Consultant"
   - description: "Cross-border legal consultancy for companies, investors and
     private clients across real estate, corporate, commercial and governance
     matters, spanning Germany, the Middle East and Europe."
   - knowsAbout: ["Cross-border legal counsel","Corporate law","Mergers and
     acquisitions","Real estate law","Arbitration","Governance"]
   - knowsLanguage: ["German","Arabic","English"]
   - areaServed: ["Germany","Middle East","Europe"]
   - email: contact.shanneik@gmail.com
   - sameAs: [the correct LinkedIn URL — the current footer links to a bare
     linkedin.com placeholder; ask me for the real URL, do not guess]
6. Optimize the LCP portrait: correct responsive sizes, priority, AVIF/WebP.

=== PHASE 3: HEAVY DESIGN OVERHAUL ===
Elevate the site to feel like premium, trustworthy legal-consultancy branding.
Propose a concrete design direction in Phase 1 and get my pick before large changes.
Target the following — show me 2–3 options for the big calls (palette, type pairing,
hero):

1. Visual identity:
   - Establish a real design system: a refined color palette (suggest a restrained,
     authoritative scheme — deep neutrals, ink, a single confident accent; offer
     2–3 palettes), and a serif/sans type pairing suited to law (e.g. a high-contrast
     serif for display + a clean grotesque/sans for body). Extract everything into
     design tokens (CSS variables or theme config) — no hardcoded hex/spacing.
   - Define a modular type scale and consistent vertical rhythm/spacing scale.
2. Hero: redesign into something memorable and credible — strong typographic
   treatment of the name + role, the portrait integrated intentionally (not a raw
   full-bleed image), a clear value proposition line, and one primary CTA. Keep it
   fast (don't regress LCP).
3. Layout & sections: give About / Legal / Research / Contact real structure and
   visual hierarchy. Practice areas (Corporate · M&A, Real estate, Arbitration,
   Governance) should read as a designed, scannable set — not just a marquee.
   Consider a credentials/expertise band that signals authority.
4. Motion: tasteful, purposeful transitions (section reveals, hover states) that
   ALWAYS respect prefers-reduced-motion. The "Scroll" cue and marquee should be
   accessible and pausable.
5. RTL: ensure the Arabic version is genuinely RTL-correct (layout mirroring,
   logical properties like margin-inline, type that supports Arabic well), not just
   translated LTR text.
6. Responsive: mobile-first, verified from 320px up — nav, hero, and the practice-
   area set must all hold up.

=== CONSTRAINTS ===
- Keep it credible and restrained — senior-lawyer audience, not a flashy startup.
- No new heavy dependencies without asking (a lightweight animation lib is OK to
  propose with justification).
- Every change builds and passes lint/typecheck.
- Don't fabricate facts, credentials, or testimonials.

=== DELIVERABLES ===
1. Phase 1 audit (markdown) with P0/P1/P2 and scores.
2. Phase 2 design directions (palettes, type pairings, hero options) for me to pick.
3. Implemented commits with a short summary of each.
4. Before/after Lighthouse (Performance, Accessibility, Best Practices, SEO) +
   Core Web Vitals (LCP/CLS/INP).
5. The exact production URLs to re-inspect in Search Console and re-run through the
   Rich Results Test after deploy.
6. Remaining P2 items you didn't do.

Start with the Phase 1 audit and the design directions. Grep the repo for hardcoded
hosts and for existing color/spacing values before proposing tokens. Show me the
audit and options before changing code.
