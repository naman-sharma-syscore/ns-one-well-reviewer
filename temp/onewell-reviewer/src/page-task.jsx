/* =============================================================================
   page-task.jsx  —  Mounts the SINGLE-TASK REVIEW screen (task.html)
   -----------------------------------------------------------------------------
   Wraps the <IsolatedTaskView> screen inside the shared app shell. Which task
   to show comes from the URL, e.g.  task.html?task=task-1001
   (<IsolatedTaskView> reads that automatically — no extra wiring needed).
   ============================================================================= */
function TaskPage() {
  const tasks = React.useMemo(
    () => ReviewerData.TASKS.map(t => ({ ...t, sla: ReviewerData.slaBucket(t.dueAt) })),
    []
  );
  const me = ReviewerData.currentUser.id;
  const rollup = React.useMemo(() => ReviewerData.rollup(tasks, me), [tasks]);

  return (
    <AppFrame
      user={ReviewerData.currentUser}
      activeRoute="queue"
      onNavigate={ReviewerNav.navigate}
      rollup={rollup}
      query="" onQuery={() => {}} onAction={() => {}}
    >
      <IsolatedTaskView />
    </AppFrame>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<TaskPage />);
