# Project Overview
個人の登壇スライド管理プロジェクト。[Slidev](https://sli.dev) を使い、日付ディレクトリ（例: `2025-10-25/`）単位でスライドとソースを管理する。

# Setup and Basic Usage
Setup instructions and basic usage are documented in [README.md](./README.md) and [HOWTO.md](./HOWTO.md).

# Work Rules
1. Propose implementation plan
2. Wait for approval
3. Start implementation

# Comment Policy
- Code: How
- Test code: What
- Commit log: Why
- Code comments: Why not

Code comment rules:
- Write only the reasons (why / why not) that cannot be read from the code. Do not describe what it does or how it works.
- Before writing, ask "if this line were deleted, would the code still make it clear?" If yes, do not write it.
- Keep only background and constraints: external library behavior, browser compatibility, preventing regressions of past bugs, etc.
- Keep it to one line. If it gets longer, that is a design problem, so fix the code instead.

# Tool Usage Policy
**Prefer dedicated tools for file operations by default** (not enforced via `permissions.deny` — occasional Bash use is fine when it's genuinely more convenient):
- `ls`, `find` → `Glob` tool
- `cat`, `head`, `tail` → `Read` tool
- `grep` → `Grep` tool
- `sed`, `awk` → `Edit` tool
- File writing → `Write` tool
- `curl` → `WebFetch` tool

# Language Settings
- Responses: Japanese
- Thinking: English (for token reduction)
