> Core product philosophy, key concepts, and feature rationale for the OneWELL Reviewer App. Read before adding features or changing reviewer workflows.

# OneWELL Reviewer App — Product Vision

---

## Core philosophy: the Mini-Trial

A review is a **Mini-Trial**. The reviewer examines specific evidence submitted at a specific point in time, for a specific set of locations, and issues a permanent, legally auditable ruling based only on what was provided.

Consequences:
- The reviewer never navigates a customer's broader account
- No hunting through general document dumps
- Every piece of information needed to reach a legal ruling must be explicitly present on the single task screen
- Once a ruling is finalized, the `ReviewSnapshot` is completely immutable — locked from modification

---

## Key concepts

### ReviewSnapshot
Immutable record of the state of the client's locations at the exact moment they clicked "Submit". Contains: occupancy data, scope (Core / Owner-Occupied), address metadata, SHA fingerprint. Locked on task creation — never editable after submission.

### MRC Loop (Mandatory Resubmission Comment)
When a task needs more information, the reviewer issues an MRC instead of failing it. The task moves to `ATTENTION` state; the client is notified with a structured comment specifying exactly what's missing. Client resubmits; the task re-enters the queue. Selecting "Needs Attention" in the Gavel panel switches the UI to the MRC composer interface.

### Achievement
When a reviewer approves a task, the system generates an immutable `Achievement` record containing the raw tier scoring payload (Tier 1 / Tier 2, points awarded, locations covered, timestamp). Displayed as a success modal with a JSON `<pre>` block on approval.

### Task locking
When a reviewer begins modifying a task (first checkbox edit), `TaskService::lock()` fires — the client-side task is locked from edits, a lock banner appears, and a system note is injected into the notes ledger with the exact timestamp.

---

## Verification paths

| Path | Logic | Example |
|------|-------|---------|
| `SHAREABLE` | 1 artifact covers all locations | Smoke-Free Policy for 50 sites |
| `AUDITED` | Sample ⌈√N⌉ locations | 4 audit tasks for 16 locations |
| `INDIVIDUAL` | Per-location dedicated task | Water testing per site |

---

## Guardrails (hard rules, never bypass)

1. **Task splitting safeguard** — prevent splitting if the underlying Standard/Strategy is marked `auditable`
2. **Minimum threshold rule** — block location splitting if task has fewer than 2 locations
3. **Historical immutability** — `ReviewSnapshot` data is read-only once a ruling is finalized; any write attempt shakes the element visually and logs a warning

---

## AI Pre-Review Agent (2027 roadmap)

Planned feature — not yet built. When a reviewer opens a task, an AI agent parses the document content and outputs:
- A confidence score (arc gauge, 0–100%)
- A gap list: bulleted items flagged as potentially missing (e.g., "Missing ASHRAE 188 section 4.2") — shown in coral
- A compliant lines list: specific lines confirmed as meeting criteria — shown in emerald

UI lives in the Ops page as a task picker + AI panel. Currently simulated with mock data.

---

## Design intent

- **No spreadsheets, no exports.** Everything happens online. Zero legacy DAM complexity.
- **High-velocity task engine.** The reviewer is a power user processing many tasks per day. Density and scannability over whitespace.
- **Audit trail first.** Every state change generates a system note with exact timestamp. Nothing is lost.
