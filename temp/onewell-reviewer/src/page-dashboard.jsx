/* =============================================================================
   page-dashboard.jsx  —  Mounts the REVIEW QUEUE screen (index.html)
   -----------------------------------------------------------------------------
   This wraps the <Dashboard> screen inside the shared app shell (sidebar + top
   bar) and shows it on the page. It keeps the list of tasks in memory so that
   issuing a ruling updates the table and the sidebar badges live.
   ============================================================================= */
function DashboardPage() {
  // The working copy of the tasks (starts from the sample data).
  const [tasks, setTasks] = React.useState(ReviewerData.TASKS);

  // Re-stamp each task's SLA bucket whenever the list changes.
  const refreshed = React.useMemo(
    () => tasks.map(t => ({ ...t, sla: ReviewerData.slaBucket(t.dueAt) })),
    [tasks]
  );

  const me = ReviewerData.currentUser.id;
  const rollup = React.useMemo(() => ReviewerData.rollup(refreshed, me), [refreshed, me]);

  return (
    <AppFrame
      user={ReviewerData.currentUser}
      activeRoute="queue"
      onNavigate={ReviewerNav.navigate}
      rollup={rollup}
      query="" onQuery={() => {}} onAction={() => {}}
    >
      <Dashboard tasks={refreshed} setTasks={setTasks} />
    </AppFrame>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<DashboardPage />);
