---
layout: center
highlighter: shiki
css: unocss
colorSchema: light
transition: fade-out
mdc: true
lang: ja
routerMode: hash
title: APM で agent skill をバージョン管理してみる
seoMeta:
  ogDescription: "新卒N年目の勉強会&交流会！ 〜若手エンジニアのAIの使い方・向き合い方〜。Agent Package Manager（APM）で agent skill をバージョン管理してみる話"
  ogImage: auto
  twitterCard: summary_large_image
---

# APM で agent skill をバージョン管理してみる

2026.11.05

Hol1kgmg(ほりかわ)

---
layout: default
---

# 自己紹介

<SelfIntro />

---
layout: default
clicks: 3
---

# Agent Skillをどうやって入れていますか？

<InstallWays :active="$clicks" />

---
layout: default
clicks: 2
---

# 何が困るのか

<SkillProblems :active="$clicks" />

---
layout: section
---

# スキルの管理はアナログ

<div class="absolute bottom-10 right-12 text-xl opacity-70">
  AI を使った開発環境なのに……
</div>

---
layout: default
clicks: 3
---

# pnpm skills というものがある

<div class="h-9/10 flex items-center justify-center">
  <div class="relative">
    <!-- pnpm + SKILL.md: 初期は中央、クリックで左へ -->
    <div class="relative flex flex-col items-center transition-transform duration-700" :class="$clicks > 0 ? '-translate-x-52' : ''">
      <SharedImage src="/images/shared/pnpm.svg" img-class="h-48" />
      <div class="mt-4 flex items-center justify-center gap-2 font-mono text-sm">
        <span class="rounded-lg border border-gray-300 bg-white px-3 py-1 shadow-md">📦 package</span>
        <span class="text-gray-400">+</span>
        <span class="rounded-lg border border-gray-300 bg-white px-3 py-1 shadow-md">📄 SKILL.md</span>
      </div>
    </div>
    <div class="absolute inset-0 flex items-center justify-center text-6xl font-bold transition-opacity duration-700" :class="$clicks > 0 ? 'opacity-100' : 'opacity-0'">
      VS
    </div>
    <div class="absolute inset-0 flex items-center justify-center translate-x-52 transition-opacity duration-700" :class="$clicks > 0 ? 'opacity-100' : 'opacity-0'">
      <SharedImage src="/images/shared/nix-snowflake.svg" img-class="h-48" />
    </div>
  </div>
</div>

<div class="absolute bottom-10 right-12 text-xl transition-opacity duration-700" :class="$clicks > 1 ? 'opacity-70' : 'opacity-0'">
  ……という話をしたかった
</div>

<div v-if="$clicks > 2" class="absolute inset-0 flex items-center justify-center">
  <div class="changelog-drop relative w-97/100 overflow-hidden shadow-2xl">
    <SharedImage src="/images/dependabot-apm-changelog.webp" img-class="block w-full" />
    <div class="absolute inset-x-0 top-0 bg-black/80 py-3 text-center text-3xl font-bold text-white">
      11/03 GitHub Changelog
    </div>
    <div class="absolute inset-x-0 bottom-0 bg-black/80 py-1 text-center text-xs text-white">
      https://github.blog/changelog/2026-11-03-dependabot-version-updates-support-agent-package-manager/
    </div>
  </div>
</div>

<style>
.changelog-drop {
  transform-origin: bottom center;
  animation: changelog-drop 1.1s cubic-bezier(0.55, 0, 1, 0.45) both;
}

/* 落下 → 着地で潰れて傾く → 2回跳ねて止まる */
@keyframes changelog-drop {
  0% { transform: translateY(-150vh); }
  45% { transform: translateY(0) scaleY(0.9) rotate(-2deg); animation-timing-function: cubic-bezier(0, 0.55, 0.45, 1); }
  60% { transform: translateY(-50px) rotate(1deg); animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45); }
  72% { transform: translateY(0) scaleY(0.94) rotate(1.5deg); animation-timing-function: cubic-bezier(0, 0.55, 0.45, 1); }
  82% { transform: translateY(-16px) rotate(-0.5deg); animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45); }
  90% { transform: translateY(0) scaleY(0.97) rotate(-0.5deg); }
  100% { transform: translateY(0); }
}
</style>

---
layout: default
---

# ダークホース現る

<div class="text-center text-3xl mt-16">

pnpm skills 🆚 Nix

<div v-click class="mt-8">

……に、第三勢力 **APM** が参戦

</div>

<div v-click class="mt-8">

しかも Dependabot 対応で、一気に強くなった 💪

</div>

</div>

---
layout: default
---

# APM（Agent Package Manager）とは

- [microsoft/apm](https://github.com/microsoft/apm)。「agent context 版の npm」
- skill / instructions / prompts / agents / hooks / MCP などを依存として宣言できる
- **npm 公開は不要**。`skills/<name>/SKILL.md` を置いた Git リポジトリをそのまま依存にできる
- Claude Code / Copilot / Cursor / Codex などに展開できる

---
layout: default
---

# 仕組み

```
[配布側: 任意の Git リポジトリ]        [利用側]
owner/repo                            apm.yml        ← 依存を宣言（ref / semver 範囲）
└── skills/<name>/SKILL.md   ──────▶  apm.lock.yaml  ← commit SHA + ファイルハッシュを固定
    └── references/ scripts/ ...            │ apm install (--frozen)
                                            ▼
                                      apm_modules/           ← 取得キャッシュ（gitignore）
                                      .agents/skills/<name>/ ← target ごとの固定パスに展開
                                            ▲
                                      Dependabot が更新を PR 化
```

---
layout: default
---

# 試してみた

<div class="grid grid-cols-2 gap-4">

<div>

```yaml
# apm.yml
targets:
  - agent-skills
dependencies:
  apm:
    - Hol1kgmg/skills
```

</div>

<div>

```bash
# .envrc（direnv で自動展開）
watch_file apm.yml apm.lock.yaml
mise x -- apm install --frozen
```

</div>

</div>

```bash
apm install Hol1kgmg/skills   # => 2 スキルを .agents/skills/ に展開
apm audit                     # => No drift detected
```

- `apm.lock.yaml` に `resolved_commit` と各ファイルの sha256 が記録される
- Claude Code は展開された skill をそのまま認識した

---
layout: default
---

# ハマりどころ

- `.claude/skills` を `.agents/skills` への symlink にしていると、`claude` target は `Unsafe skill destination` で拒否される
- `targets: [agent-skills]` にして `.agents/skills/` へ直接展開し、symlink 経由で Claude Code に読ませて回避した
- SKILL.md の frontmatter は ASCII のみ、`name` はディレクトリ名と一致が必要

---
layout: default
---

# APM が対応している範囲（`.claude/` の場合）

```
.claude/
├── skills/<name>/       ✅ skills（同梱のスクリプトや references も丸ごと）
├── rules/<name>.md      ✅ instructions
├── commands/<name>.md   ✅ prompts
├── agents/<name>.md     ✅ agents
├── settings.json
│   ├── hooks            △  APM が書いたエントリだけマージ
│   └── permissions / statusLine / env   ❌
├── settings.local.json  ❌
└── statusline.sh        ❌ 任意のファイルは置けない
```

- 展開先は target ごとに APM が決める（変えられるのはディレクトリ名だけ）

<CornerComment height="h-15">
  ハーネスの設定までは手が届かない
</CornerComment>

---
layout: default
---

# ハーネス周りまでこだわるなら Nix

- 例: [layat](https://github.com/yasunori0418/layat)。skill の取得元を flake input にして `flake.lock` で rev を固定する
- 配置先のパスを `flake.nix` に自分で書ける
- ハーネス本体やツールも、同じ devShell でバージョンを固定できる
- Dependabot（nix ecosystem）で `flake.lock` の更新 PR を出せる

```nix
# flake.nix（簡略化）
inputs.skills = { url = "github:Hol1kgmg/SKILL"; flake = false; };

entries = {
  ".agents/skills/layat-dependabot-review" = { src = skills; subpath = "skills/dependabot-review"; };
};
```

---
layout: default
---

# 余談

- 本当は pnpm skills の話をするつもりだった
- 11/03（登壇の2日前、作業日でいうと前日）に、Dependabot の APM 対応のニュースが飛び込んできた
- 泣く泣く APM の話を頑張りました 😭

<div v-click class="text-center text-2xl mt-12">

AI まわりは状況の変化が激しいので、<br>前から準備していた話ができなくなるのはよくあること

</div>
