# OneWELL Reviewer — Prototype

This is a clickable prototype of the **OneWELL Reviewer** experience. It runs as a
plain website — there is **no build step, no installation, and no command line
required**. The whole thing is just HTML, CSS, and JavaScript files in this folder.

> 💡 **The most important thing to know:** to make changes, you edit the text files
> in this folder and refresh the browser. That's it. There is nothing to "compile."

---

## 📁 What's in this folder

**Each screen is its own `.html` page** — so the file you open is the screen you
see. That makes the code much easier to follow and to review in Cursor.

```
onewell-reviewer/
├── index.html              ← PAGE 1: Review queue (the home page). START HERE.
├── ops.html                ← PAGE 2: Operations dashboard
├── task.html               ← PAGE 3: Single-task review (opens task.html?task=…)
│
├── colors_and_type.css     ← All brand colors + fonts (design tokens)
├── components.css          ← Shared styles for buttons, chips, tags, etc.
│
├── src/                    ← The screens & logic (shared by the pages above)
│   ├── reviewer-data.js        ← The sample data shown in the prototype
│   ├── reviewer-shell.jsx      ← The shared frame: sidebar, top bar, layout
│   │
│   ├── reviewer-dashboard.jsx  ← The Review queue screen   (used by index.html)
│   ├── reviewer-ops.jsx        ← The Operations screen     (used by ops.html)
│   ├── isolated-task-view.jsx  ← The single-task screen    (used by task.html)
│   │
│   ├── page-dashboard.jsx      ← Tiny file that puts the queue screen on index.html
│   ├── page-ops.jsx            ← Tiny file that puts the ops screen on ops.html
│   ├── page-task.jsx           ← Tiny file that puts the task screen on task.html
│   └── page-router.js          ← Plain JS: makes links jump between the 3 pages
│
├── assets/
│   └── icons/              ← SVG icons (logo, nav, utility icons)
│
└── fonts/                 ← The brand fonts (FT Made + Mazzard Soft M)
```

**How the pieces fit together (in plain English):**
- Each `*.html` page loads the shared frame (`reviewer-shell.jsx`), then ONE
  screen file, then a tiny `page-*.jsx` "mount" file that shows it.
- Links inside the app (the sidebar, "open task", "back to queue") are handled by
  `page-router.js`, which sends you to the right `.html` page.

**Where do I edit things?**

| I want to change…                        | Open this file                |
|------------------------------------------|-------------------------------|
| A color or a font size                   | `colors_and_type.css`         |
| The look of a button / chip / tag        | `components.css`              |
| The sidebar, logo, or shared top bar     | `src/reviewer-shell.jsx`      |
| The **Review queue** screen              | `src/reviewer-dashboard.jsx`  |
| The **Operations** screen                | `src/reviewer-ops.jsx`        |
| The **single task review** screen        | `src/isolated-task-view.jsx`  |
| The sample text/numbers shown            | `src/reviewer-data.js`        |
| Which link goes to which page            | `src/page-router.js`          |

---

## ▶️ How to view it on your own computer

You **cannot** just double-click `index.html` — browsers block some files when
opened that way. You need to run a tiny local web server. Pick whichever is easiest:

### Option A — Use Cursor / VS Code (recommended, no typing)
1. Open this folder in **Cursor**.
2. Install the extension called **"Live Server"** (search for it in the
   Extensions panel on the left).
3. Right-click `index.html` → **"Open with Live Server"**.
4. Your browser opens the prototype automatically. Edits + save = auto-refresh.

### Option B — One line in the Terminal (if you have Python)
In Cursor, open the Terminal (menu: **Terminal → New Terminal**) and paste:

```bash
python3 -m http.server 8000
```

Then open **http://localhost:8000** in your browser.

> The prototype is designed for a wide desktop window (1440px). View it on a
> laptop/desktop, not a phone.

---

## ✏️ How to make a change (the everyday loop)

1. Open a file from the table above in Cursor.
2. Change some text, a color, or a number.
3. **Save** (Cmd+S / Ctrl+S).
4. Refresh the browser (or it auto-refreshes with Live Server).

If something looks broken, undo your last change (Cmd+Z) and save again.

---

## 🤝 Putting this on GitHub (so changes are saved & shared)

GitHub is online storage that keeps a history of every change. You only set this
up **once**.

### The easy way — GitHub Desktop (no command line)
1. Download **GitHub Desktop** from <https://desktop.github.com> and sign in.
2. Menu: **File → Add Local Repository** → choose this `onewell-reviewer` folder.
3. It will offer to "create a repository here" — click yes.
4. Type a short summary like *"First version"* in the bottom-left box and click
   **Commit to main**.
5. Click **Publish repository** (top bar). Choose a name. Done — it's on GitHub.

From now on: every time you make changes, GitHub Desktop shows them. Type a short
note, click **Commit**, then click **Push** to upload.

### Working with Cursor at the same time
Cursor can also commit/push using its built-in **Source Control** tab (the branch
icon on the left). Either tool works — they're talking to the same GitHub repo.

---

## 🚀 Publishing it live with Netlify (free public link)

Once the code is on GitHub, Netlify can host it for free and **auto-update the live
site every time you push to GitHub**.

1. Go to <https://app.netlify.com> and sign up (use "Sign up with GitHub").
2. Click **Add new site → Import an existing project**.
3. Choose **GitHub**, then pick your `onewell-reviewer` repository.
4. When asked for build settings, leave them **empty / default**:
   - **Build command:** *(leave blank)*
   - **Publish directory:** `.` (a single dot, meaning "this folder")
   - *(The included `netlify.toml` file already sets this for you, so you can just
     click through.)*
5. Click **Deploy**. After a few seconds you get a public link like
   `https://your-site-name.netlify.app`.

That's it. Edit → push to GitHub → Netlify rebuilds automatically.

---

## ❓ FAQ / Troubleshooting

**The page is blank or shows code instead of the app.**
You probably opened `index.html` by double-clicking. Use Live Server or the local
server (see "How to view it" above).

**The fonts look wrong / it falls back to a plain font.**
Make sure the whole `fonts/` folder was uploaded along with everything else.

**Do I need Node, npm, or to run `npm install`?**
No. This prototype intentionally has **no build tools**. React loads straight from
the internet inside `index.html`. There is nothing to install.

**Can I add a new screen / page?**
Yes. The easiest pattern: copy `task.html` → `mynewpage.html`, copy `page-task.jsx`
→ `page-mynew.jsx` (point it at your new screen file), and add a route for it in
`src/page-router.js`. Cursor's AI can do all of this for you if you describe the
screen you want.

**Why is each page a separate file now?**
So the code is easy to review: open `ops.html` and you're looking at exactly the
Operations screen — nothing else. The trade-off is that moving between pages is a
full page load, so anything you change on one screen (e.g. an in-progress ruling)
starts fresh when you land on another screen. For a clickable prototype this is
normal and expected.

---

## 🧠 Technical note (for the curious / for Cursor's AI)

- Stack: vanilla HTML/CSS + React 18 loaded from a CDN, with **in-browser Babel**
  transpiling the `.jsx` files. No bundler, no package.json, no build step.
- **Multi-page**: `index.html` (queue), `ops.html`, `task.html`. Each page loads,
  in order: `page-router.js` → `reviewer-data.js` → `reviewer-shell.jsx` → ONE
  screen file → its `page-*.jsx` mount file. This order matters.
- Each `.jsx` file attaches its components to `window` so the next file can use
  them (there are no `import` statements — that's intentional for a buildless setup).
- `page-router.js` is plain JavaScript. It translates the screens' in-app links
  (`#/queue`, `#/ops`, `#/task/<id>`) into real page files (`index.html`,
  `ops.html`, `task.html?task=<id>`). The screen components were left **unchanged**
  from the original prototype — only this router and the small `page-*.jsx` mount
  files are new.
