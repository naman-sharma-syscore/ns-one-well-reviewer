# One WELL Design System

You are working in the **One WELL design system project** — the visual + component reference for IWBI's One WELL platform. When users design in or from this project, follow these rules.

## Always start by reading
- `README.md` — the system's intent, voice, and quick start
- `colors_and_type.css` — the token sheet (import this in every artifact)
- `UI Kit.html` — paste-ready component patterns in real product context

## Use the tokens, not raw values

Always reference CSS variables:
- `var(--primary)` (cyan-700) for active state, focus
- `var(--primary-cta)` (blue-600) for solid utility buttons
- `var(--gradient-cta-cyan)` for the hero CTA — use **once per view, max**
- `var(--surface-side)` (cyan-50) + `var(--border-panel)` (blue-200) for left/right rails
- `var(--font-display)` (FT Made) for editorial / page titles only; `var(--font-body)` (Mazzard) for everything else

Never invent new hex codes. If you need a tint, walk the existing 50-900 ladder.

## Concept colors are sacred

The 11 WELL concept colors (`--concept-air` through `--concept-innovation`) are **only** for tagging content that belongs to that concept. Never use them for status, navigation chrome, buttons, or decorative gradients. Status uses Coral / Emerald / Plum / Gold — always at the 100-tint background + 600-text recipe.

## Component recipes (defaults)

- **CTA button:** pill (radius-full), 48px or 64px tall, gradient-cta-cyan or cyan-800 solid, white text, 600 weight
- **Utility button:** rectangle, 32px tall, 6px radius, blue-600 solid or white + gray-200 border
- **Status chip:** pill, 24px, 11px / 600 / uppercase, status-100 bg + status-600 text
- **Concept chip:** rectangle (4px radius), 24px, white or gray-800 text on the concept color
- **Input:** white, 1px gray-200 border, 8px radius, 40px tall; focus = 2px cyan-300 border + 2px cyan-300/20 ring
- **Card:** white, 1px gray-200 border, 8–10px radius, shadow-sm
- **Modal:** white, 24px radius, shadow-xl, 32px padding
- **Panel rail:** cyan-50 bg, 1px blue-200 stroke

## Voice and tone

Calm and factual. Never alarmist. Even errors should read as directives toward the next step. Use sentence case for buttons and labels; reserve title case for page titles. Avoid emoji.

## Asking for variations

If asked for variations of an existing component, prefer **TWEAKS** in a single artifact over forking files. Keep the system's restraint — variations should feel like rotations within one taste, not three different brands.

## When in doubt

The system favors restraint. One CTA per view. One display-font moment per screen. Whitespace over density. If you're tempted to add a gradient, stop and reach for a pure tint instead. If you're tempted to add an icon decorative flourish, leave it out.
