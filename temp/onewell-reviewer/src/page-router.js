/* =============================================================================
   page-router.js  —  Cross-page navigation (plain JavaScript, no framework)
   -----------------------------------------------------------------------------
   WHY THIS FILE EXISTS
   The screen components were originally written for a single-page app, so they
   create in-app links that look like:
        #/queue           → the review queue (dashboard)
        #/ops             → the operations dashboard
        #/task/<task-id>  → one task's review workspace

   In THIS version every screen is its own .html file:
        #/queue           →  index.html
        #/ops             →  ops.html
        #/task/<task-id>  →  task.html?task=<task-id>

   This little script does that translation, so the screen components themselves
   did NOT have to be changed at all. If you ever rename a page file, update the
   one map below (routeToUrl) and everything keeps working.
   ============================================================================= */
(function () {
  // ---- The single source of truth: in-app route  →  real page file ----------
  function routeToUrl(route) {
    var r = (route || '').replace(/^#/, '').replace(/^\//, ''); // "task/task-1001"
    var task = r.match(/^task\/(task-[\w-]+)/);
    if (task) return 'task.html?task=' + task[1];
    if (r.indexOf('ops') === 0) return 'ops.html';
    if (r.indexOf('queue') === 0) return 'index.html';
    return null; // a bare "#" or anything unknown → ignore (do nothing)
  }

  // ---- Which .html file is open right now? -----------------------------------
  function currentFile() {
    var name = window.location.pathname.split('/').pop();
    return name || 'index.html';
  }

  // ---- Go to the page that a given in-app route points at --------------------
  function go(route) {
    var url = routeToUrl(route);
    if (!url) return;                         // unknown link → ignore
    var file = url.split('?')[0];
    var query = url.indexOf('?') !== -1 ? '?' + url.split('?')[1] : '';
    // Already on that exact page (same file + same query)? Do nothing.
    if (file === currentFile() && query === window.location.search) return;
    window.location.assign(url);
  }

  // ---- 1) Intercept clicks on in-app links: <a href="#/..."> -----------------
  document.addEventListener('click', function (e) {
    var node = e.target;
    if (node && node.nodeType === 3) node = node.parentElement; // text node → parent
    var a = node && node.closest ? node.closest('a[href^="#/"]') : null;
    if (!a) return;
    e.preventDefault();
    go(a.getAttribute('href'));
  }, true);

  // ---- 2) Catch links set in code, e.g. the task screen's "Back to queue" ----
  window.addEventListener('hashchange', function () {
    go(window.location.hash);
  });

  // ---- Helper the page mount-scripts hand to the sidebar ---------------------
  window.ReviewerNav = {
    go: go,
    // Sidebar callback: "Review queue" → queue page, everything else → ops page
    navigate: function (id) {
      if (id === 'queue') go('#/queue');
      else go('#/ops');
    }
  };
})();
