# OneWELL Reviewer

This repository contains the **Reviewer app** — one of three apps that make up the OneWELL platform by IWBI (International WELL Building Institute).

## What is OneWELL?

OneWELL is an enterprise software product for managing WELL certifications in the sustainable building space. IWBI's WELL certification program evaluates buildings and organizations against health and wellness standards.

The platform is split into three focused apps:

| App | User group | Purpose |
|-----|-----------|---------|
| Standards | IWBI staff | Manage certification standards and criteria |
| Portfolio | Building owners / project teams | Submit and track certification projects |
| **Reviewer** | Reviewers | Evaluate and certify submitted projects |

## This app: Reviewer

The Reviewer app is used by the **Reviewer user group** — trained professionals who assess project submissions against WELL standards and make certification decisions.

Core responsibilities of the Reviewer user group:
- Review project documentation submitted through the Portfolio app
- Evaluate compliance against applicable WELL standards
- Request clarifications or additional documentation
- Issue certification decisions

## Navigating this repo

```
readme.md       — you are here
atlas.md        — project map for agents and developers
nexus.md        — operating model, rules, architecture
vault/          — raw source material (specs, references, imports)
codex/          — distilled knowledge (decisions, architecture notes)
forge/          — reusable workflows and playbooks
```

Start with `atlas.md` for a map of what exists and where to go next.

## Jarvis compatibility

This project is a child of the Jarvis meta-brain system but is **fully self-contained**. It does not require Jarvis access to operate. Learnings and patterns may be promoted back into Jarvis when they are reusable across projects.
