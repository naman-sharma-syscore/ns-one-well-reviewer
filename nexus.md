# Nexus — OneWELL Reviewer Operating Model

> This file defines how this project works, its rules, and its architecture assumptions. Read before making structural or process decisions.

## Project Independence Declaration

This project is **fully self-contained**. It does not require access to the Jarvis meta-brain to function. All knowledge needed to operate, build, and extend this project is embedded here — in this file, in `atlas.md`, in `codex/`, and in `forge/`.

Jarvis may be used to improve this project, but it is never a dependency.

## Domain context

**IWBI** (International WELL Building Institute) runs the WELL certification program — a performance-based system for measuring, certifying, and monitoring features of the built environment that impact health and human wellness.

**OneWELL** is IWBI's enterprise platform for managing this certification process across three distinct user groups and workflows.

**Reviewers** are trained professionals responsible for:
- Evaluating project submissions from Portfolio users
- Assessing compliance against applicable WELL standards
- Requesting additional documentation or clarifications
- Issuing certification decisions (approve, deny, conditional)

This repository covers the **Reviewer app** only — the tooling and workflows that serve this user group.

## Architecture assumptions

- The OneWELL platform is split into three separate apps with separate repositories: Standards, Portfolio, Reviewer.
- This repo (`ns-one-well-reviewer`) is scoped to the Reviewer app only.
- Cross-app integration points (if any) should be documented in `codex/` as they are discovered.
- No shared runtime dependency between apps is assumed at this time.

## Project-specific rules

- Keep all folders flat. No nesting inside `vault/`, `codex/`, or `forge/`.
- Every file created in `codex/` or `forge/` must begin with a short summary line.
- Do not modify files outside the scope of the current task.
- If a structural problem is found, document it in `vault/` and wait for human approval before acting.

## How learnings move through this project

1. Raw material arrives in `vault/` (specs, imported docs, research).
2. Distilled understanding goes into `codex/` (decisions, domain notes, stable knowledge).
3. Repeatable procedures go into `forge/` (playbooks, agent instructions).
4. Knowledge is promoted to Jarvis **only** when it is reusable across projects, durable, and under 2 pages or clearly summarized.

## Inherited Jarvis rules

These rules come from the Jarvis meta-brain and are embedded here for self-contained operation:

- Do not rename `atlas`, `nexus`, `codex`, `forge`, or `vault`.
- Do not create additional architectural layers.
- Promote to Jarvis only when knowledge is cross-project, long-term valuable, and concise.
- Agent discipline: stay in scope, document surprises before acting on them.
