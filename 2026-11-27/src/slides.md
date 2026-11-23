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
title: Vercel の UI SDK と WebMCP の役割を整理する
seoMeta:
  ogDescription: "DMM meetup #41 ~DMM.go × Think! FrontEnd~。Vercel の UI SDK と WebMCP の役割の違いを整理する話"
  ogImage: auto
  twitterCard: summary_large_image
---

<!-- 目安: 自己紹介と合わせて30秒。全体の時間配分は memo.md の「時間配分」を参照 -->

# Vercel の UI SDK と WebMCP の役割を整理する

<div class="text-sm opacity-70">DMM meetup #41 ~DMM.go × Think! FrontEnd~</div>

2026.11.27

Hol1kgmg（ほりかわ）

---
layout: default
---

# 自己紹介

<SelfIntro />

---
layout: default
---

<!-- 目安: 20秒 -->

# AI エージェント向けのフロントエンド技術が増えている

<div class="h-4/5 flex items-center justify-center gap-10">
  <div class="w-80 rounded-xl border-2 border-gray-500 bg-white px-6 py-5 shadow">
    <div class="text-2xl font-bold">UI SDK</div>
    <div class="mt-2 text-sm opacity-70">Vercel Labs。2026年11月にベータ公開</div>
  </div>
  <div class="w-80 rounded-xl border-2 border-gray-500 bg-white px-6 py-5 shadow">
    <div class="text-2xl font-bold">WebMCP</div>
    <div class="mt-2 text-sm opacity-70">ブラウザの API。Chromium で実験中</div>
  </div>
</div>

---
layout: default
---

<!-- 目安: 25秒。TODO: 公式サイト（ui-sdk.dev）の英語の原文も添えるか検討 -->

# UI SDK の公式の説明

<div class="h-4/5 flex flex-col justify-center gap-8">

> エージェントが次世代のユーザーインターフェースを構築するための動作ライブラリ

- しかも **WebMCP に対応している**（`registerTools`）

</div>

---
layout: center
---

<!-- 目安: 10秒 -->

<div class="text-2xl font-bold">
  AI エージェント向けのフロントエンド技術が<br>
  AI エージェント向けのフロントエンド技術をサポートしている…???
</div>

<!-- TODO: ジョジョの1コマを `just image` で追加して差し替える -->
<div class="mx-auto mt-8 h-60 w-100 flex items-center justify-center border-2 border-dashed border-gray-400 text-sm opacity-60">
  画像（後で追加）
</div>

---
layout: section
---

<!-- 目安: 10秒 -->

# それぞれのざっくりした説明

---
layout: default
---

<!-- 目安: 40秒 -->

# UI SDK とは

<div class="h-4/5 flex flex-col justify-center">

- フォーカス移動・選択・ポップアップなど、UI の **動作** を提供するヘッドレス UI
  - UI 開発を助ける
- 各コンポーネントが、エージェントに許す **操作** を宣言する
- エージェントは **UI を通して** 操作する

</div>

---
layout: default
---

<!-- 目安: 35秒。2026-11-17 から流用 -->

# WebMCP とは

<PrintClicks :at="0" />

<SlideBody height="h-4/5" right-class="w-1/2 flex items-center justify-center">
<template #left>
<div class="h-full flex flex-col justify-center gap-4">

- ページが **ツール** を登録し、ブラウザの中のエージェントに呼ばせる API

```ts {*|1,8|3-5|6}
await document.modelContext.registerTool(
  {
    name: 'navigate',
    description: '…',
    inputSchema: { /* … */ },
    execute: async (input) => { /* … */ },
  },
  { signal },
)
```

</div>
</template>
<template #right>
<WebMcpFlow :step="$clicks" />
</template>
</SlideBody>

<div class="absolute bottom-10 right-12 text-xs opacity-60">
  ※ 実験段階。Chromium は <code>--enable-features=WebMCP</code> を付けたときだけ動く
</div>

---
layout: default
clicks: 1
---

<!-- 目安: 35秒。2026-11-17 から流用。hooks から WebMCP の枝が生えると、画面は同じまま AI にもツールが見える -->

# 既存のコードを活用できる

<SlideBody left-class="w-1/2 flex items-center justify-center" right-class="w-1/2 flex flex-col items-center justify-center gap-4">
<template #left>
<FrontendBranch :step="$clicks" />
</template>
<template #right>
<div>
  <div class="mb-2 text-center text-sm font-bold opacity-70">利用者から見えること</div>
  <EcScreen :lit="$clicks >= 1" delay="delay-1500" />
</div>
<div>
  <div class="mb-2 text-center text-sm font-bold opacity-70">AI から見えること</div>
  <div class="relative w-88 flex items-center gap-3 rounded-xl border-2 border-gray-500 bg-white px-5 py-3 text-sm shadow">
    <ph-robot-duotone class="text-xl" />
    <span class="opacity-50 transition-opacity duration-300" :class="$clicks >= 1 && 'opacity-0!'">使えるツール: なし</span>
    <div class="absolute left-14 flex gap-3 transition-opacity duration-500" :class="$clicks >= 1 ? 'opacity-100 delay-2000' : 'opacity-0'">
      <span class="flex items-center gap-1 rounded-full border border-sky-500 bg-white px-2 py-0.5 text-xs ring-2 ring-sky-500"><ph-magnifying-glass />search</span>
      <span class="flex items-center gap-1 rounded-full border border-sky-500 bg-white px-2 py-0.5 text-xs ring-2 ring-sky-500"><ph-shopping-cart />add_to_cart</span>
    </div>
  </div>
</div>
</template>
</SlideBody>

---
layout: section
---

<!-- 目安: 10秒 -->

# 役割の違い


---
layout: default
---

<!-- 目安: 45秒。前のスライドのフロー図の完成形に、UI SDK と WebMCP がつながる場所を足す -->

# 役割の違い

<SlideBody left-class="w-1/2 flex flex-col items-center justify-center gap-1" right-class="w-1/2 flex flex-col justify-center gap-6 pl-4">
<template #left>
<FrontendBranch :step="1">
<template #ui-badge>
  <!-- 通常の UI コンポーネントに UI SDK を付けていることを示すタグ -->
  <div class="absolute -left-3 -top-3 rounded border-2 border-violet-500 bg-white px-1.5 text-xs font-bold text-violet-600 shadow">UI SDK</div>
</template>
</FrontendBranch>
<!-- FrontendBranch の下段（w-96 の両端に w-44 の箱）に列をそろえる -->
<div class="w-96 flex justify-between text-sm">
  <div class="w-44" />
  <!-- WebMCP は上の registerTool そのものなので、箱は足さずラベルだけ置く -->
  <div class="w-44 text-center font-bold text-sky-600">WebMCP</div>
</div>
</template>
<template #right>
<div>
  <div class="font-bold text-violet-600">UI SDK → UI コンポーネント</div>
  <div class="text-sm opacity-70">UI を作り、エージェントに UI を通して操作させる</div>
</div>
<div>
  <div class="font-bold text-sky-600">WebMCP → hooks</div>
  <div class="text-sm opacity-70">UI の裏側の処理を、ツールとして直接渡す</div>
</div>
</template>
</SlideBody>

<div class="absolute bottom-10 right-12 text-xs opacity-60">
  ※ UI SDK の WebMCP 対応は、UI の操作（<code>snapshot</code> / <code>query</code> / <code>act</code>）を WebMCP のツールとして登録するもの
</div>

---
layout: default
---

<!-- 目安: 25秒 -->

# まとめ

- **UI SDK**: UI 開発を助けつつ、エージェントに UI をどう操作させるかを定義する
- **WebMCP**: 状態操作や hooks など、UI の裏側の処理を直接ツールとして渡す
- UI SDK の WebMCP 対応は、UI の操作をブラウザのエージェントに届ける経路として WebMCP を使うもの
