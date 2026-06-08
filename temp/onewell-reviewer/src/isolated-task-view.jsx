/* ===========================================================================
   OneWELL Reviewer — Isolated Task View
   ---------------------------------------------------------------------------
   The "Mini-Trial" workspace. Everything needed to reach a defensible ruling
   on one Task is on this screen — no navigation, no hunting.

   Layout
     ┌────────── Left: Primary Evidence Canvas ─────────┬──── Right: Gavel ────┐
     │ TaskHeader · SnapshotRibbon · Checklist · Docs   │ Workload · Actions   │
     │                                                  │ /MRC · Notes Ledger  │
     └──────────────────────────────────────────────────┴──────────────────────┘

   State Machine
     • lockedAt   — first edit fires TaskService::lock(); banner appears
     • status     — transitions inject system notes into the ledger
     • checklist  — Set of verified criterion ids
     • docFlags   — relevancy + per-document note
     • notes      — unified Public / Private / System timeline
     • achievement — modal triggered by Complete (Approve)
   =========================================================================== */
// (RD is exported by reviewer-dashboard.jsx onto the shared Babel scope, but
// also redeclared here in case files load in any order.)
var RD = ReviewerData;

// ---------- URL routing ----------
function getTaskIdFromUrl() {
  // Prefer hash route #/task/<id>, fall back to ?task=<id> for legacy links.
  const m = window.location.hash.match(/#\/task\/(task-[\w-]+)/);
  if (m) return m[1];
  const params = new URLSearchParams(window.location.search);
  return params.get('task') || 'task-1001';
}
function backToQueue() { window.location.hash = '#/queue'; }

// ============================================================================
// Auxiliary: chips, badges, tier markers
// ============================================================================
function TierBadge({ tier }) {
  const isT1 = tier === 'T1';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      height: 18, padding: '0 7px 1px', borderRadius: 3,
      fontSize: 10, fontWeight: 700, letterSpacing: '0.04em', lineHeight: 1,
      background: isT1 ? 'var(--cyan-100)' : 'var(--blue-100)',
      color:      isT1 ? 'var(--cyan-800)' : 'var(--blue-700)',
    }}>{isT1 ? 'Tier 1 · required' : 'Tier 2 · bonus'}</span>
  );
}
const Card = ({ children, style }) => (
  <section style={{
    background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 12,
    padding: '20px 22px', ...style,
  }}>{children}</section>
);
const Label = ({ children, kicker }) => (
  <div style={{ marginBottom: 14 }}>
    <h3 style={{
      margin: 0, fontSize: 12, fontWeight: 700, letterSpacing: '0.06em',
      textTransform: 'uppercase', color: 'var(--cyan-800)',
    }}>{children}</h3>
    {kicker && <div style={{ fontSize: 13, color: 'var(--gray-500)', marginTop: 4 }}>{kicker}</div>}
  </div>
);

// ============================================================================
// Lock Banner — appears once the reviewer makes their first edit
// ============================================================================
function LockBanner({ lockedAt }) {
  if (!lockedAt) return null;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '10px 16px', borderRadius: 8,
      background: 'var(--plum-50)', border: '1px solid var(--plum-200)',
      marginBottom: 16,
    }}>
      <span style={{
        width: 24, height: 24, borderRadius: 9999, background: 'var(--plum-100)',
        color: 'var(--plum-700)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      </span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--plum-800)' }}>
          Customer workspace locked
        </div>
        <div style={{ fontSize: 12, color: 'var(--plum-700)' }}>
          <code style={{ fontFamily: 'ui-monospace', fontSize: 11, background: 'var(--plum-100)', padding: '1px 5px', borderRadius: 3 }}>TaskService::lock()</code>
          {' '}fired at {RD.fmt(lockedAt)}. The client cannot modify this snapshot until you issue a ruling.
        </div>
      </div>
      <span style={{ fontSize: 11, color: 'var(--plum-700)', fontWeight: 600 }}>YOU HOLD THE LOCK</span>
    </div>
  );
}

// ============================================================================
// Top Page Header (breadcrumbs + actions row)
// ============================================================================
function TaskTopBar({ task, onBack }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
      <button onClick={onBack} style={{
        height: 32, padding: '0 12px', border: '1px solid var(--gray-200)',
        background: '#fff', borderRadius: 6, cursor: 'pointer',
        display: 'inline-flex', alignItems: 'center', gap: 6,
        fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--gray-700)', fontWeight: 500,
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
        </svg>
        Back to queue
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--gray-500)' }}>
        <a href="#/queue" style={{ color: 'var(--gray-500)', textDecoration: 'none' }}>Review queue</a>
        <span style={{ color: 'var(--gray-300)' }}>/</span>
        <span style={{ color: 'var(--gray-700)', fontWeight: 500 }}>{task.account.name}</span>
        <span style={{ color: 'var(--gray-300)' }}>/</span>
        <code style={{ fontFamily: 'ui-monospace', fontSize: 11, color: 'var(--gray-700)', background: 'var(--gray-100)', padding: '2px 6px', borderRadius: 3 }}>
          {task.id}
        </code>
      </div>
      <div style={{ flex: 1 }} />
      <button style={{
        height: 32, padding: '0 12px', border: '1px solid var(--gray-200)',
        background: '#fff', borderRadius: 6, cursor: 'pointer',
        fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--gray-700)', fontWeight: 500,
        display: 'inline-flex', alignItems: 'center', gap: 6,
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        View standard
      </button>
      <button style={{
        height: 32, padding: '0 12px', border: '1px solid var(--gray-200)',
        background: '#fff', borderRadius: 6, cursor: 'pointer',
        fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--gray-700)', fontWeight: 500,
        display: 'inline-flex', alignItems: 'center', gap: 6,
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Download all evidence
      </button>
    </div>
  );
}

// ============================================================================
// LEFT — Task Header
// ============================================================================
function TaskHeader({ task, status }) {
  const concept = RD.CONCEPTS[task.feature.concept];
  return (
    <Card>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <span className="ow-code-chip" style={{
          background: concept.token, color: concept.text,
          height: 26, fontSize: 13, padding: '0 12px 1px',
        }}>{task.feature.code}</span>
        <ConceptPill code={task.feature.concept} />
        <PathChip pathId={task.path.id} />
        {task.feature.precondition && (
          <span style={{
            height: 24, padding: '0 10px 1px', borderRadius: 4,
            background: 'var(--coral-100)', color: 'var(--coral-700)',
            display: 'inline-flex', alignItems: 'center', fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', lineHeight: 1,
          }}>PRECONDITION</span>
        )}
        <div style={{ flex: 1 }} />
        <StatusPill id={status.id} />
      </div>

      <h1 style={{
        margin: '6px 0 6px', fontFamily: 'var(--font-display)',
        fontSize: 34, fontWeight: 400, lineHeight: 1.1, color: 'var(--gray-800)',
        letterSpacing: '-0.01em',
      }}>
        {task.feature.code}: {task.feature.title}
      </h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
        <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--gray-700)' }}>{task.account.name}</span>
        <span style={{ color: 'var(--gray-300)' }}>·</span>
        <span style={{ fontSize: 13, color: 'var(--gray-500)' }}>{task.account.org}</span>
      </div>

      {/* Path metrics strip */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0,
        background: 'var(--gray-50)', border: '1px solid var(--gray-200)', borderRadius: 8,
        overflow: 'hidden',
      }}>
        <Metric label="Verification path" value={task.path.label} mono />
        <Metric
          label="Sample math"
          value={
            task.path.id === 'SHAREABLE' ? '1 ↦ all'
            : task.path.id === 'AUDITED' ? `⌈√${task.portfolioSize}⌉ = ${RD.sampleSize(task.portfolioSize)}`
            : '1 site, 1 ruling'
          }
          mono
        />
        <Metric label="Portfolio impact" value={`${task.portfolioSize} location${task.portfolioSize > 1 ? 's' : ''}`} />
        <Metric label="SLA" value={<SLAChip sla={task.sla} />} last />
      </div>
    </Card>
  );
}
function Metric({ label, value, last, mono }) {
  return (
    <div style={{
      padding: '12px 16px',
      borderRight: last ? 'none' : '1px solid var(--gray-200)',
    }}>
      <div style={{
        fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase',
        color: 'var(--gray-500)', marginBottom: 6,
      }}>{label}</div>
      <div style={{
        fontSize: 14, fontWeight: 600, color: 'var(--gray-800)',
        fontFamily: mono ? 'ui-monospace, monospace' : 'var(--font-body)',
      }}>{value}</div>
    </div>
  );
}

// ============================================================================
// LEFT — Snapshot Ribbon
// ============================================================================
function SnapshotRibbon({ task }) {
  // Synthesize a frozen view of locations/scope at submission time.
  const sampledLocs = (task.sampledLocationIds || task.locationIds.slice(0, 4))
    .map(id => RD.LOCATIONS.find(l => l.id === id))
    .filter(Boolean);

  const scope = task.feature.precondition ? 'Core · Owner-occupied' : 'Core + Tenant fit-out';
  // Deterministic but varied occupancy and area numbers per task id
  const seed = parseInt(task.id.replace(/\D/g, '').slice(-3), 10);
  const occupancy = 180 + (seed % 9) * 65;
  const area = 28000 + (seed % 7) * 14000;

  return (
    <Card style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{
        padding: '14px 22px',
        background: 'var(--cyan-50)', borderBottom: '1px solid var(--blue-200)',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <span style={{
          width: 24, height: 24, borderRadius: 9999, background: 'var(--cyan-100)',
          color: 'var(--cyan-800)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--cyan-800)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Review snapshot — immutable
          </div>
          <div style={{ fontSize: 12, color: 'var(--cyan-900)', marginTop: 2 }}>
            Frozen at <strong>{RD.fmt(task.snapshot.capturedAt)} · {RD.relative(task.snapshot.capturedAt)}</strong> by {task.snapshot.submittedBy}
          </div>
        </div>
        <code style={{
          fontFamily: 'ui-monospace', fontSize: 11,
          padding: '4px 8px', borderRadius: 4,
          background: '#fff', color: 'var(--gray-700)', border: '1px solid var(--blue-200)',
        }}>
          sha-{(task.id + 'snapshot').split('').reduce((s, c) => ((s << 5) - s + c.charCodeAt(0)) >>> 0, 0).toString(16).slice(0, 10)}
        </code>
      </div>

      <div style={{ padding: '18px 22px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        <SnapshotField label="Scope of certification">{scope}</SnapshotField>
        <SnapshotField label="Aggregate occupancy">{occupancy.toLocaleString()} ppl</SnapshotField>
        <SnapshotField label="Aggregate net area">{area.toLocaleString()} sq ft</SnapshotField>
        <SnapshotField label="Standard version">WELL v2 · Q2 2026 amendment</SnapshotField>
      </div>

      <div style={{
        padding: '0 22px 18px',
      }}>
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase',
          color: 'var(--gray-500)', marginBottom: 8,
        }}>Locations in scope at submission</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {sampledLocs.map(l => (
            <span key={l.id} style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              height: 28, padding: '0 10px 1px',
              background: 'var(--gray-50)', border: '1px solid var(--gray-200)',
              borderRadius: 6, fontSize: 12, color: 'var(--gray-700)', lineHeight: 1,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: 9999, background: 'var(--cyan-700)' }} />
              <strong style={{ fontWeight: 600, color: 'var(--gray-800)' }}>{l.name}</strong>
              <span style={{ color: 'var(--gray-500)' }}>· {l.city}</span>
            </span>
          ))}
          {task.portfolioSize > sampledLocs.length && (
            <span style={{
              display: 'inline-flex', alignItems: 'center',
              height: 28, padding: '0 10px 1px',
              background: 'var(--blue-50)', border: '1px dashed var(--blue-200)',
              borderRadius: 6, fontSize: 12, color: 'var(--blue-700)', fontWeight: 600, lineHeight: 1,
            }}>+ {task.portfolioSize - sampledLocs.length} more in portfolio</span>
          )}
        </div>
      </div>
    </Card>
  );
}
function SnapshotField({ label, children }) {
  return (
    <div>
      <div style={{
        fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase',
        color: 'var(--gray-500)', marginBottom: 6,
      }}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--gray-800)' }}>{children}</div>
    </div>
  );
}

// ============================================================================
// LEFT — Verification Checklist
// ============================================================================
function VerificationChecklist({ task, doneSet, onToggle }) {
  const items = RD.getChecklist(task.feature.code);
  const t1 = items.filter(i => i.tier === 'T1');
  const t2 = items.filter(i => i.tier === 'T2');
  const t1Done = t1.filter(i => doneSet.has(i.id)).length;
  const t2Done = t2.filter(i => doneSet.has(i.id)).length;

  return (
    <Card>
      <Label kicker="Click each criterion as you audit. Tier 1 is required to issue a ruling.">
        Verification checklist
      </Label>

      <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
        <ProgressPill label="Tier 1" done={t1Done} total={t1.length} accent="var(--cyan-700)" />
        <ProgressPill label="Tier 2" done={t2Done} total={t2.length} accent="var(--blue-600)" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {items.map(it => (
          <ChecklistRow key={it.id} item={it} done={doneSet.has(it.id)} onToggle={() => onToggle(it.id)} />
        ))}
      </div>
    </Card>
  );
}
function ProgressPill({ label, done, total, accent }) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 6,
      padding: '10px 14px 12px',
      border: '1px solid var(--gray-200)', borderRadius: 8,
      flex: 1, background: 'var(--gray-50)',
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--gray-600)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{label}</span>
        <span style={{ fontSize: 12, color: 'var(--gray-500)' }}>
          <strong style={{ color: 'var(--gray-800)' }}>{done}</strong> / {total}
        </span>
      </div>
      <div style={{ height: 6, borderRadius: 9999, background: 'var(--gray-100)', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: accent, transition: 'width .2s' }} />
      </div>
    </div>
  );
}
function ChecklistRow({ item, done, onToggle }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onToggle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 14px',
        background: done ? 'var(--emerald-50)' : (hover ? 'var(--gray-50)' : '#fff'),
        border: '1px solid ' + (done ? 'var(--emerald-200)' : 'var(--gray-200)'),
        borderRadius: 8, cursor: 'pointer', textAlign: 'left',
        fontFamily: 'var(--font-body)', width: '100%',
      }}>
      <span style={{
        width: 20, height: 20, borderRadius: 4, flexShrink: 0,
        background: done ? 'var(--emerald-700)' : '#fff',
        border: '1.5px solid ' + (done ? 'var(--emerald-700)' : 'var(--gray-300)'),
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', transition: 'background .12s, border-color .12s',
        marginTop: 1,
      }}>
        {done && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        )}
      </span>
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: 13, color: done ? 'var(--gray-600)' : 'var(--gray-800)',
          lineHeight: 1.5,
          textDecoration: done ? 'line-through' : 'none',
          textDecorationColor: 'var(--emerald-300)',
        }}>{item.text}</div>
      </div>
      <TierBadge tier={item.tier} />
    </button>
  );
}

// ============================================================================
// LEFT — Document Inspection Tree
// ============================================================================
function DocumentInspectionTree({ task, docFlags, onFlag, onNote }) {
  return (
    <Card>
      <Label kicker="Flag each document for relevance and capture inline technical notes.">
        Document inspection
      </Label>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {task.snapshot.attachments.map(a => (
          <DocumentRow key={a.name} doc={a} flag={docFlags[a.name]} onFlag={(v) => onFlag(a.name, v)} onNote={(v) => onNote(a.name, v)} />
        ))}
      </div>
    </Card>
  );
}
function DocumentRow({ doc, flag, onFlag, onNote }) {
  const [expanded, setExpanded] = useState(false);
  const status = flag?.relevant || null;
  const accent = status === 'yes' ? 'var(--emerald-700)' : (status === 'no' ? 'var(--gray-400)' : 'var(--gray-200)');
  return (
    <div style={{
      border: '1px solid var(--gray-200)',
      borderLeft: '3px solid ' + accent,
      borderRadius: 8, background: '#fff',
      transition: 'border-color .12s',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px' }}>
        <span style={{
          width: 36, height: 36, borderRadius: 6, background: 'var(--blue-100)', color: 'var(--blue-700)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
          </svg>
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-800)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{doc.name}</div>
          <div style={{ fontSize: 11, color: 'var(--gray-500)', marginTop: 2 }}>
            {doc.type.toUpperCase()} · {doc.size}
            {flag?.note && <span style={{ marginLeft: 8, color: 'var(--cyan-800)', fontWeight: 600 }}>· Note added</span>}
          </div>
        </div>

        <RelevancyToggle value={status} onChange={onFlag} />

        <button onClick={() => setExpanded(e => !e)} style={{
          height: 30, padding: '0 12px', border: '1px solid var(--gray-200)',
          background: expanded ? 'var(--cyan-50)' : '#fff', borderRadius: 6, cursor: 'pointer',
          fontSize: 12, fontWeight: 500, color: 'var(--gray-700)', lineHeight: 1,
        }}>{expanded ? 'Hide note' : (flag?.note ? 'Edit note' : 'Add note')}</button>
      </div>

      {expanded && (
        <div style={{ padding: '0 14px 14px' }}>
          <textarea
            placeholder="Technical note specific to this document (visible only in your private review log)…"
            value={flag?.note || ''}
            onChange={e => onNote(e.target.value)}
            rows={3}
            style={{
              width: '100%', boxSizing: 'border-box', padding: '10px 12px',
              border: '1px solid var(--gray-200)', borderRadius: 6, outline: 'none',
              fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--gray-800)', resize: 'vertical',
              background: 'var(--gray-50)',
            }}
          />
        </div>
      )}
    </div>
  );
}
function RelevancyToggle({ value, onChange }) {
  const Opt = ({ id, label, color }) => {
    const on = value === id;
    return (
      <button onClick={(e) => { e.stopPropagation(); onChange(id); }} style={{
        height: 28, padding: '0 10px 1px', border: 'none', cursor: 'pointer', lineHeight: 1,
        fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600,
        background: on ? color.bg : 'transparent',
        color: on ? color.fg : 'var(--gray-600)',
        borderRadius: 4,
      }}>{label}</button>
    );
  };
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', padding: 2, gap: 2,
      border: '1px solid var(--gray-200)', borderRadius: 6, background: 'var(--gray-50)',
    }}>
      <Opt id="yes" label="Relevant"     color={{ bg: 'var(--emerald-100)', fg: 'var(--emerald-700)' }} />
      <Opt id="no"  label="Not relevant" color={{ bg: 'var(--gray-100)',    fg: 'var(--gray-700)'    }} />
    </div>
  );
}

// ============================================================================
// RIGHT — The Gavel
// ============================================================================
function GavelPanel({ task, status, panelMode, onMode, onAction, checklist, mrcDraft, setMrcDraft, allDocsFlagged }) {
  const items = RD.getChecklist(task.feature.code);
  const t1 = items.filter(i => i.tier === 'T1');
  const t1Done = t1.filter(i => checklist.has(i.id)).length;
  const t1Complete = t1Done === t1.length;

  return (
    <aside style={{
      width: 360, flexShrink: 0,
      position: 'sticky', top: 88, alignSelf: 'flex-start',
      display: 'flex', flexDirection: 'column', gap: 16,
      maxHeight: 'calc(100vh - 104px)',
    }}>
      <WorkloadCard task={task} />
      {panelMode === 'mrc'
        ? <MRCComposer task={task} draft={mrcDraft} setDraft={setMrcDraft} onCancel={() => onMode('actions')} onSend={() => onAction('mrc-send')} />
        : <ActionsCard
            task={task} status={status}
            t1Done={t1Done} t1Total={t1.length} t1Complete={t1Complete}
            allDocsFlagged={allDocsFlagged}
            onAction={onAction} onMRC={() => onMode('mrc')} />}
      <NotesLedger task={task} />
    </aside>
  );
}

// ----- Workload card -----
function WorkloadCard({ task }) {
  const tier1Points = task.feature.precondition ? 'Required' : '1 pt';
  const tier2Points = task.feature.precondition ? '—'        : `up to ${task.points || 2} pts`;
  return (
    <Card style={{ padding: 16 }}>
      <Label>Workload & target</Label>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Row k="Locations impacted" v={`${task.portfolioSize}`} />
        <Row k="Verification path"  v={task.path.label} />
        <Row k="Sample size"        v={task.path.id === 'AUDITED' ? `${RD.sampleSize(task.portfolioSize)} of ${task.portfolioSize}` : (task.path.id === 'SHAREABLE' ? '1 → all' : '1 site')} />
      </div>
      <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px dashed var(--gray-200)' }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: 8 }}>Tiers sought</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <TierTarget label="Tier 1" sub={tier1Points} accent="var(--cyan-700)" />
          <TierTarget label="Tier 2" sub={tier2Points} accent="var(--blue-600)" />
        </div>
      </div>
    </Card>
  );
}
function Row({ k, v }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
      <span style={{ fontSize: 12, color: 'var(--gray-500)' }}>{k}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-800)' }}>{v}</span>
    </div>
  );
}
function TierTarget({ label, sub, accent }) {
  return (
    <div style={{
      flex: 1, padding: '10px 12px', borderRadius: 8,
      background: 'var(--gray-50)', border: '1px solid var(--gray-200)',
      borderTop: '3px solid ' + accent,
    }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--gray-800)', marginTop: 2 }}>{sub}</div>
    </div>
  );
}

// ----- Actions card -----
function ActionsCard({ task, status, t1Done, t1Total, t1Complete, allDocsFlagged, onAction, onMRC }) {
  const completed = status.id === 'COMPLETED' || status.id === 'FAILED';
  const canApprove = t1Complete && allDocsFlagged && !completed;
  return (
    <Card style={{ padding: 16 }}>
      <Label>Ruling</Label>
      {!completed && (
        <div style={{ marginBottom: 14, padding: 12, background: canApprove ? 'var(--emerald-50)' : 'var(--gray-50)', borderRadius: 8, border: '1px solid ' + (canApprove ? 'var(--emerald-200)' : 'var(--gray-200)') }}>
          <div style={{ fontSize: 12, color: canApprove ? 'var(--emerald-700)' : 'var(--gray-600)', fontWeight: 600, marginBottom: 6 }}>
            {canApprove ? 'Ready to issue ruling' : 'Pre-flight'}
          </div>
          <Preflight ok={t1Complete} label={`Tier 1 verified  ·  ${t1Done}/${t1Total}`} />
          <Preflight ok={allDocsFlagged} label="All documents flagged for relevance" />
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button
          disabled={completed || !canApprove}
          onClick={() => onAction('approve')}
          style={{
            height: 48, borderRadius: 9999, border: 'none',
            background: (completed || !canApprove) ? 'var(--gray-100)' : 'var(--gradient-cta-cyan)',
            color: (completed || !canApprove) ? 'var(--gray-400)' : '#fff',
            fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600,
            cursor: (completed || !canApprove) ? 'not-allowed' : 'pointer',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '0 22px 2px',
          }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          Complete · Approve
        </button>
        <button
          disabled={completed}
          onClick={onMRC}
          style={{
            height: 44, borderRadius: 6, border: '1px solid var(--plum-200)',
            background: '#fff', color: completed ? 'var(--gray-400)' : 'var(--plum-700)',
            fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600,
            cursor: completed ? 'not-allowed' : 'pointer',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '0 20px 1px',
          }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
          </svg>
          Needs Attention · Issue MRC
        </button>
        <button
          disabled={completed}
          onClick={() => onAction('fail')}
          style={{
            height: 44, borderRadius: 6, border: '1px solid var(--coral-200)',
            background: '#fff', color: completed ? 'var(--gray-400)' : 'var(--coral-700)',
            fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600,
            cursor: completed ? 'not-allowed' : 'pointer',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '0 20px 1px',
          }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          Failed · Closed without points
        </button>
      </div>

      <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px dashed var(--gray-200)', fontSize: 11, color: 'var(--gray-500)', lineHeight: 1.5 }}>
        Ruling becomes immutable on issue. The customer will be notified at <code style={{ fontFamily: 'ui-monospace', background: 'var(--gray-100)', padding: '1px 5px', borderRadius: 3, fontSize: 10.5 }}>esg@{task.account.org.toLowerCase().replace(/[^a-z]/g, '').slice(0, 12)}.com</code>.
      </div>
    </Card>
  );
}
function Preflight({ ok, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0' }}>
      <span style={{
        width: 16, height: 16, borderRadius: 9999,
        background: ok ? 'var(--emerald-700)' : 'var(--gray-200)',
        color: '#fff',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {ok && (
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        )}
      </span>
      <span style={{ fontSize: 12, color: ok ? 'var(--gray-800)' : 'var(--gray-500)' }}>{label}</span>
    </div>
  );
}

// ----- MRC composer -----
function MRCComposer({ task, draft, setDraft, onCancel, onSend }) {
  const update = (k, v) => setDraft({ ...draft, [k]: v });
  const canSend = draft.subject.trim().length > 4 && draft.body.trim().length > 20;
  return (
    <Card style={{ padding: 16, borderColor: 'var(--plum-200)', background: 'linear-gradient(180deg, var(--plum-50) 0%, #fff 80px)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <span style={{
          width: 32, height: 32, borderRadius: 8, background: 'var(--plum-100)', color: 'var(--plum-700)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
          </svg>
        </span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--plum-800)' }}>Mandatory Resubmission Comment</div>
          <div style={{ fontSize: 11, color: 'var(--plum-700)' }}>Cycle {task.mrcCycle + 1} of 3 · Returns to customer for remediation</div>
        </div>
        <button onClick={onCancel} style={{
          width: 28, height: 28, borderRadius: 6, border: 'none', background: 'transparent',
          color: 'var(--gray-600)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <FieldGroup label="Subject — visible to customer">
        <input
          type="text" value={draft.subject}
          onChange={e => update('subject', e.target.value)}
          placeholder="e.g., Lead reading at fixture B-12 above threshold"
          style={mrcInput}
        />
      </FieldGroup>

      <FieldGroup label="Required action">
        <select value={draft.action} onChange={e => update('action', e.target.value)} style={{ ...mrcInput, paddingRight: 28, appearance: 'menulist' }}>
          <option>Remediate and resubmit affected evidence</option>
          <option>Provide additional methodology documentation</option>
          <option>Re-sample with accredited lab</option>
          <option>Clarify scope or location ambiguity</option>
        </select>
      </FieldGroup>

      <FieldGroup label="Reviewer guidance — visible to customer">
        <textarea
          rows={5} value={draft.body}
          onChange={e => update('body', e.target.value)}
          placeholder="Cite the exact criterion not met. Be specific about what evidence would resolve it. Avoid alarmist tone."
          style={{ ...mrcInput, height: 'auto', padding: '10px 12px', resize: 'vertical' }}
        />
      </FieldGroup>

      <FieldGroup label="Resubmission deadline">
        <select value={draft.deadline} onChange={e => update('deadline', e.target.value)} style={{ ...mrcInput, paddingRight: 28, appearance: 'menulist' }}>
          <option>+7 days</option>
          <option>+14 days</option>
          <option>+30 days</option>
        </select>
      </FieldGroup>

      <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
        <button onClick={onCancel} style={{
          height: 40, padding: '0 16px 1px', borderRadius: 6, border: '1px solid var(--gray-200)',
          background: '#fff', color: 'var(--gray-700)', fontWeight: 500, fontSize: 14, cursor: 'pointer',
          fontFamily: 'var(--font-body)',
        }}>Cancel</button>
        <button
          disabled={!canSend}
          onClick={onSend}
          style={{
            flex: 1, height: 40, padding: '0 16px 1px', borderRadius: 6, border: 'none',
            background: canSend ? 'var(--plum-700)' : 'var(--gray-100)',
            color: canSend ? '#fff' : 'var(--gray-400)',
            fontWeight: 600, fontSize: 14, cursor: canSend ? 'pointer' : 'not-allowed',
            fontFamily: 'var(--font-body)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
          Send MRC to customer
        </button>
      </div>
    </Card>
  );
}
const mrcInput = {
  width: '100%', boxSizing: 'border-box', height: 36, padding: '0 12px',
  border: '1px solid var(--gray-200)', borderRadius: 6, outline: 'none',
  fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--gray-800)', background: '#fff',
};
function FieldGroup({ label, children }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: 6 }}>{label}</label>
      {children}
    </div>
  );
}

// ----- Notes Ledger -----
function NotesLedger({ task }) {
  const notes = task._notes || [];
  const [filter, setFilter] = useState('all');
  const filtered = notes.filter(n => filter === 'all' || n.kind === filter);

  return (
    <Card style={{ padding: 16 }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 12 }}>
        <Label>Notes ledger</Label>
        <div style={{
          display: 'inline-flex', padding: 2, borderRadius: 6, background: 'var(--gray-100)', gap: 2,
        }}>
          {[
            { id: 'all',     label: 'All' },
            { id: 'public',  label: 'Public' },
            { id: 'private', label: 'Private' },
            { id: 'system',  label: 'System' },
          ].map(t => (
            <button key={t.id} onClick={() => setFilter(t.id)} style={{
              height: 22, padding: '0 8px 1px', border: 'none', borderRadius: 4,
              background: filter === t.id ? '#fff' : 'transparent',
              color: filter === t.id ? 'var(--gray-800)' : 'var(--gray-600)',
              fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600, cursor: 'pointer', lineHeight: 1,
              boxShadow: filter === t.id ? 'var(--shadow-xs)' : 'none',
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      <div style={{ maxHeight: 280, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 10, paddingRight: 4 }}>
        {filtered.length === 0 && (
          <div style={{ padding: 24, textAlign: 'center', color: 'var(--gray-500)', fontSize: 12, border: '1px dashed var(--gray-200)', borderRadius: 6 }}>
            No notes yet.
          </div>
        )}
        {filtered.map((n, i) => <NoteRow key={i} note={n} />)}
      </div>

      <div style={{
        display: 'flex', gap: 6, marginTop: 12, paddingTop: 12, borderTop: '1px dashed var(--gray-200)',
      }}>
        <input
          type="text" placeholder="Add internal note…"
          style={{ ...mrcInput, height: 34 }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.currentTarget.value.trim()) {
              window.dispatchEvent(new CustomEvent('owAddPrivateNote', { detail: e.currentTarget.value }));
              e.currentTarget.value = '';
            }
          }}
        />
        <button style={{
          height: 34, padding: '0 12px 1px', border: '1px solid var(--gray-200)',
          background: '#fff', borderRadius: 6, fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500, cursor: 'pointer',
        }}>Add</button>
      </div>
    </Card>
  );
}
function NoteRow({ note }) {
  const palette = {
    public:  { rail: 'var(--cyan-700)',    label: 'PUBLIC',  bg: 'var(--cyan-50)',    fg: 'var(--cyan-800)' },
    private: { rail: 'var(--gray-400)',    label: 'PRIVATE', bg: 'var(--gray-50)',    fg: 'var(--gray-700)' },
    system:  { rail: 'var(--plum-600)',    label: 'SYSTEM',  bg: 'var(--plum-50)',    fg: 'var(--plum-800)' },
  }[note.kind] || { rail: 'var(--gray-400)', label: 'NOTE', bg: 'var(--gray-50)', fg: 'var(--gray-700)' };
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <span style={{ width: 3, alignSelf: 'stretch', background: palette.rail, borderRadius: 9999, flexShrink: 0 }} />
      <div style={{
        flex: 1, background: palette.bg, padding: '8px 10px', borderRadius: 6,
        fontFamily: note.kind === 'system' ? 'ui-monospace, monospace' : 'var(--font-body)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', color: palette.fg }}>
            {palette.label} · {note.author}
          </span>
          <span style={{ fontSize: 10, color: 'var(--gray-500)' }}>{RD.relative(note.at)}</span>
        </div>
        <div style={{ fontSize: 12, color: 'var(--gray-700)', lineHeight: 1.5 }}>{note.body}</div>
      </div>
    </div>
  );
}

// ============================================================================
// Achievement Modal — fired on Complete (Approve)
// ============================================================================
function AchievementModal({ open, payload, onClose, task }) {
  if (!open || !payload) return null;
  return (
    <>
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, background: 'rgba(23,24,32,0.45)', zIndex: 100,
        animation: 'owFade .15s ease',
      }} />
      <div style={{
        position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 'min(560px, 92vw)', background: '#fff', borderRadius: 24,
        zIndex: 101, boxShadow: 'var(--shadow-xl)', overflow: 'hidden',
        animation: 'owPop .2s cubic-bezier(.2,.7,.2,1)',
      }}>
        <div style={{
          padding: '28px 28px 16px',
          background: 'linear-gradient(135deg, var(--emerald-50) 0%, var(--cyan-50) 100%)',
          borderBottom: '1px solid var(--emerald-200)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <span style={{
              width: 44, height: 44, borderRadius: 9999, background: 'var(--emerald-700)', color: '#fff',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </span>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--emerald-700)' }}>Achievement issued</div>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 400, color: 'var(--gray-800)' }}>
                {task.feature.code} · {task.feature.title}
              </h2>
            </div>
          </div>
          <div style={{ fontSize: 13, color: 'var(--gray-700)', lineHeight: 1.55 }}>
            An immutable <strong>Achievement</strong> record has been generated and bound to the snapshot. It applies to all <strong>{task.portfolioSize} location{task.portfolioSize > 1 ? 's' : ''}</strong> in the verified portfolio.
          </div>
        </div>

        <div style={{ padding: '20px 28px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: 8 }}>Tier scoring payload</div>
          <pre style={{
            margin: 0, padding: 16, background: 'var(--gray-900)', color: '#9FE9D6',
            borderRadius: 8, fontFamily: 'ui-monospace, monospace', fontSize: 11.5, lineHeight: 1.55,
            overflow: 'auto',
          }}>{JSON.stringify(payload, null, 2)}</pre>
        </div>

        <div style={{ padding: '16px 28px 24px', display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{
            height: 40, padding: '0 18px 1px', borderRadius: 6, border: '1px solid var(--gray-200)',
            background: '#fff', color: 'var(--gray-800)', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500, cursor: 'pointer',
          }}>Stay on task</button>
          <button onClick={backToQueue} className="ow-btn ow-btn-primary" style={{ height: 40, padding: '0 22px 1px', fontSize: 14 }}>
            Back to queue
          </button>
        </div>
      </div>
      <style>{`
        @keyframes owPop  { from { transform: translate(-50%, -48%) scale(.98); opacity: 0 } to { transform: translate(-50%, -50%) scale(1); opacity: 1 } }
        @keyframes owFade { from { opacity: 0 } to { opacity: 1 } }
      `}</style>
    </>
  );
}

// ============================================================================
// Root
// ============================================================================
function IsolatedTaskView({ taskId }) {
  const initialTask = useMemo(() => {
    const id = taskId || getTaskIdFromUrl();
    return RD.getTaskById(id) || RD.TASKS[0];
  }, [taskId]);

  const [task, setTask] = useState({
    ...initialTask,
    _notes: [
      // Seed with the customer's submission as a public note
      { kind: 'public',  author: initialTask.snapshot.submittedBy, at: initialTask.submittedAt, body: initialTask.snapshot.narrative },
      ...(initialTask.notes || []).map(n => ({ kind: 'private', author: 'Maya Reyes', at: n.at, body: n.body })),
    ],
  });
  const [status, setStatus] = useState(initialTask.status);
  const [lockedAt, setLockedAt] = useState(null);
  const [checklist, setChecklist] = useState(new Set());
  const [docFlags, setDocFlags] = useState({});
  const [panelMode, setPanelMode] = useState('actions');
  const [mrcDraft, setMrcDraft] = useState({
    subject: '', body: '', deadline: '+14 days',
    action: 'Remediate and resubmit affected evidence',
  });
  const [achievement, setAchievement] = useState({ open: false, payload: null });

  // ---- TaskService::lock() — fired on first edit ----
  const ensureLock = () => {
    if (lockedAt) return;
    const now = new Date();
    setLockedAt(now);
    pushNote({ kind: 'system', author: 'TaskService', at: now,
      body: `TaskService::lock(task=${task.id}, reviewer=${RD.currentUser.id}) → CLIENT_WRITE_LOCK acquired.` });
    transitionStatus(RD.STATUSES.UNDER, 'first reviewer edit');
  };

  // ---- Auto-note injection on transition ----
  const pushNote = (note) => {
    setTask(prev => ({ ...prev, _notes: [...prev._notes, note] }));
  };
  const transitionStatus = (next, reason) => {
    if (next.id === status.id) return;
    setStatus(next);
    pushNote({ kind: 'system', author: 'StateMachine', at: new Date(),
      body: `state(${status.id}) → state(${next.id})  ·  reason="${reason}"  ·  by=${RD.currentUser.id}` });
  };

  // ---- Handlers ----
  const onToggleChecklist = (id) => {
    ensureLock();
    setChecklist(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };
  const onFlagDoc = (name, val) => {
    ensureLock();
    setDocFlags(prev => ({ ...prev, [name]: { ...(prev[name] || {}), relevant: val } }));
  };
  const onNoteDoc = (name, val) => {
    setDocFlags(prev => ({ ...prev, [name]: { ...(prev[name] || {}), note: val } }));
  };
  const allDocsFlagged = task.snapshot.attachments.every(a => docFlags[a.name]?.relevant);

  const onAction = (kind) => {
    if (kind === 'approve') {
      transitionStatus(RD.STATUSES.COMPLETED, 'reviewer issued ruling: ACHIEVED');
      const items = RD.getChecklist(task.feature.code);
      const payload = {
        achievement_id: 'ach-' + Math.random().toString(36).slice(2, 10),
        task_id: task.id,
        feature: task.feature.code,
        decision: 'ACHIEVED',
        ruled_at: new Date().toISOString(),
        reviewer: { id: RD.currentUser.id, name: RD.currentUser.name },
        scope: {
          path: task.path.id,
          portfolio_size: task.portfolioSize,
          sampled: task.sampledLocationIds || task.locationIds.slice(0, 1),
        },
        tier_score: {
          tier_1: { required: items.filter(i => i.tier === 'T1').length, verified: items.filter(i => i.tier === 'T1' && checklist.has(i.id)).length },
          tier_2: { available: items.filter(i => i.tier === 'T2').length, verified: items.filter(i => i.tier === 'T2' && checklist.has(i.id)).length },
        },
        snapshot_sha: 'sha-' + (task.id + 'snapshot').split('').reduce((s, c) => ((s << 5) - s + c.charCodeAt(0)) >>> 0, 0).toString(16).slice(0, 10),
        immutable: true,
      };
      pushNote({ kind: 'system', author: 'AchievementService', at: new Date(),
        body: `AchievementService::generate(${payload.achievement_id}) → record bound to snapshot ${payload.snapshot_sha}.` });
      pushNote({ kind: 'public', author: 'Maya Reyes', at: new Date(),
        body: `Ruling: Achieved. Evidence satisfies the Tier 1 verification criteria for ${task.feature.code}.` });
      setAchievement({ open: true, payload });
    }
    if (kind === 'fail') {
      transitionStatus(RD.STATUSES.FAILED, 'reviewer issued ruling: FAILED');
      pushNote({ kind: 'public', author: 'Maya Reyes', at: new Date(),
        body: `Ruling: Failed. The verification cycle has exhausted available MRC rounds without compliant evidence.` });
    }
    if (kind === 'mrc-send') {
      transitionStatus(RD.STATUSES.ATTENTION, 'reviewer issued MRC');
      pushNote({ kind: 'public', author: 'Maya Reyes', at: new Date(),
        body: `${mrcDraft.subject}\n\n${mrcDraft.body}\n\nRequired action: ${mrcDraft.action}\nResubmission deadline: ${mrcDraft.deadline}` });
      setMrcDraft({ subject: '', body: '', deadline: '+14 days', action: 'Remediate and resubmit affected evidence' });
      setPanelMode('actions');
    }
  };

  // Listen for private-note adds from ledger input
  useEffect(() => {
    const fn = (e) => {
      ensureLock();
      pushNote({ kind: 'private', author: RD.currentUser.name, at: new Date(), body: e.detail });
    };
    window.addEventListener('owAddPrivateNote', fn);
    return () => window.removeEventListener('owAddPrivateNote', fn);
  }, [lockedAt]); // re-bind so ensureLock closes over current value

  return (
    <>
      <TaskTopBar task={task} onBack={backToQueue} />
      <LockBanner lockedAt={lockedAt} />

      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
          <TaskHeader task={task} status={status} />
          <SnapshotRibbon task={task} />
          <VerificationChecklist task={task} doneSet={checklist} onToggle={onToggleChecklist} />
          <DocumentInspectionTree task={task} docFlags={docFlags} onFlag={onFlagDoc} onNote={onNoteDoc} />
        </div>
        <GavelPanel
          task={task} status={status}
          panelMode={panelMode} onMode={setPanelMode}
          onAction={onAction}
          checklist={checklist}
          mrcDraft={mrcDraft} setMrcDraft={setMrcDraft}
          allDocsFlagged={allDocsFlagged}
        />
      </div>

      <AchievementModal
        open={achievement.open}
        payload={achievement.payload}
        task={task}
        onClose={() => setAchievement({ open: false, payload: null })}
      />
    </>
  );
}

// Export IsolatedTaskView to global scope so reviewer-app.jsx can mount it.
Object.assign(window, { IsolatedTaskView });
