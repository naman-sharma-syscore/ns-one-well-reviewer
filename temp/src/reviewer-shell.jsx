/* ===========================================================================
   OneWELL Reviewer App — Global Shell
   <AppFrame> = TopBar + SideNav + main content slot
   =========================================================================== */
const { useState, useMemo, useEffect, useRef } = React;

// ---------- SVG glyph helper ----------
const Glyph = ({ children, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);
const G = {
  inbox:     <Glyph><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></Glyph>,
  flag:      <Glyph><path d="M4 22V4"/><path d="M4 4h13l-2 4 2 4H4"/></Glyph>,
  loop:      <Glyph><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></Glyph>,
  history:   <Glyph><path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/><polyline points="12 7 12 12 16 14"/></Glyph>,
  search:    <Glyph><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></Glyph>,
  bell:      <Glyph><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></Glyph>,
  portfolio: <Glyph><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></Glyph>,
  standards: <Glyph><path d="M4 4h12a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4z"/><path d="M4 4v12a4 4 0 0 0 4 4"/><path d="M9 9h7M9 13h7"/></Glyph>,
  team:      <Glyph><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></Glyph>,
  settings:  <Glyph><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 10v6M4.22 4.22l4.24 4.24m7.07 7.07 4.24 4.24M1 12h6m10 0h6M4.22 19.78l4.24-4.24m7.07-7.07 4.24-4.24"/></Glyph>,
  chevDown:  <Glyph><polyline points="6 9 12 15 18 9"/></Glyph>,
  chevRight: <Glyph><polyline points="9 18 15 12 9 6"/></Glyph>,
  filter:    <Glyph><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></Glyph>,
  sort:      <Glyph><path d="M3 6h13M3 12h9M3 18h5"/><path d="M17 4v16m0 0-3-3m3 3 3-3"/></Glyph>,
  more:      <Glyph><circle cx="5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="19" cy="12" r="1.4"/></Glyph>,
  close:     <Glyph><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></Glyph>,
  check:     <Glyph><polyline points="20 6 9 17 4 12"/></Glyph>,
  alert:     <Glyph><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></Glyph>,
  clock:     <Glyph><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></Glyph>,
  paper:     <Glyph><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></Glyph>,
  zip:       <Glyph><path d="M21 8v13H3V8M1 3h22v5H1zM10 12h4"/></Glyph>,
  download:  <Glyph><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></Glyph>,
  send:      <Glyph><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></Glyph>,
  building:  <Glyph><rect x="4" y="2" width="16" height="20" rx="1"/><path d="M9 22V12h6v10M9 6h.01M13 6h.01M9 10h.01M13 10h.01"/></Glyph>,
  map:       <Glyph><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></Glyph>,
  shareable: <Glyph><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></Glyph>,
  sample:    <Glyph><path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"/><circle cx="6.5" cy="6.5" r="1" fill="currentColor" stroke="none"/><circle cx="17.5" cy="17.5" r="1" fill="currentColor" stroke="none"/></Glyph>,
  perloc:    <Glyph><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></Glyph>,
  arrowUp:   <Glyph><polyline points="18 15 12 9 6 15"/></Glyph>,
  arrowDown: <Glyph><polyline points="6 9 12 15 18 9"/></Glyph>,
};

// ============================================================================
// TopBar
// ============================================================================
function TopBar({ user, query, onQuery, onAction }) {
  return (
    <header style={shellStyles.topbar}>
      <div style={shellStyles.crumbs}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--gray-500)' }}>Reviewer workspace</span>
        <span style={{ color: 'var(--gray-300)' }}>·</span>
        <span style={{ fontSize: 13, color: 'var(--gray-700)', fontWeight: 500 }}>Q2 2026 cycle</span>
      </div>

      <div style={shellStyles.searchWrap}>
        <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-500)', pointerEvents: 'none' }}>{G.search}</span>
        <input
          type="text"
          placeholder="Search tasks, accounts, features, locations…"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          style={shellStyles.searchInput}
        />
        <span style={shellStyles.searchKbd}>
          <span style={shellStyles.kbd}>⌘</span><span style={shellStyles.kbd}>K</span>
        </span>
      </div>

      <div style={shellStyles.topbarRight}>
        <button className="ow-btn ow-btn-outline ow-btn--sm" style={{ height: 32, padding: '0 12px 1px' }} onClick={() => onAction('export')}>
          Export queue
        </button>
        <button style={shellStyles.iconBtn} title="Notifications" aria-label="Notifications">
          {G.bell}
          <span style={shellStyles.notifDot}>3</span>
        </button>
        <div style={shellStyles.profile} title={`${user.name} · ${user.title}`}>
          <span style={shellStyles.avatar}>{user.initials}</span>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-800)' }}>{user.name}</span>
            <span style={{ fontSize: 11, color: 'var(--gray-500)' }}>Sr. Reviewer · A·W·T</span>
          </div>
          <span style={{ color: 'var(--gray-400)' }}>{G.chevDown}</span>
        </div>
      </div>
    </header>
  );
}

// ============================================================================
// SideNav
// ============================================================================
function SideNav({ activeRoute, onNavigate, rollup, taskCounts }) {
  const primary = [
    { id: 'queue',      label: 'Review queue', icon: G.inbox,   badge: rollup.assigned },
    { id: 'sla',        label: 'SLA watch',    icon: G.flag,    badge: rollup.sla, warn: true },
    { id: 'mrc',        label: 'MRC loop',     icon: G.loop,    badge: rollup.awaiting },
    { id: 'rulings',    label: 'My rulings',   icon: G.history, badge: null },
  ];
  const browse = [
    { id: 'portfolios', label: 'Portfolios',          icon: G.portfolio },
    { id: 'standards',  label: 'WELL v2 catalogue',   icon: G.standards },
    { id: 'team',       label: 'Reviewer team',       icon: G.team },
  ];
  return (
    <aside style={shellStyles.side}>
      <div style={shellStyles.sideBrand}>
        <img src="assets/icons/StandardLogo.svg" alt="WELL Standard" style={{ height: 28, display: 'block' }} />
        <div style={shellStyles.appTag}>Reviewer</div>
      </div>

      <div style={shellStyles.cohortChip}>
        <span style={{ fontSize: 11, color: 'var(--gray-500)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Your cohort</span>
        <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
          <ConceptPill code="AIR" />
          <ConceptPill code="WATER" />
          <ConceptPill code="THERMAL" />
        </div>
      </div>

      <div style={shellStyles.sectionLabel}>Workspace</div>
      <nav style={shellStyles.navList}>
        {primary.map(it => (
          <NavItem key={it.id} item={it} active={activeRoute === it.id} onClick={() => onNavigate(it.id)} />
        ))}
      </nav>

      <div style={{ ...shellStyles.sectionLabel, marginTop: 20 }}>Browse</div>
      <nav style={shellStyles.navList}>
        {browse.map(it => (
          <NavItem key={it.id} item={it} active={activeRoute === it.id} onClick={() => onNavigate(it.id)} />
        ))}
      </nav>

      <div style={{ flex: 1 }} />

      <div style={shellStyles.sideFooter}>
        <button style={shellStyles.footerBtn} onClick={() => onNavigate('settings')}>
          <span style={{ width: 18, display: 'inline-flex' }}>{G.settings}</span>
          <span>Settings & preferences</span>
        </button>
      </div>
    </aside>
  );
}

function NavItem({ item, active, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...shellStyles.navBtn,
        background: active ? 'var(--cyan-100)' : (hover ? 'rgba(255,255,255,0.55)' : 'transparent'),
        color: active ? 'var(--cyan-800)' : 'var(--gray-700)',
        fontWeight: active ? 600 : 500,
        borderLeft: active ? '2px solid var(--cyan-700)' : '2px solid transparent',
        paddingLeft: active ? 10 : 12,
      }}
    >
      <span style={{ width: 18, display: 'inline-flex', alignItems: 'center' }}>{item.icon}</span>
      <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>
      {item.badge != null && item.badge > 0 && (
        <span style={{
          minWidth: 22, height: 18, padding: '0 6px 1px', borderRadius: 9999, fontSize: 11, fontWeight: 600,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1,
          background: item.warn ? 'var(--coral-100)' : 'var(--gray-100)',
          color:      item.warn ? 'var(--coral-700)' : 'var(--gray-700)',
        }}>{item.badge}</span>
      )}
    </button>
  );
}

// ============================================================================
// ConceptPill — color-coded concept chip per the design system
// ============================================================================
function ConceptPill({ code, label, dense = false }) {
  const c = ReviewerData.CONCEPTS[code];
  if (!c) return null;
  return (
    <span className="ow-concept-tag" style={{
      background: c.token,
      color: c.text,
      height: dense ? 20 : 24,
      fontSize: dense ? 10 : 12,
      padding: dense ? '0 8px 1px' : '0 12px 1px',
    }}>{label || c.label}</span>
  );
}

// ============================================================================
// StatusPill — drives all state colors from STATUSES table
// ============================================================================
function StatusPill({ id, dense = false }) {
  const s = ReviewerData.STATUSES[id];
  if (!s) return null;
  return (
    <span className="ow-status" style={{
      background: s.bg,
      color: s.fg,
      height: dense ? 20 : 24,
      fontSize: dense ? 10 : 12,
      padding: dense ? '0 8px 1px' : '0 10px 1px',
    }}>{s.label}</span>
  );
}

// ============================================================================
// SLAChip — SLA bucket as a compact metadata chip
// ============================================================================
function SLAChip({ sla, dense = false }) {
  if (sla.kind === 'ok') {
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: dense ? 11 : 12, color: 'var(--gray-500)' }}>
        <span style={{ width: 6, height: 6, borderRadius: 9999, background: 'var(--gray-300)' }} />
        On track · {Math.round(sla.hours / 24)}d
      </span>
    );
  }
  const palette = sla.kind === 'overdue'
    ? { dot: 'var(--coral-700)', text: 'var(--coral-700)', label: `${sla.hours}h overdue` }
    : { dot: 'var(--plum-700)',  text: 'var(--plum-700)',  label: `Due in ${sla.hours}h` };
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: dense ? 11 : 12, color: palette.text, fontWeight: 600 }}>
      <span style={{ width: 6, height: 6, borderRadius: 9999, background: palette.dot }} />
      {palette.label}
    </span>
  );
}

// ============================================================================
// PathChip — Shareable / Audited / Per-Location with concept icon
// ============================================================================
function PathChip({ pathId }) {
  const icon = { SHAREABLE: G.shareable, AUDITED: G.sample, INDIVIDUAL: G.perloc }[pathId];
  const label = ReviewerData.PATHS[pathId].label;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      height: 24, padding: '0 10px 1px',
      borderRadius: 4,
      background: 'var(--blue-100)',
      color: 'var(--blue-700)',
      fontSize: 12, fontWeight: 600, lineHeight: 1,
    }}>
      <span style={{ width: 14, height: 14, display: 'inline-flex', alignItems: 'center' }}>
        {React.cloneElement(icon, { size: 13 })}
      </span>
      {label}
    </span>
  );
}

// ============================================================================
// AppFrame
// ============================================================================
function AppFrame({ children, activeRoute, onNavigate, rollup, user, query, onQuery, onAction }) {
  return (
    <div style={shellStyles.appFrame}>
      <SideNav activeRoute={activeRoute} onNavigate={onNavigate} rollup={rollup} />
      <div style={shellStyles.appColumn}>
        <TopBar user={user} query={query} onQuery={onQuery} onAction={onAction} />
        <main style={shellStyles.appMain}>{children}</main>
      </div>
    </div>
  );
}

// ============================================================================
// Shell styles
// ============================================================================
const shellStyles = {
  appFrame: {
    display: 'flex',
    minHeight: '100vh',
    background: 'var(--gray-50)',
    fontFamily: 'var(--font-body)',
    color: 'var(--gray-800)',
  },
  side: {
    width: 252,
    flexShrink: 0,
    background: 'var(--cyan-50)',
    borderRight: '1px solid var(--border-panel)',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 14px 16px',
    position: 'sticky',
    top: 0,
    height: '100vh',
    boxSizing: 'border-box',
  },
  sideBrand: { display: 'flex', alignItems: 'center', gap: 10, padding: '0 10px 16px' },
  appTag: { fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--cyan-800)', background: 'var(--cyan-100)', padding: '3px 7px 2px', borderRadius: 3, lineHeight: 1 },
  cohortChip: {
    margin: '4px 6px 18px',
    padding: '12px 12px 14px',
    background: 'rgba(255,255,255,0.6)',
    border: '1px solid var(--blue-200)',
    borderRadius: 8,
  },
  sectionLabel: {
    fontSize: 11, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase',
    color: 'var(--cyan-800)', padding: '0 12px 8px',
  },
  navList: { display: 'flex', flexDirection: 'column', gap: 2 },
  navBtn: {
    height: 36, display: 'flex', alignItems: 'center', gap: 10, padding: '0 12px',
    border: 'none', background: 'transparent', fontFamily: 'var(--font-body)', fontSize: 13,
    cursor: 'pointer', borderRadius: 6, textAlign: 'left', lineHeight: 1, transition: 'background .12s',
  },
  sideFooter: { borderTop: '1px solid var(--blue-200)', paddingTop: 12, marginTop: 12 },
  footerBtn: {
    width: '100%', height: 36, display: 'flex', alignItems: 'center', gap: 10, padding: '0 12px',
    border: 'none', background: 'transparent', fontFamily: 'var(--font-body)', fontSize: 13,
    color: 'var(--gray-600)', cursor: 'pointer', borderRadius: 6, textAlign: 'left',
  },

  appColumn: { flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 },
  appMain:   { flex: 1, padding: '24px 32px 40px', minWidth: 0 },

  topbar: {
    height: 64, background: '#fff', borderBottom: '1px solid var(--gray-200)',
    display: 'flex', alignItems: 'center', padding: '0 32px', gap: 24, position: 'sticky', top: 0, zIndex: 5,
  },
  crumbs: { display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 },
  searchWrap: { position: 'relative', flex: 1, maxWidth: 520, marginLeft: 16 },
  searchInput: {
    width: '100%', height: 36, padding: '0 96px 1px 38px', borderRadius: 6,
    border: '1px solid var(--gray-200)', background: 'var(--gray-50)',
    fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--gray-800)', outline: 'none',
    boxSizing: 'border-box',
  },
  searchKbd: { position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', display: 'flex', gap: 3, pointerEvents: 'none' },
  kbd: {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    height: 18, minWidth: 18, padding: '0 5px 1px',
    background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 3,
    fontSize: 10, fontWeight: 600, color: 'var(--gray-500)', lineHeight: 1,
  },
  topbarRight: { display: 'flex', alignItems: 'center', gap: 10, marginLeft: 'auto' },
  iconBtn: {
    width: 36, height: 36, borderRadius: 6, border: '1px solid var(--gray-200)',
    background: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    color: 'var(--gray-700)', cursor: 'pointer', position: 'relative',
  },
  notifDot: {
    position: 'absolute', top: -4, right: -4,
    minWidth: 18, height: 18, padding: '0 5px 1px',
    background: 'var(--coral-700)', color: '#fff', borderRadius: 9999,
    fontSize: 10, fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1,
    boxShadow: '0 0 0 2px #fff',
  },
  profile: {
    display: 'flex', alignItems: 'center', gap: 10, padding: '4px 10px 4px 4px',
    border: '1px solid var(--gray-200)', borderRadius: 9999, background: '#fff', cursor: 'pointer',
  },
  avatar: {
    width: 30, height: 30, borderRadius: 9999, background: 'var(--cyan-800)', color: '#fff',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, letterSpacing: '0.03em',
  },
};

// Export to global scope for other Babel scripts
Object.assign(window, {
  AppFrame, ConceptPill, StatusPill, SLAChip, PathChip, G, Glyph,
});
