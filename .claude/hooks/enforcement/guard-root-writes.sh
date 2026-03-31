#!/bin/bash
# PreToolUse hook: blocks writes to the repo root that don't belong there.

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if [ -z "$FILE_PATH" ]; then exit 0; fi

if [ -n "$CLAUDE_PROJECT_DIR" ]; then
  REL_PATH="${FILE_PATH#$CLAUDE_PROJECT_DIR/}"
else
  REL_PATH="$FILE_PATH"
fi

if [[ "$REL_PATH" == /* ]]; then exit 0; fi
if [[ "$REL_PATH" == */* ]]; then exit 0; fi

ALLOWED_ROOT_FILES=(
  "CLAUDE.md" "AGENTS.md" "SOUL.md" "IDENTITY.md" "USER.md" "TOOLS.md"
  "MEMORY.md" "HEARTBEAT.md" ".gitignore" ".mcp.json" "package.json" "package-lock.json"
)

for allowed in "${ALLOWED_ROOT_FILES[@]}"; do
  if [ "$REL_PATH" = "$allowed" ]; then exit 0; fi
done

echo "Blocked: writing '${REL_PATH}' to the repo root. Files belong in: domains/, workspace/, .claude/, or .openclaw/" >&2
exit 2
