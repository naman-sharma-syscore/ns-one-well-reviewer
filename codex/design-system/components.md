> All OneWELL component primitives — buttons, tags, chips, forms, navigation shell, cards, and modals. Every class uses the .ow-* prefix. Source: components.css.

# OneWELL Components

Source: `components.css`

**Rule:** Always link `components.css` alongside `colors_and_type.css`. Never redefine `.ow-*` styles inline.

**Optical alignment principle:** Mazzard Soft M cap-height ≈ 0.71em; descenders sit ~3% below geometric center. All chips and buttons use `display: inline-flex; align-items: center; justify-content: center; line-height: 1; padding-bottom: 1px` to compensate.

---

## Base chip class

```css
.ow-chip
```
- `display: inline-flex; align-items: center; justify-content: center`
- `line-height: 1; white-space: nowrap; padding-bottom: 1px`
- `font-family: var(--font-body)`
- Foundation for all pill/tag variants

---

## Tags & status chips

### Status pill — `.ow-status`
For workflow state indicators: To-Do, Low, Medium, High, Done.

| Property | Value |
|----------|-------|
| Height | 24px |
| Padding | 0 10px (+ 1px bottom optical lift) |
| Border radius | 9999px (pill) |
| Font size | 12px |
| Font weight | 600 |
| Case | UPPERCASE |
| Letter spacing | 0.04em |

**Status color pairs** — always use background + text together:

| State | Background | Text |
|-------|-----------|------|
| To-Do | `--gray-100` | `--gray-600` |
| Low | `--cyan-100` | `--cyan-600` |
| Medium | `--plum-100` | `--plum-600` |
| High | `--coral-100` | `--coral-600` |
| Done | `--emerald-100` | `--emerald-600` |

---

### General tag — `.ow-tag`
For filters and category labels: All, Pursued, Achieved, etc.

| Property | Value |
|----------|-------|
| Height | 32px |
| Padding | 0 14px (+ 1px bottom) |
| Border radius | 6px (rounded rect, not pill) |
| Font size | 14px |
| Font weight | 500 |
| Case | Sentence case |

---

### Concept tag — `.ow-concept-tag`
For tagging content that belongs to a WELL concept category.

| Property | Value |
|----------|-------|
| Height | 24px |
| Padding | 0 12px (+ 1px bottom) |
| Border radius | 4px (square-ish corners) |
| Font size | 12px |
| Font weight | 600 |
| Case | UPPERCASE |
| Text color | `#fff` (white on concept color) |
| Background | The concept's `--concept-*` color |

> Concept tags are for content identification only. Never use concept colors on navigation, buttons, or page chrome.

---

### Code chip — `.ow-code-chip`
For criterion identifiers in scoping tables: W01, A02, L05, etc.

| Property | Value |
|----------|-------|
| Height | 22px |
| Padding | 0 8px (+ 1px bottom) |
| Border radius | 4px |
| Font size | 11px |
| Font weight | 600 |
| Letter spacing | 0.02em |
| Font feature | `"tnum"` (tabular — code/letter mix) |

---

## Buttons

### Base — `.ow-btn`
Every button must include `.ow-btn` plus one variant class.

```css
display: inline-flex; align-items: center; justify-content: center;
gap: 8px; font-family: var(--font-body); font-weight: 500;
line-height: 1; white-space: nowrap; cursor: pointer;
border: none; user-select: none; text-decoration: none;
transition: background-color .15s, color .15s, box-shadow .15s, transform .05s;
```

- `:active` → `transform: translateY(0.5px)`
- `:focus-visible` → `outline: 3px solid var(--cyan-300); outline-offset: 2px`

---

### Primary CTA — `.ow-btn-primary`
**One per view, maximum.**

| Property | Value |
|----------|-------|
| Height | 48px |
| Padding | 0 28px (+ 2px bottom lift) |
| Border radius | 9999px (pill) |
| Background | `var(--gradient-cta-cyan)` |
| Text color | `#fff` |
| Font size | 16px |
| Font weight | 600 |
| Letter spacing | 0.01em |
| Hover | `filter: brightness(1.05)` |

---

### Solid button — `.ow-btn-solid`
Utility primary. For Save, Submit, Continue.

| Property | Value |
|----------|-------|
| Height | 40px |
| Padding | 0 20px (+ 1px bottom) |
| Border radius | 6px |
| Background | `var(--blue-600)` |
| Text color | `#fff` |
| Font size | 14px |
| Hover | `background: var(--blue-700)` |

---

### Ghost button — `.ow-btn-ghost`
Tertiary. For inline links, low-emphasis actions.

| Property | Value |
|----------|-------|
| Height | 40px |
| Padding | 0 16px (+ 1px bottom) |
| Border radius | 6px |
| Background | transparent |
| Text color | `var(--gray-800)` |
| Font size | 14px |
| Hover | `background: var(--gray-100)` |

---

### Outline button — `.ow-btn-outline`
Secondary. For Cancel, Back.

| Property | Value |
|----------|-------|
| Height | 40px |
| Padding | 0 20px (+ 1px bottom) |
| Border radius | 6px |
| Background | `#fff` |
| Text color | `var(--gray-800)` |
| Font size | 14px |
| Border | `inset 0 0 0 1px var(--gray-200)` (box-shadow) |
| Hover | `background: var(--gray-50)`, border → `gray-300` |

---

### Icon button — `.ow-btn-icon`
Square icon-only button. For toolbar actions.

| Property | Value |
|----------|-------|
| Width / Height | 32px × 32px |
| Padding | 0 |
| Border radius | 6px |
| Background | transparent |
| Icon color | `var(--gray-700)` |
| Hover | `background: var(--gray-100)`, icon → `gray-900` |

---

### Size modifiers

Applied in addition to a variant class. Override height, padding, font size.

| Modifier | Height | Padding | Font size | Radius |
|----------|--------|---------|-----------|--------|
| `.ow-btn--sm` | 28px | 0 12px + 1px | 12px | 4px |
| `.ow-btn--md` | 36px | 0 16px + 1px | 14px | inherits |
| `.ow-btn--lg` | 48px | 0 28px + 2px | 16px | inherits |

> Never invent in-between heights. Snap to the scale.

---

## Forms

### Text input
| Property | Value |
|----------|-------|
| Background | white |
| Border | `1px solid var(--gray-200)` |
| Border radius | 6px (`--radius-sm`) |
| Height | 40px |
| Focus border | `2px solid var(--cyan-300)` |
| Focus halo | `var(--cyan-50)` background tint |

### Label
- Size: 12px (`--type-meta`)
- Color: `var(--gray-600)`
- Weight: 500
- Case: Sentence case
- Position: **above** the field

### Helper text
- Size: 12px
- Color: `var(--gray-500)`
- Italic acceptable only for user-uploaded / user-generated values

### Error state
- Border: `var(--coral-200)`
- Text: `var(--coral-700)`
- Always include the recovery action in the message

---

## Navigation shell

**3-column workspace layout:**

| Column | Style |
|--------|-------|
| Left rail | `background: var(--surface-side)` (cyan-50), `border-right: 1px solid var(--border-panel)` (blue-200) |
| Center canvas | `background: var(--surface)` (white) |
| Right rail | `background: var(--surface-side)`, `border-left: 1px solid var(--border-panel)` |

**Top bar:**
- Height: 64px
- Background: `var(--surface)` (white)
- Bottom border: `1px solid var(--border)` (gray-200)

**Active nav item:**
- Left border: `2px solid var(--primary)` (cyan-700/800)
- Background: `var(--surface-side)` (cyan-50)

> Use the side-rail pattern (`--surface-side`) for navigation only. Never as a content background.

---

## Cards

| Property | Value |
|----------|-------|
| Background | `var(--surface)` (white) |
| Border | `1px solid var(--border)` (gray-200) |
| Border radius | `--radius-md` to `--radius-lg` (8–12px) |
| Shadow | `var(--shadow-sm)` |

---

## Modals

| Property | Value |
|----------|-------|
| Background | `var(--surface)` (white) |
| Border radius | `--radius-modal` (24px) |
| Shadow | `var(--shadow-xl)` |
| Padding | 32px |
| Title | `.modal-title` class (FT Made, 22px, weight 400) |

---

## Selection controls

### Checkbox

```html
<!-- Off -->
<span style="width:20px;height:20px;border-radius:4px;border:1px solid var(--gray-200);background:#fff;display:inline-flex;align-items:center;justify-content:center;"></span>

<!-- On -->
<span style="width:20px;height:20px;border-radius:4px;border:1px solid var(--cyan-700);background:var(--cyan-700);display:inline-flex;align-items:center;justify-content:center;">
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="m2 6 3 3 5-6" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</span>

<!-- Disabled -->
<span style="width:20px;height:20px;border-radius:4px;border:1px solid var(--gray-100);background:var(--gray-50);display:inline-flex;align-items:center;justify-content:center;"></span>
```

### Radio

```html
<!-- Off -->
<span style="width:20px;height:20px;border-radius:9999px;border:1px solid var(--gray-200);background:#fff;display:inline-flex;align-items:center;justify-content:center;"></span>

<!-- Selected -->
<span style="width:20px;height:20px;border-radius:9999px;border:1px solid var(--cyan-700);background:#fff;display:inline-flex;align-items:center;justify-content:center;">
  <span style="width:10px;height:10px;border-radius:9999px;background:var(--cyan-700);"></span>
</span>
```

### Segmented control

```html
<div style="display:inline-flex;border:1px solid var(--gray-100);border-radius:9999px;padding:3px;background:#fff;">
  <button style="height:30px;padding:0 16px;border:0;background:var(--cyan-700);color:#fff;font:500 14px var(--font-body);border-radius:9999px;cursor:pointer;">All</button>
  <button style="height:30px;padding:0 16px;border:0;background:transparent;color:var(--gray-600);font:500 14px var(--font-body);border-radius:9999px;cursor:pointer;">Pursued</button>
  <button style="height:30px;padding:0 16px;border:0;background:transparent;color:var(--gray-600);font:500 14px var(--font-body);border-radius:9999px;cursor:pointer;">Achieved</button>
</div>
```

---

## Form inputs (markup)

```html
<!-- Default -->
<input style="height:40px;padding:0 12px;border:1px solid var(--gray-200);border-radius:8px;font:14px var(--font-body);color:var(--gray-800);background:#fff;outline:none;width:100%;box-sizing:border-box;" placeholder="Enter value">

<!-- Focus -->
<input style="height:40px;padding:0 11px;border:2px solid var(--cyan-300);border-radius:8px;box-shadow:0 0 0 2px rgba(57,201,234,.2);font:14px var(--font-body);color:var(--gray-800);background:#fff;outline:none;width:100%;box-sizing:border-box;" value="Focused">

<!-- Disabled -->
<input style="height:40px;padding:0 12px;border:1px solid var(--gray-100);border-radius:8px;font:14px var(--font-body);color:var(--gray-400);background:var(--gray-50);cursor:not-allowed;width:100%;box-sizing:border-box;" value="Read only" disabled>

<!-- Error -->
<input style="height:40px;padding:0 11px;border:2px solid var(--coral-700);border-radius:8px;font:14px var(--font-body);color:var(--gray-800);background:#fff;outline:none;width:100%;box-sizing:border-box;" value="bad-value">
<div style="font-size:12px;color:var(--coral-700);margin-top:4px;">Enter a valid email address</div>
```

---

## Accordions

```html
<!-- Collapsed -->
<div style="background:var(--cyan-50);border:1px solid var(--blue-200);border-radius:8px;padding:14px 16px;display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
  <span style="color:var(--blue-600);font-weight:500;font-size:16px;">C8 — Materials</span>
  <span style="color:var(--gray-500);">▾</span>
</div>

<!-- Open (2px cyan-300 border) -->
<div style="background:#fff;border:2px solid var(--cyan-300);border-radius:8px;padding:14px 16px;">
  <div style="display:flex;align-items:center;justify-content:space-between;color:var(--blue-600);font-weight:500;font-size:16px;">
    <span>C9 — Mind</span>
    <span style="color:var(--gray-500);transform:rotate(180deg);">▾</span>
  </div>
  <div style="font-size:14px;color:var(--gray-700);margin-top:10px;padding-top:10px;border-top:1px solid var(--gray-100);">Body content here.</div>
</div>
```

---

## Tables

```html
<table style="width:100%;background:#fff;border:1px solid var(--gray-200);border-radius:8px;border-collapse:separate;border-spacing:0;overflow:hidden;">
  <thead>
    <tr>
      <th style="background:var(--cyan-50);font-size:12px;font-weight:600;text-transform:uppercase;color:var(--cyan-800);text-align:left;letter-spacing:.05em;padding:14px 16px;border-bottom:1px solid var(--gray-200);">Column</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="font-size:14px;color:var(--gray-800);padding:14px 16px;border-bottom:1px solid var(--gray-200);">Row value</td>
    </tr>
  </tbody>
</table>
```

**Rules:** Header = `var(--cyan-50)` bg + `var(--cyan-800)` text, 12px uppercase `letter-spacing:.05em`. Rows alternate `#fff` / `var(--gray-50)`. Last row no border-bottom. Container `border-radius:8px`, `border-collapse:separate`, `border-spacing:0`.

---

## Tooltips & popovers

```html
<!-- Simple tooltip -->
<div style="background:var(--gray-700);color:#fff;padding:6px 10px;font-size:12px;border-radius:6px;max-width:200px;line-height:1.4;">
  Tooltip text here.
</div>

<!-- Rich popover with actions -->
<div style="background:var(--gray-700);color:#fff;padding:14px;border-radius:8px;width:280px;">
  <h4 style="font:600 14px var(--font-body);margin:0 0 6px;">Title</h4>
  <p style="font-size:12px;color:var(--gray-300);margin:0 0 12px;line-height:1.5;">Description text.</p>
  <div style="display:flex;gap:8px;">
    <button style="height:28px;padding:0 12px;border:0;border-radius:9999px;font:600 12px var(--font-body);cursor:pointer;background:var(--cyan-300);color:var(--gray-800);">Learn more</button>
    <button style="height:28px;padding:0 12px;border:0;border-radius:9999px;font:600 12px var(--font-body);cursor:pointer;background:var(--gray-500);color:#fff;">Dismiss</button>
  </div>
</div>
```

---

## Helper utility

### `.ow-optical-center`
General-purpose helper for any pill or tag that needs optical centering outside a named component:

```css
display: inline-flex; align-items: center; justify-content: center;
line-height: 1; padding-bottom: 1px;
```
