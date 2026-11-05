---
layout: center
highlighter: shiki
css: unocss
colorSchema: light
transition: fade-out
mdc: true
lang: ja
favicon: /images/shared/Hol1kgmg_prof_img_round.webp
routerMode: hash
title: APM で agent skill をバージョン管理してみる
seoMeta:
  ogDescription: "新卒N年目の勉強会&交流会！ 〜若手エンジニアのAIの使い方・向き合い方〜。Agent Package Manager（APM）で agent skill をバージョン管理してみる話"
  ogImage: auto
  twitterCard: summary_large_image
---

# APM で agent skill をバージョン管理してみる

2026.11.05

Hol1kgmg（ほりかわ）

---
layout: default
---

# 自己紹介

<SelfIntro note="ジャンケットバンク 最新話(228話)に脳を焼かれました..." />

---
layout: default
clicks: 3
---

# agent skill をどうやって入れていますか？

<InstallWays :active="$clicks" />

---
layout: section
---

# この skill 導入では<br>困ることがあります

---
layout: default
clicks: 2
---

# 何が困るのか

<SkillProblems :active="$clicks" />

---
layout: section
---

# skill の管理がアナログ

<div class="absolute bottom-10 right-12 text-xl opacity-70">
  AI を使った今どきな開発環境なのに……
</div>

---
layout: default
clicks: 4
---

# pnpm skills というものがある

<div class="h-9/10 flex items-center justify-center">
  <div class="relative">
    <!-- pnpm + SKILL.md: 初期は中央、クリックで + と SKILL.md が出て、次のクリックで左へ -->
    <div class="relative flex flex-col items-center transition-transform duration-700" :class="$clicks > 1 ? '-translate-x-52' : ''">
      <SharedImage src="/images/shared/pnpm.svg" img-class="h-48" />
      <div class="mt-4 flex items-center justify-center gap-2 font-mono text-sm">
        <span class="rounded-lg border border-gray-300 bg-white px-3 py-1 shadow-md">📦 package</span>
        <span class="text-gray-400 transition-opacity duration-700" :class="$clicks > 0 ? 'opacity-100' : 'opacity-0'">+</span>
        <span class="rounded-lg border border-gray-300 bg-white px-3 py-1 shadow-md" :class="$clicks > 0 ? 'skill-bounce' : 'opacity-0'">📄 SKILL.md</span>
      </div>
    </div>
    <div class="absolute inset-0 flex items-center justify-center text-6xl font-bold transition-opacity duration-700" :class="$clicks > 1 ? 'opacity-100' : 'opacity-0'">
      VS
    </div>
    <div class="absolute inset-0 flex items-start justify-center translate-x-52 transition-opacity duration-700" :class="$clicks > 1 ? 'opacity-100' : 'opacity-0'">
      <SharedImage src="/images/shared/nix-snowflake.svg" img-class="h-48" />
    </div>
  </div>
</div>

<div class="absolute bottom-10 right-12 text-xl transition-opacity duration-700" :class="$clicks > 2 ? 'opacity-70' : 'opacity-0'">
  ……という話をしたかった
</div>

<div v-if="$clicks > 3" class="absolute inset-0 flex items-center justify-center">
  <div class="changelog-drop relative w-97/100 overflow-hidden shadow-2xl">
    <SharedImage src="/images/dependabot-apm-changelog.webp" img-class="block w-full" />
    <div class="absolute inset-x-0 top-0 bg-black/80 py-3 text-center text-3xl font-bold text-white">
      2026.11.03 GitHub Changelog
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

.skill-bounce {
  animation: skill-bounce 0.8s both;
}

/* その場で現れて2回跳ねて止まる */
@keyframes skill-bounce {
  0% { opacity: 0; transform: translateY(0); animation-timing-function: cubic-bezier(0, 0.55, 0.45, 1); }
  30% { opacity: 1; transform: translateY(-20px); animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45); }
  60% { transform: translateY(0); animation-timing-function: cubic-bezier(0, 0.55, 0.45, 1); }
  80% { transform: translateY(-8px); animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45); }
  100% { opacity: 1; transform: translateY(0); }
}
</style>

---
layout: default
clicks: 3
---

# 何があったか

<div class="mt-8 text-center transition-opacity duration-700" :class="$clicks > 0 ? 'opacity-100' : 'opacity-0'">
  <div class="text-3xl">2026.11.03、<b>Dependabot が APM に対応</b>した</div>
  <div class="mt-4 text-2xl opacity-70">その結果……</div>
</div>

<div class="h-3/5 flex items-center justify-center gap-24 transition-opacity duration-700" :class="$clicks > 1 ? 'opacity-100' : 'opacity-0'">
  <!-- 左枠: pnpm が倒れて退場し、APM が入れ替わりで入る -->
  <div class="relative h-48 w-72">
    <div class="absolute inset-0 flex justify-center origin-bottom-left transition-all duration-700" :class="$clicks > 2 ? 'opacity-0 rotate-90 translate-y-8' : ''">
      <SharedImage src="/images/shared/pnpm.svg" img-class="h-48" />
    </div>
    <div class="absolute inset-0 flex items-center justify-center transition-all duration-700" :class="$clicks > 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'">
      <span class="flex items-center gap-4 rounded-2xl border-4 border-gray-800 bg-white px-8 py-6 text-6xl font-bold shadow-xl">
        <!-- Microsoft ロゴ（4色の正方形） -->
        <span class="grid grid-cols-2 gap-1">
          <span class="h-6 w-6 bg-[#F25022]" /><span class="h-6 w-6 bg-[#7FBA00]" />
          <span class="h-6 w-6 bg-[#00A4EF]" /><span class="h-6 w-6 bg-[#FFB900]" />
        </span>
        APM
      </span>
    </div>
  </div>
  <div class="text-6xl font-bold">VS</div>
  <div class="flex w-72 justify-center">
    <SharedImage src="/images/shared/nix-snowflake.svg" img-class="h-48" />
  </div>
</div>

<div class="absolute bottom-10 right-12 text-xl transition-opacity duration-700" :class="$clicks > 2 ? 'opacity-70' : 'opacity-0'">
  pnpm の話どころじゃなくなった
</div>

---
layout: section
---

# 時間の都合で pnpm の話は省略

---
layout: default
---

# APM（Agent Package Manager）とは

<div class="h-9/10 flex flex-col justify-center">

```yaml
# apm.yml
name: my-project
version: 1.0.0
targets: [claude]
dependencies:
  apm:
    - anthropics/skills/skills/frontend-design # skills
    - owner/repo/instructions/style.instructions.md # instructions
    - owner/repo/prompts/review.prompt.md # prompts
    - github/awesome-copilot/agents/api-architect.agent.md # agents
    - microsoft/apm-sample-package#v1.0.0 # hooks など（パッケージ丸ごと）
  mcp:
    - name: io.github.github/github-mcp-server # MCP
      transport: http
```

<div class="text-center">

skill / instructions / prompts / agents / hooks / MCP をバージョン管理するパッケージマネージャー

</div>

</div>

---
layout: default
clicks: 5
---

# 仕組み

<ApmInstallFlow :active="$clicks" />

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
apm install Hol1kgmg/skills   # => 2つの skill を .agents/skills/ に展開
apm audit                     # => No drift detected
```

- `apm.lock.yaml` に `resolved_commit` と各ファイルの sha256 が記録される
- Claude Code は展開された skill をそのまま認識した

<div class="absolute bottom-8 right-6 flex items-center gap-2 text-xl">
  <SharedImage src="/images/shared/GitHub_Invertocat_Black.svg" img-class="w-7 h-7" />
  <a href="https://github.com/Hol1kgmg/playground-apm" target="_blank">https://github.com/Hol1kgmg/playground-apm</a>
</div>

---
layout: default
clicks: 1
---

# APM が対応している範囲（`.claude/` の場合）

<div class="h-9/10 flex flex-col items-center justify-center">
<div>

<!-- 14枚目とコードブロックの位置をそろえるため、同じ構成にしてラベルは invisible で場所だけ取る -->
<div class="mx-auto w-fit">
  <div class="invisible mb-1 text-sm">APM の範囲</div>
  <ClaudeDirTree class="mb-8" :active="$clicks > 0" />
</div>

- 配置先は `.claude/` 以外に `.agents/` なども選べる（`targets` で指定）
- ❌の範囲、いわゆるハーネス周りの管理は対応していない

</div>
</div>

---
layout: default
clicks: 2
---

# ハーネス周りまでこだわるなら Nix

<div class="h-9/10 flex flex-col items-center justify-center">
<div>

<!-- 箇条書きの方が幅が広いので、ラベルとツリーだけ中央に寄せる -->
<div class="mx-auto w-fit">
  <div class="mb-1 text-sm opacity-70">APM の範囲</div>
  <ClaudeDirTree class="mb-8" active :nix="$clicks > 0" />
</div>

<div class="transition-opacity duration-700" :class="$clicks > 1 ? 'opacity-100' : 'opacity-0'">

- 例: <SharedImage src="/images/shared/GitHub_Invertocat_Black.svg" img-class="inline w-5 h-5 mb-1" /> [https://github.com/yasunori0418/layat](https://github.com/yasunori0418/layat)。配置先のパスも `flake.nix` に自分で書ける
- Dependabot（nix ecosystem）で `flake.lock` の更新 PR も出せる

</div>
</div>
</div>

---
layout: default
---

# 余談

<div class="h-9/10 flex flex-col">

- 本当は pnpm skills の話をするつもりだった
- 2026.11.03（登壇の2日前、作業日でいうと前日）に、Dependabot の APM 対応のニュースが飛び込んできた
  - pnpm skills の話をしている場合ではなくなった
- 泣く泣く APM の話を頑張りました 😭

<!-- 箇条書きより下の残り領域で上下中央に置く -->
<div class="flex-1 flex items-center justify-center">
<div v-click class="text-center text-2xl">

AI まわりは状況の変化が激しく、<br>前から準備していた話ができなくなるのはよくあるので、お気をつけて

</div>
</div>

</div>
