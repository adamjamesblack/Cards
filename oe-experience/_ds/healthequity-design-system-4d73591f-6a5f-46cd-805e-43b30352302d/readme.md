# HealthEquity Design System

A code-first recreation of the **HealthEquity** brand, extracted from the *HealthEquity
Brand Style Guide (March 2026)* Figma file and the official logo assets. It provides the
foundations (color, type, spacing), reusable UI components, a member-portal UI kit, and
slide templates needed to design on-brand HealthEquity experiences and assets.

## About HealthEquity
HealthEquity is a leading administrator of health savings accounts (HSAs) and other
consumer-directed benefits (FSA, HRA, commuter). Its mission is to help people **save,
spend, and invest for health**. The brand voice is a *modern, personal voice built for real
people — and the decisions that matter most*: it pairs the ease and cultural fluency of a
modern consumer brand with the authority of a market leader.

**Tagline:** *Better save, spend, and invest for health.* (sentence case; maintain the exact
order save → spend → invest; never rewrite, shorten or rephrase it.)

## Sources
- **Email Design System (Figma):** "Email Design System.fig" — the email component library
  (Buttons, CTA, Footer, Hero/Image-Text/List modules). Email components live in
  `components/email/` and the assembled email in `ui_kits/email/`.
- **PPTX:** `uploads/HealthEquityBrandSlideTemplate.pptx` — 46-slide official brand template deck. Used as the source of truth for exact slide layouts (logo positions, footer copy, background design, color values). Media extracted to `assets/pptx-media/`.
- **Figma:** "HealthEquity Style Guide (1).fig" — Brand Style Guide deck (61 slides):
  Title, Voice & Tone, Visual ID, Logo, Color palette, Typography, Photography, Graphics,
  Sample applications, Content-informed design, Audience variation, AI use.
- **Logos:** uploaded `HealthEquity-Logo-Purple.svg/.png` and `HealthEquity-logo-white.svg/.png`
  (in `assets/logos/`).
- The licensed brand typeface (Neue Haas Grotesk Text Pro) is **not** included; see Typography.

---

## CONTENT FUNDAMENTALS
How HealthEquity writes. **Full guide: `guidelines/voice-and-tone.md` — read it before writing
any copy** (UI strings, headlines, emails, slides). Voice & tone is part of the brand, not an
afterthought. Summary:

- **Address the reader directly — "you" / "your".** The goal is to empower people by talking
  *to* them, not over them. ("Take control of your health, your way." · "Hit your max." ·
  "Future-proof your savings.")
- **Sentence case** for headlines and UI. Not Title Case, not ALL CAPS. **Avoid all caps entirely
  across the brand** — including eyebrows and section labels (use sentence case with tight tracking).
- **Clear, fresh, human, confident.** Plain language about health and money. Authoritative but
  never cold or jargon-heavy.
- **Short and scannable.** Lead with the point. One idea per line. Break dense info into
  digestible sections.
- **Warmth on human moments.** When a line is about care, wellbeing or human impact, a single
  *italic serif* phrase (Libre Baskerville) adds emotional emphasis — used sparingly.
- **No emoji.** The brand does not use emoji in its voice or UI.
- **Compliance footer** appears on branded material: "Copyright © 2025 HealthEquity Inc. All
  rights reserved. | HealthEquity does not provide legal, tax or financial advice." Member
  attributions carry an asterisk ("HealthEquity member*").
- **Vibe:** optimistic, capable, reassuring. Real life, slightly elevated.

## VISUAL FOUNDATIONS
**Range of expression (content-informed design):** the system flexes across three modes —
**Lifestyle & wellness** (warm, human, light), **Energetic messaging** (bold, celebratory,
gradients, Wayfinder), and **Digital, investing & security** (cool, dark, high-contrast, glow).
Pick the mode from what the content is doing; full guide in `guidelines/expression-modes.md`.
- **Color.** *HealthEquity Purple (#4F2883)* anchors everything — headers, backgrounds, core
  brand elements. Supporting: Dark Purple #300E6E, Light Purple #C04CFF (bright accent/highlight),
  Teal #008093, Cyan #33E3FF. Neutrals are **only three grayscale values**: White #FFFFFF, Light
  Gray #F2F3F4 (surfaces/dividers), Black #000000 — no mid-gray text or stroke tones (secondary
  text is black; hierarchy comes from size). **Use colors only at their full, approved values —
  no tints, shades or transparencies of brand colors.** Let one color carry emphasis per layout;
  don't crowd bold colors together.
- **Gradients.** Four approved gradients (purple→blue, purple→ink, purple→dark, light→lavender)
  plus a hero purple→blue→cyan. Use sparingly on large surfaces / hero moments; never modify the
  angle or stops, never place two gradients adjacent, never behind small text.
- **Type.** Primary **Neue Haas Grotesk Text Pro** — Roman 400 is the default and should be used
  almost always. Medium 500 only for small labels that need emphasis; Bold 700 very rarely for a
  single tight callout. Secondary **Libre Baskerville Italic** for sparing human emphasis. Type is
  generally black; color is for emphasis only. Hierarchy comes from **size and spacing**, not weight.
  Letter-spacing runs **tight** (−0.02 to −0.05em) — a brand signature.
- **Backgrounds.** White and gray #F2F3F4 surfaces; solid purple or an approved gradient for
  hero/section moments. Full-bleed lifestyle photography. No textures or patterns.
- **Photography.** Authentic, candid, human, emotionally grounded — real life, slightly elevated.
  Natural/soft light, lived-in (not sterile) environments. Lifestyle subjects stay immersed (don't
  look at camera); portraits may. Wellness-focused, **not clinical** — medical imagery is context,
  used sparingly. No metaphor props, no staged stock, no fabricated visuals. 12pt rounded corners
  (or full-bleed). Full guide: `guidelines/photography.md`.
- **Graphics — the Wayfinder.** The signature directional chevron: a rounded-corner body with a
  45° point that **always points right**, signalling forward energy, progress and momentum. Fill
  with a brand color or approved gradient; **never outline it**. Use it as a banner, a label, or
  a frame around imagery — purposefully, never as decorative noise.
- **Corners.** **12pt rounded** is the default for images, cards and content blocks — subtle,
  modern, digital-first; never playful or exaggerated. CTAs are fully rounded pills.
- **Cards.** White surface, soft shadow, 12pt corners; or solid purple / gradient panels for
  emphasis. One focal point per card.
- **Buttons.** The primary CTA is a **solid black pill** with white text. Purple is the brand
  action color. Hover brightens slightly; press scales down a touch.
- **Shadows.** Soft and restrained (`--shadow-sm/md/lg`); used only to lift white cards.
- **Motion / states.** Quiet and functional. Hover = slight brightness lift; focus = purple ring;
  press = small scale-down. No bouncy or attention-seeking animation. Avoid decorative noise —
  every element earns its place.
- **Layout.** Generous padding and whitespace for breathable, user-friendly layouts. Strong
  hierarchy via size, contrast and spacing. Avoid blocky stacks of adjacent boxes; don't place two
  high-impact elements side by side.

## ICONOGRAPHY
- **Icon library: Google Material Symbols (Rounded).** This is the brand's chosen icon set —
  use the `Icon` component (`components/icons/Icon.jsx`), passing a Material Symbol name
  (browse at fonts.google.com/icons). The variable icon font is loaded globally from
  `tokens/fonts.css`. Default style is **light (weight 300), outlined, optical size 24** — clean,
  modern, digital-first. Use the **filled** variant for active/emphasis states.
- Icons inherit `color` (currentColor): purple on light surfaces, white on dark, a full palette
  accent (teal/cyan/light-purple) for status. Never tint with opacity.
- The Rounded style is intentional — its soft corners match the brand's 12pt-radius, friendly feel.
- The one true brand *graphic* is the **Wayfinder** chevron (`components/brand/Wayfinder.jsx`) —
  prefer it over decorative iconography for directional/forward cues.
- **No emoji** and no unicode glyphs as icons. Always give meaningful icons an `aria-label`;
  decorative icons are hidden from assistive tech automatically.
- Logos live in `assets/logos/` (purple + white, SVG + PNG). Use white on purple/dark/photo
  backgrounds, purple on light. Never recolor or distort.

---

## EMAIL FOUNDATIONS
The email system (from the Email Design System Figma) has its own conventions, distinct from
the web/app surfaces:
- **Font:** Helvetica/Arial (`--font-email`) — email clients can't rely on webfonts, so the
  brand's Neue Haas is replaced by the email-safe Helvetica stack. Headings are Helvetica **Bold**.
- **Width:** a single **600px** column (the email standard). Modules are full-width blocks
  stacked vertically.
- **Modules:** white surfaces and **dark-purple (#300E6E)** feature blocks alternate for rhythm.
  Hero modules are dark-purple and centered. Light-purple (#C04CFF) numerals carry numbered lists;
  big stat figures use light-purple or magenta.
- **CTAs:** fully-rounded pills (black / purple on light, white on dark) at ~18px Bold, plus an
  inline **tertiary link with a trailing arrow (→)**.
- **Footer:** black module — arrow nav links with hairline dividers, compliance/legal text,
  copyright, mailing address, "View on web", Facebook + LinkedIn icons.

## Index / manifest
- `styles.css` — global entry point (import list only).
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `fonts.css`.
- `components/buttons/` — `Button`. `components/cards/` — `Card`, `QuoteCard`, `StatCard`.
  `components/forms/` — `Input`, `Slider`. `components/feedback/` — `Badge`, `ProgressBar`,
  `Tabs`, `Avatar`. `components/brand/` — `Logo`, `Wayfinder`. Each `.jsx` + `.d.ts` +
  `.prompt.md`, with one focused `@dsCard` thumbnail per directory.
- `components/email/` — email primitives: `EmailButton`, `EmailModule`, `EmailHero`,
  `EmailListModule`, `EmailFooter` (Helvetica-based, 600px column). From the Email Design System.
- `ui_kits/member-portal/` — interactive HSA member dashboard (`index.html`, `screens.jsx`).
- `ui_kits/email/` — full assembled HSA marketing email.
- `slides/` — 1280×720 slide templates: Title, Section, Content, Quote, Stat, Closing.
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand).
- `assets/` — `logos/`, `photography/` (lifestyle imagery from the brand deck).
- `SKILL.md` — Agent-Skill manifest.

## Caveats
- **Typeface substitution:** Neue Haas Grotesk Text Pro is licensed and not bundled. The system
  falls back to **Inter** (the closest free neo-grotesque). Replace `tokens/fonts.css` with
  self-hosted Neue Haas `@font-face` rules when license files are available.
- Gradients are approximated from the deck's renderings (the originals are radial-blend
  compositions); they read true to brand but are not pixel-identical.
- Member data in the UI kit (balances, holdings, claims) is illustrative.
