/* =============================================================================
   page-ops.jsx  —  Mounts the OPERATIONS screen (ops.html)
   -----------------------------------------------------------------------------
   Wraps the <ReviewerOps> screen (SLA tracking, compliance, AI agent,
   guardrails) inside the shared app shell.
   ============================================================================= */
function OpsPage() {
  // The Ops view reads from the sample data and computes its analytics.
  const tasks = React.useMemo(
    () => ReviewerData.TASKS.map(t => ({ ...t, sla: ReviewerData.slaBucket(t.dueAt) })),
    []
  );

  const me = ReviewerData.currentUser.id;
  const rollup = React.useMemo(() => ReviewerData.rollup(tasks, me), [tasks]);

  return (
    <AppFrame
      user={ReviewerData.currentUser}
      activeRoute="sla"
      onNavigate={ReviewerNav.navigate}
      rollup={rollup}
      query="" onQuery={() => {}} onAction={() => {}}
    >
      <ReviewerOps tasks={tasks} />
    </AppFrame>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<OpsPage />);
