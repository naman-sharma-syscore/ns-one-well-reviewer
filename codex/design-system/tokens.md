> All OneWELL design tokens — color palettes, concept colors, gradients, semantic tokens, spacing, radii, shadows, and typography. Reference before using any value in a prototype.

# OneWELL Design Tokens

Source: `colors_and_type.css`

**Rule:** Always use `var(--token)`. Never hardcode hex values. If you need a tint, walk the existing 50–900 scale.

---

## Fonts

```css
--font-display: "FT Made", Georgia, "Times New Roman", serif;
--font-body:    "Mazzard Soft M", ui-sans-serif, system-ui, -apple-system, sans-serif;
```

**FT Made** (weight 400 only) — display and editorial moments only. Page titles, hero numbers, certification levels, modal titles. Never for buttons, labels, or UI controls.

**Mazzard Soft M** (weights 100–900) — everything else. Labels, paragraphs, buttons, tags, inputs, metadata.

---

## Color palettes (13 scales × 10 shades)

### Gray (neutral UI)
| Token | Hex |
|-------|-----|
| `--gray-50` | `#F9F9FA` |
| `--gray-100` | `#EFF1F2` |
| `--gray-200` | `#DEDFE3` |
| `--gray-300` | `#CBCDD2` |
| `--gray-400` | `#9FA2AB` |
| `--gray-500` | `#71747D` |
| `--gray-600` | `#52545D` |
| `--gray-700` | `#3E4049` |
| `--gray-800` | `#282A31` |
| `--gray-900` | `#171820` |

### Blue (primary CTA / links)
| Token | Hex |
|-------|-----|
| `--blue-50` | `#FBFDFE` |
| `--blue-100` | `#EFF5FB` |
| `--blue-200` | `#CBE0F1` |
| `--blue-300` | `#A3C8E6` |
| `--blue-400` | `#72ABD9` |
| `--blue-500` | `#3481C1` |
| `--blue-600` | `#2E74AD` |
| `--blue-700` | `#286495` |
| `--blue-800` | `#22547D` |
| `--blue-900` | `#183B58` |

### Cyan (focus, system signal, primary brand)
| Token | Hex |
|-------|-----|
| `--cyan-50` | `#FAFEFF` |
| `--cyan-100` | `#D6F4FB` |
| `--cyan-200` | `#95E2F4` |
| `--cyan-300` | `#39C9EA` |
| `--cyan-400` | `#18BDE2` |
| `--cyan-500` | `#16ADCF` |
| `--cyan-600` | `#149EBD` |
| `--cyan-700` | `#128BA6` |
| `--cyan-800` | `#0F748A` |
| `--cyan-900` | `#0A5161` |

### Emerald (success / done)
| Token | Hex |
|-------|-----|
| `--emerald-50` | `#FBFEFE` |
| `--emerald-100` | `#E0FBF5` |
| `--emerald-200` | `#BCF6EA` |
| `--emerald-300` | `#8AEFDB` |
| `--emerald-400` | `#50E7CA` |
| `--emerald-500` | `#1DD7B2` |
| `--emerald-600` | `#1BC5A3` |
| `--emerald-700` | `#17AA8D` |
| `--emerald-800` | `#138B73` |
| `--emerald-900` | `#0E6352` |

### Plum (medium priority)
| Token | Hex |
|-------|-----|
| `--plum-50` | `#FDFCFD` |
| `--plum-100` | `#F7F2F6` |
| `--plum-200` | `#F0E1ED` |
| `--plum-300` | `#E8CAE1` |
| `--plum-400` | `#DCADD2` |
| `--plum-500` | `#BF78AE` |
| `--plum-600` | `#AA6A9B` |
| `--plum-700` | `#905C84` |
| `--plum-800` | `#7F5075` |
| `--plum-900` | `#633E5A` |

### Coral (destructive only)
| Token | Hex |
|-------|-----|
| `--coral-50` | `#FEFCFB` |
| `--coral-100` | `#FCF4F2` |
| `--coral-200` | `#F8DFD8` |
| `--coral-300` | `#F4C9BE` |
| `--coral-400` | `#F0AA99` |
| `--coral-500` | `#ED896F` |
| `--coral-600` | `#E67357` |
| `--coral-700` | `#DC5432` |
| `--coral-800` | `#BC4324` |
| `--coral-900` | `#81311D` |

> **Coral is destructive only.** Errors, delete confirmations. Never decorative.

### Pink
| Token | Hex |
|-------|-----|
| `--pink-50` | `#FEFBFB` |
| `--pink-100` | `#FCEEEF` |
| `--pink-200` | `#F7D4D8` |
| `--pink-300` | `#F2B4BB` |
| `--pink-400` | `#EFA4AD` |
| `--pink-500` | `#EB8E99` |
| `--pink-600` | `#E77481` |
| `--pink-700` | `#E25566` |
| `--pink-800` | `#C92E3F` |
| `--pink-900` | `#9D1B2A` |

### Bronze (certification)
| Token | Hex |
|-------|-----|
| `--bronze-50` | `#FEFDFB` |
| `--bronze-100` | `#FBF8F3` |
| `--bronze-200` | `#F8F1E8` |
| `--bronze-300` | `#F3E7D8` |
| `--bronze-400` | `#EEDEC9` |
| `--bronze-500` | `#E8D2B5` |
| `--bronze-600` | `#DCBA8E` |
| `--bronze-700` | `#D0A367` |
| `--bronze-800` | `#BB833A` |
| `--bronze-900` | `#845D29` |

### Silver (certification)
| Token | Hex |
|-------|-----|
| `--silver-50` | `#FCFCFD` |
| `--silver-100` | `#F6F7F8` |
| `--silver-200` | `#EDF0F2` |
| `--silver-300` | `#E2E5E9` |
| `--silver-400` | `#D6DBE0` |
| `--silver-500` | `#C8CED6` |
| `--silver-600` | `#BCC4CD` |
| `--silver-700` | `#A2ADB9` |
| `--silver-800` | `#8190A1` |
| `--silver-900` | `#5C6A7B` |

### Gold (certification)
| Token | Hex |
|-------|-----|
| `--gold-50` | `#FEFDFB` |
| `--gold-100` | `#FDFCF6` |
| `--gold-200` | `#F9F5E1` |
| `--gold-300` | `#F6EFD0` |
| `--gold-400` | `#F2E8BB` |
| `--gold-500` | `#EEE2AA` |
| `--gold-600` | `#EADA94` |
| `--gold-700` | `#E5D27B` |
| `--gold-800` | `#CDAE28` |
| `--gold-900` | `#917C1D` |

### Platinum (certification)
| Token | Hex |
|-------|-----|
| `--platinum-50` | `#FCFCFD` |
| `--platinum-100` | `#F7F7F8` |
| `--platinum-200` | `#ECECEE` |
| `--platinum-300` | `#E2E1E5` |
| `--platinum-400` | `#D2D1D6` |
| `--platinum-500` | `#C6C5CC` |
| `--platinum-600` | `#B4B3BC` |
| `--platinum-700` | `#9F9DA9` |
| `--platinum-800` | `#848291` |
| `--platinum-900` | `#5D5B67` |

### Beige (warm neutral)
| Token | Hex |
|-------|-----|
| `--beige-50` | `#FDFCFC` |
| `--beige-100` | `#FBFAF9` |
| `--beige-200` | `#EFEAE6` |
| `--beige-300` | `#E3DBD6` |
| `--beige-400` | `#D3CAC4` |
| `--beige-500` | `#C1B6AF` |
| `--beige-600` | `#B4A9A1` |
| `--beige-700` | `#A79A92` |
| `--beige-800` | `#8E837B` |
| `--beige-900` | `#716962` |

---

## Concept colors (11 — content tagging only)

These identify which WELL concept a strategy or feature belongs to. **Never use for buttons, links, navigation chrome, or decorative accents.**

| Token | Hex | Concept |
|-------|-----|---------|
| `--concept-mind` | `#0A5161` | Mind |
| `--concept-community` | `#0F748A` | Community |
| `--concept-movement` | `#149EBD` | Movement |
| `--concept-water` | `#39C9EA` | Water |
| `--concept-air` | `#87DFF2` | Air |
| `--concept-light` | `#8AEFDB` | Light |
| `--concept-thermal` | `#3EDDBF` | Thermal Comfort |
| `--concept-nourishment` | `#17AA8D` | Nourishment |
| `--concept-sound` | `#0C705C` | Sound |
| `--concept-materials` | `#0A4F41` | Materials |
| `--concept-innovation` | `#52545D` | Innovation |

---

## Rating colors (4)

| Token | Hex |
|-------|-----|
| `--rating-health-safety` | `#72ABD9` |
| `--rating-performance` | `#0F748A` |
| `--rating-equity` | `#17AA8D` |
| `--rating-coworking` | `#9A608C` |

---

## Certification colors (4)

| Token | Hex |
|-------|-----|
| `--cert-bronze` | `#BB833A` |
| `--cert-silver` | `#A2ADB9` |
| `--cert-gold` | `#CDAE28` |
| `--cert-platinum` | `#848291` |

---

## Gradients (4)

| Token | Definition | Usage |
|-------|-----------|-------|
| `--gradient-cta-bright` | `linear-gradient(99deg, #41D5F6 3.39%, #3EECD1 57.86%, #66FCD9 112.32%)` | Avoid under text; decorative only |
| `--gradient-cta-cyan` | Cyan overlay on cta-bright | **Primary CTA button — one per view max** |
| `--gradient-soft` | `linear-gradient(58deg, #8AEFDB 2.8%, #D4BACE 41.67%, #CBE0F1 80.55%)` | Soft background moments |
| `--gradient-performance` | `linear-gradient(180deg, #1DD7B2 0%, #18BDE2 50%, #BF78AE 75%, #E67357 100%)` | Portfolio rating visuals only |

> `--gradient-performance` is reserved for portfolio rating visuals. Never as a generic background.

---

## Semantic tokens

These are the tokens you should reach for by default in prototypes:

| Token | Maps to | Usage |
|-------|---------|-------|
| `--primary` | `--cyan-800` (#0F748A) | Active state, focus rings, primary signal |
| `--primary-cta` | `--blue-600` | Solid utility buttons |
| `--destructive` | `--coral-700` | Errors, delete confirmations |
| `--background` | `--gray-50` | Page background |
| `--surface` | `#FFFFFF` | Cards, modals, panels |
| `--surface-side` | `--cyan-50` | Side rails, nav panels |
| `--surface-overlay` | `--gray-700` | Modal backdrops |
| `--foreground` | `--gray-800` | Body text |
| `--foreground-muted` | `--gray-500` | Meta, captions, muted text |
| `--foreground-on-dark` | `#FFFFFF` | Text on dark/colored surfaces |
| `--link` | `--blue-600` | Hyperlinks |
| `--border` | `--gray-200` | Default borders, dividers |
| `--border-soft` | `--gray-100` | Subtle dividers |
| `--border-panel` | `--blue-200` | Side rail outer strokes |
| `--border-focus` | `--cyan-300` | Focus ring color |

---

## Color usage rules

| Token | Where it goes |
|-------|--------------|
| `--cyan-700` / `--primary` | Focus rings, primary CTA gradient stop, active states. Never a passive surface. |
| `--cyan-50` / `--cyan-100` | Side rails, panel backgrounds, focus halos |
| `--blue-600` | Utility primary buttons, links, secondary CTAs |
| `--blue-100` / `--blue-200` | Selectable tag backgrounds, panel borders |
| `--gray-800` / `--gray-700` | Body text |
| `--gray-500` | Meta, caption, muted text |
| `--gray-200` / `--gray-100` | Borders, dividers, disabled surfaces |
| `--gray-50` | Page background |
| `--coral-*` | Destructive only — errors, delete. Never decorative. |
| `--emerald-*` | Done / success states. Never primary. |
| `--plum-*` | Medium priority, secondary signal. |

**Don't:**
- Use cyan AND blue together as primary buttons in the same view
- Use coral for anything except destruction
- Use `--gradient-performance` as a general background fill
- Use concept colors on buttons, links, or chrome

---

## Spacing scale

| Token | Value |
|-------|-------|
| `--space-xs` | 4px |
| `--space-sm` | 8px |
| `--space-md` | 16px |
| `--space-lg` | 32px |
| `--space-xl` | 64px |

No arbitrary values. If you need a size not here, use the nearest scale step.

---

## Radii

| Token | Value |
|-------|-------|
| `--radius-xs` | 3px |
| `--radius-sm` | 6px |
| `--radius-md` | 8px |
| `--radius-lg` | 12px |
| `--radius-xl` | 16px |
| `--radius-modal` | 24px |
| `--radius-full` | 9999px |

**Where each applies:**
- Inputs, rect buttons: `--radius-sm` (6px)
- Cards: `--radius-md` to `--radius-lg` (8–12px)
- Modals: `--radius-modal` (24px)
- Pills, primary CTAs: `--radius-full` (9999px)

---

## Shadows

| Token | Definition |
|-------|-----------|
| `--shadow-xs` | `0 1px 2px 0 rgba(16,24,40,0.05)` |
| `--shadow-sm` | `0 1px 3px 0 rgba(16,24,40,0.08), 0 1px 2px -1px rgba(16,24,40,0.06)` |
| `--shadow-md` | `0 4px 6px -1px rgba(16,24,40,0.08), 0 2px 4px -2px rgba(16,24,40,0.06)` |
| `--shadow-lg` | `0 10px 15px -3px rgba(16,24,40,0.10), 0 4px 6px -4px rgba(16,24,40,0.08)` |
| `--shadow-xl` | `0 20px 25px -5px rgba(16,24,40,0.10), 0 8px 10px -6px rgba(16,24,40,0.08)` |

---

## Typography tokens

### Size variables
| Token | Value |
|-------|-------|
| `--type-display` | 42px |
| `--type-page-title` | 30px |
| `--type-modal-title` | 22px |
| `--type-h1` | 24px |
| `--type-h2` | 20px |
| `--type-h3` | 18px |
| `--type-body-lg` | 18px |
| `--type-body` | 16px |
| `--type-body-sm` | 14px |
| `--type-meta` | 12px |

### Type scale usage
- **Display** (42/30/24/20px): `var(--font-display)`, weight 400 — page titles, hero numbers, cert levels
- **Heading** (18/16/14px): `var(--font-body)`, weight 500 — section headings in UI
- **Body** (16/14/13px): weight 400 — paragraphs, descriptions
- **Caption / meta-utility** (12/11px): weight 600, uppercase, letter-spacing 0.05em, color `--gray-500`

### Semantic CSS classes

| Class | Font | Size | Weight | Notes |
|-------|------|------|--------|-------|
| `.display` | FT Made | 42px | 400 | Line height 1.1, letter-spacing -0.01em |
| `.page-title` | FT Made | 30px | 400 | Line height 1.15 |
| `.modal-title` | FT Made | 22px | 400 | Line height 1.2, no italic |
| `.heading-lg` / `h2` | Mazzard | 24px | 600 | Line height 1.3 |
| `.heading-md` / `h3` | Mazzard | 20px | 600 | Line height 1.3 |
| `.heading-sm` / `h4` | Mazzard | 18px | 600 | Line height 1.35 |
| `.subheading` | Mazzard | 18px | 600 | Color: `--cyan-800` |
| `.body-lg` | Mazzard | 18px | 400 | Line height 1.55 |
| `.body` | Mazzard | 16px | 400 | Line height 1.55 |
| `.body-sm` | Mazzard | 14px | 400 | Line height 1.5 |
| `.meta-hint` | Mazzard | 12px | 600 | Color: `--plum-800` |
| `.meta-utility` | Mazzard | 14px | 400 | Color: `--gray-600` |
| `.section-label` | Mazzard | 12px | 600 | Uppercase, letter-spacing 0.05em, color `--cyan-800` |

**FT Made is reserved.** Never use it for buttons, labels, or UI controls. It carries calm editorial weight; spending it on a label cheapens it.
