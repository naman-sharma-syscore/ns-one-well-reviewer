> OneWELL domain model — concepts, certification tiers, verification paths, task lifecycle, and the ceiling-root sampling methodology. Source of truth for all IWBI projects.

# OneWELL Domain Model

---

## WELL Building Standard

IWBI's WELL certification evaluates built environments against health and wellness criteria. The standard is organized into **concepts** (categories), each containing **features** (specific requirements). Features carry **tiers** (Tier 1 required, Tier 2 bonus).

---

## 11 WELL Concepts

| Code | Concept | Color Token | Hex | Use |
|------|---------|-------------|-----|-----|
| A | Air | `--concept-air` | #87DFF2 | Indoor air quality, ventilation, smoke-free |
| W | Water | `--concept-water` | #39C9EA | Water quality, filtration, management |
| N | Nourishment | `--concept-nourishment` | #17AA8D | Food access, nutrition |
| L | Light | `--concept-light` | #8AEFDB | Circadian lighting, daylight |
| V | Movement | `--concept-movement` | #149EBD | Active design, ergonomics |
| T | Thermal Comfort | `--concept-thermal` | #3EDDBF | Temperature, humidity control |
| S | Sound | `--concept-sound` | #0C705C | Acoustics, noise levels |
| X | Materials | `--concept-materials` | #0A4F41 | VOC restrictions, material health |
| M | Mind | `--concept-mind` | #0A5161 | Mental health, restorative spaces |
| C | Community | `--concept-community` | #0F748A | Accessibility, inclusion |
| I | Innovation | `--concept-innovation` | #52545D | Innovative strategies |

**Rule:** Concept colors are for content tagging only. Never on buttons, links, navigation, or chrome.

---

## Certification Tiers

| Tier | Color Token | Hex | Meaning |
|------|-------------|-----|---------|
| Bronze | `--cert-bronze` | #BB833A | Baseline certification |
| Silver | `--cert-silver` | #A2ADB9 | Intermediate |
| Gold | `--cert-gold` | #CDAE28 | Advanced |
| Platinum | `--cert-platinum` | #848291 | Highest |

---

## Feature Structure

Each feature has:
- **Code** -- e.g. A01, W02, T03 (concept letter + number)
- **Title** -- e.g. "Air quality", "Drinking water quality"
- **Concept** -- which WELL concept it belongs to
- **Precondition** -- boolean. If true, mandatory for certification (Tier 1 only, no bonus points)
- **Checklist** -- criteria the reviewer must verify (Tier 1 = required, Tier 2 = bonus)

### Real Feature Codes

| Code | Concept | Title | Precondition |
|------|---------|-------|--------------|
| A01 | Air | Air quality | Yes |
| A02 | Air | Smoke-free environment | Yes |
| A05 | Air | Enhanced ventilation | No |
| A07 | Air | Operable windows | No |
| W01 | Water | Water quality indicators | Yes |
| W02 | Water | Drinking water quality | Yes |
| W03 | Water | Basic water management | Yes |
| W04 | Water | Enhanced water quality | No |
| T01 | Thermal | Thermal performance | Yes |
| T03 | Thermal | Thermal zoning | No |
| T05 | Thermal | Humidity control | No |
| L03 | Light | Circadian lighting design | No |
| N01 | Nourishment | Fruits and vegetables | Yes |
| V02 | Movement | Ergonomic workstations | No |
| S02 | Sound | Maximum noise levels | No |
| X06 | Materials | VOC restrictions | No |
| M07 | Mind | Restorative spaces | No |
| C04 | Community | Accessibility and universal design | No |

---

## Three Verification Paths

How evidence covers locations in a portfolio:

### Shareable
- **Rule:** One piece of evidence covers the entire portfolio
- **When:** Policy-level or portfolio-wide artifacts (e.g., smoke-free policy, water management plan)
- **Sample math:** 1 evidence covers all N locations
- **Example:** Helix Realty (50 locations) submits one smoke-free policy for all properties

### Audited
- **Rule:** ceiling-root(N) locations sampled; ruling extends to full portfolio
- **When:** Measured or location-specific evidence, portfolio large enough to sample
- **Sample math:** `ceil(sqrt(N))` -- ceiling of square root of N
- **Example:** Northbay (16 locations) = ceil(sqrt(16)) = 4 sampled
- **Example:** Helix (50 locations) = ceil(sqrt(50)) = 8 sampled
- **Example:** Aria (22 locations) = ceil(sqrt(22)) = 5 sampled

### Per-Location (Individual)
- **Rule:** Each location uploads its own evidence; each gets its own ruling
- **When:** Site-specific measurements, single-site portfolios
- **Sample math:** 1 site = 1 ruling
- **Example:** Meridian DC-04 (single warehouse) submits air quality test for that site

### Sampling Formula

```javascript
function sampleSize(n) { return Math.ceil(Math.sqrt(n)); }
```

This is the ceiling-root methodology -- a statistically defensible sampling approach where sample size grows sublinearly with portfolio size. The ruling on sampled locations extends to the entire portfolio.

---

## Task Lifecycle

A task represents a single review unit: one feature, one verification path, one account.

### Statuses

| Status | Label | Color | Meaning |
|--------|-------|-------|---------|
| READY | Ready for review | cyan | Submitted, awaiting reviewer |
| UNDER | Under review | blue | Reviewer has acquired lock, actively working |
| ATTENTION | Needs attention | plum | MRC issued, returned to customer |
| COMPLETED | Completed | emerald | Ruling issued (ACHIEVED) |
| FAILED | Failed | coral | Ruling issued (FAILED) after 3 cycles exhausted |

### State Transitions

```
READY -> UNDER          (reviewer acquires lock / first edit)
UNDER -> COMPLETED      (ruling: ACHIEVED)
UNDER -> FAILED         (ruling: FAILED, only after 3 MRC cycles exhausted)
UNDER -> ATTENTION      (MRC issued, returned to customer)
ATTENTION -> UNDER      (customer resubmits, reviewer re-acquires lock)
ATTENTION -> FAILED     (3rd MRC cycle exhausted, no compliant evidence)
```

### Lock Mechanism

When a reviewer first edits a task:
1. `TaskService::lock()` fires, `CLIENT_WRITE_LOCK` acquired
2. Customer workspace is frozen until ruling issued
3. Status transitions: READY -> UNDER
4. System note logged in the notes ledger

---

## MRC Loop (Mandatory Resubmission Comment)

A structured feedback mechanism when evidence is insufficient:

- **Cycles:** Max 3 per task (cycle 1, 2, 3 of 3)
- **Fields:** Subject, Required Action, Reviewer Guidance, Resubmission Deadline (7/14/30 days)
- **Visibility:** Subject and Guidance visible to customer
- **Trigger:** Reviewer clicks "Needs Attention / Issue MRC"
- **Effect:** Status -> ATTENTION, customer notified, must remediate and resubmit
- **Exhaustion:** After cycle 3, task can be marked FAILED

---

## ReviewSnapshot

The frozen evidence package that gets ruled on. Immutable once captured.

Contains:
- `capturedAt` -- timestamp of freeze
- `submittedBy` -- who submitted (e.g., "Priya Shankar / Helix ESG Lead")
- `attachments[]` -- uploaded documents (name, size, type)
- `narrative` -- submitter's explanation of the evidence
- `sha` -- integrity hash (generated)

**Rule:** Once ruling finalized, ReviewSnapshot is sealed. Edits raise exception in audit ledger (`SNAPSHOT_IMMUTABLE` guardrail).

---

## Ruling

The reviewer's decision on a task:

| Decision | Meaning |
|----------|---------|
| ACHIEVED | Evidence meets requirements; feature certified |
| FAILED | Evidence insufficient after all MRC cycles exhausted |

Ruling becomes immutable on issue. Customer notified via email.

---

## Accounts and Portfolios

An account represents a client organization. Portfolios contain multiple locations.

| Account | Org | Tier | Locations |
|---------|-----|------|-----------|
| Helix Realty | Helix Realty Holdings, LLC | Portfolio | 50 |
| Northbay Asset Mgmt | Northbay Asset Management | Portfolio | 16 |
| Ridgeway Hospitality | Ridgeway Hotels Group | Portfolio | 12 |
| Meridian Logistics | Meridian Distribution Co. | Single | 1 |
| Keystone Health Network | Keystone Health, Inc. | Portfolio | 8 |
| Aria Workplaces | Aria Workplaces, GmbH | Portfolio | 22 |

---

## Reviewer Roles

Reviewers are assigned by concept cohort (e.g., Air and Water specialist).

| Reviewer | Cohort | Title |
|----------|--------|-------|
| Maya Reyes | Air, Water, Thermal | Senior WELL Reviewer |
| Jordan Tan | Materials, Mind, Sound | WELL Reviewer |
| Adaeze Balogun | Nourishment, Movement, Community | Lead Reviewer / Performance |

---

## Guardrails (Native Processing Rules)

Enforced inside TaskService state handlers:

| Rule | Description |
|------|-------------|
| `TASK_SPLIT_SAFEGUARD` | Prevent splitting any task whose strategy is marked auditable. Splitting would fork the audit sample, invalidating ceiling-root math. |
| `MIN_LOC_THRESHOLD` | Hard block on location-split when task contains fewer than 2 locations. Single-site task can never become a portfolio. |
| `SNAPSHOT_IMMUTABLE` | Once ruling finalized, corresponding ReviewSnapshot is sealed. Edits raise exception in audit ledger. |

---

## Notes Ledger

Three visibility levels for notes on a task:

| Kind | Color | Audience |
|------|-------|----------|
| PUBLIC | cyan | Customer + reviewer |
| PRIVATE | gray | Reviewer only |
| SYSTEM | plum | Audit trail (auto-generated) |

System notes are auto-generated on state transitions and lock events.
