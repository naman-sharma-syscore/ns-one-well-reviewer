# One WELL Design System

The official design system for **WELL Standard** by IWBI — colors, typography, components, brand assets, and product patterns for the One WELL platform.

---

## What's in here

| File / folder | What it is |
|---|---|
| **`UI Kit.html`** | The canonical reference. Open this first. Hierarchy: Foundations → Tokens → Elements → Components → Patterns → Brand & Media → Guidelines. |
| **`colors_and_type.css`** | All design tokens — colors, type, gradients, spacing, radii, shadows. CSS custom properties only. |
| **`components.css`** | All component classes (`.ow-btn-*`, `.ow-status`, `.ow-tag`, etc). Use these directly; don't re-define. |
| **`CLAUDE.md`** | Strict working rules for AI design agents. Every prototype made in this project must follow these. |
| **`assets/seals/`** | All WELL certification seals, rating seals, provider seals, watermarks. SVG + original TSX. |
| **`assets/badges/`** | Compact badge variants of the seals — for web, signatures, list rows. |
| **`assets/icons/`** | 30+ utility glyphs (24×24, monochrome, render at currentColor) + concept icons. |
| **`preview/*.html`** | Self-contained component cards. One canonical home per component group — no duplication. |
| **`fonts/`** | FT Made (display) + Mazzard Soft M (body). Self-hosted, no CDN dependency. |

---

## Quick start (for designers)

Open `UI Kit.html` in any modern browser. Every section links to a deeper preview card for the full catalog of that component group.

To use the tokens in any new HTML file:
```html
<link rel="stylesheet" href="colors_and_type.css">
<link rel="stylesheet" href="components.css">
```

Then use CSS variables and `.ow-*` classes:
```html
<button class="ow-btn ow-btn-primary">Get certified</button>
<span class="ow-status" style="background:var(--cyan-100);color:var(--cyan-600)">Low</span>
<img src="assets/seals/SealCertificationGold.svg" height="120" alt="WELL Certified Gold seal">
```

---

## Quick start (for developers)

The system ships as plain CSS — no framework, no build step. Drop the two stylesheets into any project:

```html
<head>
  <link rel="stylesheet" href="colors_and_type.css">
  <link rel="stylesheet" href="components.css">
</head>
```

All values are CSS custom properties scoped to `:root`. Override at any level:

```css
.dark-section {
  --foreground: #fff;
  --background: var(--gray-900);
}
```

To use in React / Vue / framework code, treat the CSS file as global, then write components that consume the tokens via `var(--name)`.

---

## Hierarchy (atomic-design)

```
01  Foundations           Type, color theory, spacing, the philosophy
02  Tokens                Every CSS variable, in one table
03  Elements              Buttons, inputs, tags, chips — atomic
04  Components            Cards, modals, nav, fields — composed
05  Patterns              Real product moments — cert hero, scoping table, etc.
06  Brand & Media         Seals, badges, marks, watermarks, gradients
07  Iconography           Utility & concept glyphs
08  Guidelines            Voice, accessibility, dos & don'ts
```

This order mirrors how design systems are conventionally built (Brad Frost's Atomic Design, slightly adapted for the WELL brand-heavy context).

---

## How AI design agents (Claude) use this

This project includes `CLAUDE.md` at the root — Claude reads it automatically every time someone designs in this project. It contains:

- The token list (don't invent values)
- Component contracts (use `.ow-*` classes)
- Voice guidelines (calm, factual, generous)
- Anti-patterns (what to never do)

When you prototype a new screen with Claude in this project, the AI will follow these rules. Iteration speed compounds.

---

## Sharing with another team / org

This project lives in a Claude project under one org. Three ways to ship the system to a partner team:

1. **Standalone bundle** — `dist/one-well.html` is a single self-contained HTML file with every asset inlined. Email it; anyone can open and browse.
2. **Project zip** — download the entire project as a `.zip` and the partner team can drop it into their own Claude project, GitHub repo, or static-host folder. They get full edit access in their environment.
3. **Static hosting** — the project is plain HTML + CSS, so any static host works (Netlify drag-and-drop, GitHub Pages, S3 + CloudFront). Public link, no Claude account needed.

The system is **not locked** to any Claude org. Once exported, it's portable web.

---

## Versioning

- **v1.0** — Initial release. Full brand library, components, hierarchy, AI rules.

When making breaking changes (renaming tokens, removing components), bump major. Adding new components, additive only — bump minor.

---

## Contributing

1. New tokens → add to `colors_and_type.css` only. Update `CLAUDE.md` token table.
2. New component → add `.ow-*` class to `components.css`, build a preview card in `preview/`, link from `UI Kit.html`.
3. New brand asset → drop SVG into `assets/seals/` or `assets/badges/`. Update `brand-media.html`.
4. Voice / copy rules → edit `CLAUDE.md`.

---

## Credits

- **Type**: FT Made (display, by Schick Toikka), Mazzard Soft M (body, by ParaType)
- **Seals & badges**: International WELL Building Institute (IWBI)
- **System architecture**: built in collaboration with the IWBI design team, 2026

---

*One WELL Design System · IWBI · 2026 · v1.0*
