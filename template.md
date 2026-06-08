# Project Template for Jarvis-Compatible Repositories

Use this file as the canonical starting point for a new project repository.

## Goal

Every new project should be self-contained and follow the same lean structure so that:
- This project is a child of the Jarvis meta-brain. It is self-contained but not isolated — it follows the Jarvis architecture and can contribute back via promotion.
- autonomous agents can work consistently
- project knowledge does not depend on Jarvis access
- Jarvis can remain read-only from project containers
- learnings can later be distilled back into Jarvis

## Embedded Operating Rules (Inherited from Jarvis)

These rules are embedded here so the project remains self-contained and does not require access to the parent Jarvis meta-brain. The agent must follow them when scaffolding and operating inside the project.

### Structure Constraints
- Keep all folders flat. No nested directories inside `vault/`, `codex/`, or `forge/`.
- Do not create additional architectural layers.
- Do not rename Atlas, Nexus, Codex, Forge, or Vault.

### File Creation Rules
- Every file in `codex/` or `forge/` must begin with a short summary at the top.
- The project's `nexus.md` must include a Project Independence declaration (the project must remain fully functional without Jarvis).

### Promotion Rule (Project → Jarvis)
- Project knowledge stays in the project by default.
- Only promote to Jarvis when knowledge is reusable across projects, valuable long-term, and either less than 2 pages long or has a clear summary.

### Agent Discipline
- Do not modify files outside the explicit scope of the current task.
- If you discover a structural problem, document it in `vault/` and wait for human approval before changing anything.

## Required project structure

Create the following at the root of every new project:

```text
project/
├── atlas.md
├── nexus.md
├── readme.md
├── vault/
├── codex/
└── forge/
```

Keep the folders flat. Do not add deeper hierarchy unless it becomes clearly necessary.

## What each part means

### `atlas.md`
The project map.

This should tell an agent:
- what the project is
- what files matter most
- what to read first
- where the major working areas are

### `nexus.md`
The project operating model.

This should describe:
- how the project works
- project-specific rules
- current architecture assumptions
- how learnings move through the project

### `readme.md`
The human-friendly overview.

This should explain the project in plain language for people browsing the repo.

### `vault/`
Raw material only.

Use this for:
- source documents
- screenshots
- transcripts
- exports
- imported research
- original-format files

Keep it flat.

### `codex/`
Distilled project knowledge.

Use this for:
- decisions
- important summaries
- stable project understanding
- distilled technical notes

### `forge/`
Reusable project skills.

Use this for:
- implementation playbooks
- repeatable procedures
- workflows learned during the project
- agent instructions that should be reused later

## Agent instructions for new projects

When an autonomous coding agent is creating a new project:

1. create the structure above
2. write `readme.md`
3. write `atlas.md`
4. write `nexus.md`
5. create `vault/`, `codex/`, and `forge/`
6. keep all three folders flat
7. put raw material in `vault/`
8. put distilled knowledge in `codex/`
9. put reusable skills in `forge/`
10. keep the project self-contained

## Distillation rule

Project knowledge should stay in the project by default.

Promote only reusable learnings into Jarvis.

Good candidates for promotion:
- cross-project patterns
- durable lessons
- reusable workflows
- reliable technical practices
- agent skills that should be reused elsewhere

## Compatibility rule

Projects should not require Jarvis to function.

Jarvis should improve projects, not become a dependency that blocks collaboration or sharing.

This is the key rule for compatibility.
