> OneWELL Design System — core identity, principles, anti-patterns, voice, and prototype usage rules. Read this first before building anything.

# OneWELL Design System — Overview

**System:** OneWELL / IWBI (International WELL Building Institute)
**Version:** v1.0 · April 2026
**Scope:** Multi-stakeholder workspace for navigating, scoping, achieving, and verifying WELL building certifications

---

## What this system is

The OneWELL Design System is the canonical visual and component reference for the IWBI OneWELL platform. It is a self-contained bundle: design tokens as CSS variables, component classes with the `.ow-*` prefix, a complete brand asset library, and self-hosted fonts.

Everything needed to build a compliant prototype lives in `v2/ds/` and `v2/assets/`:
- `v2/ds/onewell.css` — single import (pulls in tokens + typography + components)
- `v2/ds/tokens.css` — all CSS custom properties (13 color scales × 10 shades, concept colors, semantic tokens)
- `v2/ds/typography.css` — `@font-face` + semantic type classes
- `v2/ds/components.css` — all `.ow-*` component primitives
- `v2/assets/` — brand seals, badges, icons (SVG only)
- `v2/assets/fonts/` — FT Made + Mazzard Soft M (all weights, self-hosted)
- `v2/ds/UI Kit.html` — hierarchical component reference (canonical)
- `v2/ds/preview/` — 20 individual component preview cards

---

## 5 core working principles

1. **Use existing tokens. Never invent values.** Every color, size, and font lives in `colors_and_type.css` or `components.css`. If you need something not there, surface it — don't guess or hardcode.
2. **Brand marks are sacred.** Never recolor, redraw, or stylize the WELL Seal, IWBI logo, certification seals, rating seals, or provider badges. Use them verbatim from `assets/seals/` and `assets/badges/`.
3. **Type pairing is fixed.** FT Made for display only (page titles, hero numbers, certification levels, big editorial moments). Mazzard Soft M for everything else. No third font.
4. **Cyan is the brand "yes."** Use the gradient CTA (`--gradient-cta-cyan`) exactly once per view. Never on incidental buttons.
5. **One canonical home per component.** Tags live in `components.css`. Don't redefine styles inside a prototype — link to the stylesheets.

---

## How to use the system in prototypes

1. Link the single master stylesheet at the top of every HTML file:
   ```html
   <link rel="stylesheet" href="ds/onewell.css">
   ```
   (Use `../ds/onewell.css` for pages inside `v2/pages/`.)
2. Reach for `.ow-*` classes first. If a class doesn't exist for what you need, ask before inventing.
3. Use seals from `assets/seals/`, icons from `assets/icons/`. Don't draw replacements.
4. Keep one primary CTA per view. Identify the one action the user is here to complete.
5. Use the side-rail pattern (`--surface-side`) for nav — never as a content background.
6. Show data with restraint. Favor numbers + small chips + gradient bars (for ratings only). If you add a chart, keep it monochrome cyan.
7. Never invent typography combinations. Snap to the existing scale.

---

## Anti-patterns (flagged in review)

- ❌ Hardcoded hex codes — use `var(--token)` always
- ❌ `font-family: 'Inter'` or any non-system, non-brand font
- ❌ Buttons without `.ow-btn` base class
- ❌ Multiple primary CTAs in one view
- ❌ Concept colors on chrome (buttons, headers, panels)
- ❌ Recolored or redrawn seals or badges
- ❌ Decorative emoji
- ❌ Bright gradients (`--gradient-cta-bright`, `--gradient-performance`) as background fills under text
- ❌ Title Case Headings (use sentence case)
- ❌ Generic "Loading…" or "Error" without context

---

## Voice & tone

The WELL voice is **calm, factual, generous, never alarmist.** It speaks like a thoughtful project manager — confident in the work, patient with the reader.

### Do
- "8 points to Gold" → directional, not punitive
- "Audit window opens Jun 1" → factual, no countdown urgency
- "Upload your acoustics report when ready" → patient, action-oriented
- Sentence case for headings ("Project team", not "Project Team")
- Title case for cert levels and proper nouns ("Gold", "WELL Building Standard")

### Don't
- ❌ "You're failing" — never frame partial completion as failure
- ❌ "Hurry up — only 3 days left!" — never urgency-bait
- ❌ "Oops! Something went wrong" — never cheery error language
- ❌ Title Case Headings Like This
- ❌ Excessive emoji

### Error format
`<what happened> + <next step>`. Never just "Error".
- ✅ "We couldn't reach the WELL Reviewer. Your changes are saved — try submitting again in a minute."
- ❌ "Submission failed!"

---

## Restraint is the default

The system favors restraint. One CTA per view. One display-font moment per screen. Whitespace over density.

If you're tempted to add a gradient — reach for a pure tint instead.
If you're tempted to add an icon as decoration — leave it out.
Variations should feel like rotations within one taste, not three different brands.
