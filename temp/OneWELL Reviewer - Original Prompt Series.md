# OneWELL Reviewer App — Full Prompt Series (Verbatim)

---

## Prompt 1

You are an expert UI developer and product designer. We are building the companion Reviewer App for the OneWELL Platform 3.0 ecosystem. While the customer app focuses on task completion, the Reviewer App is a high-velocity, task-centric compliance engine.

Our core philosophy is that a review is a "Mini-Trial." The reviewer is examining specific evidence submitted at a specific point in time, for a specific set of locations, and issuing a permanent, legally auditable ruling based only on what was provided.

Please generate the global shell, navigation structure, foundational mock data engine, and the primary Reviewer Dashboard.

### 1. Architectural & UX Principles
- **No Spreadsheets, No Exports:** Everything happens online. Retain zero legacy enterprise DAM complexity.
- **Data Primitives:** Follow the core model sequence: Target/Strategy → Task → ReviewSnapshot → Notes/Rulings → Achievements.
- **Design System Alignment:** Use the existing design system tokens: `.ow-*` primitives, FT Made + Mazzard typefaces, cyan-50 highlights for selected items, and distinct concept-coded tag states (Air, Water, Thermal Comfort).

### 2. Foundational Data Engine (src/reviewer-data.js)
Seed highly realistic mock data to drive the entire application lifecycle. It must contain:
- **Reviewers:** At least 3 detailed profiles (including the current user session).
- **Assigned Queue:** 25+ distinct tasks in various review lifecycle states: `Ready for Review`, `Under Review`, `Needs Attention` (returned to client), `Completed`, and `Failed`.
- **Diverse Verification Paths:** - *Shareable Path:* 1 task covering an entire portfolio (e.g., Smoke-Free Policy covering 50 locations).
  - *Audited Path:* Tasks leveraging the $\lceil\sqrt{N}\rceil$ sampling logic (e.g., 4 audit tasks covering 16 locations).
  - *Per-Location Path:* Dedicated individual tasks per site (e.g., Water Testing Results).
- **Real-World Standards Context:** Seed real WELL v2 codes matching the customer app (e.g., A01, A02, W01, W02, T01, T03) containing realistic filenames like `HVAC_Assessment_Chicago_Q1_2026.pdf` and `Water_Testing_Results_Singapore.pdf`.

### 3. Screen 1: The Unified Reviewer Dashboard
Build a clean, high-scannable workspace landing page.
- **Rollup Metrics Band:** 4 clear summary tiles:
  1. *Assigned to Me* (Pending review)
  2. *SLA Warnings* (Tasks unaddressed for too long)
  3. *Awaiting Client Resubmission* (Tasks in MRC loop)
  4. *Completed This Week*
- **Saved View Tabs:** Filter rows via tabs: `All Assigned`, `Urgent (SLA)`, `In Progress`, `MRC Loop`, `My Rulings History`.
- **The Linear-Style Queue List:** A dense but readable data table displaying:
  - Urgency indicators (SLA countdown badges).
  - Strategy code chips (concept-colored dots).
  - Account/Portfolio name (e.g., Helix Realty) + location counts.
  - Verification path type pill (Shareable / Audited / Individual).
  - Submission timestamp & current status pill.

### 4. Codebase Deliverables Required
Generate fully fleshed-out modules utilizing inline styles or CSS modules mapping directly to standard design components:
- `src/reviewer-data.js` — The full seed dataset and filtering state helpers.
- `src/reviewer-shell.jsx` — The global AppFrame, global search bar, profile controls, and left sidebar.
- `src/reviewer-dashboard.jsx` — The complete dashboard view containing the metrics band and interactive data queue.

Ensure full interactivity. Clicking items in the queue must route the UI state smoothly. Do not use placeholders or omit complex conditional branches.

---

## Prompt 2

Now, build the operational crown jewel of the OneWELL Reviewer App: the **Isolated View Task Page** (`src/isolated-task-view.jsx`). 

The "Isolated View" is an un-nested, hyper-focused layout. The reviewer must see each task as an independent unit of work. They should never have to navigate a customer's broader account, hunt through general document dumps, or guess client intent. Everything needed to reach a legal ruling must be explicitly present on this single screen.

### 1. Two-Column Operational Layout
- **Left Column (Primary Evidence Canvas):**
  - **Task Header:** Displays the unique Task ID, strategy code/title (e.g., `W02: Potable Water Quality`), account name, and explicit verification path metrics.
  - **The ReviewSnapshot Ribbon:** A clear, immutable banner displaying the frozen historical state of the locations at the exact moment the client clicked "Submit" (Occupancy data, Scope e.g., Core/Owner-Occupied, and address metadata).
  - **Interactive Verification Checklist:** The exact checklist criteria derived directly from the WELL v2 standard. Reviewers can click each condition to mark it verified as they audit the documents.
  - **Document Inspection Tree:** Lists attached client files. Include a "Relevancy Toggle" where the reviewer flags a document as `Relevant` or `Not Relevant` to the ruling, with an inline text area for document-specific technical notes.

- **Right Column (Sticky 360px Control Panel - "The Gavel"):**
  - **Workload & Target Metrics:** Displays the total locations impacted and the exact Tiers sought (Tier 1 vs Tier 2).
  - **The MRC Loop Control & Primary Actions:**
    - Primary CTA buttons corresponding to the three definitive outcomes: `Complete (Approve)`, `Needs Attention (Issue MRC)`, or `Failed (Closed without points)`.
    - *Crucial Logic:* Selecting "Needs Attention" switches the UI panel to an MRC (Mandatory Resubmission Comment) composer interface.
  - **Notes Ledger:** A unified timeline showing both Public Notes (communicated directly back to the client's Task Workspace) and Private Notes (internal audit history).

### 2. State Machine Logic & Automation
Implement the interactive behavioral engine directly within the view:
- **Auto-Generated Notes:** When a reviewer executes a status change (e.g., moves a task to *Under Review* or *Needs Attention*), the system must automatically inject a stylized audit note into the timeline tracking the precise transition.
- **Locking Mechanism:** Simulate a `TaskService::lock()` event when a reviewer begins modifying a task, displaying a visual state badge stating that the client-side task is locked from edits.
- **Achievement Generation:** If the reviewer clicks `Complete (Approve)`, trigger a success modal illustrating the generation of an immutable `Achievement` record storing the raw tier scoring payload.

Please write the complete React component for `src/isolated-task-view.jsx` alongside any auxiliary styling changes needed to sustain this heavy, high-fidelity interaction state.

---

## Prompt 3

To finish the OneWELL Reviewer App prototype, build the administrative tracking, SLA guardrails, and compliance oversight features. This screen ensures operational efficiency, preventing reviews from becoming bottlenecks while enforcing strict data integrity.

Generate the **Reviewer Operations & Analytics View** (`src/reviewer-ops.jsx`) and wire the final application routing logic together.

### 1. Feature Specifications
- **SLA Tracking Dashboard:**
  - Create visual aging graphs and warning flags representing how long tasks have been waiting in queue relative to contractual completion dates.
  - Use clear status color bands: Green (Safe), Amber (Approaching SLA Breach), and Red (SLA Breached).
- **Automated Compliance Indicators:**
  - Take inspiration from Drata-style automation dashboards. Provide clean, scannable rollups tracking reviewer velocity, accuracy rates, and distribution of outcomes (Approval vs MRC vs Failure rates).
- **Proactive AI Auditing Simulator:**
  - Integrate an "AI Pre-Review Agent" UI box within the system. This mimics the platform's upcoming 2027 vision. 
  - When viewing a task, the AI agent parses the mock document text data and outputs a confidence score, a bulleted list of potentially missing clauses (e.g., *"Missing ASHRAE 188 document section 4.2"*), and highlights specific compliant lines to assist human reviewers.

### 2. Global Safety Guardrails & Input Restrictions
Enforce the following strict processing rules natively within your state handlers:
- **Task Splitting Safeguard:** Prevent any capability to split tasks if the underlying Standard/Strategy is marked as `auditable`.
- **Minimum Threshold Rule:** Enforce a hard block preventing location splitting actions if a task contains fewer than 2 locations.
- **Historical Immutability:** Ensure that when a ruling is finalized, the corresponding `ReviewSnapshot` data is completely locked from accidental modifications.

### 3. Finalization of the Application Assembly
Generate the central application file:
- `src/reviewer-app.jsx` — Harness all the individual views created across prompts (`ReviewerDashboard`, `IsolatedTaskView`, and `ReviewerOps`), wrap them cleanly in the global `ReviewerShell` framework, and establish smooth, responsive client-side routing transitions.

Ensure the final application artifact functions perfectly in the browser as a comprehensive, fully articulated end-to-end rapid prototype without requiring build configurations or backend endpoints.
