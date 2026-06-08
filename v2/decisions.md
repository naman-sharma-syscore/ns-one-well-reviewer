# Decisions — OneWELL Reviewer Prototype (v2)

Architectural and design decisions made during prototype setup. Captured so future contributors and AI agents understand *why* things are structured the way they are.

---

## 1. Versioned prototype structure (`v2/`)

All prototype work lives inside `v2/` rather than the repo root.

**Why:** Enables clean major rewrites (future `v3/`, `v4/`) without touching previous versions. Each version is fully self-contained.

---

## 2. Tech stack

Plain HTML + CSS + Tailwind CDN v3 + vanilla JS. No framework.

**Why:** This is a prototype, not a product. Frameworks add complexity and build steps that slow iteration. Each page is a standalone `.html` file for maximum readability and separation.

---

## 3. Design system split into three focused files

`temp/colors_and_type.css` (monolithic) was split into:
- `ds/tokens.css` — all CSS custom properties
- `ds/typography.css` — `@font-face` declarations + semantic type classes

`temp/components.css` became `ds/components.css`. A master `ds/onewell.css` imports all three.

**Why:** Each file has a single clear concern. Tweaking a color means opening `tokens.css`; adjusting type classes means `typography.css`. No hunting through a 200-line monolith.

---

## 4. `ds/onewell.css` as the single page import

Every prototype page links only `<link rel="stylesheet" href="ds/onewell.css">`.

**Why:** One link tag per page. No risk of importing tokens without components or vice versa. The internal split is an implementation detail, invisible to page authors.

---

## 5. Tailwind CDN — no build step

Tailwind loaded via CDN script tag with an inline `tailwind.config` object.

**Why:** Open any `.html` file directly in a browser with no `npm install`, no watch process. Runtime overhead is irrelevant for a prototype.

---

## 6. Tailwind handles layout; `.ow-*` handles components

Tailwind is used for layout utilities only (flex, grid, gap, padding, responsive breakpoints). All styled components use `.ow-*` classes from `ds/components.css`.

**Why:** Clean separation. Tailwind's built-in color and sizing defaults are not used — our semantic tokens are the single source of truth. No risk of Tailwind values bleeding into the design system.

---

## 7. Tailwind config extends with semantic tokens

`tailwind.config` extends the theme with our semantic token names (`background`, `surface`, `primary`, `border`, etc.) mapped to CSS variables.

**Why:** Allows writing `bg-surface`, `text-foreground`, `border-border` as Tailwind utilities without hardcoding hex values anywhere. All values still resolve through `tokens.css`.

---

## 8. Assets: SVGs only — no React `.tsx` components

Only `.svg` files were copied from the design system export to `v2/assets/`. All `.tsx` React components were dropped.

**Why:** The prototype is plain HTML. React components are irrelevant and add noise to the asset directory.

---

## 9. Fonts self-hosted in `v2/assets/fonts/`

All font files (FT Made woff2/woff/otf, Mazzard Soft M all weights as otf) live inside `v2/assets/fonts/`.

**Why:** No runtime dependency on any external directory. The prototype is fully self-contained.

---

## 10. HTML preview cards at `v2/ds/preview/`

The canonical UI Kit and component preview cards were moved from the original design system export:
- `UI Kit.html` → `v2/ds/UI Kit.html`
- `preview/*.html` (18 cards) → `v2/ds/preview/`

CSS links in all files were updated to point to `onewell.css`.

**Why:** Keep the visual component reference accessible without requiring the original `temp/` export directory to exist.

---

## 11. Original `temp/` export deleted

The `temp/` directory was deleted after all assets, CSS, and HTML files were migrated to `v2/`.

**Why:** Everything of value was migrated. Keeping `temp/` would create two sources of truth for assets and CSS.

---

## 12. One HTML file per feature page in `v2/pages/`

Each prototype screen gets its own `.html` file under `v2/pages/`.

**Why:** Maximum separation. No routing, no bundler. Any page can be opened directly in a browser in isolation.

---

## 13. No new styles without explicit approval

All styling uses existing OneWELL DS tokens (`var(--*)`) and `.ow-*` component classes. New styles or token values require explicit approval before being added.

**Why:** Design integrity. The OneWELL visual language is defined and stable. The prototype demonstrates it faithfully rather than diverging.

---

## 14. Static dev server via `python3 -m http.server`

Local preview uses `python3 -m http.server 3131`, configured in `.claude/launch.json`. Serves from the repo root so all `v2/` paths resolve correctly.

**Why:** Zero dependencies. Python 3 is pre-installed on macOS. No npm, no config, no port conflicts.
