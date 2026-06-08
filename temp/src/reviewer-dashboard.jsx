/* ===========================================================================
   OneWELL Reviewer — Dashboard (Review Queue)
   ---------------------------------------------------------------------------
   Layout (top-to-bottom inside <main>):
     1. PageHeader   — title + period selector + "Today's focus" CTA
     2. MetricsRow   — 4 KPI cards
     3. CompositionStrip — verification path mix for the period
     4. ViewTabs     — saved views, each with a live count
     5. QueueToolbar — filters, sort, density, bulk actions
     6. QueueTable   — the meat: per-task row
     7. TaskDrawer   — slides in from the right on row click
   =========================================================================== */
var RD = ReviewerData;

// ============================================================================
// Top page header
// ============================================================================
function DashboardHeader({ user }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, padding: '8px 0 24px' }}>
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--cyan-800)', marginBottom: 8 }}>
          Friday · May 22, 2026 · {RD.fmt(RD.NOW)}
        </div>
        <h1 className="page-title" style={{ margin: 0, fontSize: 34, lineHeight: 1.1 }}>Good afternoon, {user.name.split(' ')[0]}.</h1>
        <div style={{ marginTop: 8, color: 'var(--gray-600)', fontSize: 14, maxWidth: 620 }}>
          You have <strong style={{ color: 'var(--gray-800)' }}>11 active reviews</strong> across <strong style={{ color: 'var(--gray-800)' }}>5 client portfolios</strong>.
          Two are within the 48-hour SLA window.
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button className="ow-btn ow-btn-outline">This week</button>
        <button className="ow-btn ow-btn-primary" style={{ height: 40, padding: '0 22px 1px', fontSize: 14 }}>
          Open today's focus
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// Metric cards
// ============================================================================
function MetricsRow({ rollup, tasks, me }) {
  const cards = [
    {
      label: 'Assigned to you',
      value: rollup.assigned,
      sublabel: 'across 5 portfolios',
      accent: 'var(--cyan-800)',
      bg: '#fff',
      trend: { delta: '+2 vs. last wk', dir: 'up', tone: 'neutral' },
    },
    {
      label: 'SLA at risk',
      value: rollup.sla,
      sublabel: rollup.sla === 0 ? 'clear' : 'within 48h or overdue',
      accent: 'var(--coral-700)',
      bg: 'var(--coral-50)',
      trend: { delta: 'Northbay W01 due Mon', dir: 'flat', tone: 'warn' },
    },
    {
      label: 'In MRC loop',
      value: rollup.awaiting,
      sublabel: 'awaiting customer remediation',
      accent: 'var(--plum-700)',
      bg: 'var(--plum-50)',
      trend: { delta: '1 on cycle 3 of 3', dir: 'flat', tone: 'warn' },
    },
    {
      label: 'Ruled this week',
      value: rollup.doneWeek,
      sublabel: 'achieved or failed',
      accent: 'var(--emerald-700)',
      bg: 'var(--emerald-50)',
      trend: { delta: '+1 vs. last wk', dir: 'up', tone: 'good' },
    },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 20 }}>
      {cards.map(c => (
        <article key={c.label} style={{
          background: c.bg,
          border: '1px solid var(--gray-200)',
          borderRadius: 12,
          padding: '16px 18px 18px',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--gray-600)' }}>{c.label}</span>
            <span style={{ color: 'var(--gray-400)' }}>{G.more}</span>
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 42, fontWeight: 400, lineHeight: 1, color: c.accent, letterSpacing: '-0.01em' }}>
            {c.value}
          </div>
          <div style={{ fontSize: 13, color: 'var(--gray-600)' }}>{c.sublabel}</div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 500,
            color: c.trend.tone === 'good' ? 'var(--emerald-700)' : (c.trend.tone === 'warn' ? 'var(--plum-700)' : 'var(--gray-600)'),
          }}>
            <span style={{ width: 13, display: 'inline-flex' }}>
              {c.trend.dir === 'up' ? G.arrowUp : (c.trend.dir === 'down' ? G.arrowDown : G.clock)}
            </span>
            {c.trend.delta}
          </div>
        </article>
      ))}
    </div>
  );
}

// ============================================================================
// Composition strip — visual breakdown of your assigned work by path
// ============================================================================
function CompositionStrip({ tasks, me }) {
  const mine = tasks.filter(t => t.assignedReviewerId === me && t.status.id !== 'COMPLETED' && t.status.id !== 'FAILED');
  const buckets = ['SHAREABLE','AUDITED','INDIVIDUAL'].map(p => ({
    id: p,
    label: RD.PATHS[p].label,
    blurb: RD.PATHS[p].blurb,
    count: mine.filter(t => t.path.id === p).length,
  }));
  const total = buckets.reduce((s, b) => s + b.count, 0) || 1;
  const colors = { SHAREABLE: 'var(--cyan-700)', AUDITED: 'var(--blue-600)', INDIVIDUAL: 'var(--plum-700)' };
  const icons  = { SHAREABLE: G.shareable, AUDITED: G.sample, INDIVIDUAL: G.perloc };

  return (
    <section style={{
      background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 12,
      padding: '16px 20px 18px', marginBottom: 24,
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
        <div>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--gray-500)' }}>Verification path mix</span>
          <span style={{ marginLeft: 12, fontSize: 13, color: 'var(--gray-600)' }}>
            How your active reviews break down by sampling strategy
          </span>
        </div>
        <a href="#" style={{ fontSize: 13, color: 'var(--blue-600)' }}>Path methodology →</a>
      </div>

      {/* Stacked bar */}
      <div style={{ display: 'flex', height: 10, borderRadius: 9999, overflow: 'hidden', background: 'var(--gray-100)', marginBottom: 14 }}>
        {buckets.map(b => (
          <div key={b.id} title={`${b.label}: ${b.count}`} style={{
            flex: `${b.count}`, minWidth: b.count ? 6 : 0,
            background: colors[b.id],
          }} />
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {buckets.map(b => (
          <div key={b.id} style={{ display: 'flex', gap: 12 }}>
            <span style={{
              width: 36, height: 36, borderRadius: 8, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              background: 'var(--gray-50)', color: colors[b.id], flexShrink: 0,
            }}>{icons[b.id]}</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--gray-800)' }}>{b.label}</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: colors[b.id] }}>{b.count}</span>
                <span style={{ fontSize: 11, color: 'var(--gray-500)' }}>{Math.round(b.count / total * 100)}%</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--gray-600)', lineHeight: 1.4 }}>{b.blurb}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================================
// View tabs
// ============================================================================
function ViewTabs({ views, activeId, onChange, tasks, me }) {
  return (
    <div style={{ display: 'flex', borderBottom: '1px solid var(--gray-200)', gap: 4, marginBottom: 12 }}>
      {views.map(v => {
        const count = tasks.filter(t => v.filter(t, me)).length;
        const active = activeId === v.id;
        return (
          <button
            key={v.id}
            onClick={() => onChange(v.id)}
            style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              padding: '10px 14px 12px',
              fontFamily: 'var(--font-body)', fontSize: 14,
              fontWeight: active ? 600 : 500,
              color: active ? 'var(--cyan-800)' : 'var(--gray-600)',
              borderBottom: active ? '2px solid var(--cyan-700)' : '2px solid transparent',
              marginBottom: -1,
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
            {v.label}
            <span style={{
              minWidth: 22, height: 18, padding: '0 6px 1px', borderRadius: 9999, fontSize: 11, fontWeight: 600,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1,
              background: active ? 'var(--cyan-100)' : 'var(--gray-100)',
              color:      active ? 'var(--cyan-800)' : 'var(--gray-600)',
            }}>{count}</span>
          </button>
        );
      })}
    </div>
  );
}

// ============================================================================
// Queue toolbar — filters, sort, bulk actions
// ============================================================================
function QueueToolbar({ filters, onFilter, sortKey, onSort, selectedCount, totalCount }) {
  const FilterChip = ({ id, label, options }) => (
    <button style={{
      height: 32, padding: '0 10px 1px', border: '1px solid var(--gray-200)',
      background: filters[id] && filters[id] !== 'all' ? 'var(--blue-100)' : '#fff',
      color: filters[id] && filters[id] !== 'all' ? 'var(--blue-700)' : 'var(--gray-700)',
      borderRadius: 6, display: 'inline-flex', alignItems: 'center', gap: 6,
      fontSize: 13, fontWeight: 500, cursor: 'pointer', lineHeight: 1,
    }}>
      <span style={{ color: 'var(--gray-500)' }}>{label}:</span>
      <strong style={{ fontWeight: 600 }}>{filters[id] === 'all' || !filters[id] ? 'Any' : filters[id]}</strong>
      <span style={{ color: 'var(--gray-400)', display: 'inline-flex' }}>{G.chevDown}</span>
    </button>
  );

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0 14px', flexWrap: 'wrap' }}>
      <span style={{ color: 'var(--gray-500)' }}>{G.filter}</span>
      <FilterChip id="concept"  label="Concept" />
      <FilterChip id="path"     label="Path"    />
      <FilterChip id="portfolio" label="Portfolio" />
      <FilterChip id="status"   label="Status"  />

      <div style={{ flex: 1 }} />

      {selectedCount > 0 && (
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 12, padding: '0 14px',
          height: 32, background: 'var(--cyan-50)', border: '1px solid var(--cyan-200)',
          borderRadius: 6, fontSize: 13, color: 'var(--cyan-800)', fontWeight: 500,
        }}>
          <span><strong>{selectedCount}</strong> selected</span>
          <span style={{ width: 1, height: 18, background: 'var(--cyan-200)' }} />
          <a href="#" style={{ color: 'var(--cyan-800)', fontWeight: 600 }}>Reassign…</a>
          <a href="#" style={{ color: 'var(--cyan-800)', fontWeight: 600 }}>Bulk approve</a>
        </div>
      )}

      <button style={{
        height: 32, padding: '0 12px 1px', border: '1px solid var(--gray-200)', background: '#fff',
        borderRadius: 6, display: 'inline-flex', alignItems: 'center', gap: 6,
        fontSize: 13, color: 'var(--gray-700)', cursor: 'pointer', fontWeight: 500, lineHeight: 1,
      }}>
        <span>{G.sort}</span>
        Sort: <strong>{sortKey === 'sla' ? 'SLA · soonest first' : sortKey}</strong>
      </button>

      <span style={{ fontSize: 12, color: 'var(--gray-500)' }}>{totalCount} tasks</span>
    </div>
  );
}

// ============================================================================
// Queue table
// ============================================================================
function QueueTable({ tasks, selected, onSelect, onOpen, openTaskId }) {
  const allSelected = tasks.length > 0 && tasks.every(t => selected.has(t.id));
  const someSelected = !allSelected && tasks.some(t => selected.has(t.id));
  const toggleAll = () => {
    const next = new Set(selected);
    if (allSelected) tasks.forEach(t => next.delete(t.id));
    else tasks.forEach(t => next.add(t.id));
    onSelect(next);
  };
  const toggleOne = (id) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id); else next.add(id);
    onSelect(next);
  };

  return (
    <div style={{
      background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 12, overflow: 'hidden',
    }}>
      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, tableLayout: 'fixed' }}>
        <colgroup>
          <col style={{ width: 38 }} />
          <col style={{ width: '38%' }} />
          <col style={{ width: 130 }} />
          <col style={{ width: 130 }} />
          <col style={{ width: 130 }} />
          <col style={{ width: 130 }} />
          <col style={{ width: 130 }} />
          <col style={{ width: 110 }} />
        </colgroup>
        <thead>
          <tr style={{ background: 'var(--cyan-50)' }}>
            <th style={th()}>
              <Checkbox checked={allSelected} indeterminate={someSelected} onChange={toggleAll} />
            </th>
            <th style={th('left')}>Feature & account</th>
            <th style={th('left')}>Concept</th>
            <th style={th('left')}>Path</th>
            <th style={th('left')}>Coverage</th>
            <th style={th('left')}>Status</th>
            <th style={th('left')}>SLA</th>
            <th style={th('right')}>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 && (
            <tr><td colSpan={8} style={{ padding: 40, textAlign: 'center', color: 'var(--gray-500)' }}>
              No tasks in this view.
            </td></tr>
          )}
          {tasks.map((t, i) => {
            const isOpen = openTaskId === t.id;
            const isSel  = selected.has(t.id);
            return (
              <tr
                key={t.id}
                onClick={() => onOpen(t.id)}
                style={{
                  background: isOpen ? 'var(--cyan-50)' : (isSel ? 'var(--blue-50)' : '#fff'),
                  cursor: 'pointer',
                  borderTop: i === 0 ? 'none' : '1px solid var(--gray-100)',
                  transition: 'background .12s',
                }}
                onMouseOver={(e) => { if (!isOpen && !isSel) e.currentTarget.style.background = 'var(--gray-50)'; }}
                onMouseOut={(e)  => { if (!isOpen && !isSel) e.currentTarget.style.background = '#fff'; }}
              >
                <td style={td()} onClick={(e) => e.stopPropagation()}>
                  <Checkbox checked={isSel} onChange={() => toggleOne(t.id)} />
                </td>
                <td style={td('left')}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span className="ow-code-chip" style={{
                      background: RD.CONCEPTS[t.feature.concept].token,
                      color: RD.CONCEPTS[t.feature.concept].text,
                      flexShrink: 0,
                    }}>{t.feature.code}</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--gray-800)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {t.feature.title}
                        {t.feature.precondition && <span style={{ marginLeft: 8, fontSize: 10, fontWeight: 600, color: 'var(--coral-700)', letterSpacing: '0.05em' }}>PRE</span>}
                      </span>
                      <span style={{ fontSize: 12, color: 'var(--gray-500)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {t.account.name}
                        <span style={{ color: 'var(--gray-300)' }}> · </span>
                        {t.id.replace('task-', '#')}
                        {t.mrcCycle > 0 && (
                          <span style={{ marginLeft: 8, color: 'var(--plum-700)', fontWeight: 600 }}>
                            MRC cycle {t.mrcCycle}/3
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                </td>
                <td style={td('left')}>
                  <ConceptPill code={t.feature.concept} dense />
                </td>
                <td style={td('left')}>
                  <PathChip pathId={t.path.id} />
                </td>
                <td style={td('left')}>
                  <CoverageDisplay task={t} />
                </td>
                <td style={td('left')}>
                  <StatusPill id={t.status.id} dense />
                </td>
                <td style={td('left')}>
                  <SLAChip sla={t.sla} />
                </td>
                <td style={td('right')} onClick={(e) => e.stopPropagation()}>
                  <a
                    href={`#/task/${t.id}`}
                    style={{
                      height: 30, padding: '0 12px 1px', border: '1px solid var(--cyan-200)',
                      background: 'var(--cyan-50)', borderRadius: 6, fontSize: 12, fontWeight: 600,
                      color: 'var(--cyan-800)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4, lineHeight: 1,
                      textDecoration: 'none',
                    }}>
                    Review
                    <span style={{ display: 'inline-flex' }}>{G.chevRight}</span>
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// Tiny accessible checkbox
function Checkbox({ checked, indeterminate, onChange }) {
  const ref = useRef(null);
  useEffect(() => { if (ref.current) ref.current.indeterminate = !!indeterminate; }, [indeterminate]);
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
      <input ref={ref} type="checkbox" checked={!!checked} onChange={(e) => onChange(e.target.checked)}
        style={{
          width: 16, height: 16, margin: 0, accentColor: 'var(--cyan-700)', cursor: 'pointer',
        }}
      />
    </label>
  );
}

function CoverageDisplay({ task }) {
  if (task.path.id === 'INDIVIDUAL') {
    const loc = RD.LOCATIONS.find(l => l.id === task.locationIds[0]);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontSize: 13, color: 'var(--gray-800)' }}>1 site</span>
        <span style={{ fontSize: 11, color: 'var(--gray-500)' }}>{loc ? loc.city : '—'}</span>
      </div>
    );
  }
  if (task.path.id === 'AUDITED') {
    const samp = task.sampledLocationIds ? task.sampledLocationIds.length : 0;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontSize: 13, color: 'var(--gray-800)' }}>{samp} of {task.portfolioSize}</span>
        <span style={{ fontSize: 11, color: 'var(--gray-500)' }}>⌈√{task.portfolioSize}⌉ sample</span>
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <span style={{ fontSize: 13, color: 'var(--gray-800)' }}>{task.portfolioSize} sites</span>
      <span style={{ fontSize: 11, color: 'var(--gray-500)' }}>1 evidence covers all</span>
    </div>
  );
}

const th = (align = 'center') => ({
  fontSize: 11, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase',
  color: 'var(--cyan-800)', padding: '12px 14px', textAlign: align,
  borderBottom: '1px solid var(--gray-200)', whiteSpace: 'nowrap',
});
const td = (align = 'center') => ({
  padding: '14px', fontSize: 13, color: 'var(--gray-800)', textAlign: align, verticalAlign: 'middle',
});

// ============================================================================
// Task Drawer — the "Mini-Trial" container
// ============================================================================
function TaskDrawer({ task, onClose, onRule }) {
  if (!task) return null;
  return (
    <>
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, background: 'rgba(40,42,49,0.35)', zIndex: 50,
        animation: 'owFade .15s ease',
      }} />
      <aside style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(720px, 92vw)',
        background: '#fff', borderLeft: '1px solid var(--gray-200)', zIndex: 51,
        boxShadow: 'var(--shadow-xl)', display: 'flex', flexDirection: 'column',
        animation: 'owSlide .22s cubic-bezier(.2,.7,.2,1)',
      }}>
        <DrawerHeader task={task} onClose={onClose} />
        <div style={{ flex: 1, overflow: 'auto' }}>
          <SnapshotPanel task={task} />
          <EvidencePanel task={task} />
          <SamplingPanel task={task} />
          <NotesPanel task={task} />
        </div>
        <RulingDock task={task} onRule={onRule} />
      </aside>
      <style>{`
        @keyframes owSlide { from { transform: translateX(20px); opacity: 0 } to { transform: translateX(0); opacity: 1 } }
        @keyframes owFade  { from { opacity: 0 } to { opacity: 1 } }
      `}</style>
    </>
  );
}

function DrawerHeader({ task, onClose }) {
  return (
    <header style={{
      padding: '20px 24px 16px',
      borderBottom: '1px solid var(--gray-200)',
      background: 'var(--cyan-50)',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="ow-code-chip" style={{
            background: RD.CONCEPTS[task.feature.concept].token,
            color: RD.CONCEPTS[task.feature.concept].text,
            height: 24, fontSize: 12, padding: '0 10px 1px',
          }}>{task.feature.code}</span>
          <ConceptPill code={task.feature.concept} dense />
          <PathChip pathId={task.path.id} />
          <span style={{ fontSize: 12, color: 'var(--gray-500)' }}>· {task.id.replace('task-', '#')}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <a href={`#/task/${task.id}`} style={{
            height: 32, padding: '0 14px 1px', borderRadius: 6,
            background: 'var(--cyan-800)', color: '#fff',
            fontSize: 12, fontWeight: 600, textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: 6, lineHeight: 1,
          }}>
            Open isolated view
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M7 7h10v10"/></svg>
          </a>
          <button onClick={onClose} style={{
            width: 32, height: 32, border: 'none', background: 'transparent', borderRadius: 6,
            color: 'var(--gray-600)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}>{G.close}</button>
        </div>
      </div>

      <h2 style={{ margin: '14px 0 4px', fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 400, lineHeight: 1.15, color: 'var(--gray-800)' }}>
        {task.feature.title}
      </h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
        <span style={{ fontSize: 14, color: 'var(--gray-700)', fontWeight: 500 }}>{task.account.name}</span>
        <span style={{ color: 'var(--gray-300)' }}>·</span>
        <span style={{ fontSize: 13, color: 'var(--gray-500)' }}>{task.account.org}</span>
      </div>

      <div style={{ display: 'flex', gap: 18, marginTop: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <StatusPill id={task.status.id} />
        <SLAChip sla={task.sla} />
        <span style={{ fontSize: 12, color: 'var(--gray-500)' }}>
          Submitted {RD.relative(task.submittedAt)} · Due {RD.fmt(task.dueAt)}
        </span>
        {task.mrcCycle > 0 && (
          <span style={{ fontSize: 12, color: 'var(--plum-700)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            {React.cloneElement(G.loop, { size: 13 })}
            MRC cycle {task.mrcCycle} of 3
          </span>
        )}
      </div>
    </header>
  );
}

function SnapshotPanel({ task }) {
  return (
    <Section title="Snapshot" subtitle="The frozen evidence package you'll rule on. Mini-Trial scope.">
      <div style={{
        background: 'var(--gray-50)', border: '1px solid var(--gray-200)', borderRadius: 8,
        padding: 16, display: 'flex', flexDirection: 'column', gap: 12,
      }}>
        <div style={{ display: 'flex', gap: 16 }}>
          <Field label="Captured">{RD.fmt(task.snapshot.capturedAt)} · {RD.relative(task.snapshot.capturedAt)}</Field>
          <Field label="Submitted by">{task.snapshot.submittedBy}</Field>
        </div>
        <Field label="Narrative">
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, color: 'var(--gray-700)' }}>{task.snapshot.narrative}</p>
        </Field>
      </div>
    </Section>
  );
}

function EvidencePanel({ task }) {
  return (
    <Section title="Evidence" subtitle={`${task.snapshot.attachments.length} attachments included in the snapshot`}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {task.snapshot.attachments.map((a, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '10px 14px', border: '1px solid var(--gray-200)', borderRadius: 8, background: '#fff',
          }}>
            <span style={{
              width: 32, height: 32, borderRadius: 6, background: 'var(--blue-100)', color: 'var(--blue-700)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              {a.type === 'archive' ? G.zip : G.paper}
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0, gap: 2 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--gray-800)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.name}</span>
              <span style={{ fontSize: 11, color: 'var(--gray-500)' }}>{a.type.toUpperCase()} · {a.size}</span>
            </div>
            <button style={{
              width: 32, height: 32, border: 'none', background: 'transparent', borderRadius: 6,
              color: 'var(--gray-600)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}>{G.download}</button>
          </div>
        ))}
      </div>
    </Section>
  );
}

function SamplingPanel({ task }) {
  if (task.path.id === 'INDIVIDUAL') {
    const loc = RD.LOCATIONS.find(l => l.id === task.locationIds[0]);
    return (
      <Section title="Scope" subtitle="Per-location: this single site is the entire scope.">
        <SiteRow site={loc} sampled />
      </Section>
    );
  }
  if (task.path.id === 'SHAREABLE') {
    const sites = task.locationIds.slice(0, 6).map(id => RD.LOCATIONS.find(l => l.id === id) || { id, name: id, city: '—' });
    return (
      <Section title="Scope" subtitle={`Shareable: one ruling will apply to all ${task.portfolioSize} locations.`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {sites.map(s => <SiteRow key={s.id} site={s} sampled />)}
          {task.portfolioSize > 6 && (
            <div style={{ padding: '8px 12px', fontSize: 12, color: 'var(--gray-500)' }}>
              + {task.portfolioSize - 6} more locations covered by this snapshot.
            </div>
          )}
        </div>
      </Section>
    );
  }
  // AUDITED
  const sampled = (task.sampledLocationIds || []).map(id => RD.LOCATIONS.find(l => l.id === id) || { id, name: id, city: '—' });
  return (
    <Section title="Audit sample"
      subtitle={`Audited: ⌈√${task.portfolioSize}⌉ = ${RD.sampleSize(task.portfolioSize)} locations sampled. Ruling extends to the full portfolio.`}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {sampled.map(s => <SiteRow key={s.id} site={s} sampled />)}
        <div style={{
          padding: '8px 12px', fontSize: 12, color: 'var(--gray-500)',
          background: 'var(--blue-50)', border: '1px dashed var(--blue-200)', borderRadius: 6, marginTop: 4,
        }}>
          {task.portfolioSize - sampled.length} unsampled locations · ruling extends to all
        </div>
      </div>
    </Section>
  );
}

function SiteRow({ site, sampled }) {
  if (!site) return null;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '8px 12px', border: '1px solid var(--gray-200)', borderRadius: 6, background: '#fff',
    }}>
      <span style={{
        width: 26, height: 26, borderRadius: 4, background: 'var(--cyan-50)', color: 'var(--cyan-800)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>{React.cloneElement(G.building, { size: 14 })}</span>
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--gray-800)' }}>{site.name}</span>
        <span style={{ fontSize: 11, color: 'var(--gray-500)' }}>{site.city}</span>
      </div>
      {sampled && (
        <span style={{
          fontSize: 11, fontWeight: 600, color: 'var(--emerald-700)',
          display: 'inline-flex', alignItems: 'center', gap: 4,
        }}>
          {React.cloneElement(G.check, { size: 12 })} In sample
        </span>
      )}
    </div>
  );
}

function NotesPanel({ task }) {
  if (!task.notes || task.notes.length === 0) {
    return (
      <Section title="Reviewer notes" subtitle="Internal-only. Not visible to the customer until you rule.">
        <div style={{
          padding: 24, textAlign: 'center', border: '1px dashed var(--gray-200)', borderRadius: 8,
          color: 'var(--gray-500)', fontSize: 13,
        }}>No notes yet — add one before issuing your ruling.</div>
      </Section>
    );
  }
  return (
    <Section title="Reviewer notes" subtitle="Internal-only. Not visible to the customer until you rule.">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {task.notes.map((n, i) => (
          <div key={i} style={{
            padding: 12, background: 'var(--cyan-50)', border: '1px solid var(--cyan-100)', borderRadius: 8,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <strong style={{ fontSize: 12, color: 'var(--cyan-800)' }}>Maya Reyes</strong>
              <span style={{ fontSize: 11, color: 'var(--gray-500)' }}>{RD.relative(n.at)}</span>
            </div>
            <div style={{ fontSize: 13, color: 'var(--gray-700)', lineHeight: 1.5 }}>{n.body}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Section({ title, subtitle, children }) {
  return (
    <section style={{ padding: '20px 24px', borderBottom: '1px solid var(--gray-100)' }}>
      <div style={{ marginBottom: 12 }}>
        <h3 style={{ margin: 0, fontSize: 13, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--cyan-800)' }}>{title}</h3>
        {subtitle && <div style={{ fontSize: 12, color: 'var(--gray-500)', marginTop: 4 }}>{subtitle}</div>}
      </div>
      {children}
    </section>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, minWidth: 0 }}>
      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--gray-500)' }}>{label}</span>
      <span style={{ fontSize: 13, color: 'var(--gray-800)' }}>{children}</span>
    </div>
  );
}

// ============================================================================
// Ruling dock — sticky bottom action bar
// ============================================================================
function RulingDock({ task, onRule }) {
  const [open, setOpen] = useState(false);
  const ruled = task.status.id === 'COMPLETED' || task.status.id === 'FAILED';

  if (ruled) {
    return (
      <div style={{ borderTop: '1px solid var(--gray-200)', padding: '14px 24px', background: 'var(--gray-50)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            width: 32, height: 32, borderRadius: 9999,
            background: task.status.id === 'COMPLETED' ? 'var(--emerald-100)' : 'var(--coral-100)',
            color: task.status.id === 'COMPLETED' ? 'var(--emerald-700)' : 'var(--coral-700)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}>{task.status.id === 'COMPLETED' ? G.check : G.alert}</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-800)' }}>
              {task.status.id === 'COMPLETED' ? 'Achieved' : 'Failed'} · ruled {RD.relative(task.ruling.issuedAt)}
            </div>
            <div style={{ fontSize: 12, color: 'var(--gray-600)' }}>{task.ruling.rationale}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ borderTop: '1px solid var(--gray-200)', background: '#fff' }}>
      {open && (
        <div style={{ padding: '14px 24px 0' }}>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: 6 }}>
            Ruling rationale — visible to customer
          </label>
          <textarea
            placeholder="Summarize what was verified and any caveats..."
            rows={3}
            style={{
              width: '100%', boxSizing: 'border-box', padding: '10px 12px',
              border: '1px solid var(--gray-200)', borderRadius: 6, fontFamily: 'var(--font-body)', fontSize: 13,
              resize: 'vertical', outline: 'none', color: 'var(--gray-800)',
            }}
            defaultValue=""
          />
        </div>
      )}
      <div style={{ padding: '14px 24px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button className="ow-btn ow-btn-outline ow-btn--sm" onClick={() => setOpen(o => !o)} style={{ height: 36 }}>
          {open ? 'Hide rationale' : 'Draft rationale'}
        </button>
        <button className="ow-btn ow-btn-outline" style={{ height: 40 }}>
          Return to customer (MRC)
        </button>
        <div style={{ flex: 1 }} />
        <button className="ow-btn ow-btn-solid" style={{
          height: 40, background: 'var(--coral-700)', color: '#fff',
        }} onMouseDown={(e) => e.currentTarget.style.background = 'var(--coral-800)'}
           onMouseUp={(e) => e.currentTarget.style.background = 'var(--coral-700)'}
           onMouseLeave={(e) => e.currentTarget.style.background = 'var(--coral-700)'}
           onClick={() => onRule(task.id, 'FAILED')}>
          Mark failed
        </button>
        <button className="ow-btn ow-btn-primary" style={{ height: 40, padding: '0 22px 1px', fontSize: 14 }} onClick={() => onRule(task.id, 'ACHIEVED')}>
          {React.cloneElement(G.check, { size: 16 })} Issue ruling · Achieved
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// Dashboard root
// ============================================================================
function Dashboard({ tasks: tasksProp, setTasks: setTasksProp }) {
  const me = RD.currentUser.id;
  const [viewId, setViewId] = useState('all');
  const [sortKey] = useState('sla');
  const [filters, setFilters] = useState({ concept: 'all', path: 'all', portfolio: 'all', status: 'all' });
  const [selected, setSelected] = useState(new Set());
  const [openTaskId, setOpenTaskId] = useState(null);
  // Use parent-owned tasks state if provided (router-managed), otherwise local.
  const [localTasks, setLocalTasks] = useState(RD.TASKS);
  const tasks = tasksProp || localTasks;
  const setTasks = setTasksProp || setLocalTasks;

  const view = RD.getView(viewId);
  const filtered = useMemo(() => {
    let list = tasks.filter(t => view.filter(t, me));
    // SLA-first sort: overdue → soon → ok; within each by dueAt
    const slaRank = (k) => ({ overdue: 0, soon: 1, ok: 2 }[k]);
    list = [...list].sort((a, b) => {
      const ra = slaRank(a.sla.kind), rb = slaRank(b.sla.kind);
      if (ra !== rb) return ra - rb;
      return a.dueAt.getTime() - b.dueAt.getTime();
    });
    return list;
  }, [tasks, viewId, view, me]);

  const rollup = useMemo(() => RD.rollup(tasks, me), [tasks, me]);
  const openTask = useMemo(() => tasks.find(t => t.id === openTaskId), [tasks, openTaskId]);

  const onRule = (id, decision) => {
    setTasks(prev => prev.map(t => t.id === id ? {
      ...t,
      status: decision === 'ACHIEVED' ? RD.STATUSES.COMPLETED : RD.STATUSES.FAILED,
      ruling: { decision, rationale: 'Ruling issued from reviewer dashboard.', issuedAt: new Date() },
    } : t));
    setOpenTaskId(null);
  };

  return (
    <>
      <DashboardHeader user={RD.currentUser} />
      <MetricsRow rollup={rollup} tasks={tasks} me={me} />
      <CompositionStrip tasks={tasks} me={me} />

      <div style={{
        background: '#fff', borderRadius: 12, border: '1px solid var(--gray-200)', padding: '0 20px',
      }}>
        <div style={{ paddingTop: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 4 }}>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 400, color: 'var(--gray-800)' }}>Your queue</h2>
            <span style={{ fontSize: 12, color: 'var(--gray-500)' }}>Sorted by SLA — most urgent first.</span>
          </div>
        </div>
        <ViewTabs views={RD.VIEWS} activeId={viewId} onChange={setViewId} tasks={tasks} me={me} />
        <QueueToolbar
          filters={filters} onFilter={setFilters}
          sortKey={sortKey} onSort={() => {}}
          selectedCount={selected.size}
          totalCount={filtered.length}
        />
        <div style={{ margin: '0 -20px' }}>
          <QueueTable
            tasks={filtered}
            selected={selected}
            onSelect={setSelected}
            onOpen={setOpenTaskId}
            openTaskId={openTaskId}
          />
        </div>
        <div style={{ height: 16 }} />
      </div>

      <TaskDrawer task={openTask} onClose={() => setOpenTaskId(null)} onRule={onRule} />
    </>
  );
}

// Export Dashboard to global scope so reviewer-app.jsx can mount it.
Object.assign(window, { Dashboard });
