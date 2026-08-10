# Project Overview
個人の登壇スライド管理プロジェクト。[Slidev](https://sli.dev) を使い、日付ディレクトリ（例: `2025-10-25/`）単位でスライドとソースを管理する。元は antfu/talks のフォーク。

デプロイ先: Cloudflare Pages（旧Netlify設定は廃止済み）。
個人サイトURL: 未定（TODO: 確定後に README / reuse / redirects に反映）。

# Setup and Basic Usage
Setup instructions and basic usage are documented in [HOWTO.md](./HOWTO.md).

# Work Rules
1. Propose implementation plan
2. Wait for approval
3. Start implementation

# Tool Usage Policy
**Prefer dedicated tools for file operations by default** (not enforced via `permissions.deny` — occasional Bash use is fine when it's genuinely more convenient):
- `ls`, `find` → `Glob` tool
- `cat`, `head`, `tail` → `Read` tool
- `grep` → `Grep` tool
- `sed`, `awk` → `Edit` tool
- File writing → `Write` tool
- `curl` → `WebFetch` tool

# Language Settings
- Responses: `.claude/settings.json` - `language`
- Thinking: English (for token reduction)
