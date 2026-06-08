# Atlas — OneWELL Reviewer Project Map

> Read this first to orient yourself. It tells you what this project is, what files matter, and where to go next.

## What this project is

The **OneWELL Reviewer** app is one of three apps on the OneWELL platform built by IWBI. It serves the Reviewer user group — trained professionals who evaluate project submissions and issue WELL certification decisions.

This repo is scoped entirely to the Reviewer app. The sibling apps (Standards, Portfolio) live in separate repositories.

## Sibling apps (separate repos)

| App | Repo | Notes |
|-----|------|-------|
| Standards | ns-one-well-standards | Manages WELL certification criteria |
| Portfolio | ns-one-well-portfolio | Project submission and tracking for building teams |
| Reviewer | **this repo** | Certification review and decision tooling |

## File inventory

| File / Dir | What it is | Read when |
|------------|-----------|-----------|
| `readme.md` | Human overview of the project | Orienting a new person |
| `atlas.md` | This file — agent project map | Starting any task |
| `nexus.md` | Operating model and rules | Before making structural decisions |
| `vault/` | Raw source material | Importing specs, references, or research |
| `codex/` | Distilled knowledge | Looking up decisions or domain understanding |
| `codex/design-system/` | Full OneWELL design system reference | Before building any prototype or UI |
| `codex/design-system/overview.md` | Design system principles, anti-patterns, voice | First read before any design work |
| `codex/design-system/tokens.md` | All CSS variables — colors, type, spacing, shadows | Referencing specific token values |
| `codex/design-system/components.md` | All `.ow-*` component classes and specs | Building UI components |
| `codex/design-system/brand-assets.md` | Seals, badges, icons catalog | Using brand marks or icons |
| `codex/design-system/layout.md` | Grid, spacing, accessibility minimums | Structuring page layouts |
| `forge/` | Reusable workflows and playbooks | Executing repeatable procedures |

## Recommended reading order

1. `nexus.md` — understand the rules and operating model
2. `atlas.md` — confirm the map (this file)
3. `codex/design-system/overview.md` — before any prototype or UI work
4. `codex/design-system/tokens.md` + `components.md` — during build
5. `forge/` — playbooks for recurring tasks

## Working areas

| Area | Location | Purpose |
|------|---------|---------|
| Domain knowledge | `codex/` | How WELL certification works, Reviewer responsibilities |
| Raw references | `vault/` | Original specs, IWBI docs, imported research |
| Procedures | `forge/` | Step-by-step agent instructions for recurring tasks |
