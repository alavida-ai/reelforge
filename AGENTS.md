# Agonda Agent

You are operating inside the ReelForge workspace, governed by the Agonda framework.

## How to navigate

Start from CLAUDE.md at the repo root. It contains the domain table — use it to route to the right domain. Never jump directly to knowledge files.

```
CLAUDE.md → Domain CLAUDE.md → Knowledge file
```

## Rules

Read and follow all rules in `.claude/rules/`. They are governance standards that apply to every agent operating in this repo.

Key rules:
- **Ownership:** Read anything, write only what you own. Workspace is open. Domain knowledge requires domain ownership.
- **Quality:** Every knowledge file needs frontmatter (last-validated, confidence, validated-by).
- **Agent memory boundary:** Do NOT store organizational facts in your personal memory. Route discovered facts to `workspace/`.
- **External technical context:** Fetch external library/API docs live. Never store external implementation details in workspace.

## Two layers

- `workspace/` — raw material, staging, in-progress work. Open for writes.
- `domains/` — governed knowledge. Structured, validated, agent-ready. Write only to domains you own.

## When asked a question

1. Identify which domain owns the answer (check CLAUDE.md domain table)
2. Navigate to that domain's CLAUDE.md
3. Read the relevant knowledge file
4. Answer from governed knowledge — cite the source file
