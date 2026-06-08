> Task state machine for the OneWELL Reviewer app — status transitions, lock mechanism, guardrails, and audit trail rules.

# Task State Machine

---

## States

| State | Label | Pill Color | Background | Meaning |
|-------|-------|------------|------------|---------|
| READY | Ready for review | cyan-800 | cyan-100 | Submitted, awaiting reviewer |
| UNDER | Under review | blue-700 | blue-100 | Reviewer has lock, actively working |
| ATTENTION | Needs attention | plum-700 | plum-100 | MRC issued, returned to customer |
| COMPLETED | Completed | emerald-700 | emerald-100 | Ruling: ACHIEVED |
| FAILED | Failed | coral-700 | coral-100 | Ruling: FAILED |

---

## Valid Transitions

```
READY  --[lock/first edit]-->  UNDER
UNDER  --[ruling: ACHIEVED]-->  COMPLETED
UNDER  --[ruling: FAILED]-->  FAILED        (only if mrcCycle >= 3)
UNDER  --[issue MRC]-->  ATTENTION
ATTENTION  --[customer resubmits]-->  UNDER
ATTENTION  --[ruling: FAILED]-->  FAILED    (only if mrcCycle >= 3)
```

Invalid transitions are blocked at the state handler level.

---

## Lock Mechanism

Trigger: reviewer makes first edit on a READY task.

Sequence:
1. `TaskService::lock(taskId, reviewerId)` called
2. `CLIENT_WRITE_LOCK` acquired
3. Customer workspace frozen -- no modifications until ruling
4. Status: READY -> UNDER
5. System note logged: `TaskService::lock(task=<id>, reviewer=<id>) -> CLIENT_WRITE_LOCK acquired.`
6. StateMachine note logged: `state(READY) -> state(UNDER), reason="first reviewer edit", by=<id>`

---

## MRC (Mandatory Resubmission Comment)

Trigger: reviewer clicks "Needs Attention / Issue MRC" on an UNDER task.

Sequence:
1. MRC form submitted (Subject, Required Action, Guidance, Deadline)
2. Status: UNDER -> ATTENTION
3. `mrcCycle` incremented (0-indexed: cycle becomes 1, 2, or 3)
4. Customer receives notification
5. Customer remediates and resubmits
6. Status: ATTENTION -> UNDER (reviewer re-acquires lock)

Constraints:
- Max 3 cycles per task
- After cycle 3: only valid transition is FAILED
- MRC fields visible to customer: Subject, Required Action, Guidance, Deadline

---

## Ruling

Trigger: reviewer clicks "Complete / Approve" or "Failed / Closed without points".

Pre-conditions for APPROVE:
- All Tier 1 checklist items verified
- All documents flagged for relevance
- Status is not COMPLETED or FAILED

Pre-conditions for FAIL:
- Status is not COMPLETED or FAILED
- Preferably after mrcCycle >= 3 (but not strictly enforced at UI level)

On ruling:
1. Ruling object stored: `{decision, rationale, issuedAt}`
2. Status: UNDER -> COMPLETED (or FAILED)
3. ReviewSnapshot sealed (immutable)
4. Customer notified via email

---

## Guardrails

### TASK_SPLIT_SAFEGUARD
Prevents splitting any task whose verification strategy is marked auditable. Splitting could fork the audit sample, invalidating ceiling-root math.

### MIN_LOC_THRESHOLD
Hard block on location-split when task contains fewer than 2 locations. A single-site task can never become a portfolio.

### SNAPSHOT_IMMUTABLE
Once ruling is finalized, the corresponding ReviewSnapshot is sealed. Any edit attempt raises an exception in the audit ledger.

---

## Audit Trail

Every state change and significant action is logged as a system note in the task's notes ledger.

Logged events:
- Lock acquired
- State transition (from -> to, reason, actor)
- MRC issued (cycle number)
- Ruling issued (decision, rationale)
- Snapshot sealed

System notes have:
- `kind: 'system'`
- `author: 'TaskService'` or `'StateMachine'`
- `at: <timestamp>`
- `body: <event description>`

---

## SLA Bucketing

Tasks are bucketed by hours until contractual due date:

| Bucket | Condition | Visual |
|--------|-----------|--------|
| Overdue | hours < 0 | coral-700 dot, coral-700 text |
| Due soon | 0 <= hours < 48 | plum-700 dot, plum-700 text |
| On track | hours >= 48 | gray-300 dot, gray-500 text |

SLA is computed at render time from `dueAt` timestamp.

---

## Notes Ledger Visibility

| Kind | Rail Color | Background | Audience |
|------|------------|------------|----------|
| PUBLIC | cyan-700 | cyan-50 | Customer + reviewer |
| PRIVATE | gray-400 | gray-50 | Reviewer only |
| SYSTEM | plum-600 | plum-50 | Audit trail (auto-generated) |

Filter tabs: All, Public, Private, System.

---

## Pre-flight Checks (Ruling Gate)

Before issuing a ruling, the system checks:

1. **Tier 1 complete:** All Tier 1 checklist items marked verified
2. **Documents flagged:** Every attachment marked Relevant or Not Relevant

If both pass: "Ready to issue ruling" (green banner)
If either fails: "Pre-flight" (gray banner), Approve button disabled

---

## Relevant / Not Relevant Document Flagging

Each document in the ReviewSnapshot can be flagged:
- **Relevant** -- green left border, counts toward pre-flight
- **Not relevant** -- gray left border, counts toward pre-flight
- **Unflagged** -- default border, blocks pre-flight

Each document can also have an inline technical note attached.
