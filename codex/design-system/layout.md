> OneWELL layout system — spacing, radii, page widths, grid, and accessibility minimums. No arbitrary values; snap to the scale.

# OneWELL Layout & Accessibility

---

## Spacing scale

Always use the token — no arbitrary pixel values.

| Token | Value | Use for |
|-------|-------|---------|
| `--space-xs` | 4px | Micro gaps — icon-to-label, chip internal padding contribution |
| `--space-sm` | 8px | Tight groupings — stacked inputs, inline items |
| `--space-md` | 16px | Default content padding, section gaps |
| `--space-lg` | 32px | Major section separation, card padding |
| `--space-xl` | 64px | Hero sections, page-level breathing room |

---

## Radii

| Token | Value | Where it applies |
|-------|-------|-----------------|
| `--radius-xs` | 3px | Very small internal chips, tight UI |
| `--radius-sm` | 6px | Inputs, rectangular buttons, code chips |
| `--radius-md` | 8px | Cards (default) |
| `--radius-lg` | 12px | Cards (large), container blocks |
| `--radius-xl` | 16px | Larger surface containers |
| `--radius-modal` | 24px | Modals, dialogs, popovers |
| `--radius-full` | 9999px | Pills — status chips, primary CTA, concept tags |

**Quick reference:**
- Inputs → 6px (`--radius-sm`)
- Rect buttons → 6px (`--radius-sm`)
- Primary CTA pill → 9999px (`--radius-full`)
- Cards → 8–12px (`--radius-md` / `--radius-lg`)
- Modals → 24px (`--radius-modal`)

---

## Page widths

| Context | Max width | Padding |
|---------|-----------|---------|
| Marketing / hero pages | 1248px | 240px side gutters at desktop |
| Product pages | Full width | 32px horizontal padding |
| Mobile | Full width | 16px horizontal padding |

---

## Grid system

| Context | Columns | Gutter |
|---------|---------|--------|
| Marketing pages | 12-column | 24px |
| Product / app pages | 3-column workspace | — |

**3-column workspace (product layout):**

```
[ Left rail ] [ Main canvas ] [ Right rail ]
  cyan-50 bg    white bg       cyan-50 bg
  1px blue-200  full width     1px blue-200
  outer stroke  content area   outer stroke
```

- Left rail: navigation, context panels, concept filters
- Main canvas: primary content area, white (`var(--surface)`)
- Right rail: supplementary info, scoring panels, reviewer notes
- Top bar: 64px, white, `1px var(--border)` bottom

---

## Shadows

Used to communicate elevation:

| Token | Level | Use for |
|-------|-------|---------|
| `--shadow-xs` | Minimal | Subtle surface lift, inline chips |
| `--shadow-sm` | Low | Cards, dropdown surfaces |
| `--shadow-md` | Medium | Floating panels, popovers |
| `--shadow-lg` | High | Sidebars, sticky headers |
| `--shadow-xl` | Maximum | Modals, dialogs |

---

## Accessibility minimums

These are non-negotiable for all prototype and production work.

### Focus
- All interactive elements must have a visible focus ring
- Focus ring: `2px solid var(--cyan-300)` with `outline-offset: 2px`
- **Never** `outline: none` without a replacement focus indicator
- Applied via: `.ow-btn:focus-visible { outline: 3px solid var(--cyan-300); outline-offset: 2px; }`

### Hit targets
- Minimum touch target: **44×44px** on touch devices
- Icon-only buttons (`.ow-btn-icon`) are 32×32px — ensure adequate touch spacing around them

### Color contrast
- Body text (≥16px): ≥ 4.5:1 contrast ratio against background
- Caption / meta text (12px, weight 600): ≥ 4.5:1 against background
- Never rely on color alone for meaning — always pair with label or icon

### Status chips
- Status must always carry **color + text label** together
- Never use color alone to communicate state (To-Do, Low, High, Done, etc.)
- Icon is optional as a third signal but not a substitute for the label

### Brand marks (seals/badges)
- All seals and badges must have descriptive `alt` text
- Format: human description of what the mark represents, not the filename
  - ✅ `alt="WELL Certified Platinum seal"`
  - ❌ `alt="SealCertificationPlatinum.svg"`

### General
- Use semantic HTML elements (`<button>`, `<label>`, `<input>`, `<nav>`) — not `<div>` with click handlers
- Inputs must have associated `<label>` elements (either via `for`/`id` or wrapping)
- Error messages must describe what failed and what to do next — not just "Error"
