> Start local dev server for v2 prototype.

# Dev server — v2 prototype

```bash
python3 -m http.server 3131
```

Run from **repo root** (not from `v2/`). All `v2/` paths must resolve from root.

Configured in `.claude/launch.json`.

**URLs:**
- Queue: `http://localhost:3131/v2/`
- Task: `http://localhost:3131/v2/pages/task.html?id=<task-id>`
- Ops: `http://localhost:3131/v2/pages/ops.html`
- DS preview: `http://localhost:3131/v2/ds/UI Kit.html`

No npm, no build step, no config. Python 3 ships with macOS.
