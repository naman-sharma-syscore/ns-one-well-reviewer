# One WELL Design System — Working Rules

> Read this before you design anything in this project. Every prototype, mock, exploration, and page should follow these rules unless the user explicitly says otherwise.

This is the design system for **WELL Standard / IWBI** (International WELL Building Institute). The product is a multi-stakeholder workspace for navigating, scoping, achieving, and verifying WELL building certifications.

---

## 0. The hard truths

1. **Use existing tokens. Never invent colors, sizes, or fonts.** Every value lives in `colors_and_type.css`, `components.css`, or the `assets/` folder. If you need something not there, surface it to the user — don't guess.
2. **Brand marks are sacred.** Never recolor, redraw, or stylize the WELL Seal, IWBI logo, certification seals, rating seals, or provider badges. Use them verbatim from `assets/seals/` and `assets/badges/`.
3. **Type pairing is fixed.** FT Made for display only (page titles, hero numbers, certification levels). Mazzard Soft M for everything else. No third font.
4. **Cyan is the brand "yes."** Use the gradient CTA exactly once per view. Never on incidental buttons.
5. **One canonical home per component.** The Tags card owns tags. The Buttons card owns buttons. Don't redefine tag styles inside a fresh prototype — link to `components.css`.

---

## 1. Visual identity

### Type stack

| Role | Family | Weight | Usage |
|---|---|---|---|
| Display | `var(--font-display)` = FT Made | 400 | Page titles, hero numbers, cert levels, big editorial moments |
| Body | `var(--font-body)` = Mazzard Soft M | 400 / 500 / 600 | Everything else — labels, paragraphs, buttons, tags |
| Mono | `ui-monospace, monospace` | — | Code chips, token names, technical metadata |

**FT Made is reserved.** Don't use it for buttons, labels, or UI controls. It carries calm, editorial weight; spending it on a label cheapens it.

### Type scale (use exactly these)
- Display: 42 / 30 / 24 / 20 px — `var(--font-display)`, weight 400
- Heading: 18 / 16 / 14 px — `var(--font-body)`, weight 500
- Body: 16 / 14 / 13 px — weight 400
- Caption / meta-utility: 12 / 11 px — weight 600, uppercase, letter-spacing 0.05em, color `--gray-500`

### Color usage (strict)

| Token | Where it goes |
|---|---|
| `--cyan-700` (#0F748A) | **Primary brand.** Focus rings, primary CTA gradient stop, active states. Never a passive surface. |
| `--cyan-50` / `--cyan-100` | Side rails, panel backgrounds, focus halos |
| `--blue-600` | Utility primary buttons, links, secondary CTAs |
| `--blue-100` / `--blue-200` | Selectable tag backgrounds, panel borders |
| `--gray-800` / `--gray-700` | Body text |
| `--gray-500` | Meta, caption, muted text |
| `--gray-200` / `--gray-100` | Borders, dividers, disabled surfaces |
| `--gray-50` | Page background |
| `--coral-*` | **Destructive only.** Errors, delete confirmations. Never decorative. |
| `--emerald-*` | Done / success states. Never primary. |
| `--plum-*` | Medium priority, secondary signal. |
| **Concept colors** (Air #87DFF2, Water #39C9EA, Nourishment #17AA8D, Light #22A4D7, Movement #5DC4F6, Thermal #2BB5A8, Sound #006FA8, Materials #1F94CC, Mind #0A5161, Community #0F748A, Innovation #073944) | **Tagging only.** Used to identify *what concept* a strategy belongs to. Never as button color, never as page accent. |

### Don't
- ❌ Don't use cyan AND blue together as primary buttons in the same view. Pick one.
- ❌ Don't use coral for anything except destruction.
- ❌ Don't use the performance gradient (`--gradient-performance`) for backgrounds. Reserved for portfolio rating visuals.
- ❌ Don't use concept colors on buttons, links, or chrome.

---

## 2. Components — use, don't reinvent

Every component lives in `components.css` with the `.ow-*` prefix or in `colors_and_type.css` as a token. Always link both stylesheets at the top of any HTML file:

```html
<link rel="stylesheet" href="colors_and_type.css">
<link rel="stylesheet" href="components.css">
```

### Buttons
- `.ow-btn-primary` — the gradient cyan CTA. **One per view, max.**
- `.ow-btn-solid` — utility primary (blue-600). For Save, Submit, Continue.
- `.ow-btn-outline` — secondary. For Cancel, Back.
- `.ow-btn-ghost` — tertiary. For inline links, low-emphasis.
- Sizes: `--sm` (28px), default (40px), `--lg` (48px). Never invent in-between heights.
- All buttons: `display: inline-flex; align-items: center; justify-content: center; line-height: 1; padding-bottom: 1px` for optical centering of Mazzard Soft.

### Tags & status pills
- `.ow-status` — 24px pill, uppercase, for state (To-Do, Low, Medium, High, Done)
- `.ow-tag` — 32px rounded rect, sentence case, for filters (All, Pursued, Achieved)
- `.ow-concept-tag` — 24px square corners, uppercase, color-coded by concept
- `.ow-code-chip` — 22px, used in scoping tables for code-criterion identifiers (W01, A02 etc.)

**Status priority colors** (always together):
- `gray-100/600` = To-Do
- `cyan-100/600` = Low
- `plum-100/600` = Medium
- `coral-100/600` = High
- `emerald-100/600` = Done

### Forms
- Inputs: white bg, 1px `--gray-200` border, 6px radius, 40px height. Focus = 2px `--cyan-300` ring + `--cyan-50` halo.
- Labels: 12px, `--gray-600`, weight 500, sentence case, sit *above* the field.
- Helper text: 12px, `--gray-500`, italic OK only if user-uploaded values.
- Errors: `--coral-700` text + `--coral-200` border. Always include the recovery action.

### Navigation shell
- 3-column workspace: `--cyan-50` rails left/right, white center.
- Side rails wear a 1px `--blue-200` outer stroke.
- Active item: 2px `--cyan-700` left border, `--cyan-50` background.
- Top bar: 64px, white, 1px `--gray-200` bottom border.

---

## 3. Brand assets

All marks live in `assets/seals/` and `assets/badges/`. Reference by relative path.

| Use case | File |
|---|---|
| Standalone WELL identity | `assets/seals/SealWell.svg` |
| IWBI organization mark | `assets/seals/IWBILogo.svg` |
| In-product nav logo | `assets/icons/StandardLogo.svg` |
| Final certification (4 levels) | `assets/seals/SealCertification{Bronze,Silver,Gold,Platinum}.svg` |
| Single-topic rating awarded | `assets/seals/SealRating{Equity,Performance,Operations,Workforce,Coworking,Design,HealthSafety,RealEstate}.svg` |
| Provider attribution (formal) | `assets/seals/Seal*Provider.svg` |
| Provider attribution (compact) | `assets/badges/Badge*Provider.svg` |
| Member organization | `assets/seals/SealIwbiMember.svg` |
| Watermarks (low emphasis) | `assets/seals/Watermark*.svg`, `assets/seals/WaterMark*.svg` |

**Sizing minimums**: any seal must render ≥ 64px on the long edge. Below that, swap for the badge variant.

---

## 4. Iconography

30+ utility glyphs in `assets/icons/Utility*.svg`. All 24×24 native, monochrome, render at `currentColor`.

- Use sparingly — every icon adds cognitive load.
- Icon + label > icon-alone, except for universally understood (close, search, edit).
- Recolor by inlining the SVG and setting parent color, not by editing the file.
- Don't mix utility icons (Utility*) with concept icons (ConceptIcons.svg). Concept icons are for content tagging only.

---

## 5. Copy & voice

The WELL voice is **calm, factual, generous, never alarmist**. It speaks like a thoughtful project manager — confident in the work, patient with the reader.

### Do
- "8 points to Gold" → **directional**, not punitive
- "Audit window opens Jun 1" → **factual**, no countdown urgency
- "Upload your acoustics report when ready" → **patient**, action-oriented
- Sentence case for headings ("Project team", not "Project Team")
- Title case for cert levels and proper nouns ("Gold", "WELL Building Standard")

### Don't
- ❌ "You're failing" → **never** frame partial completion as failure
- ❌ "Hurry up — only 3 days left!" → **never** urgency-bait
- ❌ "Oops! Something went wrong" → **never** cheery error language. Be direct: "We couldn't save that change. Try again, or contact your admin."
- ❌ Title Case Headings Like This
- ❌ Excessive emoji. None except where brand explicitly uses (rare).

### Errors
Format: `<what happened> + <next step>`. Never just "Error".
- ✅ "We couldn't reach the WELL Reviewer. Your changes are saved — try submitting again in a minute."
- ❌ "Submission failed!"

---

## 6. Layout & spacing

### Spacing scale
Use `--space-xs` (4) / `--space-sm` (8) / `--space-md` (16) / `--space-lg` (32) / `--space-xl` (64). No arbitrary values.

### Radii
`--radius-xs` (3) / `--radius-sm` (6) / `--radius-md` (8) / `--radius-lg` (12) / `--radius-xl` (16) / `--radius-modal` (24) / `--radius-full` (9999).

- Inputs, buttons (rect): 6px
- Cards: 8–12px
- Modals: 24px
- Pills, primary CTAs: 9999

### Page width
- Marketing / hero pages: max-width 1248px, 240px side gutters at desktop
- Product pages: full width, 32px padding
- Mobile: 16px page padding

### Grid
- Marketing: 12-col, 24px gutter
- Product: 3-column workspace (rail / canvas / rail)

---

## 7. Accessibility minimums

- All interactive elements must have visible focus (2px cyan-300 ring, never `outline: none` without replacement).
- Hit targets: 44×44px minimum on touch.
- Body text contrast: ≥ 4.5:1. Caption: ≥ 4.5:1 against bg.
- Status pills carry color + label, never color alone (icon optional).
- All seals/badges have descriptive alt text matching the file name without the prefix ("WELL Certified Gold seal", not "SealCertificationGold.svg").

---

## 8. When designing prototypes

1. **Start by linking the stylesheets** (`colors_and_type.css` + `components.css`). Don't re-define tokens inline.
2. **Reach for `.ow-*` classes first.** If a class doesn't exist for what you need, ask before inventing.
3. **Use seals from `assets/seals/`, icons from `assets/icons/`.** Don't draw replacements.
4. **Keep one primary CTA per view.** Identify the one action the user is here to complete.
5. **Use the side-rail pattern (`--surface-side`) for nav, never as a content background.**
6. **Show data with restraint.** The .fig has no charts — favor numbers + small chips + the gradient bar (for ratings only). If you must add a chart, keep it monochrome cyan, no decorative gradients.
7. **Never invent typography combinations.** If you need a new size, snap to the existing scale.

---

## 9. Anti-patterns

The following will be flagged in review:

- ❌ Hardcoded hex codes anywhere (use `var(--token)`)
- ❌ Inline `font-family: 'Inter'` or other non-system fonts
- ❌ Buttons without `.ow-btn` base class
- ❌ Multiple primary CTAs in one view
- ❌ Concept colors on chrome (buttons, headers, panels)
- ❌ Recolored seals or badges
- ❌ Decorative emoji
- ❌ Bright gradients (cyan-bright, performance) used as background fills under text
- ❌ Title Case Headings
- ❌ Generic "Loading…" / "Error" without context

---

## 10. File organization

```
project-root/
├── colors_and_type.css      # All tokens (colors, type, gradients, spacing, radii)
├── components.css            # All .ow-* component primitives
├── CLAUDE.md                 # This file
├── README.md                 # For human consumers
├── UI Kit.html              # The canonical, hierarchical component reference
├── assets/
│   ├── seals/               # Brand seals (.svg + original .tsx)
│   ├── badges/              # Compact badges (.svg + original .tsx)
│   └── icons/               # Utility + concept icons (.svg + original .tsx)
└── preview/
    ├── brand-media.html     # Full brand catalog
    ├── tags.html            # Tags & buttons
    ├── utility-icons.html   # All glyphs
    └── ...                  # One canonical card per component group
```

When adding a new component card, drop it in `preview/` and link from UI Kit.html. Never duplicate the component definition — extend `components.css`.

---

*One WELL Design System · IWBI · 2026 · v1.0*
