# One WELL Design System — Complete Reference
> IWBI / WELL Standard · v1.0 · 2026  
> Pass this file to any AI model to enforce the full visual system.

---

## 0. Setup

Every HTML file must link both stylesheets (self-hosted, relative paths):

```html
<link rel="stylesheet" href="colors_and_type.css">
<link rel="stylesheet" href="components.css">
```

Fonts are self-hosted:
- **FT Made** — display only (`fonts/FTMade-Regular.woff2`)
- **Mazzard Soft M** — body, weights 100–900 (`fonts/Mazzard-M/mazzardsoftm-*.otf`)

---

## 1. Hard Rules

1. **Never invent colors, sizes, or fonts.** Every value lives in tokens below.
2. **Brand marks are sacred.** Never recolor, redraw, or stylize seals/logos. Use SVGs from `assets/seals/` and `assets/badges/` verbatim.
3. **FT Made = display only.** Never use it for buttons, labels, or UI controls.
4. **Cyan is the brand "yes."** Use `--gradient-cta-cyan` exactly once per view, on the primary CTA only.
5. **One `.ow-btn-primary` per view max.**
6. **Concept colors are for content tagging only.** Never on buttons, headers, or chrome.
7. **Coral = destructive only.** Never decorative.
8. **Sentence case headings.** ("Project team", not "Project Team")
9. **No hardcoded hex values.** Always use `var(--token)`.
10. **No third font.** Not Inter, not Roboto, not anything else.

---

## 2. Color Tokens

### Generic
```css
--white: #FFFFFF;
--black: #000000;
```

### Gray (neutral UI)
```css
--gray-50:  #F9F9FA;   --gray-100: #EFF1F2;   --gray-200: #DEDFE3;
--gray-300: #CBCDD2;   --gray-400: #9FA2AB;   --gray-500: #71747D;
--gray-600: #52545D;   --gray-700: #3E4049;   --gray-800: #282A31;
--gray-900: #171820;
```

### Blue (primary CTA / links)
```css
--blue-50:  #FBFDFE;   --blue-100: #EFF5FB;   --blue-200: #CBE0F1;
--blue-300: #A3C8E6;   --blue-400: #72ABD9;   --blue-500: #3481C1;
--blue-600: #2E74AD;   --blue-700: #286495;   --blue-800: #22547D;
--blue-900: #183B58;
```

### Cyan (brand primary / focus / active)
```css
--cyan-50:  #FAFEFF;   --cyan-100: #D6F4FB;   --cyan-200: #95E2F4;
--cyan-300: #39C9EA;   --cyan-400: #18BDE2;   --cyan-500: #16ADCF;
--cyan-600: #149EBD;   --cyan-700: #128BA6;   --cyan-800: #0F748A;
--cyan-900: #0A5161;
```

### Emerald (success)
```css
--emerald-50:  #FBFEFE;  --emerald-100: #E0FBF5;  --emerald-200: #BCF6EA;
--emerald-300: #8AEFDB;  --emerald-400: #50E7CA;  --emerald-500: #1DD7B2;
--emerald-600: #1BC5A3;  --emerald-700: #17AA8D;  --emerald-800: #138B73;
--emerald-900: #0E6352;
```

### Plum (medium priority / secondary signal)
```css
--plum-50:  #FDFCFD;  --plum-100: #F7F2F6;  --plum-200: #F0E1ED;
--plum-300: #E8CAE1;  --plum-400: #DCADD2;  --plum-500: #BF78AE;
--plum-600: #AA6A9B;  --plum-700: #905C84;  --plum-800: #7F5075;
--plum-900: #633E5A;
```

### Coral (destructive only)
```css
--coral-50:  #FEFCFB;  --coral-100: #FCF4F2;  --coral-200: #F8DFD8;
--coral-300: #F4C9BE;  --coral-400: #F0AA99;  --coral-500: #ED896F;
--coral-600: #E67357;  --coral-700: #DC5432;  --coral-800: #BC4324;
--coral-900: #81311D;
```

### Pink
```css
--pink-50:  #FEFBFB;  --pink-100: #FCEEEF;  --pink-200: #F7D4D8;
--pink-300: #F2B4BB;  --pink-400: #EFA4AD;  --pink-500: #EB8E99;
--pink-600: #E77481;  --pink-700: #E25566;  --pink-800: #C92E3F;
--pink-900: #9D1B2A;
```

### Certification color scales
```css
/* Bronze */
--bronze-50:#FEFDFB; --bronze-100:#FBF8F3; --bronze-200:#F8F1E8;
--bronze-300:#F3E7D8; --bronze-400:#EEDEC9; --bronze-500:#E8D2B5;
--bronze-600:#DCBA8E; --bronze-700:#D0A367; --bronze-800:#BB833A; --bronze-900:#845D29;

/* Silver */
--silver-50:#FCFCFD; --silver-100:#F6F7F8; --silver-200:#EDF0F2;
--silver-300:#E2E5E9; --silver-400:#D6DBE0; --silver-500:#C8CED6;
--silver-600:#BCC4CD; --silver-700:#A2ADB9; --silver-800:#8190A1; --silver-900:#5C6A7B;

/* Gold */
--gold-50:#FEFDFB; --gold-100:#FDFCF6; --gold-200:#F9F5E1;
--gold-300:#F6EFD0; --gold-400:#F2E8BB; --gold-500:#EEE2AA;
--gold-600:#EADA94; --gold-700:#E5D27B; --gold-800:#CDAE28; --gold-900:#917C1D;

/* Platinum */
--platinum-50:#FCFCFD; --platinum-100:#F7F7F8; --platinum-200:#ECECEE;
--platinum-300:#E2E1E5; --platinum-400:#D2D1D6; --platinum-500:#C6C5CC;
--platinum-600:#B4B3BC; --platinum-700:#9F9DA9; --platinum-800:#848291; --platinum-900:#5D5B67;

/* Beige (warm neutral) */
--beige-50:#FDFCFC; --beige-100:#FBFAF9; --beige-200:#EFEAE6;
--beige-300:#E3DBD6; --beige-400:#D3CAC4; --beige-500:#C1B6AF;
--beige-600:#B4A9A1; --beige-700:#A79A92; --beige-800:#8E837B; --beige-900:#716962;
```

### Concept colors (content tagging ONLY)
```css
--concept-mind:        #0A5161;
--concept-community:   #0F748A;
--concept-movement:    #149EBD;
--concept-water:       #39C9EA;
--concept-air:         #87DFF2;
--concept-light:       #8AEFDB;
--concept-thermal:     #3EDDBF;
--concept-nourishment: #17AA8D;
--concept-sound:       #0C705C;
--concept-materials:   #0A4F41;
--concept-innovation:  #52545D;
```

### Rating colors
```css
--rating-health-safety: #72ABD9;
--rating-performance:   #0F748A;
--rating-equity:        #17AA8D;
--rating-coworking:     #9A608C;
```

### Certification spot colors
```css
--cert-bronze:   #BB833A;
--cert-silver:   #A2ADB9;
--cert-gold:     #CDAE28;
--cert-platinum: #848291;
```

### Gradients
```css
--gradient-cta-bright:   linear-gradient(99deg, #41D5F6 3.39%, #3EECD1 57.86%, #66FCD9 112.32%);
--gradient-cta-cyan:     linear-gradient(0deg, rgba(15,116,138,0.6) 0%, rgba(15,116,138,0.6) 100%),
                         linear-gradient(99deg, #41D5F6 3.39%, #3EECD1 57.86%, #66FCD9 112.32%);
--gradient-soft:         linear-gradient(58deg, #8AEFDB 2.8%, #D4BACE 41.67%, #CBE0F1 80.55%);
--gradient-performance:  linear-gradient(180deg, #1DD7B2 0%, #18BDE2 50%, #BF78AE 75%, #E67357 100%);
```
> `--gradient-performance` is reserved for portfolio rating visuals only. Never as a text background.

---

## 3. Semantic Tokens

```css
/* Brand */
--primary:        var(--cyan-800);   /* #0F748A */
--primary-cta:    var(--blue-600);
--destructive:    var(--coral-700);

/* Surfaces */
--background:      var(--gray-50);
--surface:         #FFFFFF;
--surface-side:    var(--cyan-50);     /* nav rails */
--surface-overlay: var(--gray-700);

/* Text */
--foreground:           var(--gray-800);
--foreground-muted:     var(--gray-500);
--foreground-on-dark:   #FFFFFF;
--link:                 var(--blue-600);

/* Borders */
--border:        var(--gray-200);
--border-soft:   var(--gray-100);
--border-panel:  var(--blue-200);
--border-focus:  var(--cyan-300);
```

### Color usage guide
| Token | Purpose |
|---|---|
| `--cyan-700` / `--cyan-800` | Primary brand. Focus rings, active states, primary CTA. Never passive surface. |
| `--cyan-50` / `--cyan-100` | Side rails, panel backgrounds, focus halos |
| `--blue-600` | Utility primary buttons, links, secondary CTAs |
| `--blue-100` / `--blue-200` | Selectable tag backgrounds, panel borders |
| `--gray-800` / `--gray-700` | Body text |
| `--gray-500` | Meta, caption, muted text |
| `--gray-200` / `--gray-100` | Borders, dividers, disabled surfaces |
| `--gray-50` | Page background |
| `--coral-*` | Destructive only — errors, delete confirmations |
| `--emerald-*` | Done / success states only |
| `--plum-*` | Medium priority, secondary signal |
| Concept colors | Content tagging only — never buttons or chrome |

---

## 4. Typography

### Font families
```css
--font-display: "FT Made", Georgia, "Times New Roman", serif;
--font-body:    "Mazzard Soft M", ui-sans-serif, system-ui, -apple-system, sans-serif;
```

### Type scale tokens
```css
--type-display:     42px;
--type-page-title:  30px;
--type-modal-title: 22px;
--type-h1: 24px;
--type-h2: 20px;
--type-h3: 18px;
--type-body-lg: 18px;
--type-body:    16px;
--type-body-sm: 14px;
--type-meta:    12px;
```

### Semantic type classes (use these directly)
```css
.display        /* FT Made 42/400 — page hero, big editorial moments */
.page-title     /* FT Made 30/400 — page / section titles */
.modal-title    /* FT Made 22/400 — modal & popover titles */
.heading-lg     /* Mazzard 24/600 */
.heading-md     /* Mazzard 20/600 */
.heading-sm     /* Mazzard 18/600 */
.subheading     /* Mazzard 18/600 cyan-800 */
.body-lg        /* Mazzard 18/400 */
.body           /* Mazzard 16/400 */
.body-sm        /* Mazzard 14/400 */
.meta-hint      /* Mazzard 12/600 plum-800 */
.meta-utility   /* Mazzard 14/400 gray-600 */
.section-label  /* Mazzard 12/600 uppercase letter-spacing:0.05em cyan-800 */
```

### Type pairing rules
- **FT Made** → display, page-title, modal-title only. Never buttons, labels, UI controls.
- **Mazzard Soft M** → everything else.
- **`ui-monospace`** → code chips, token names, technical metadata.
- Caption / meta: 12/11px, weight 600, uppercase, `letter-spacing: 0.05em`, `color: var(--gray-500)`.

---

## 5. Spacing & Radii

### Spacing scale
```css
--space-xs:  4px;
--space-sm:  8px;
--space-md:  16px;
--space-lg:  32px;
--space-xl:  64px;
```
No arbitrary values. Snap to scale.

### Border radii
```css
--radius-xs:    3px;
--radius-sm:    6px;   /* default for inputs, rect buttons */
--radius-md:    8px;   /* cards, inputs */
--radius-lg:    12px;
--radius-xl:    16px;
--radius-modal: 24px;
--radius-full:  9999px; /* pills, primary CTAs */
```

### Shadows
```css
--shadow-xs: 0 1px 2px 0 rgba(16,24,40,0.05);
--shadow-sm: 0 1px 3px 0 rgba(16,24,40,0.08), 0 1px 2px -1px rgba(16,24,40,0.06);
--shadow-md: 0 4px 6px -1px rgba(16,24,40,0.08), 0 2px 4px -2px rgba(16,24,40,0.06);
--shadow-lg: 0 10px 15px -3px rgba(16,24,40,0.10), 0 4px 6px -4px rgba(16,24,40,0.08);
--shadow-xl: 0 20px 25px -5px rgba(16,24,40,0.10), 0 8px 10px -6px rgba(16,24,40,0.08);
```

---

## 6. Components

All component classes use the `.ow-*` prefix. Optical alignment principle: `display: inline-flex; align-items: center; justify-content: center; line-height: 1; padding-bottom: 1px` — compensates for Mazzard Soft's cap-height sitting ~3% below geometric center.

---

### 6.1 Buttons

```html
<!-- Primary CTA — gradient cyan pill, 48px. ONE PER VIEW MAX. -->
<button class="ow-btn ow-btn-primary">Get certified</button>

<!-- Solid blue — utility primary (Save, Submit, Continue), 40px -->
<button class="ow-btn ow-btn-solid">Save changes</button>

<!-- Outline — secondary (Cancel, Back), 40px -->
<button class="ow-btn ow-btn-outline">Cancel</button>

<!-- Ghost — tertiary, inline links, low-emphasis, 40px -->
<button class="ow-btn ow-btn-ghost">Learn more</button>

<!-- Icon-only utility button, 32×32 -->
<button class="ow-btn ow-btn-icon" title="Edit">
  <img src="assets/icons/UtilityEdit.svg" width="16" height="16">
</button>
```

#### Size modifiers (append to any variant)
```html
<button class="ow-btn ow-btn-solid ow-btn--sm">Small (28px)</button>
<button class="ow-btn ow-btn-solid ow-btn--md">Medium (36px)</button>
<button class="ow-btn ow-btn-solid ow-btn--lg">Large (48px)</button>
```

#### Focus / accessibility
All buttons: `focus-visible` gets `outline: 3px solid var(--cyan-300); outline-offset: 2px`. Never remove without replacement.

---

### 6.2 Status Pills

24px · uppercase · pill shape. Color communicates priority state.

```html
<span class="ow-status" style="background:var(--gray-100);    color:var(--gray-600)">To-Do</span>
<span class="ow-status" style="background:var(--cyan-100);    color:var(--cyan-600)">Low</span>
<span class="ow-status" style="background:var(--plum-100);    color:var(--plum-600)">Medium</span>
<span class="ow-status" style="background:var(--coral-100);   color:var(--coral-600)">High</span>
<span class="ow-status" style="background:var(--emerald-100); color:var(--emerald-600)">Done</span>
```

#### Dark surface variants
```html
<span class="ow-status" style="background:var(--gray-600);    color:var(--gray-100)">To-Do</span>
<span class="ow-status" style="background:var(--cyan-700);    color:var(--cyan-100)">Low</span>
<span class="ow-status" style="background:var(--plum-700);    color:var(--plum-100)">Medium</span>
<span class="ow-status" style="background:var(--coral-700);   color:var(--coral-100)">High</span>
<span class="ow-status" style="background:var(--emerald-700); color:var(--emerald-100)">Done</span>
```

---

### 6.3 General-purpose Tags

32px · sentence case · 6px radius

```html
<!-- Active / selected state — cyan ring -->
<span class="ow-tag" style="background:#fff; box-shadow:inset 0 0 0 1px var(--cyan-300); color:var(--gray-800)">Active</span>

<!-- Filter tags — blue tint -->
<span class="ow-tag" style="background:var(--blue-100); color:var(--blue-700)">All</span>
<span class="ow-tag" style="background:var(--blue-100); color:var(--blue-700)">Pursued</span>
<span class="ow-tag" style="background:var(--blue-100); color:var(--blue-700)">Achieved</span>

<!-- Muted state -->
<span class="ow-tag" style="background:var(--gray-100); color:var(--gray-700)">Draft</span>
```

---

### 6.4 Concept Tags

24px · uppercase · square corners (4px radius) · concept color background

```html
<span class="ow-concept-tag" style="background:#87DFF2; color:var(--gray-800)">Air</span>
<span class="ow-concept-tag" style="background:#39C9EA; color:var(--gray-800)">Water</span>
<span class="ow-concept-tag" style="background:#17AA8D; color:#fff">Nourishment</span>
<span class="ow-concept-tag" style="background:#22A4D7; color:#fff">Light</span>
<span class="ow-concept-tag" style="background:#0F748A; color:#fff">Community</span>
<span class="ow-concept-tag" style="background:#0A5161; color:#fff">Mind</span>
<span class="ow-concept-tag" style="background:#149EBD; color:#fff">Movement</span>
<span class="ow-concept-tag" style="background:#3EDDBF; color:var(--gray-800)">Thermal</span>
<span class="ow-concept-tag" style="background:#0C705C; color:#fff">Sound</span>
<span class="ow-concept-tag" style="background:#0A4F41; color:#fff">Materials</span>
<span class="ow-concept-tag" style="background:#52545D; color:#fff">Innovation</span>
```

---

### 6.5 Code-Criterion Chips

22px · concept-coded background · tabular numerals

```html
<span class="ow-code-chip" style="background:#87DFF240; color:#0A5161">A01</span>
<span class="ow-code-chip" style="background:#39C9EA40; color:#0A5161">W02</span>
<span class="ow-code-chip" style="background:#17AA8D33; color:#075E4D">N04 · Strategy</span>
<span class="ow-code-chip" style="background:#22A4D733; color:#0A5161">L01.A</span>
<span class="ow-code-chip" style="background:#0F748A22; color:#0A5161">C03 · Required</span>
```

---

### 6.6 Form Inputs

```html
<!-- Default -->
<input class="input" placeholder="Enter project name"
  style="height:40px; padding:0 12px; border:1px solid var(--gray-200);
         border-radius:8px; font:14px var(--font-body); color:var(--gray-800);
         background:#fff; outline:none; width:100%; box-sizing:border-box;">

<!-- Focus state -->
<input class="input" value="123 Madison Ave"
  style="height:40px; padding:0 11px; border:2px solid var(--cyan-300);
         border-radius:8px; box-shadow:0 0 0 2px rgba(57,201,234,.2);
         font:14px var(--font-body); color:var(--gray-800); background:#fff;
         outline:none; width:100%; box-sizing:border-box;">

<!-- Disabled -->
<input class="input" value="Read only" disabled
  style="height:40px; padding:0 12px; border:1px solid var(--gray-100);
         border-radius:8px; font:14px var(--font-body); color:var(--gray-400);
         background:var(--gray-50); cursor:not-allowed; width:100%; box-sizing:border-box;">

<!-- Error state -->
<input class="input" value="invalid@"
  style="height:40px; padding:0 11px; border:2px solid var(--coral-700);
         border-radius:8px; font:14px var(--font-body); color:var(--gray-800);
         background:#fff; outline:none; width:100%; box-sizing:border-box;">
<div style="font-size:12px; color:var(--coral-700); margin-top:4px;">Enter a valid email address</div>
```

#### Input rules
- Height: **40px**
- Default border: `1px solid var(--gray-200)`, radius `8px`
- Focus: `2px solid var(--cyan-300)` + `box-shadow: 0 0 0 2px rgba(57,201,234,.2)` + `var(--cyan-50)` halo
- Error: `2px solid var(--coral-700)`, error message in `var(--coral-700)` 12px below field
- Labels: 12px, `var(--gray-600)`, weight 500, sentence case, above the field
- Placeholder: `var(--gray-400)`

---

### 6.7 Selection Controls

#### Checkbox
```html
<!-- Off -->
<span style="width:20px; height:20px; border-radius:4px; border:1px solid var(--gray-200);
             background:#fff; display:inline-flex; align-items:center; justify-content:center;"></span>

<!-- On -->
<span style="width:20px; height:20px; border-radius:4px; border:1px solid var(--cyan-700);
             background:var(--cyan-700); display:inline-flex; align-items:center; justify-content:center;">
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="m2 6 3 3 5-6" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</span>

<!-- Disabled off -->
<span style="width:20px; height:20px; border-radius:4px; border:1px solid var(--gray-100);
             background:var(--gray-50); display:inline-flex; align-items:center; justify-content:center;"></span>
```

#### Radio
```html
<!-- Off -->
<span style="width:20px; height:20px; border-radius:9999px; border:1px solid var(--gray-200);
             background:#fff; display:inline-flex; align-items:center; justify-content:center;"></span>

<!-- Selected -->
<span style="width:20px; height:20px; border-radius:9999px; border:1px solid var(--cyan-700);
             background:#fff; display:inline-flex; align-items:center; justify-content:center;">
  <span style="width:10px; height:10px; border-radius:9999px; background:var(--cyan-700);"></span>
</span>
```

#### Segmented control / switch
```html
<div style="display:inline-flex; border:1px solid var(--gray-100); border-radius:9999px;
            padding:3px; background:#fff; gap:0;">
  <button style="height:30px; padding:0 16px; border:0; background:var(--cyan-700); color:#fff;
                 font:500 14px var(--font-body); border-radius:9999px; cursor:pointer;">All</button>
  <button style="height:30px; padding:0 16px; border:0; background:transparent; color:var(--gray-600);
                 font:500 14px var(--font-body); border-radius:9999px; cursor:pointer;">Pursued</button>
  <button style="height:30px; padding:0 16px; border:0; background:transparent; color:var(--gray-600);
                 font:500 14px var(--font-body); border-radius:9999px; cursor:pointer;">Achieved</button>
</div>
```

---

### 6.8 Cards

```html
<!-- Standard card -->
<div style="background:#fff; border:1px solid var(--gray-200); border-radius:8px;
            padding:24px; box-shadow:var(--shadow-sm);">
  <div style="font-family:var(--font-display); font-size:18px; color:var(--gray-800);
              margin-bottom:12px;">Project overview</div>
  <div style="font-size:14px; color:var(--gray-700); line-height:1.5;">Card body content here.</div>
</div>

<!-- Add / empty state card -->
<div style="background:transparent; border:1px dashed var(--blue-600); opacity:.7;
            border-radius:8px; padding:32px; display:flex; flex-direction:column;
            align-items:center; justify-content:center; color:var(--blue-600);">
  <div style="font-size:24px; margin-bottom:6px;">＋</div>
  <div>Add a project</div>
</div>
```

---

### 6.9 Accordions

```html
<!-- Collapsed state -->
<div style="background:var(--cyan-50); border:1px solid var(--blue-200); border-radius:8px;
            padding:14px 16px; display:flex; align-items:center;
            justify-content:space-between; margin-bottom:8px;">
  <span style="color:var(--blue-600); font-weight:500; font-size:16px;">C8 — Materials</span>
  <span style="color:var(--gray-500);">▾</span>
</div>

<!-- Open state — 2px cyan-300 border -->
<div style="background:#fff; border:2px solid var(--cyan-300); border-radius:8px; padding:14px 16px;">
  <div style="display:flex; align-items:center; justify-content:space-between;
              color:var(--blue-600); font-weight:500; font-size:16px;">
    <span>C9 — Mind</span>
    <span style="color:var(--gray-500); transform:rotate(180deg);">▾</span>
  </div>
  <div style="font-size:14px; color:var(--gray-700); margin-top:10px; padding-top:10px;
              border-top:1px solid var(--gray-100);">
    Body content here.
  </div>
</div>
```

---

### 6.10 Tables

```html
<table style="width:100%; background:#fff; border:1px solid var(--gray-200); border-radius:8px;
              border-collapse:separate; border-spacing:0; overflow:hidden;">
  <thead>
    <tr>
      <th style="background:var(--cyan-50); font-size:12px; font-weight:600; text-transform:uppercase;
                 color:var(--cyan-800); text-align:left; letter-spacing:.05em;
                 padding:14px 16px; border-bottom:1px solid var(--gray-200);">Strategy</th>
      <th style="background:var(--cyan-50); font-size:12px; font-weight:600; text-transform:uppercase;
                 color:var(--cyan-800); text-align:left; letter-spacing:.05em;
                 padding:14px 16px; border-bottom:1px solid var(--gray-200);">Concept</th>
      <th style="background:var(--cyan-50); font-size:12px; font-weight:600; text-transform:uppercase;
                 color:var(--cyan-800); text-align:left; letter-spacing:.05em;
                 padding:14px 16px; border-bottom:1px solid var(--gray-200);">Status</th>
      <th style="background:var(--cyan-50); font-size:12px; font-weight:600; text-transform:uppercase;
                 color:var(--cyan-800); text-align:left; letter-spacing:.05em;
                 padding:14px 16px; border-bottom:1px solid var(--gray-200);">Pts</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="font-size:14px; color:var(--gray-800); padding:14px 16px; border-bottom:1px solid var(--gray-200);">A1.1 Particulate Matter</td>
      <td style="font-size:14px; color:var(--gray-800); padding:14px 16px; border-bottom:1px solid var(--gray-200);">Air</td>
      <td style="padding:14px 16px; border-bottom:1px solid var(--gray-200);">
        <span class="ow-status" style="background:var(--emerald-100); color:var(--emerald-600)">Done</span>
      </td>
      <td style="font-size:14px; color:var(--gray-800); padding:14px 16px; border-bottom:1px solid var(--gray-200);">3</td>
    </tr>
    <!-- Even rows: background:var(--gray-50) on td -->
    <!-- Last row: no border-bottom -->
  </tbody>
</table>
```

**Table rules:**
- Header: `var(--cyan-50)` bg, `var(--cyan-800)` text, 12px, uppercase, `letter-spacing: .05em`
- Rows: alternating `#fff` / `var(--gray-50)`
- Cell padding: `14px 16px`
- Row dividers: `1px solid var(--gray-200)`, last row has none
- Container: `border-radius: 8px`, `border-collapse: separate`, `border-spacing: 0`

---

### 6.11 Tooltips & Popovers

```html
<!-- Simple tooltip — dark, 12px -->
<div style="background:var(--gray-700); color:#fff; padding:6px 10px; font-size:12px;
            border-radius:6px; max-width:200px; line-height:1.4; position:relative;">
  Achievement requires three of the four criteria.
  <!-- arrow: ::after { border-top: 6px solid var(--gray-700); } -->
</div>

<!-- Rich popover — with actions -->
<div style="background:var(--gray-700); color:#fff; padding:14px; border-radius:8px; width:280px;">
  <h4 style="font:600 14px var(--font-body); margin:0 0 6px;">Innovation strategy</h4>
  <p style="font-size:12px; color:var(--gray-300); margin:0 0 12px; line-height:1.5;">
    Description text here.
  </p>
  <div style="display:flex; gap:8px;">
    <button style="height:28px; padding:0 12px; border:0; border-radius:9999px;
                   font:600 12px var(--font-body); cursor:pointer;
                   background:var(--cyan-300); color:var(--gray-800);">Learn more</button>
    <button style="height:28px; padding:0 12px; border:0; border-radius:9999px;
                   font:600 12px var(--font-body); cursor:pointer;
                   background:var(--gray-500); color:#fff;">Dismiss</button>
  </div>
</div>

<!-- Dropdown menu -->
<div style="background:var(--gray-700); color:#fff; border-radius:8px; padding:6px;
            width:200px; box-shadow:var(--shadow-lg);">
  <div style="height:36px; padding:0 12px; display:flex; align-items:center;
              font-size:14px; border-radius:4px; justify-content:space-between;">
    All concepts
  </div>
  <div style="height:36px; padding:0 12px; display:flex; align-items:center;
              font-size:14px; border-radius:4px; justify-content:space-between;
              background:var(--gray-800);">
    Air <span>✓</span>
  </div>
</div>
```

---

## 7. Layout System

### Three-column workspace shell

```html
<div style="display:flex; border:1px solid var(--gray-200); border-radius:8px; overflow:hidden; min-height:100vh;">

  <!-- Left rail — 240–280px -->
  <div style="width:260px; background:var(--cyan-50); border-right:1px solid var(--blue-200); padding:14px; flex-shrink:0;">
    <div class="section-label">Concepts</div>

    <!-- Active nav item -->
    <div style="height:32px; display:flex; align-items:center; padding:0 8px 0 6px;
                font-size:13px; color:var(--cyan-700); font-weight:600;
                border-left:2px solid var(--cyan-700); border-radius:4px;">
      Air
    </div>

    <!-- Inactive nav item -->
    <div style="height:32px; display:flex; align-items:center; padding:0 8px;
                font-size:13px; color:var(--gray-700); border-radius:4px;">
      Water
    </div>
  </div>

  <!-- Center canvas — flex 1, white -->
  <div style="flex:1; background:#fff; padding:14px;">
    <!-- Content -->
  </div>

  <!-- Right rail — 280–320px -->
  <div style="width:300px; background:var(--cyan-50); border-left:1px solid var(--blue-200); padding:14px; flex-shrink:0;">
    <div class="section-label">Attributes</div>
  </div>

</div>
```

### Top bar
```html
<header style="height:64px; background:#fff; border-bottom:1px solid var(--gray-200);
               display:flex; align-items:center; padding:0 32px; gap:16px;">
  <!-- Logo, nav, actions -->
</header>
```

### Nav item detail
- Active: `border-left: 2px solid var(--cyan-700)`, `color: var(--cyan-700)`, `font-weight: 600`, `background: var(--cyan-50)`
- Hover: `background: var(--gray-100)`
- Height: 32px, padding `0 8px`

### Page grid
- **Marketing**: max-width 1248px, 240px gutters at desktop, 12-col, 24px gutter
- **Product**: full width, 32px padding, 3-col workspace
- **Mobile**: 16px page padding

---

## 8. Brand Assets

All assets are SVGs in `assets/seals/` and `assets/badges/`. Never recolor or modify.

### Seals (≥ 64px on long edge)
| File | Use case |
|---|---|
| `assets/seals/SealWell.svg` | Standalone WELL identity |
| `assets/seals/IWBILogo.svg` | IWBI organization mark |
| `assets/icons/StandardLogo.svg` | In-product nav logo |
| `assets/seals/SealCertificationBronze.svg` | Certification — Bronze |
| `assets/seals/SealCertificationSilver.svg` | Certification — Silver |
| `assets/seals/SealCertificationGold.svg` | Certification — Gold |
| `assets/seals/SealCertificationPlatinum.svg` | Certification — Platinum |
| `assets/seals/SealRatingEquity.svg` | Single-topic rating — Equity |
| `assets/seals/SealRatingPerformance.svg` | Single-topic rating — Performance |
| `assets/seals/SealRatingOperations.svg` | Single-topic rating — Operations |
| `assets/seals/SealRatingWorkforce.svg` | Single-topic rating — Workforce |
| `assets/seals/SealRatingCoworking.svg` | Single-topic rating — Coworking |
| `assets/seals/SealRatingDesign.svg` | Single-topic rating — Design |
| `assets/seals/SealRatingHealthSafety.svg` | Single-topic rating — Health-Safety |
| `assets/seals/SealRatingRealEstate.svg` | Single-topic rating — Real Estate |
| `assets/seals/SealIwbiMember.svg` | Member organization |
| `assets/seals/WatermarkMemberOrg.svg` | Low-emphasis watermark |

### Badges (compact, < 64px contexts)
| File | Use case |
|---|---|
| `assets/badges/BadgeCertificationBronze.svg` | Bronze — compact |
| `assets/badges/BadgeCertificationSilver.svg` | Silver — compact |
| `assets/badges/BadgeCertificationGold.svg` | Gold — compact |
| `assets/badges/BadgeCertificationPlatinum.svg` | Platinum — compact |
| `assets/badges/BadgeRatingPerformance.svg` | Rating — Performance compact |
| `assets/badges/BadgeRatingEquity.svg` | Rating — Equity compact |
| `assets/badges/BadgeEnterpriseProvider.svg` | Provider — Enterprise compact |

---

## 9. Iconography

30+ utility glyphs in `assets/icons/Utility*.svg`. All 24×24, monochrome, render at `currentColor`.

```html
<!-- Render at a given size by overriding width/height — currentColor inherits from parent -->
<img src="assets/icons/UtilityEdit.svg"    width="16" height="16">
<img src="assets/icons/UtilitySave.svg"    width="16" height="16">
<img src="assets/icons/UtilitySearch.svg"  width="16" height="16">
<img src="assets/icons/UtilityTrash.svg"   width="16" height="16">
<img src="assets/icons/UtilityClose.svg"   width="14" height="14">
<img src="assets/icons/UtilityCheck.svg"   width="16" height="16">
<img src="assets/icons/UtilitySort.svg"    width="16" height="16">
<img src="assets/icons/UtilityHome.svg"    width="16" height="16">
<img src="assets/icons/UtilityMessage.svg" width="16" height="16">
<img src="assets/icons/UtilityFeedback.svg" width="16" height="16">
<img src="assets/icons/NavLogo.svg"        width="32" height="32">
<img src="assets/icons/NavAccount.svg"     width="24" height="24">
```

Full icon list: `AlphaIcon`, `NavAccount`, `NavBullet`, `NavLogo`, `StandardLogo`, `UtilityAccordion`, `UtilityCheck`, `UtilityChevronDown`, `UtilityClassification`, `UtilityClearRegular`, `UtilityClose`, `UtilityCompare`, `UtilityDrag`, `UtilityEdit`, `UtilityFeedback`, `UtilityHome`, `UtilityMessage`, `UtilityOptions`, `UtilityPortfolio`, `UtilityReset`, `UtilityRevisionsHide`, `UtilityRevisionsShow`, `UtilitySave`, `UtilityScopeLarge`, `UtilityScoring`, `UtilitySearch`, `UtilityShow`, `UtilitySort`, `UtilityTarget`, `UtilityTargetActive`, `UtilityText`, `UtilityTrash`, `UtilityTriangleInfo`, `X`

**Rules:**
- Use sparingly — every icon adds cognitive load
- Icon + label > icon-alone, except universally understood (close, search, edit)
- Recolor by inlining the SVG and setting parent `color:`, not by editing the file
- Never mix utility icons with concept icons (`ConceptIcons.svg`)

---

## 10. Copy & Voice

The WELL voice is **calm, factual, generous, never alarmist.** Think: thoughtful project manager.

### Do
- "8 points to Gold" — directional, not punitive
- "Audit window opens Jun 1" — factual, no countdown urgency
- "Upload your acoustics report when ready" — patient, action-oriented
- Sentence case headings ("Project team")
- Title case for cert levels and proper nouns ("Gold", "WELL Building Standard")

### Don't
- ❌ "You're failing" — never frame partial completion as failure
- ❌ "Hurry up — only 3 days left!" — never urgency-bait
- ❌ "Oops! Something went wrong" — cheery error language
- ❌ Title Case Headings Like This
- ❌ Emoji (none, except where brand explicitly uses)

### Error messages
Format: `<what happened> + <next step>`
- ✅ "We couldn't reach the WELL Reviewer. Your changes are saved — try submitting again in a minute."
- ❌ "Submission failed!"

---

## 11. Accessibility

- All interactive elements: visible `focus-visible` → `outline: 3px solid var(--cyan-300); outline-offset: 2px`
- Never `outline: none` without a replacement focus indicator
- Hit targets: **44×44px minimum** on touch
- Body text contrast: ≥ 4.5:1. Caption text: ≥ 4.5:1 against background
- Status pills: color + text label, never color alone
- All seals/badges: descriptive `alt` text ("WELL Certified Gold seal", not "SealCertificationGold.svg")

---

## 12. Anti-patterns (will be flagged in review)

| ❌ Anti-pattern | ✅ Instead |
|---|---|
| Hardcoded hex values | `var(--token-name)` |
| `font-family: 'Inter'` or any non-system font | `var(--font-body)` or `var(--font-display)` |
| Buttons without `.ow-btn` base class | Always use `.ow-btn` + variant |
| Multiple `.ow-btn-primary` in one view | One primary CTA per view |
| Concept colors on chrome | Concept colors on content tags only |
| Recolored or modified seals | Use SVGs from `assets/` verbatim |
| Decorative emoji | None |
| `--gradient-performance` as background fill | Reserved for portfolio rating visuals |
| Title Case Headings | Sentence case |
| Generic "Loading…" / "Error" | Context + next step in the message |
| Three or more fonts | FT Made (display) + Mazzard Soft M (body) only |

---

*One WELL Design System · IWBI · 2026 · v1.0*
