> v2 prototype — architecture, pages, data engine, nav map. Read before touching v2/.

# v2 Prototype — Overview

**Status:** Complete clickable prototype (2026-06-08)
**Stack:** Plain HTML + CSS custom properties + Tailwind CDN v3 (layout only) + vanilla JS
**Entry:** `v2/index.html` — open via `http://localhost:3131/v2/`
**Dev server:** `python3 -m http.server 3131` from repo root

---

## Why this stack

No framework, no build step. Each `.html` file opens directly in browser. Prototype speed > production concerns. Full rationale in `v2/decisions.md`.

---

## Pages

| File | Screen | URL |
|---|---|---|
| `v2/index.html` | Queue dashboard | `http://localhost:3131/v2/` |
| `v2/pages/task.html` | Task workspace | `http://localhost:3131/v2/pages/task.html?id=<task-id>` |
| `v2/pages/ops.html` | Ops analytics | `http://localhost:3131/v2/pages/ops.html` |

Pages in `v2/pages/` use `../` relative paths for DS and JS. `v2/index.html` uses `./` paths.

---

## Data engine

`v2/js/data.js` — plain JS IIFE → `window.ReviewerData`

**Entities:**
- 25 seeded tasks (all statuses/paths/concepts)
- 10 CONCEPTS, 18 FEATURES, 3 REVIEWERS, 6 ACCOUNTS, 21 LOCATIONS, 5 STATUSES, 3 PATHS, 5 VIEWS
- 6 curated checklists + GENERIC_CHECKLIST
- `currentUser` = Maya Reyes (`id='rev-001'`)

**Helpers:**
- `fmt(n)` — format numbers
- `relative(date)` — relative time string
- `slaBucket(task)` — returns `'safe'|'soon'|'overdue'`
- `rollup(tasks)` — aggregate stats
- `sampleSize(n)` — returns `⌈√n⌉`
- `getTaskById(id)` — task lookup
- `getChecklist(path, conceptId)` — checklist for path+concept combo
- `getView(id)` — view lookup

**Verification paths:**
- `SHAREABLE` — 1 artifact covers all locations
- `AUDITED` — sample `⌈√N⌉` locations
- `INDIVIDUAL` — per-location verification

**Status states:** `READY` → `UNDER` → `COMPLETED | FAILED | ATTENTION`

---

## Page summaries

### index.html — Queue dashboard
- Sidebar nav (workspace/browse), topbar (search, notifications, Maya Reyes pill)
- 4 KPI metric cards (Assigned / SLA at risk / MRC loop / Ruled this week)
- Verification path composition strip
- 5 view tabs with live counts
- 25-task SLA-sorted queue table (8 cols: code, concept, path, account, SLA, assignee, status, action)
- Slide-in task drawer with snapshot/evidence/scope/notes + ruling dock

### pages/task.html — Isolated task workspace
- Two-column layout: evidence canvas (left, flex:1) + sticky gavel panel (right, 360px)
- Task header: code chip, concept tag, path chip, precondition badge, 4-metric grid
- Snapshot ribbon: immutable header, SHA code, 4-col metadata, location chips
- T1/T2 verification checklist — lock fires on first checkbox edit; lock banner + system note injected
- Document inspection: relevancy toggle (Relevant / Not relevant), expandable note textarea
- Gavel panel: workload card, actions/MRC composer toggle, notes ledger (public/private/system tabs)
- Achievement modal on approve: gradient header, JSON payload in `<pre>`

**State machine (task page):**
```
lockedAt = null
status = TASK.status
checklist = new Set()
docFlags = {}
notes = [...initialNotes]
panelMode = 'actions' | 'mrc'
mrcDraft = { subject, body, urgency }

ensureLock() → lockedAt = new Date(), status = UNDER, inject system note
onAction('approve') → status = COMPLETED, show achievement modal
onAction('fail') → status = FAILED, inject note
onAction('mrc-send') → status = ATTENTION, inject note, reset draft, panelMode = 'actions'
```

Render pattern: `renderLeft()` + `renderGavel()` → innerHTML + bind events. Re-called on every state change.

### pages/ops.html — Operations analytics
- SLA tracker: 3 band cards (Safe/Amber/Breached), 6-bin histogram (color-coded), most-urgent list
- Compliance rollup: 4 tiles (velocity / mean-time / accuracy / MRC rate) with PASSING/WATCHING badges, outcome stacked bar
- AI pre-review: task picker chips, SVG arc confidence gauge, gap list (coral) + compliant lines (emerald)
- Guardrails monitor: 3 rule cards with live counters + interactive demo buttons (split blocked, location threshold, shake on sealed snapshot)

---

## Navigation map

```
index.html → pages/ops.html          (sidebar "Ops" link)
index.html → pages/task.html?id=X   (table Review btn, drawer "Open isolated view")
pages/task.html → index.html         (back btn, breadcrumb, modal "Back to queue")
pages/ops.html → index.html          (sidebar "Queue" link)
pages/ops.html → pages/task.html?id=X (SLA urgent list rows)
```

---

## Design system wiring

All pages link `ds/onewell.css` (or `../ds/onewell.css` for pages/). This pulls in:
- `tokens.css` — CSS custom properties (13 color scales × 10 shades, concept colors, semantic tokens)
- `typography.css` — @font-face + semantic type classes
- `components.css` — `.ow-btn`, `.ow-status`, `.ow-tag`, `.ow-concept-tag`, `.ow-code-chip`

**Rule:** No inline styles except layout values (width, position, z-index, gap). All color/type/component via tokens + `.ow-*`. (`v2/decisions.md` #13)
