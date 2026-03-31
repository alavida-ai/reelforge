# ReelForge

Agentic workspace for the ReelForge demo dashboard POC. Governed by the Agonda framework.

## Domains

| Domain | Owner | What it owns |
|--------|-------|-------------|

No domains defined yet.

## Domain Structure

```
domains/{name}/
  CLAUDE.md         # domain router (start here)
  knowledge/        # context mesh — governed organizational knowledge
  skills/           # agentpack skills
  plugins/          # plugins — hooks + bundled skills
  agents/           # agent workspaces
  functions/        # data layer
  apps/             # UIs
  packages/         # shared code
```

## Navigation

Root CLAUDE.md (this file) → Domain CLAUDE.md → knowledge / agents / skills / functions / apps / plugins.

Never jump directly to files. The domain CLAUDE.md is the interface.

## Standards

- Knowledge files require frontmatter: `description`, `last-validated`, `confidence`, `validated-by`, `tags`
- Names: lowercase-hyphenated (domains, files, skills)
- Dates: ISO-8601 everywhere
- All changes via PR — never push to main
- Don't store external API docs in the repo — fetch live
- Skills cross domains via agentpack imports, not by copying knowledge files

## Root Files

| File | Purpose |
|------|---------|
| `CLAUDE.md` | This file — development agent router and standards |
| `AGENTS.md` | Agent operating instructions |
| `SOUL.md` | Agent persona |
| `IDENTITY.md` | Agent identity |
| `USER.md` | Team context |
| `TOOLS.md` | Tool notes |
| `MEMORY.md` | Agent working memory |
| `workspace/` | Raw material, staging, in-progress work |
| `.openclaw/` | OpenClaw agent topology and config |
| `.claude/` | Claude Code settings, hooks |
