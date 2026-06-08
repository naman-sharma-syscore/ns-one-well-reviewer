/* ===========================================================================
   OneWELL Platform 3.0 — Reviewer App
   Foundational Mock Data Engine
   ---------------------------------------------------------------------------
   Model sequence: Target/Strategy → Task → ReviewSnapshot → Notes/Rulings →
                   Achievements

   Three verification paths:
     • Shareable      — one piece of evidence covers an entire portfolio
     • Audited        — ⌈√N⌉ sample of locations stands in for the whole set
     • Per-Location   — every site uploads its own evidence

   Every task is a "Mini-Trial": a frozen ReviewSnapshot is what gets ruled on.
   =========================================================================== */
(function (global) {
  'use strict';

  // ---------- WELL v2 Concept Catalogue (matches customer app) ----------
  const CONCEPTS = {
    AIR:         { code: 'A', label: 'Air',         token: 'var(--concept-air)',         text: '#0A4F61' },
    WATER:       { code: 'W', label: 'Water',       token: 'var(--concept-water)',       text: '#0A4F61' },
    NOURISHMENT: { code: 'N', label: 'Nourishment', token: 'var(--concept-nourishment)', text: '#FFFFFF' },
    LIGHT:       { code: 'L', label: 'Light',       token: 'var(--concept-light)',       text: '#0A4F41' },
    MOVEMENT:    { code: 'V', label: 'Movement',    token: 'var(--concept-movement)',    text: '#FFFFFF' },
    THERMAL:     { code: 'T', label: 'Thermal Comfort', token: 'var(--concept-thermal)', text: '#0A4F41' },
    SOUND:       { code: 'S', label: 'Sound',       token: 'var(--concept-sound)',       text: '#FFFFFF' },
    MATERIALS:   { code: 'X', label: 'Materials',   token: 'var(--concept-materials)',   text: '#FFFFFF' },
    MIND:        { code: 'M', label: 'Mind',        token: 'var(--concept-mind)',        text: '#FFFFFF' },
    COMMUNITY:   { code: 'C', label: 'Community',   token: 'var(--concept-community)',   text: '#FFFFFF' },
  };

  // ---------- WELL v2 Feature Catalogue (real codes only) ----------
  const FEATURES = {
    A01: { concept: 'AIR',     code: 'A01', title: 'Air quality',                  precondition: true  },
    A02: { concept: 'AIR',     code: 'A02', title: 'Smoke-free environment',       precondition: true  },
    A05: { concept: 'AIR',     code: 'A05', title: 'Enhanced ventilation',         precondition: false },
    A07: { concept: 'AIR',     code: 'A07', title: 'Operable windows',             precondition: false },
    W01: { concept: 'WATER',   code: 'W01', title: 'Water quality indicators',     precondition: true  },
    W02: { concept: 'WATER',   code: 'W02', title: 'Drinking water quality',       precondition: true  },
    W03: { concept: 'WATER',   code: 'W03', title: 'Basic water management',       precondition: true  },
    W04: { concept: 'WATER',   code: 'W04', title: 'Enhanced water quality',       precondition: false },
    T01: { concept: 'THERMAL', code: 'T01', title: 'Thermal performance',          precondition: true  },
    T03: { concept: 'THERMAL', code: 'T03', title: 'Thermal zoning',               precondition: false },
    T05: { concept: 'THERMAL', code: 'T05', title: 'Humidity control',             precondition: false },
    L03: { concept: 'LIGHT',   code: 'L03', title: 'Circadian lighting design',    precondition: false },
    N01: { concept: 'NOURISHMENT', code: 'N01', title: 'Fruits and vegetables',    precondition: true  },
    V02: { concept: 'MOVEMENT', code: 'V02', title: 'Ergonomic workstations',      precondition: false },
    S02: { concept: 'SOUND',    code: 'S02', title: 'Maximum noise levels',        precondition: false },
    X06: { concept: 'MATERIALS',code: 'X06', title: 'VOC restrictions',            precondition: false },
    M07: { concept: 'MIND',     code: 'M07', title: 'Restorative spaces',          precondition: false },
    C04: { concept: 'COMMUNITY',code: 'C04', title: 'Accessibility & universal design', precondition: false },
  };

  // ---------- WELL v2 Verification Checklists ----------
  // Per-feature, the exact criteria a reviewer must inspect to issue a ruling.
  // Each item ties to a tier (T1 / T2). Marked verified during the audit.
  const CHECKLISTS = {
    A01: [
      { id: 1, tier: 'T1', text: 'PM2.5 ≤ 15 µg/m³ over the measurement period.' },
      { id: 2, tier: 'T1', text: 'PM10 ≤ 50 µg/m³ over the measurement period.' },
      { id: 3, tier: 'T1', text: 'CO ≤ 9 ppm averaged over 8 hours.' },
      { id: 4, tier: 'T1', text: 'Ozone ≤ 51 ppb averaged over 8 hours.' },
      { id: 5, tier: 'T2', text: 'TVOC measurement ≤ 500 µg/m³ at all locations.' },
      { id: 6, tier: 'T2', text: 'Sampling methodology documented; lab is ISO 17025 accredited.' },
    ],
    A02: [
      { id: 1, tier: 'T1', text: 'Written smoke-free policy adopted at the corporate level.' },
      { id: 2, tier: 'T1', text: 'Policy covers all forms of smoke including e-cigarettes.' },
      { id: 3, tier: 'T1', text: 'Signage installed at all building entries and interior zones.' },
      { id: 4, tier: 'T2', text: 'Designated smoking areas ≥ 7.5 m (25 ft) from operable openings.' },
      { id: 5, tier: 'T2', text: 'Policy includes enforcement clause + staff training record.' },
    ],
    W01: [
      { id: 1, tier: 'T1', text: 'Lead ≤ 0.005 mg/L at point of use.' },
      { id: 2, tier: 'T1', text: 'Total coliform absent from all sampled outlets.' },
      { id: 3, tier: 'T1', text: 'Turbidity ≤ 1.0 NTU.' },
      { id: 4, tier: 'T2', text: 'Sampling chain-of-custody intact and dated within 30 days.' },
      { id: 5, tier: 'T2', text: 'Lab credentials current (SGS / Eurofins / equivalent).' },
    ],
    W02: [
      { id: 1, tier: 'T1', text: 'Point-of-use filtration installed at all drinking water outlets.' },
      { id: 2, tier: 'T1', text: 'Filter maintenance log shows replacement within manufacturer interval.' },
      { id: 3, tier: 'T1', text: 'Quarterly water quality samples taken in the last 12 months.' },
      { id: 4, tier: 'T2', text: 'Annual third-party verification report enclosed.' },
      { id: 5, tier: 'T2', text: 'Outlets are clearly marked as potable drinking water.' },
    ],
    W03: [
      { id: 1, tier: 'T1', text: 'Documented water management plan covering distribution and storage.' },
      { id: 2, tier: 'T1', text: 'Leak detection process in place with quarterly inspection cadence.' },
      { id: 3, tier: 'T2', text: 'Roles and responsibilities assigned to a named accountable party.' },
    ],
    T01: [
      { id: 1, tier: 'T1', text: 'Operative temperature within ASHRAE 55 acceptable range at all measured locations.' },
      { id: 2, tier: 'T1', text: '30-day BAS trend export confirms setpoint compliance.' },
      { id: 3, tier: 'T2', text: 'Mechanical drawings signed/stamped by a licensed PE.' },
      { id: 4, tier: 'T2', text: 'Thermal survey sampling plan covers all regularly occupied zones.' },
    ],
    L03: [
      { id: 1, tier: 'T1', text: 'Melanopic equivalent daylight illuminance ≥ 150 EML at workstations from 9am–1pm.' },
      { id: 2, tier: 'T1', text: 'Photometric report covers all sampled floors.' },
      { id: 3, tier: 'T2', text: 'Luminaire schedule lists spectral power distribution for each fixture.' },
    ],
  };
  // Generic fallback for features that don't yet have a curated checklist
  const GENERIC_CHECKLIST = [
    { id: 1, tier: 'T1', text: 'Submitted evidence directly addresses the feature requirement.' },
    { id: 2, tier: 'T1', text: 'Measurement / report dated within the last 12 months.' },
    { id: 3, tier: 'T1', text: 'Methodology aligns with the WELL v2 technical guidance.' },
    { id: 4, tier: 'T2', text: 'Sampling plan covers the declared scope (all sampled locations).' },
    { id: 5, tier: 'T2', text: 'Documentation is reproducible (raw data + methodology).' },
  ];

  // ---------- Reviewers (current session = first entry) ----------
  const REVIEWERS = [
    {
      id: 'rev-001', initials: 'MR', name: 'Maya Reyes',
      title: 'Senior WELL Reviewer · Air & Water',
      email: 'maya.reyes@wellcertified.com',
      cohorts: ['AIR', 'WATER', 'THERMAL'],
      isMe: true,
    },
    {
      id: 'rev-002', initials: 'JT', name: 'Jordan Tan',
      title: 'WELL Reviewer · Materials & Mind',
      email: 'jordan.tan@wellcertified.com',
      cohorts: ['MATERIALS', 'MIND', 'SOUND'],
      isMe: false,
    },
    {
      id: 'rev-003', initials: 'AB', name: 'Adaeze Balogun',
      title: 'Lead Reviewer · Performance',
      email: 'adaeze.balogun@wellcertified.com',
      cohorts: ['NOURISHMENT', 'MOVEMENT', 'COMMUNITY'],
      isMe: false,
    },
  ];

  // ---------- Accounts / Portfolios (clients under review) ----------
  const ACCOUNTS = {
    'acct-helix':    { id: 'acct-helix',    name: 'Helix Realty',            org: 'Helix Realty Holdings, LLC',  tier: 'Portfolio', locationCount: 50 },
    'acct-northbay': { id: 'acct-northbay', name: 'Northbay Asset Mgmt',     org: 'Northbay Asset Management',   tier: 'Portfolio', locationCount: 16 },
    'acct-ridge':    { id: 'acct-ridge',    name: 'Ridgeway Hospitality',    org: 'Ridgeway Hotels Group',       tier: 'Portfolio', locationCount: 12 },
    'acct-meridian': { id: 'acct-meridian', name: 'Meridian Logistics',      org: 'Meridian Distribution Co.',   tier: 'Single',    locationCount: 1  },
    'acct-keystone': { id: 'acct-keystone', name: 'Keystone Health Network', org: 'Keystone Health, Inc.',       tier: 'Portfolio', locationCount: 8  },
    'acct-aria':     { id: 'acct-aria',     name: 'Aria Workplaces',         org: 'Aria Workplaces, GmbH',       tier: 'Portfolio', locationCount: 22 },
  };

  // ---------- Locations ----------
  const LOC = (id, account, name, city) => ({ id, accountId: account, name, city });
  const LOCATIONS = [
    // Helix Realty — 50 locations (we hand-name 6 reference, the rest are generated)
    LOC('loc-hx-001', 'acct-helix', 'Helix Tower One',         'Chicago, IL'),
    LOC('loc-hx-002', 'acct-helix', 'Helix Tower Two',         'Chicago, IL'),
    LOC('loc-hx-003', 'acct-helix', 'Helix Riverside',         'Cleveland, OH'),
    LOC('loc-hx-004', 'acct-helix', 'Helix Midtown',           'New York, NY'),
    LOC('loc-hx-005', 'acct-helix', 'Helix Civic Center',      'San Francisco, CA'),
    LOC('loc-hx-006', 'acct-helix', 'Helix Pearl District',    'Portland, OR'),
    // Northbay — 16 locations
    LOC('loc-nb-001', 'acct-northbay', 'Northbay Pier 9',      'Singapore'),
    LOC('loc-nb-002', 'acct-northbay', 'Northbay Riverside',   'Singapore'),
    LOC('loc-nb-003', 'acct-northbay', 'Northbay Marina',      'Hong Kong'),
    LOC('loc-nb-004', 'acct-northbay', 'Northbay Central',     'Tokyo'),
    LOC('loc-nb-005', 'acct-northbay', 'Northbay Harbor',      'Seoul'),
    // Ridgeway hotels
    LOC('loc-rg-001', 'acct-ridge', 'Ridgeway Downtown',       'Austin, TX'),
    LOC('loc-rg-002', 'acct-ridge', 'Ridgeway Convention',     'Denver, CO'),
    LOC('loc-rg-003', 'acct-ridge', 'Ridgeway Lakeshore',      'Minneapolis, MN'),
    // Meridian — single warehouse
    LOC('loc-md-001', 'acct-meridian', 'Meridian DC-04',       'Memphis, TN'),
    // Keystone clinics
    LOC('loc-ks-001', 'acct-keystone', 'Keystone Brookline',   'Boston, MA'),
    LOC('loc-ks-002', 'acct-keystone', 'Keystone Cambridge',   'Cambridge, MA'),
    LOC('loc-ks-003', 'acct-keystone', 'Keystone Somerville',  'Somerville, MA'),
    // Aria
    LOC('loc-ar-001', 'acct-aria', 'Aria Mitte',               'Berlin'),
    LOC('loc-ar-002', 'acct-aria', 'Aria Hafen',               'Hamburg'),
    LOC('loc-ar-003', 'acct-aria', 'Aria Altstadt',            'Munich'),
  ];

  // ---------- Sampling Logic ----------
  // ceil( sqrt(N) ) — the audited path covers this many of N locations.
  function sampleSize(n) { return Math.ceil(Math.sqrt(n)); }

  // ---------- Status vocabulary ----------
  // Single source of truth for status pills; matches design system tokens.
  const STATUSES = {
    READY:      { id: 'READY',     label: 'Ready for review',    bg: 'var(--cyan-100)',    fg: 'var(--cyan-800)'   },
    UNDER:      { id: 'UNDER',     label: 'Under review',        bg: 'var(--blue-100)',    fg: 'var(--blue-700)'   },
    ATTENTION:  { id: 'ATTENTION', label: 'Needs attention',     bg: 'var(--plum-100)',    fg: 'var(--plum-700)'   },
    COMPLETED:  { id: 'COMPLETED', label: 'Completed',           bg: 'var(--emerald-100)', fg: 'var(--emerald-700)' },
    FAILED:     { id: 'FAILED',    label: 'Failed',              bg: 'var(--coral-100)',   fg: 'var(--coral-700)'  },
  };

  const PATHS = {
    SHAREABLE:   { id: 'SHAREABLE',   label: 'Shareable',   blurb: 'One artifact covers every location in the portfolio.' },
    AUDITED:     { id: 'AUDITED',     label: 'Audited',     blurb: '⌈√N⌉ locations are sampled; the ruling extends to all.' },
    INDIVIDUAL:  { id: 'INDIVIDUAL',  label: 'Per-location', blurb: 'Each location supplies its own evidence.' },
  };

  // ---------- Realistic uploaded artifacts ----------
  // (kept terse; full attachment list lives in each ReviewSnapshot)
  const F = (name, size, type) => ({ name, size, type });

  // ---------- Time helpers ----------
  // "Now" is anchored so SLA arithmetic is deterministic across reloads.
  const NOW = new Date('2026-05-22T14:30:00Z');
  function daysAgo(d, h = 0) { return new Date(NOW.getTime() - d * 864e5 - h * 36e5); }
  function daysAhead(d, h = 0) { return new Date(NOW.getTime() + d * 864e5 + h * 36e5); }
  function fmt(d) {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  }
  function relative(d) {
    const ms = d.getTime() - NOW.getTime();
    const absH = Math.abs(ms) / 36e5;
    const past = ms < 0;
    if (absH < 1)   return past ? 'Just now' : 'In <1h';
    if (absH < 24)  return past ? `${Math.round(absH)}h ago` : `In ${Math.round(absH)}h`;
    const days = Math.round(absH / 24);
    if (days < 30)  return past ? `${days}d ago` : `In ${days}d`;
    return fmt(d);
  }
  // SLA bucket: ok / soon (≤48h) / overdue (<0h)
  function slaBucket(due) {
    const hrs = (due.getTime() - NOW.getTime()) / 36e5;
    if (hrs < 0)  return { kind: 'overdue', label: 'Overdue', hours: Math.round(-hrs) };
    if (hrs < 48) return { kind: 'soon',    label: 'Due soon', hours: Math.round(hrs) };
    return { kind: 'ok', label: 'On track', hours: Math.round(hrs) };
  }

  // ---------- Tasks ----------
  // Each Task has: id, accountId, featureCode, path, locationIds[], snapshot,
  //                assignedReviewerId, status, submittedAt, dueAt, history[].
  // A ReviewSnapshot is the frozen evidence package the reviewer rules on.
  let _seq = 1000;
  const nextId = () => `task-${++_seq}`;

  function makeTask(o) {
    const feature = FEATURES[o.featureCode];
    const concept = CONCEPTS[feature.concept];
    const account = ACCOUNTS[o.accountId];
    const path = PATHS[o.path];
    const status = STATUSES[o.status];
    const submittedAt = o.submittedAt;
    const dueAt = o.dueAt || daysAhead(5);
    return {
      id: o.id || nextId(),
      accountId: o.accountId,
      account, feature, concept, path, status,
      locationIds: o.locationIds || [],
      sampledLocationIds: o.sampledLocationIds || null,
      portfolioSize: o.portfolioSize || (o.locationIds ? o.locationIds.length : 1),
      assignedReviewerId: o.assignedReviewerId || 'rev-001',
      submittedAt, dueAt,
      sla: slaBucket(dueAt),
      snapshot: o.snapshot,
      ruling: o.ruling || null,
      notes: o.notes || [],
      history: o.history || [],
      mrcCycle: o.mrcCycle || 0, // Most Recent Comment loop counter
      points: o.points || (feature.precondition ? 0 : (1 + (_seq % 3))),
    };
  }

  // ---------- Seeded tasks ----------
  // Designed to cover every status, every path, and every concept color.
  const TASKS = [

    // ============ SHAREABLE PATH ============
    // Helix Realty — Smoke-Free Policy covering all 50 locations
    makeTask({
      id: 'task-1001',
      accountId: 'acct-helix', featureCode: 'A02', path: 'SHAREABLE',
      locationIds: Array.from({length:50}, (_,i) => `loc-hx-${String(i+1).padStart(3,'0')}`),
      portfolioSize: 50,
      status: 'READY',
      submittedAt: daysAgo(1, 4), dueAt: daysAhead(4),
      snapshot: {
        capturedAt: daysAgo(1, 4),
        submittedBy: 'Priya Shankar · Helix ESG Lead',
        attachments: [
          F('Helix_Smoke_Free_Policy_v3.2.pdf',                 '482 KB', 'pdf'),
          F('Signage_Specification_Sheet.pdf',                   '1.1 MB', 'pdf'),
          F('Board_Resolution_2026-04_Smoke_Free.pdf',           '218 KB', 'pdf'),
          F('Installation_Photos_Portfolio.zip',                 '14.2 MB','archive'),
        ],
        narrative: 'Portfolio-wide smoke-free policy ratified Apr 2026. Signage installed at all 50 properties; photo evidence and installer attestation enclosed.',
      },
    }),

    // ============ AUDITED PATH (Northbay — ⌈√16⌉ = 4 sampled) ============
    // 4 sibling tasks, one per sampled location, all covering the same 16-loc portfolio.
    ...['loc-nb-001','loc-nb-002','loc-nb-003','loc-nb-004'].map((loc, i) =>
      makeTask({
        id: `task-2${String(i).padStart(3,'0')}1`,
        accountId: 'acct-northbay', featureCode: 'W01', path: 'AUDITED',
        locationIds: Array.from({length:16}, (_,j) => `loc-nb-${String(j+1).padStart(3,'0')}`),
        sampledLocationIds: ['loc-nb-001','loc-nb-002','loc-nb-003','loc-nb-004'],
        portfolioSize: 16,
        status: ['UNDER','READY','READY','ATTENTION'][i],
        submittedAt: daysAgo(2, i*3),
        dueAt: daysAhead(i === 3 ? -1 : 3 - i),
        assignedReviewerId: 'rev-001',
        mrcCycle: i === 3 ? 1 : 0,
        snapshot: {
          capturedAt: daysAgo(2, i*3),
          submittedBy: 'Wei Lin · Northbay Compliance',
          attachments: [
            F(`Water_Testing_Results_${['Singapore-Pier9','Singapore-Riverside','HongKong-Marina','Tokyo-Central'][i]}.pdf`, '320 KB', 'pdf'),
            F('Lab_Accreditation_SGS_2026.pdf', '188 KB', 'pdf'),
            F('Sampling_Chain_of_Custody.pdf',  '94 KB',  'pdf'),
          ],
          narrative: `Q1 2026 quarterly water sampling — ${i === 3 ? 'flagged for elevated lead at fixture B-12; remediation pending.' : 'all measured parameters within W01 thresholds.'}`,
        },
        notes: i === 3 ? [{ author: 'rev-001', at: daysAgo(0,3), body: 'Lead reading at fixture B-12 is 6 ppb (threshold 5 ppb). Returning for remediation evidence.' }] : [],
      })
    ),

    // ============ PER-LOCATION PATH (Keystone Health — per-clinic water tests) ============
    ...['loc-ks-001','loc-ks-002','loc-ks-003'].map((loc, i) =>
      makeTask({
        id: `task-3${String(i).padStart(3,'0')}1`,
        accountId: 'acct-keystone', featureCode: 'W02', path: 'INDIVIDUAL',
        locationIds: [loc],
        portfolioSize: 1,
        status: ['COMPLETED','UNDER','READY'][i],
        submittedAt: daysAgo(5 - i, 0),
        dueAt: daysAhead(7 - i*2),
        assignedReviewerId: 'rev-001',
        snapshot: {
          capturedAt: daysAgo(5 - i, 0),
          submittedBy: ['Dr. R. Patel','Dr. S. Chen','Dr. M. Okafor'][i] + ' · Facilities',
          attachments: [
            F(`Drinking_Water_Quality_${['Brookline','Cambridge','Somerville'][i]}_Apr2026.pdf`, '276 KB', 'pdf'),
            F('Filter_Maintenance_Log.xlsx', '42 KB', 'sheet'),
          ],
          narrative: `Point-of-use filtration verified for all break rooms and exam suites; quarterly maintenance log attached.`,
        },
        ruling: i === 0 ? { decision: 'ACHIEVED', rationale: 'All thresholds met; filter logs current.', issuedAt: daysAgo(3,0) } : null,
      })
    ),

    // ============ More Audited path — Ridgeway (12 locs → ⌈√12⌉ = 4) ============
    ...['loc-rg-001','loc-rg-002','loc-rg-003'].map((loc, i) => {
      const codes = ['T01','T03','A05']; const fc = codes[i];
      return makeTask({
        id: `task-4${String(i).padStart(3,'0')}1`,
        accountId: 'acct-ridge', featureCode: fc, path: 'AUDITED',
        locationIds: Array.from({length:12}, (_,j) => `loc-rg-${String(j+1).padStart(3,'0')}`),
        sampledLocationIds: ['loc-rg-001','loc-rg-002','loc-rg-003','loc-rg-004'],
        portfolioSize: 12,
        status: ['UNDER','READY','COMPLETED'][i],
        submittedAt: daysAgo(3 - i, 5),
        dueAt: daysAhead(i === 0 ? 1 : (i === 1 ? 4 : -7)),
        snapshot: {
          capturedAt: daysAgo(3 - i, 5),
          submittedBy: 'Camille Roux · Ridgeway Engineering',
          attachments: [
            F(`HVAC_Assessment_${['Austin','Denver','Minneapolis'][i]}_Q1_2026.pdf`, '1.4 MB', 'pdf'),
            F('Mechanical_Drawings_Stamped.pdf', '4.8 MB', 'pdf'),
            F('BAS_Trend_Export_30d.csv',  '612 KB', 'data'),
          ],
          narrative: `Thirty-day BAS trend confirms setpoints within ${fc === 'T01' ? 'T01' : 'spec'} envelope; mechanical drawings stamped by PE.`,
        },
        ruling: i === 2 ? { decision: 'ACHIEVED', rationale: 'Trend data and stamped drawings sufficient.', issuedAt: daysAgo(6, 0) } : null,
      });
    }),

    // ============ Per-location — Meridian single-site logistics center ============
    makeTask({
      id: 'task-5001',
      accountId: 'acct-meridian', featureCode: 'A01', path: 'INDIVIDUAL',
      locationIds: ['loc-md-001'], portfolioSize: 1,
      status: 'READY',
      submittedAt: daysAgo(0, 18),
      dueAt: daysAhead(2),
      snapshot: {
        capturedAt: daysAgo(0, 18),
        submittedBy: 'Daniel Okafor · Meridian Facilities',
        attachments: [
          F('Air_Quality_Test_Memphis_DC04_Apr2026.pdf', '512 KB', 'pdf'),
          F('PM2.5_Continuous_Monitor_Export.csv',       '1.2 MB', 'data'),
          F('Calibration_Certificate_Aeroqual.pdf',      '88 KB',  'pdf'),
        ],
        narrative: 'Two-week continuous PM2.5 and TVOC monitoring at 12 zones; calibration cert from Aeroqual enclosed.',
      },
    }),

    // ============ Aria — multi-task ============
    ...['A05','T05','L03','V02','S02','X06'].map((fc, i) => {
      const stat = ['UNDER','READY','READY','ATTENTION','COMPLETED','FAILED'][i];
      const due  = daysAhead([1, 6, 3, -2, -10, -14][i]);
      const path = ['AUDITED','SHAREABLE','AUDITED','INDIVIDUAL','SHAREABLE','AUDITED'][i];
      const sample = ['loc-ar-001','loc-ar-002','loc-ar-003','loc-ar-004','loc-ar-005'];
      return makeTask({
        id: `task-6${String(i).padStart(3,'0')}1`,
        accountId: 'acct-aria', featureCode: fc, path,
        locationIds: path === 'INDIVIDUAL' ? ['loc-ar-001'] : Array.from({length:22}, (_,j) => `loc-ar-${String(j+1).padStart(3,'0')}`),
        sampledLocationIds: path === 'AUDITED' ? sample : null,
        portfolioSize: path === 'INDIVIDUAL' ? 1 : 22,
        status: stat,
        submittedAt: daysAgo(7 - i, 2),
        dueAt: due,
        mrcCycle: stat === 'ATTENTION' ? 2 : (stat === 'FAILED' ? 3 : 0),
        snapshot: {
          capturedAt: daysAgo(7 - i, 2),
          submittedBy: 'Lena Vogel · Aria Sustainability',
          attachments: [
            F(`${FEATURES[fc].title.replace(/[^A-Za-z0-9]+/g,'_')}_Aria_Q1_2026.pdf`, '640 KB', 'pdf'),
            F('Methodology_Summary.pdf', '120 KB', 'pdf'),
          ],
          narrative: `Aria Q1 evidence package for ${fc}. ${stat === 'FAILED' ? 'Three resubmissions exhausted without sufficient evidence; failure recorded.' : ''}`,
        },
        ruling: stat === 'COMPLETED'
          ? { decision: 'ACHIEVED', rationale: 'Comprehensive evidence; thresholds met across sample.', issuedAt: daysAgo(1,0) }
          : (stat === 'FAILED' ? { decision: 'FAILED', rationale: 'Three cycles exhausted; no compliant evidence provided.', issuedAt: daysAgo(2,0) } : null),
      });
    }),

    // ============ A handful more to push the queue past 25 ============
    makeTask({
      id: 'task-7001', accountId: 'acct-helix', featureCode: 'W03', path: 'SHAREABLE',
      locationIds: Array.from({length:50}, (_,i)=>`loc-hx-${String(i+1).padStart(3,'0')}`),
      portfolioSize: 50, status: 'COMPLETED',
      submittedAt: daysAgo(9, 0), dueAt: daysAgo(2, 0),
      snapshot: { capturedAt: daysAgo(9,0), submittedBy: 'Priya Shankar · Helix ESG Lead',
        attachments:[ F('Helix_Water_Management_Plan_2026.pdf','894 KB','pdf'), F('Leak_Detection_SOP.pdf','142 KB','pdf') ],
        narrative: 'Annual water management plan covering metering, leak detection, and remediation cadence.' },
      ruling: { decision: 'ACHIEVED', rationale: 'Plan meets W03 program requirements.', issuedAt: daysAgo(2,0) },
    }),
    makeTask({
      id: 'task-7002', accountId: 'acct-northbay', featureCode: 'N01', path: 'SHAREABLE',
      locationIds: Array.from({length:16}, (_,j)=>`loc-nb-${String(j+1).padStart(3,'0')}`),
      portfolioSize: 16, status: 'READY',
      submittedAt: daysAgo(0, 6), dueAt: daysAhead(6),
      snapshot: { capturedAt: daysAgo(0,6), submittedBy: 'Wei Lin · Northbay Compliance',
        attachments:[ F('Cafeteria_Menus_Q2_2026.pdf','1.8 MB','pdf'), F('Supplier_Produce_Invoices.zip','3.1 MB','archive') ],
        narrative: 'Menus across all 16 cafés satisfy minimum fruit/veg ratios; supplier invoices substantiate.' },
    }),
    makeTask({
      id: 'task-7003', accountId: 'acct-ridge', featureCode: 'M07', path: 'INDIVIDUAL',
      locationIds: ['loc-rg-001'], portfolioSize: 1, status: 'READY',
      submittedAt: daysAgo(2, 0), dueAt: daysAhead(0, 10),
      snapshot: { capturedAt: daysAgo(2,0), submittedBy: 'Camille Roux · Ridgeway Engineering',
        attachments:[ F('Restorative_Space_Floorplan_Austin.pdf','740 KB','pdf'), F('Acoustic_Treatment_Spec.pdf','220 KB','pdf') ],
        narrative: 'Dedicated 220 sq ft restorative room with acoustic treatment per M07.' },
    }),
    makeTask({
      id: 'task-7004', accountId: 'acct-keystone', featureCode: 'C04', path: 'SHAREABLE',
      locationIds: Array.from({length:8},(_,i)=>`loc-ks-${String(i+1).padStart(3,'0')}`),
      portfolioSize: 8, status: 'ATTENTION',
      submittedAt: daysAgo(4, 0), dueAt: daysAgo(0, 6),
      mrcCycle: 1,
      snapshot: { capturedAt: daysAgo(4,0), submittedBy: 'Facilities · Keystone Health',
        attachments:[ F('Accessibility_Audit_2026_Keystone.pdf','2.4 MB','pdf') ],
        narrative: 'Third-party accessibility audit. Two clinics missing tactile signage; corrective plan requested.' },
      notes: [{ author:'rev-001', at: daysAgo(1,2), body: 'Two locations missing compliant tactile signage. Returning for remediation evidence + photos.' }],
    }),
    makeTask({
      id: 'task-7005', accountId: 'acct-meridian', featureCode: 'X06', path: 'INDIVIDUAL',
      locationIds: ['loc-md-001'], portfolioSize: 1, status: 'UNDER',
      submittedAt: daysAgo(1, 12), dueAt: daysAhead(3, 12),
      assignedReviewerId: 'rev-001',
      snapshot: { capturedAt: daysAgo(1,12), submittedBy: 'Daniel Okafor · Meridian Facilities',
        attachments:[ F('Paint_VOC_Datasheets.zip','5.6 MB','archive'), F('Adhesive_Sealant_Inventory.xlsx','88 KB','sheet') ],
        narrative: 'Product datasheets for paints, coatings, adhesives. Inventory cross-references X06 thresholds.' },
    }),
    makeTask({
      id: 'task-7006', accountId: 'acct-helix', featureCode: 'L03', path: 'AUDITED',
      locationIds: Array.from({length:50}, (_,i)=>`loc-hx-${String(i+1).padStart(3,'0')}`),
      sampledLocationIds: ['loc-hx-001','loc-hx-002','loc-hx-003','loc-hx-004','loc-hx-005','loc-hx-006','loc-hx-007','loc-hx-008'],
      portfolioSize: 50, status: 'READY',
      submittedAt: daysAgo(0, 22), dueAt: daysAhead(5),
      snapshot: { capturedAt: daysAgo(0,22), submittedBy: 'Priya Shankar · Helix ESG Lead',
        attachments:[ F('Circadian_Lighting_Photometric_Report.pdf','3.8 MB','pdf'), F('Luminaire_Schedule_Helix.xlsx','310 KB','sheet') ],
        narrative: '⌈√50⌉ = 8 sampled towers; photometric reports for all sampled locations.' },
    }),
    makeTask({
      id: 'task-7007', accountId: 'acct-aria', featureCode: 'A07', path: 'AUDITED',
      locationIds: Array.from({length:22}, (_,j)=>`loc-ar-${String(j+1).padStart(3,'0')}`),
      sampledLocationIds: ['loc-ar-001','loc-ar-002','loc-ar-003','loc-ar-004','loc-ar-005'],
      portfolioSize: 22, status: 'COMPLETED',
      submittedAt: daysAgo(11, 0), dueAt: daysAgo(4, 0),
      snapshot: { capturedAt: daysAgo(11,0), submittedBy: 'Lena Vogel · Aria Sustainability',
        attachments:[ F('Operable_Window_Inventory_Aria.pdf','410 KB','pdf') ],
        narrative: 'Verified operable window count and operability per A07.' },
      ruling: { decision:'ACHIEVED', rationale:'Operability documented across sample.', issuedAt: daysAgo(4,0) },
    }),
  ];

  // ---------- Filtered views (Saved-View tabs) ----------
  // Each tab is a pure function: (tasks, currentUserId) -> tasks[]
  const VIEWS = [
    { id: 'all',      label: 'All assigned',       filter: (t, me) => t.assignedReviewerId === me },
    { id: 'urgent',   label: 'Urgent · SLA',       filter: (t, me) => t.assignedReviewerId === me && t.sla.kind !== 'ok' && t.status.id !== 'COMPLETED' && t.status.id !== 'FAILED' },
    { id: 'progress', label: 'In progress',        filter: (t, me) => t.assignedReviewerId === me && t.status.id === 'UNDER' },
    { id: 'mrc',      label: 'MRC loop',           filter: (t, me) => t.assignedReviewerId === me && t.status.id === 'ATTENTION' },
    { id: 'history',  label: 'My rulings history', filter: (t, me) => t.assignedReviewerId === me && (t.status.id === 'COMPLETED' || t.status.id === 'FAILED') },
  ];

  // ---------- Rollup metrics ----------
  function rollup(tasks, meId) {
    const mine = tasks.filter(t => t.assignedReviewerId === meId);
    const assigned   = mine.filter(t => t.status.id === 'READY' || t.status.id === 'UNDER').length;
    const sla        = mine.filter(t => t.sla.kind !== 'ok' && t.status.id !== 'COMPLETED' && t.status.id !== 'FAILED').length;
    const awaiting   = mine.filter(t => t.status.id === 'ATTENTION').length;
    const weekEnd    = daysAhead(0); // last 7 days
    const weekStart  = daysAgo(7);
    const doneWeek   = mine.filter(t => t.ruling && t.ruling.issuedAt >= weekStart && t.ruling.issuedAt <= weekEnd).length;
    return { assigned, sla, awaiting, doneWeek };
  }

  // ---------- Public API ----------
  global.ReviewerData = {
    CONCEPTS, FEATURES, REVIEWERS, ACCOUNTS, LOCATIONS,
    STATUSES, PATHS, VIEWS, TASKS,
    CHECKLISTS, GENERIC_CHECKLIST,
    NOW,
    sampleSize, fmt, relative, slaBucket, rollup,
    currentUser: REVIEWERS.find(r => r.isMe),
    getTaskById: (id) => TASKS.find(t => t.id === id),
    getView:     (id) => VIEWS.find(v => v.id === id) || VIEWS[0],
    getChecklist:(featureCode) => CHECKLISTS[featureCode] || GENERIC_CHECKLIST,
  };

})(window);
