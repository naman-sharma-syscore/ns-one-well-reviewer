/* ===========================================================================
   OneWELL Reviewer — Application Harness
   ---------------------------------------------------------------------------
   The single mount point. Owns:
     • Tasks state — shared across Dashboard, Isolated, and Ops (so a ruling
       issued in Isolated immediately recomputes the Ops analytics)
     • Hash-based client router with smooth fade-in transitions
     • The AppFrame shell — children swap on route change

   Routes
     #/queue              → Dashboard
     #/task/<taskId>      → IsolatedTaskView (focused per-task workspace)
     #/ops                → ReviewerOps (SLA + compliance + AI + guardrails)
   =========================================================================== */

// ---------- Hash router ----------
function parseRoute(hash) {
  const h = (hash || '').replace(/^#/, '') || '/queue';
  const m = h.match(/^\/task\/(task-[\w-]+)/);
  if (m) return { name: 'task', taskId: m[1] };
  if (h.startsWith('/ops')) return { name: 'ops' };
  return { name: 'queue' };
}
function routeToNav(route) {
  if (route.name === 'task')  return 'queue'; // tasks come from the queue, keep queue lit
  if (route.name === 'ops')   return 'sla';
  return 'queue';
}

// ---------- Tasks store (single source of truth) ----------
function useTasksStore() {
  const [tasks, setTasks] = React.useState(ReviewerData.TASKS);
  // Recompute SLA buckets whenever tasks change, so the side-nav badges and
  // the Ops view stay live with each ruling.
  const refreshed = React.useMemo(() => tasks.map(t => ({
    ...t,
    sla: ReviewerData.slaBucket(t.dueAt),
  })), [tasks]);
  return [refreshed, setTasks];
}

// ---------- Root ----------
function ReviewerApp() {
  const [route, setRoute] = React.useState(parseRoute(window.location.hash));
  const [tasks, setTasks] = useTasksStore();

  // Subscribe to hashchange (back/forward, in-page anchor clicks, programmatic)
  React.useEffect(() => {
    const onHash = () => setRoute(parseRoute(window.location.hash));
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Reset scroll on route change for a "fresh page" feel
  React.useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [route.name, route.taskId]);

  // Sidenav callback — single source of truth for navigation
  const navigate = (id) => {
    if (id === 'queue')   window.location.hash = '#/queue';
    else if (id === 'sla' || id === 'mrc' || id === 'rulings') window.location.hash = '#/ops';
    else if (id === 'portfolios' || id === 'standards' || id === 'team' || id === 'settings') {
      // Stubbed routes — bounce to ops as a placeholder so the click still feels alive
      window.location.hash = '#/ops';
    }
  };

  const me = ReviewerData.currentUser.id;
  const rollup = React.useMemo(() => ReviewerData.rollup(tasks, me), [tasks, me]);
  const activeNav = routeToNav(route);

  // Render the active view inside the shell. The fade key forces React to
  // remount on route change so each view fires its own mount effects fresh.
  return (
    <AppFrame
      user={ReviewerData.currentUser}
      activeRoute={activeNav}
      onNavigate={navigate}
      rollup={rollup}
      query=""
      onQuery={() => {}}
      onAction={() => {}}
    >
      <div key={route.name + ':' + (route.taskId || '')} className="rev-route-fade">
        <ViewSwitch route={route} tasks={tasks} setTasks={setTasks} />
      </div>
      <style>{`
        .rev-route-fade { animation: revFade .18s ease both; }
        @keyframes revFade { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </AppFrame>
  );
}

function ViewSwitch({ route, tasks, setTasks }) {
  if (route.name === 'task') {
    return <IsolatedTaskView taskId={route.taskId} />;
  }
  if (route.name === 'ops') {
    return <ReviewerOps tasks={tasks} />;
  }
  return <Dashboard tasks={tasks} setTasks={setTasks} />;
}

// ---------- Mount ----------
const reviewerRoot = ReactDOM.createRoot(document.getElementById('root'));
reviewerRoot.render(<ReviewerApp />);
