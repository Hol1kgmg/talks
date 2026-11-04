---
layout: center
highlighter: shiki
css: unocss
colorSchema: light
transition: fade-out
mdc: true
lang: ja
routerMode: hash
title: pnpm skills で agent skill をバージョン管理してみる
seoMeta:
  ogDescription: "新卒N年目の勉強会&交流会！ 〜若手エンジニアのAIの使い方・向き合い方〜。pnpm skill に触れてみる話"
  ogImage: auto
  twitterCard: summary_large_image
---

# pnpm skills で agent skill をバージョン管理してみる

2026.11.05

Hol1kgmg(ほりかわ)

---
layout: default
---

# 自己紹介

<SelfIntro />

---
layout: default
---

# agent skill、どうやって入れていますか？

- `npx skills add ...` で入れる
- GitHub からコピペする
- 置き場所はリポジトリの `.claude/skills` や `~/.agents/skills`

---
layout: default
---

# 何が困るのか

- skill が更新されても気付けない
- 組織内に、中身が少しずつ違う skill が広がる
- 「どのバージョンを使っているか」を誰も答えられない

---
layout: section
---

# AI を使った開発環境なのに、管理はアナログ

---
layout: default
---

# そこで pnpm skills

- skill を npm パッケージと一緒にバージョン管理できる pnpm の機能
- パッケージに同梱された `skills/<name>/SKILL.md` を、承認済みのものだけエージェント用ディレクトリにリンクする
- 参考: https://pnpm.io/ja/agent-skills

---
layout: default
---

# 仕組み

```
[配布側]                         [利用側]
@scope/skills@1.2.0              package.json        ← バージョン範囲を宣言
└── skills/<name>/SKILL.md  ──▶  pnpm-lock.yaml      ← バージョンを固定
        (npm publish)            pnpm-workspace.yaml ← permissions で承認
                                       │ pnpm install
                                       ▼
                                 .agents/skills/pnpm-@scope+skills-<name>  (symlink)
                                       ▲
                                 Dependabot が新バージョンを PR 化
```

---
layout: default
---

# 試してみた

```bash
pnpm add -D @hol1kgmg/skills
# => Agent skills awaiting approval: @hol1kgmg/skills.
pnpm approve @hol1kgmg/skills
```

```yaml
# pnpm-workspace.yaml（承認が記録される）
permissions:
  '@hol1kgmg/skills':
    skills: true
```

```
.agents/skills/
├── .gitignore    # pnpm-*（自動生成）
├── pnpm-@hol1kgmg+skills-dependabot-review -> ../../node_modules/.pnpm/...
└── pnpm-@hol1kgmg+skills-speckit-explain   -> ../../node_modules/.pnpm/...
```

Claude Code はリンクされた skill をそのまま認識した

---
layout: default
---

# いつもの依存管理がそのまま使える

| npm パッケージ | agent skill（pnpm skills） |
|---|---|
| `package.json` で依存を宣言 | 同じ（`devDependencies` に追加） |
| `pnpm-lock.yaml` でバージョンを固定 | 同じ |
| `pnpm install` で `node_modules` に展開 | 加えて `.agents/skills` 等にリンク |
| Dependabot / Renovate で更新 PR | 同じ |
| `allowBuilds` でビルドスクリプトを許可 | `permissions.<pkg>.skills` で skill を許可 |

<CornerComment height="h-30">
  pnpm skills、良さそう！
</CornerComment>

---
layout: section
---

# でも、使える skill がない

---
layout: default
---

# 主要パッケージの対応状況

| パッケージ | リポジトリに skills | npm tarball に skills | pnpm skills で取得 |
|---|---|---|---|
| `shadcn@4.23.0` | ✅ | ❌ | ❌ |
| `next@16.4.4` | ✅（Claude Code プラグイン形式） | ❌ | ❌ |
| `drizzle-kit@0.31.11`（公式ドキュメントの例） | - | ❌ | ❌ |
| `@hol1kgmg/skills@1.0.0` | ✅ | ✅ | ✅ |

- npm tarball に `skills/` を含めて公開されたパッケージでないと取得できない
- GitHub 上の skill は直接取れない

---
layout: default
---

# 更新の仕組みはあっても

- Dependabot で skill も更新できる
- でも、対応しているパッケージがほとんどない
- 本末転倒気味。今後の発展に期待

---
layout: default
---

# 代わりに: agent-skills-nix

- [Kyure-A/agent-skills-nix](https://github.com/Kyure-A/agent-skills-nix)
- skill の取得元を flake input として宣言する
- npm 公開の制限がなく、GitHub リポジトリをコミット単位で固定できる
- `flake.lock` の更新は Dependabot（nix ecosystem）が input ごとに PR 化する

```nix
# flake.nix
inputs = {
  agent-skills.url = "github:Kyure-A/agent-skills-nix";
  anthropic-skills = { url = "github:anthropics/skills"; flake = false; };
  slidev = { url = "github:slidevjs/slidev"; flake = false; };
};
```

---
layout: default
---

# このスライドのリポジトリでも使っている

```nix
# sources.nix（取得元）
skills = {
  slidev = { path = inputs.slidev.outPath; subdir = "skills"; };
};

# skills.nix（有効にする skill）
enable = [ "slidev" ];
```

```yaml
# .github/dependabot.yml
- package-ecosystem: nix
  directory: /
  schedule:
    interval: weekly
```

<CornerComment height="h-15">
  例: chore(deps): bump vercel-ai from 36e4ce7 to e59b6e0
</CornerComment>

---
layout: default
---

# まとめ

- agent skill の管理は、更新に気付けず内容もばらつきがち
- pnpm skills なら、skill を依存パッケージとしてバージョン管理できる
- ただし npm tarball に skill を含めたパッケージが少なく、今は対応範囲が狭い
- GitHub の skill をコミット単位で管理したいなら agent-skills-nix
