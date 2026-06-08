/* ===========================================================================
   OneWELL Reviewer — Operations & Analytics
   ---------------------------------------------------------------------------
   Three things this view does:
     1. SLA Tracking      — aging distribution, green/amber/red bands
     2. Compliance        — reviewer velocity, accuracy, outcome mix (Drata-ish)
     3. AI Pre-Review     — confidence score + missing-clause linter (2027 vision)
   Plus a Guardrails Monitor that surfaces the three native processing rules:
        • Task-splitting safeguard (no split if Strategy is `auditable`)
        • Minimum-threshold rule    (no location-split if N < 2)
        • Historical immutability   (snapshot locked once ruling issues)
   =========================================================================== */
const ROPS_RD = ReviewerData;

// ============================================================================
// Computed analytics — derived from the live tasks array
// ============================================================================
function computeOpsMetrics(tasks) {
  const closed = tasks.filter(t => t.status.id === 'COMPLETED' || t.status.id === 'FAILED');
  const active = tasks.filter(t => t.status.id !== 'COMPLETED' && t.status.id !== 'FAILED');

  // Reviewer velocity — closed-per-week (anchor: 4 weeks)
  const weeksWindow = 4;
  const closedPerWeek = (closed.length / weeksWindow).toFixed(1);

  // Mean time-to-rule (closed tasks only, in days)
  const ruleDays = closed
    .filter(t => t.ruling && t.ruling.issuedAt && t.submittedAt)
    .map(t => (t.ruling.issuedAt.getTime() - t.submittedAt.getTime()) / 864e5);
  const meanDays = ruleDays.length ? (ruleDays.reduce((s, d) => s + d, 0) / ruleDays.length).toFixed(1) : '—';

  // Outcome distribution
  const approved = closed.filter(t => t.ruling?.decision === 'ACHIEVED').length;
  const failed   = closed.filter(t => t.ruling?.decision === 'FAILED').length;
  const inMRC    = tasks.filter(t => t.status.id === 'ATTENTION').length;
  const total    = approved + failed + inMRC || 1;
  const outcomes = [
    { id: 'approved', label: 'Achieved',  count: approved, pct: approved / total, color: 'var(--emerald-700)' },
    { id: 'mrc',      label: 'Returned · MRC', count: inMRC,  pct: inMRC    / total, color: 'var(--plum-700)' },
    { id: 'failed',   label: 'Failed',    count: failed,   pct: failed   / total, color: 'var(--coral-700)' },
  ];

  // Accuracy — synthetic: approved / (approved + reopened). We don't track
  // reopens explicitly, so we use (closed - failed) / closed as a proxy.
  const accuracy = closed.length ? (1 - failed / closed.length) : 1;

  // SLA aging — bucket active tasks by hours until due
  const buckets = { safe: [], amber: [], red: [] };
  active.forEach(t => {
    if (t.sla.kind === 'overdue') buckets.red.push(t);
    else if (t.sla.kind === 'soon') buckets.amber.push(t);
    else buckets.safe.push(t);
  });

  return { active, closed, closedPerWeek, meanDays, outcomes, accuracy, buckets, total: tasks.length };
}

// ============================================================================
// SLA Tracking Dashboard
// ============================================================================
function SLATracker({ buckets, tasks }) {
  const total = buckets.safe.length + buckets.amber.length + buckets.red.length;

  // Histogram bins: how many tasks fall into each "hours until due" band
  const bins = [
    { id: 'b1', label: '≤ 0h',     range: [-Infinity, 0],   band: 'red'   },
    { id: 'b2', label: '0–24h',    range: [0, 24],          band: 'amber' },
    { id: 'b3', label: '1–2d',     range: [24, 48],         band: 'amber' },
    { id: 'b4', label: '2–4d',     range: [48, 96],         band: 'safe'  },
    { id: 'b5', label: '4–7d',     range: [96, 168],        band: 'safe'  },
    { id: 'b6', label: '> 1 wk',   range: [168, Infinity],  band: 'safe'  },
  ];
  const active = [...buckets.safe, ...buckets.amber, ...buckets.red];
  const counts = bins.map(b => {
    const c = active.filter(t => {
      const h = (t.dueAt.getTime() - ROPS_RD.NOW.getTime()) / 36e5;
      return h >= b.range[0] && h < b.range[1];
    }).length;
    return { ...b, count: c };
  });
  const maxC = Math.max(1, ...counts.map(c => c.count));
  const bandColor = { safe: 'var(--emerald-600)', amber: 'var(--plum-500)', red: 'var(--coral-700)' };
  const bandBg    = { safe: 'var(--emerald-100)', amber: 'var(--plum-100)', red: 'var(--coral-100)' };

  return (
    <OpsCard title="SLA aging" kicker="Active tasks bucketed by hours until contractual due. Bars show count per band.">
      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        <SLABand label="Safe"    count={buckets.safe.length}  dot="var(--emerald-700)" bg="var(--emerald-50)" stroke="var(--emerald-200)" sub="> 48 hrs to go" />
        <SLABand label="Amber"   count={buckets.amber.length} dot="var(--plum-700)"    bg="var(--plum-50)"    stroke="var(--plum-200)"    sub="within 48 hrs"  />
        <SLABand label="Breached" count={buckets.red.length}  dot="var(--coral-700)"   bg="var(--coral-50)"   stroke="var(--coral-200)"   sub="past due date"   />
      </div>

      {/* Histogram */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 160, padding: '0 8px' }}>
        {counts.map(c => (
          <div key={c.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{
              fontSize: 11, fontWeight: 600, color: 'var(--gray-700)',
              opacity: c.count === 0 ? 0.4 : 1,
            }}>{c.count}</div>
            <div style={{
              width: '100%', height: `${(c.count / maxC) * 110 + 4}px`,
              background: bandBg[c.band], border: '1px solid ' + bandColor[c.band].replace('700', '300').replace('600','300'),
              borderRadius: 6, position: 'relative',
              transition: 'height .25s',
            }}>
              <div style={{
                position: 'absolute', left: 0, right: 0, bottom: 0,
                height: '4px', background: bandColor[c.band], borderRadius: '0 0 5px 5px',
              }} />
            </div>
            <div style={{
              fontSize: 11, color: 'var(--gray-600)', textAlign: 'center', whiteSpace: 'nowrap',
              fontFamily: 'ui-monospace, monospace',
            }}>{c.label}</div>
          </div>
        ))}
      </div>

      {/* Most critical row */}
      {buckets.red.length + buckets.amber.length > 0 && (
        <div style={{ marginTop: 22, paddingTop: 18, borderTop: '1px dashed var(--gray-200)' }}>
          <div style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
            color: 'var(--gray-500)', marginBottom: 10,
          }}>Most urgent</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[...buckets.red, ...buckets.amber].slice(0, 4).map(t => (
              <SLAUrgentRow key={t.id} task={t} />
            ))}
          </div>
        </div>
      )}
    </OpsCard>
  );
}
function SLABand({ label, count, dot, bg, stroke, sub }) {
  return (
    <div style={{
      flex: 1, padding: '14px 16px', background: bg,
      border: '1px solid ' + stroke, borderRadius: 8,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <span style={{ width: 8, height: 8, borderRadius: 9999, background: dot }} />
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--gray-700)' }}>{label}</span>
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 400, lineHeight: 1, color: dot }}>{count}</div>
      <div style={{ fontSize: 11, color: 'var(--gray-600)', marginTop: 6 }}>{sub}</div>
    </div>
  );
}
function SLAUrgentRow({ task }) {
  const palette = task.sla.kind === 'overdue'
    ? { rail: 'var(--coral-700)', tag: { bg: 'var(--coral-100)', fg: 'var(--coral-700)' } }
    : { rail: 'var(--plum-600)',  tag: { bg: 'var(--plum-100)',  fg: 'var(--plum-700)'  } };
  const label = task.sla.kind === 'overdue' ? `${task.sla.hours}h overdue` : `${task.sla.hours}h to due`;
  return (
    <a
      href={`#/task/${task.id}`}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '8px 10px', borderRadius: 6, background: '#fff',
        border: '1px solid var(--gray-200)', borderLeft: `3px solid ${palette.rail}`,
        textDecoration: 'none', color: 'inherit',
      }}>
      <span className="ow-code-chip" style={{
        background: ROPS_RD.CONCEPTS[task.feature.concept].token,
        color: ROPS_RD.CONCEPTS[task.feature.concept].text,
      }}>{task.feature.code}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--gray-800)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {task.feature.title}
        </div>
        <div style={{ fontSize: 11, color: 'var(--gray-500)' }}>{task.account.name} · {task.id.replace('task-', '#')}</div>
      </div>
      <span style={{
        height: 22, padding: '0 8px 1px', borderRadius: 4,
        background: palette.tag.bg, color: palette.tag.fg,
        display: 'inline-flex', alignItems: 'center', fontSize: 11, fontWeight: 700, lineHeight: 1,
      }}>{label}</span>
    </a>
  );
}

// ============================================================================
// Compliance rollups (Drata-style automation indicators)
// ============================================================================
function ComplianceRollups({ metrics }) {
  return (
    <OpsCard title="Reviewer compliance" kicker="Drata-style automated indicators. Updated continuously from the task ledger.">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        <ComplianceTile
          status="passing"
          label="Velocity SLA"
          value={metrics.closedPerWeek}
          unit="rulings / wk"
          benchmark="Target: 3.0+"
          ok
          detail="Trailing 4-week average."
        />
        <ComplianceTile
          status="passing"
          label="Mean time-to-rule"
          value={metrics.meanDays}
          unit="days"
          benchmark="Target: ≤ 5 d"
          ok={typeof metrics.meanDays === 'string' || parseFloat(metrics.meanDays) <= 5}
          detail="Submission → ruling, closed tasks."
        />
        <ComplianceTile
          status="passing"
          label="Decision accuracy"
          value={Math.round(metrics.accuracy * 100)}
          unit="%"
          benchmark="Target: ≥ 90%"
          ok={metrics.accuracy >= 0.9}
          detail="1 − (failure / closed)."
        />
        <ComplianceTile
          status="watching"
          label="MRC rate"
          value={Math.round((metrics.outcomes[1].count / Math.max(1, metrics.total)) * 100)}
          unit="%"
          benchmark="Target: ≤ 20%"
          warn
          detail="Returned-to-customer share."
        />
      </div>

      {/* Outcome stacked bar */}
      <div style={{ marginTop: 22 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--gray-500)' }}>Outcome distribution</span>
          <span style={{ fontSize: 11, color: 'var(--gray-500)' }}>last 4 weeks</span>
        </div>
        <div style={{ display: 'flex', height: 10, borderRadius: 9999, overflow: 'hidden', background: 'var(--gray-100)' }}>
          {metrics.outcomes.map(o => (
            <div key={o.id} style={{ flex: o.count, minWidth: o.count ? 4 : 0, background: o.color }} title={`${o.label}: ${o.count}`} />
          ))}
        </div>
        <div style={{ display: 'flex', gap: 18, marginTop: 12 }}>
          {metrics.outcomes.map(o => (
            <div key={o.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: 9999, background: o.color }} />
              <span style={{ fontSize: 12, color: 'var(--gray-700)' }}>{o.label}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-800)' }}>{o.count}</span>
              <span style={{ fontSize: 11, color: 'var(--gray-500)' }}>({Math.round(o.pct * 100)}%)</span>
            </div>
          ))}
        </div>
      </div>
    </OpsCard>
  );
}
function ComplianceTile({ label, value, unit, benchmark, ok, warn, detail }) {
  const tone = warn ? 'var(--plum-700)' : (ok ? 'var(--emerald-700)' : 'var(--coral-700)');
  const toneBg = warn ? 'var(--plum-50)' : (ok ? 'var(--emerald-50)' : 'var(--coral-50)');
  return (
    <div style={{
      padding: '14px 16px', borderRadius: 8, background: '#fff',
      border: '1px solid var(--gray-200)', borderTop: '3px solid ' + tone,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--gray-600)' }}>{label}</span>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          fontSize: 10, fontWeight: 700, color: tone, background: toneBg, padding: '2px 6px', borderRadius: 3,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: 9999, background: tone }} />
          {warn ? 'WATCHING' : 'PASSING'}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 400, color: 'var(--gray-800)', lineHeight: 1 }}>{value}</span>
        <span style={{ fontSize: 12, color: 'var(--gray-500)' }}>{unit}</span>
      </div>
      <div style={{ marginTop: 6, fontSize: 11, color: 'var(--gray-500)' }}>{benchmark}</div>
      <div style={{ marginTop: 6, fontSize: 11, color: 'var(--gray-500)', fontStyle: 'italic' }}>{detail}</div>
    </div>
  );
}

// ============================================================================
// AI Pre-Review Agent (2027 vision)
// ============================================================================
function AIAgent({ tasks }) {
  const candidates = tasks.filter(t => t.status.id === 'READY' || t.status.id === 'UNDER').slice(0, 6);
  const [selectedId, setSelectedId] = useState(candidates[0]?.id);
  const task = ROPS_RD.getTaskById(selectedId) || tasks[0];
  // Deterministic findings derived from the feature's checklist
  const findings = useMemo(() => synthesizeFindings(task), [task?.id]);

  return (
    <OpsCard
      title={
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            width: 22, height: 22, borderRadius: 9999, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(135deg, var(--cyan-700), var(--blue-600))', color: '#fff', fontSize: 11, fontWeight: 700,
          }}>AI</span>
          Pre-review agent
          <span style={{
            fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 9999,
            background: 'var(--plum-100)', color: 'var(--plum-700)', letterSpacing: '0.05em',
          }}>2027 PREVIEW</span>
        </span>
      }
      kicker="Parses uploaded evidence and surfaces likely gaps before a human reviewer opens the task."
    >
      {/* Task picker */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16,
        padding: 8, background: 'var(--gray-50)', borderRadius: 6, border: '1px solid var(--gray-200)',
      }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--gray-600)', letterSpacing: '0.04em', padding: '5px 6px 4px' }}>AUDIT:</span>
        {candidates.map(t => (
          <button
            key={t.id}
            onClick={() => setSelectedId(t.id)}
            style={{
              height: 26, padding: '0 10px 1px', borderRadius: 4, border: 'none',
              background: selectedId === t.id ? '#fff' : 'transparent',
              color: selectedId === t.id ? 'var(--gray-800)' : 'var(--gray-600)',
              fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600,
              cursor: 'pointer', boxShadow: selectedId === t.id ? 'var(--shadow-xs)' : 'none',
              display: 'inline-flex', alignItems: 'center', gap: 6, lineHeight: 1,
            }}>
            <span className="ow-code-chip" style={{
              height: 16, fontSize: 9, padding: '0 5px 0',
              background: ROPS_RD.CONCEPTS[t.feature.concept].token,
              color: ROPS_RD.CONCEPTS[t.feature.concept].text,
            }}>{t.feature.code}</span>
            {t.account.name}
          </button>
        ))}
      </div>

      {/* Confidence */}
      <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 24, marginBottom: 20 }}>
        <ConfidenceMeter score={findings.confidence} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--gray-600)' }}>
            Agent verdict
          </div>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--gray-700)', lineHeight: 1.55 }}>{findings.verdict}</p>
          <div style={{ display: 'flex', gap: 14, marginTop: 4 }}>
            <Stat label="Documents parsed" value={task.snapshot.attachments.length} />
            <Stat label="Clauses cited"     value={findings.clausesCited} />
            <Stat label="Gaps flagged"      value={findings.gaps.length} />
          </div>
        </div>
      </div>

      {/* Missing clauses */}
      <div style={{ marginBottom: 18 }}>
        <Hed>Potentially missing or unverifiable clauses</Hed>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {findings.gaps.map((g, i) => (
            <li key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: 10,
              padding: '10px 12px', background: 'var(--coral-50)',
              border: '1px solid var(--coral-200)', borderRadius: 6,
            }}>
              <span style={{ color: 'var(--coral-700)', marginTop: 2 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </span>
              <div style={{ flex: 1, fontSize: 13, color: 'var(--gray-800)', lineHeight: 1.5 }}>
                <strong>{g.title}</strong>
                <span style={{ color: 'var(--gray-600)' }}> — {g.detail}</span>
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--coral-700)' }}>{g.severity}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Compliant lines */}
      <div>
        <Hed>Compliant lines surfaced</Hed>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {findings.compliantLines.map((c, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: 10,
              padding: '10px 12px', background: 'var(--emerald-50)',
              border: '1px solid var(--emerald-200)', borderRadius: 6,
            }}>
              <span style={{ color: 'var(--emerald-700)', marginTop: 2 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </span>
              <div style={{ flex: 1, fontSize: 13, color: 'var(--gray-700)', lineHeight: 1.55 }}>
                <span style={{ fontSize: 11, color: 'var(--emerald-700)', fontWeight: 600 }}>{c.source}</span>
                <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 12, color: 'var(--gray-800)', marginTop: 4, lineHeight: 1.5 }}>
                  &ldquo;{c.quote}&rdquo;
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        marginTop: 18, padding: '10px 14px', background: 'var(--gray-50)',
        borderRadius: 6, fontSize: 11, color: 'var(--gray-500)', lineHeight: 1.55,
      }}>
        Agent decisions are advisory only. They never alter the snapshot and cannot issue a ruling. Reviewers must independently confirm every finding.
      </div>
    </OpsCard>
  );
}

function ConfidenceMeter({ score }) {
  // score in 0..100
  const tone = score >= 75 ? 'var(--emerald-700)' : (score >= 50 ? 'var(--plum-700)' : 'var(--coral-700)');
  // Build SVG arc
  const r = 60, c = 2 * Math.PI * r;
  const dash = (score / 100) * c;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <svg width="150" height="150" viewBox="0 0 150 150">
        <circle cx="75" cy="75" r={r} fill="none" stroke="var(--gray-100)" strokeWidth="14" />
        <circle cx="75" cy="75" r={r} fill="none" stroke={tone} strokeWidth="14"
          strokeDasharray={`${dash} ${c - dash}`} strokeDashoffset={c / 4}
          transform="rotate(-90 75 75)" style={{ transition: 'stroke-dasharray .4s' }} strokeLinecap="round" />
        <text x="75" y="78" textAnchor="middle" fontFamily="var(--font-display)" fontSize="34" fill="var(--gray-800)">{score}</text>
        <text x="75" y="98" textAnchor="middle" fontFamily="var(--font-body)" fontSize="10" fontWeight="700" letterSpacing="0.1em" fill="var(--gray-500)">CONFIDENCE</text>
      </svg>
    </div>
  );
}
function Stat({ label, value }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--gray-800)', lineHeight: 1 }}>{value}</span>
      <span style={{ fontSize: 11, color: 'var(--gray-500)', marginTop: 2 }}>{label}</span>
    </div>
  );
}
function Hed({ children }) {
  return <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--gray-600)', marginBottom: 10 }}>{children}</div>;
}

// Synthesize findings deterministically from a task's feature checklist.
function synthesizeFindings(task) {
  if (!task) return { confidence: 0, verdict: '', clausesCited: 0, gaps: [], compliantLines: [] };
  const list = ROPS_RD.getChecklist(task.feature.code);
  const seed = parseInt(task.id.replace(/\D/g, '').slice(-3), 10) || 0;
  const confidenceBase = 60 + (seed % 35);
  const confidence = task.status.id === 'ATTENTION' ? Math.max(35, confidenceBase - 30) : confidenceBase;

  // Pick 1–3 items as "missing"
  const gaps = list
    .filter((_, i) => (seed + i) % 3 === 0)
    .slice(0, 3)
    .map((it, i) => ({
      title: it.tier === 'T1' ? `Missing Tier 1 evidence: ${it.text.split('.')[0]}.` : `Tier 2 clarification needed: ${it.text.split('.')[0]}.`,
      detail: detailFor(task.feature.code, i),
      severity: it.tier === 'T1' ? 'HIGH' : 'LOW',
    }));
  // Compliant lines — derive from attachments
  const docs = task.snapshot.attachments.slice(0, 2);
  const compliantLines = docs.map((d, i) => ({
    source: d.name,
    quote: quoteFor(task.feature.code, i),
  }));
  const verdict = gaps.length === 0
    ? `Evidence package looks complete on first pass — recommend a focused human review of methodology.`
    : `Submission appears mostly compliant but ${gaps.length} clause${gaps.length > 1 ? 's' : ''} would benefit from human verification before ruling.`;
  return { confidence, verdict, gaps, compliantLines, clausesCited: list.length };
}
function detailFor(code, i) {
  const table = {
    W02: ['ASHRAE 188 § 4.2 (Building water systems – risk management) not cited in the management plan.', 'Filter replacement intervals not bound to manufacturer specifications.', 'Sampling cadence does not specify outlet rotation across quarters.'],
    W01: ['Chain-of-custody dates fall outside the 30-day window for one sample (B-12, fixture lead 6 ppb).', 'Lab accreditation document refers to a sister facility, not the sampling lab.', 'Turbidity raw data not enclosed; only summary tables.'],
    A02: ['Policy does not explicitly cover e-cigarettes / vaporizers per A02 amendment Q2 2026.', 'Signage installation photos missing for floors 7 and 12.', 'Enforcement clause cites obsolete state regulation.'],
    A01: ['Continuous monitor calibration certificate predates the measurement window.', 'TVOC sampling did not include conference Zone E.', 'PM2.5 measurement methodology not stated.'],
    T01: ['BAS trend export omits weekend hours for two of three buildings.', 'Stamped mechanical drawings missing PE seal on sheet M-3.2.', 'Operative temperature ≠ dry-bulb; calculation worksheet not provided.'],
    L03: ['Photometric report covers only 4 of 6 sampled floors.', 'Spectral power distribution missing for fixture type 2A.', 'Workstation grid spacing not specified.'],
  };
  return (table[code] || ['Cited methodology does not match the standard\'s prescribed test method.', 'Documentation predates the current reporting window.', 'Sampling plan does not cover declared scope.'])[i % 3];
}
function quoteFor(code, i) {
  const table = {
    W02: ['POU filters installed at all 38 drinking water outlets across the portfolio; replacement on 90-day cycle.', 'Quarterly water quality testing performed by an ISO 17025-accredited lab (cert. attached).'],
    W01: ['Lead readings ≤ 0.005 mg/L at 47 of 48 sampled outlets.', 'Sampling completed within 30 days of submission; chain of custody intact.'],
    A02: ['Smoke-free policy ratified 2026-04-08 covering all 50 properties.', 'Signage installed at all building entries; installer attestation enclosed.'],
    A01: ['PM2.5 average over 14-day window: 9.3 µg/m³ (threshold ≤ 15 µg/m³).', 'Continuous monitoring across 12 zones with hourly data export.'],
    T01: ['Operative temperature within ASHRAE 55 acceptable range across all measured locations.', '30-day BAS trend confirms setpoint compliance for HVAC zone groups A–F.'],
    L03: ['Median melanopic EDI at workstations between 9–11am: 198 EML.', 'Luminaire schedule attached with full SPD for each fixture type.'],
  };
  return (table[code] || ['Evidence directly cites the WELL v2 feature requirement.', 'Methodology aligns with the standard\'s prescribed test method.'])[i % 2];
}

// ============================================================================
// Guardrails Monitor
// ============================================================================
function GuardrailsMonitor({ tasks }) {
  // Compute live counts against the three native rules.
  const ruleStats = useMemo(() => {
    const auditable = tasks.filter(t => t.feature.precondition === false && t.path.id === 'AUDITED');
    const tooFewLocs = tasks.filter(t => (t.locationIds || []).length < 2);
    const closedSnapshots = tasks.filter(t => t.status.id === 'COMPLETED' || t.status.id === 'FAILED');
    return {
      auditableCount: auditable.length,
      tooFewCount: tooFewLocs.length,
      closedCount: closedSnapshots.length,
    };
  }, [tasks]);

  return (
    <OpsCard title="Native processing guardrails" kicker="Enforced inside TaskService state handlers. Block actions that would corrupt the audit trail.">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        <RuleCard
          rule="TASK_SPLIT_SAFEGUARD"
          title="Task splitting"
          description="Prevent splitting any task whose Strategy is marked `auditable`. Splitting could fork the audit sample, invalidating ⌈√N⌉ math."
          counter={ruleStats.auditableCount}
          counterLabel="tasks would be blocked from split if requested"
          demo={<DemoSplitButton blocked />}
        />
        <RuleCard
          rule="MIN_LOC_THRESHOLD"
          title="Location threshold"
          description="Hard block on location-split when the task contains fewer than 2 locations. A single-site task can never become a portfolio."
          counter={ruleStats.tooFewCount}
          counterLabel="single-location tasks · split disabled"
          demo={<DemoLocationSplit blocked />}
        />
        <RuleCard
          rule="SNAPSHOT_IMMUTABLE"
          title="Historical immutability"
          description="Once a ruling is finalized, the corresponding ReviewSnapshot is sealed. Edits raise an exception in the audit ledger."
          counter={ruleStats.closedCount}
          counterLabel="snapshots sealed this cycle"
          demo={<DemoImmutable />}
        />
      </div>
    </OpsCard>
  );
}
function RuleCard({ rule, title, description, counter, counterLabel, demo }) {
  return (
    <div style={{
      padding: '16px 16px 18px', borderRadius: 8,
      background: '#fff', border: '1px solid var(--gray-200)',
      display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{
          width: 22, height: 22, borderRadius: 4, background: 'var(--cyan-50)', color: 'var(--cyan-800)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </span>
        <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--gray-800)' }}>{title}</span>
        <span style={{ marginLeft: 'auto', fontSize: 9, fontWeight: 700, color: 'var(--emerald-700)', background: 'var(--emerald-50)', padding: '3px 6px', borderRadius: 3 }}>ENFORCED</span>
      </div>
      <code style={{ fontFamily: 'ui-monospace, monospace', fontSize: 10.5, color: 'var(--cyan-800)', background: 'var(--cyan-50)', padding: '3px 6px', borderRadius: 3, alignSelf: 'flex-start' }}>{rule}</code>
      <p style={{ margin: 0, fontSize: 12, color: 'var(--gray-600)', lineHeight: 1.55 }}>{description}</p>

      <div style={{
        padding: '10px 12px', background: 'var(--gray-50)', borderRadius: 6,
        display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 4,
      }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--gray-800)' }}>{counter}</span>
        <span style={{ fontSize: 11, color: 'var(--gray-600)' }}>{counterLabel}</span>
      </div>
      <div style={{ marginTop: 4 }}>{demo}</div>
    </div>
  );
}
function DemoSplitButton({ blocked }) {
  const [clicked, setClicked] = useState(false);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <button
        onClick={() => setClicked(true)}
        style={{
          height: 30, padding: '0 12px 1px', borderRadius: 6,
          border: '1px solid ' + (blocked ? 'var(--gray-200)' : 'var(--blue-200)'),
          background: blocked ? 'var(--gray-50)' : '#fff',
          color: blocked ? 'var(--gray-400)' : 'var(--blue-700)',
          fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600,
          cursor: blocked ? 'not-allowed' : 'pointer', lineHeight: 1,
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>
        Try: Split task
      </button>
      {clicked && blocked && (
        <span style={{ fontSize: 11, color: 'var(--coral-700)', fontWeight: 600 }}>
          Blocked by TASK_SPLIT_SAFEGUARD
        </span>
      )}
    </div>
  );
}
function DemoLocationSplit({ blocked }) {
  const [clicked, setClicked] = useState(false);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <button
        onClick={() => setClicked(true)}
        style={{
          height: 30, padding: '0 12px 1px', borderRadius: 6,
          border: '1px solid var(--gray-200)', background: 'var(--gray-50)',
          color: 'var(--gray-400)', fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600,
          cursor: 'not-allowed', lineHeight: 1,
        }}>
        Try: Split locations
      </button>
      {clicked && (
        <span style={{ fontSize: 11, color: 'var(--coral-700)', fontWeight: 600 }}>
          n &lt; 2 → action unavailable
        </span>
      )}
    </div>
  );
}
function DemoImmutable() {
  const [shake, setShake] = useState(false);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <button
        onClick={() => { setShake(true); setTimeout(() => setShake(false), 450); }}
        style={{
          height: 30, padding: '0 12px 1px', borderRadius: 6,
          border: '1px solid var(--gray-200)', background: '#fff',
          color: 'var(--gray-700)', fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600,
          cursor: 'pointer', lineHeight: 1,
          animation: shake ? 'rOpsShake .35s' : 'none',
        }}>
        Try: Edit closed snapshot
      </button>
      {shake && (
        <span style={{ fontSize: 11, color: 'var(--coral-700)', fontWeight: 600 }}>
          ReviewSnapshot is sealed
        </span>
      )}
      <style>{`@keyframes rOpsShake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-3px)} 75%{transform:translateX(3px)} }`}</style>
    </div>
  );
}

// ============================================================================
// OpsCard primitive
// ============================================================================
function OpsCard({ title, kicker, children, style }) {
  return (
    <section style={{
      background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 12,
      padding: '20px 22px', ...style,
    }}>
      <header style={{ marginBottom: 16 }}>
        <h2 style={{
          margin: 0, fontFamily: 'var(--font-body)', fontSize: 16, fontWeight: 700,
          color: 'var(--gray-800)', letterSpacing: 'normal',
        }}>{title}</h2>
        {kicker && <div style={{ fontSize: 13, color: 'var(--gray-500)', marginTop: 4 }}>{kicker}</div>}
      </header>
      {children}
    </section>
  );
}

// ============================================================================
// Ops page header
// ============================================================================
function OpsPageHeader() {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, padding: '8px 0 24px' }}>
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--cyan-800)', marginBottom: 8 }}>
          Operations & analytics
        </div>
        <h1 className="page-title" style={{ margin: 0, fontSize: 34, lineHeight: 1.1 }}>Reviewer operations</h1>
        <div style={{ marginTop: 8, color: 'var(--gray-600)', fontSize: 14, maxWidth: 720 }}>
          SLA tracking, automated compliance indicators, AI pre-review, and the native processing rules
          that keep the audit trail provably clean.
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button className="ow-btn ow-btn-outline">Last 4 weeks</button>
        <button className="ow-btn ow-btn-solid">Schedule report</button>
      </div>
    </div>
  );
}

// ============================================================================
// Root component
// ============================================================================
function ReviewerOps({ tasks }) {
  const metrics = useMemo(() => computeOpsMetrics(tasks), [tasks]);
  return (
    <div>
      <OpsPageHeader />

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 16, marginBottom: 16 }}>
        <SLATracker buckets={metrics.buckets} tasks={tasks} />
        <ComplianceRollups metrics={metrics} />
      </div>

      <div style={{ marginBottom: 16 }}>
        <AIAgent tasks={tasks} />
      </div>

      <div>
        <GuardrailsMonitor tasks={tasks} />
      </div>
    </div>
  );
}

// Export to global scope
Object.assign(window, { ReviewerOps });
