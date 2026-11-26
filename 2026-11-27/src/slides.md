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

# この2つを掘り下げる

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
layout: default
clicks: 6
---

<!-- 目安: 40秒。WebMCP と hooks の話のあとに置く。ここではどの AI にも操作が見えるように見せておき、次のスライドで「見える AI には条件がある」と明かす -->

# UI SDK とは

<div class="text-sm opacity-70">フォーカス移動・選択・ポップアップなど、UI の「動作」を提供するヘッドレス UI</div>

<!-- 同じ検索欄を、左は UI SDK の動作（typeahead / popup / list）で作る流れ、右は宣言された操作が snapshot で見えて act で動かす流れで示す。API 名は画面に出さず口頭で補う。EcScreen の水色の光は WebMCP のツールの意味なので光らせない -->
<!-- クリック: 0 普通の EC / 1 検索欄に UI SDK を適用 / 2 開発者サイドを詳しく / 3 開発者サイド: 3つの動作が順に並ぶ / 4 開発者サイドを細くし、紫の検索欄の複製をユーザーサイドへ飛ばす（元の検索欄は薄くする） / 5 ユーザーサイド: 検索欄から矢印で3つの動作に分かれ、それぞれできる操作が見える / 6 両サイドの要約。左右の列の幅を変えて EC を寄せる。各列の中身は幅を固定して重ね、opacity で切り替える -->
<div class="relative h-4/5 flex items-center justify-center">
  <!-- クリック6: 両サイドの要約が出そろってから、まとめを1行出す -->
  <div class="absolute inset-x-0 bottom-8 text-center text-lg font-bold transition-opacity duration-500" :class="$clicks < 6 ? 'opacity-0' : 'delay-700'">分解した UI の要素から「何ができるか」を理解しやすくする基盤を提供する</div>
  <div class="relative h-full shrink-0 overflow-hidden transition-all duration-700" :class="$clicks < 2 ? 'w-0' : $clicks <= 3 ? 'w-104' : $clicks <= 5 ? 'w-16 opacity-40' : 'w-60'">
    <div class="absolute inset-y-0 right-0 w-104 flex items-center gap-2 pr-2 transition-opacity duration-500" :class="($clicks < 2 || $clicks > 3) && 'opacity-0'">
      <!-- ユーザーサイドと同じく、見出しと本文のまとまりの間を広げる -->
      <div class="flex-1 flex flex-col items-center gap-8 text-base">
        <div class="flex items-center gap-1 text-lg font-bold text-violet-600"><ph-code class="text-2xl" />実装サイドの AI</div>
        <div class="flex flex-col items-center gap-3">
        <div class="rounded-lg border border-gray-400 bg-white px-3 py-1">「検索欄を作って」</div>
        <ph-arrow-down class="text-violet-600" />
        <div class="font-bold">UI SDK の動作を組み合わせる</div>
        <!-- 3つの動作を簡易 UI で示し、クリック3で左から順に上からフェードインさせる。色と形はクリック1の候補リストにそろえる -->
        <div class="flex items-start justify-center gap-1 text-xs">
            <div class="flex flex-col items-center gap-1 transition-all duration-500" :class="$clicks < 3 && '-translate-y-4 opacity-0'">
              <div class="h-16 w-24 flex items-center justify-center rounded border-2 border-violet-500 bg-white">
                <div class="rounded border border-gray-400 px-1">スニ<span class="text-violet-600">|</span><span class="opacity-40">ーカー</span></div>
              </div>
              <div class="font-bold">入力補完</div>
            </div>
            <span class="mt-5 text-lg font-bold text-violet-600 transition-all duration-500 delay-300" :class="$clicks < 3 && '-translate-y-4 opacity-0'">+</span>
            <div class="flex flex-col items-center gap-1 transition-all duration-500 delay-300" :class="$clicks < 3 && '-translate-y-4 opacity-0'">
              <div class="relative h-16 w-24 rounded border-2 border-violet-500 bg-white">
                <div class="absolute left-3 top-2 h-3 w-14 rounded bg-gray-200" />
                <div class="absolute left-5 top-6 h-7 w-14 rounded border border-gray-400 bg-white shadow-md" />
              </div>
              <div class="font-bold">ポップアップ</div>
            </div>
            <span class="mt-5 text-lg font-bold text-violet-600 transition-all duration-500 delay-600" :class="$clicks < 3 && '-translate-y-4 opacity-0'">+</span>
            <div class="flex flex-col items-center gap-1 transition-all duration-500 delay-600" :class="$clicks < 3 && '-translate-y-4 opacity-0'">
              <div class="h-16 w-24 flex flex-col justify-center rounded border-2 border-violet-500 bg-white px-2 text-[10px] leading-tight">
                <div class="bg-violet-100 px-1">スニーカー</div>
                <div class="px-1">サンダル</div>
                <div class="px-1">ブーツ</div>
              </div>
              <div class="font-bold">候補リスト</div>
            </div>
        </div>
        <!-- 3枚目のカード（delay-600 + 0.5秒）が出終わってから出す。opacity-70 と opacity-0 がぶつからないよう外側でフェードさせる -->
        <div class="transition-opacity duration-500" :class="$clicks < 3 ? 'opacity-0' : 'delay-1100'">
          <div class="text-sm opacity-70">AI 向けの使い方ガイド付き</div>
        </div>
        </div>
      </div>
    </div>
    <div class="absolute inset-y-0 right-0 w-16 flex flex-col items-center justify-center gap-2 text-violet-600 transition-opacity duration-500" :class="($clicks < 4 || $clicks > 5) && 'opacity-0'">
      <ph-code class="text-2xl" />
      <div class="font-bold [writing-mode:vertical-rl]">実装サイド</div>
    </div>
    <div class="absolute inset-y-0 right-0 w-60 flex items-center gap-1 pr-2 transition-opacity duration-500" :class="$clicks < 6 && 'opacity-0'">
      <div class="flex-1 flex flex-col items-center gap-2 text-center text-base">
        <div class="flex items-center gap-1 font-bold text-violet-600"><ph-code class="text-xl" />実装サイドの AI</div>
        <div>UI SDK の動作を<br>組み合わせて作る</div>
      </div>
    </div>
  </div>
  <div class="relative shrink-0">
    <div class="absolute inset-x-0 -top-8 text-center text-sm font-bold text-violet-600 transition-opacity duration-500" :class="($clicks < 1 || $clicks >= 4) && 'opacity-0'">検索欄に UI SDK を適用</div>
    <EcScreen :lit="false" :sdk="$clicks < 1 ? undefined : ($clicks === 4 || $clicks === 5) ? 'faint' : 'on'" />
    <!-- 検索欄の真下に候補リスト（popup + list）を重ねる。位置は EcScreen のヘッダーに合わせた目測。クリック4・5は複製をユーザーサイドへ飛ばしているので薄くし、要約（6）で戻す -->
    <div class="absolute left-27 top-17 w-36 rounded border-2 border-violet-500 bg-white py-1 text-xs shadow-md transition-opacity duration-500" :class="$clicks < 1 ? 'opacity-0' : ($clicks === 4 || $clicks === 5) && 'opacity-30'">
      <div class="bg-violet-100 px-2">スニーカー</div>
      <div class="px-2">サンダル</div>
    </div>
    <!-- ユーザーサイドへ飛ばす検索欄の複製。EC の左上を基準に、クリック4の配置（左の列 w-16 + EC + 右の列 w-104）でユーザーサイドの「検索欄が着く場所」（h-18 の空き）へ動かす。到着位置（translate）は目測なので、ずれたらここを調整する。右の列が開き切る（0.7秒）のを待ってから動かす。クリック5はそのまま残し、要約（6）で消す -->
    <div class="pointer-events-none absolute left-26 top-9 z-10 w-36 text-xs transition-all duration-700" :class="$clicks < 4 ? 'opacity-0' : $clicks === 4 ? 'translate-x-[388px] -translate-y-[41px] delay-700' : $clicks === 5 ? 'translate-x-[388px] -translate-y-[41px]' : 'translate-x-[388px] -translate-y-[41px] opacity-0'">
      <div class="rounded-full border border-gray-400 bg-white px-2 py-0.5 ring-2 ring-violet-500"><ph-magnifying-glass class="inline" /> スニ<span class="text-violet-600">|</span></div>
      <div class="mt-1 rounded border-2 border-violet-500 bg-white py-1 shadow-md">
        <div class="bg-violet-100 px-2">スニーカー</div>
        <div class="px-2">サンダル</div>
      </div>
    </div>
  </div>
  <div class="relative h-full shrink-0 overflow-hidden transition-all duration-700" :class="$clicks < 4 ? 'w-0' : $clicks <= 5 ? 'w-104' : 'w-60'">
    <div class="absolute inset-y-0 left-0 w-104 flex items-center gap-2 pl-2 transition-opacity duration-500" :class="($clicks < 4 || $clicks > 5) && 'opacity-0'">
      <!-- 要素ごとの隙間は狭くし、まとまり（見出し / 検索欄〜3つの動作）の間を広げる -->
      <div class="flex-1 flex flex-col items-center gap-8 text-base">
        <div class="flex items-center gap-1 text-lg font-bold text-violet-600"><ph-robot-duotone class="text-2xl" />ユーザーサイドの AI</div>
        <div class="flex flex-col items-center gap-3">
        <!-- 飛んできた検索欄の複製（EC 側に置いている）が着く場所。高さは複製に合わせる -->
        <div class="h-18 shrink-0" />
        <!-- クリック5で、検索欄から矢印で3つの動作に分かれる。矢印とカードを1列ずつ、左から順に上からフェードインさせる。カードの絵は開発者サイドと同じ。添える操作は説明用の例 -->
        <div class="flex items-start justify-center gap-3 text-xs">
          <div class="flex flex-col items-center gap-1 transition-all duration-500" :class="$clicks < 5 && '-translate-y-4 opacity-0'">
            <ph-arrow-down-left-bold class="self-end text-lg text-violet-600" />
            <div class="h-12 w-24 flex items-center justify-center rounded border-2 border-violet-500 bg-white">
              <div class="rounded border border-gray-400 px-1">スニ<span class="text-violet-600">|</span><span class="opacity-40">ーカー</span></div>
            </div>
            <div class="font-bold">入力補完</div>
            <div class="text-violet-600">文字を入力</div>
          </div>
          <div class="flex flex-col items-center gap-1 transition-all duration-500 delay-300" :class="$clicks < 5 && '-translate-y-4 opacity-0'">
            <ph-arrow-down-bold class="text-lg text-violet-600" />
            <div class="relative h-12 w-24 rounded border-2 border-violet-500 bg-white">
              <div class="absolute left-3 top-1.5 h-2.5 w-14 rounded bg-gray-200" />
              <div class="absolute left-5 top-5 h-5 w-14 rounded border border-gray-400 bg-white shadow-md" />
            </div>
            <div class="font-bold">ポップアップ</div>
            <div class="text-violet-600">開く・閉じる</div>
          </div>
          <div class="flex flex-col items-center gap-1 transition-all duration-500 delay-600" :class="$clicks < 5 && '-translate-y-4 opacity-0'">
            <ph-arrow-down-right-bold class="self-start text-lg text-violet-600" />
            <div class="h-12 w-24 flex flex-col justify-center rounded border-2 border-violet-500 bg-white px-2 text-[10px] leading-tight">
              <div class="bg-violet-100 px-1">スニーカー</div>
              <div class="px-1">サンダル</div>
              <div class="px-1">ブーツ</div>
            </div>
            <div class="font-bold">候補リスト</div>
            <div class="text-violet-600">候補を選ぶ</div>
          </div>
        </div>
        <!-- 3列目（delay-600 + 0.5秒）が出終わってから出す -->
        <div class="font-bold transition-opacity duration-500" :class="$clicks < 5 ? 'opacity-0' : $clicks === 5 && 'delay-1100'">AI には部品と、できる操作が見える</div>
        </div>
      </div>
    </div>
    <div class="absolute inset-y-0 left-0 w-60 flex items-center gap-1 pl-2 transition-opacity duration-500" :class="$clicks < 6 && 'opacity-0'">
      <div class="flex-1 flex flex-col items-center gap-2 text-center text-base">
        <div class="flex items-center gap-1 font-bold text-violet-600"><ph-robot-duotone class="text-xl" />ユーザーサイドの AI</div>
        <div>部品ごとに、<br>できる操作が分かる</div>
      </div>
    </div>
  </div>
</div>

---
layout: default
clicks: 2
---

<!-- 目安: 30秒。前のスライドの「基盤を提供する」を受けて、でも分解した要素にアクセスできるのは、サイトのコードの中にいるサイトに組み込んだ AI（agentTools で受け取る）だけ。拡張機能などの外部の AI（ブラウザの AI）は、同じブラウザにいてもサイトの外なので、見えるのは画面だけ -->

# UI SDK の限界

<!-- クリック: 1 検索欄が3つの要素に分かれ、サイトに組み込んだ AI（ページ内のチャット）に見える / 2 ブラウザの横に拡張機能のパネルが開き、目の矢印がページの境目で弾かれる → ⊘ と「見えない」→ 2文目 -->
<!-- ブラウザは上端に寄せて少し空け、文はその下に余った高さ（1fr）の上下中央に置く。次のスライドも同じ形にして、ブラウザの位置をそろえる -->
<div class="h-11/12 grid grid-rows-[auto_1fr] justify-items-center">
  <div class="mt-8 overflow-hidden rounded-xl border-2 border-gray-500 bg-white text-sm shadow">
    <!-- EcScreen と同じウィンドウの上端 -->
    <div class="flex items-center gap-2 border-b border-gray-300 bg-gray-100 px-2 py-1">
      <div class="flex gap-1">
        <span class="h-2 w-2 rounded-full bg-red-400" /><span class="h-2 w-2 rounded-full bg-yellow-400" /><span class="h-2 w-2 rounded-full bg-green-400" />
      </div>
      <div class="flex-1 rounded bg-white px-2 text-[10px] opacity-60">shop.example</div>
    </div>
    <div class="relative flex">
      <!-- ページの右端（拡張機能のパネルとの境目）に ⊘ を出す。ページの幅（w-[26rem]）に合わせている -->
      <ph-prohibit-bold class="absolute left-[26rem] top-1/2 z-10 -ml-3 -mt-3 text-2xl text-red-500 transition-opacity duration-300" :class="$clicks < 2 ? 'opacity-0' : 'delay-1500'" />
      <div class="w-[26rem] flex flex-col items-center gap-1 px-6 py-4">
        <div class="w-40 rounded-full border border-gray-400 px-2 py-0.5 text-xs ring-2 ring-violet-500"><ph-magnifying-glass class="inline" /> 商品を検索</div>
        <!-- 9枚目のユーザーサイドと同じ分解。矢印とカードを1列ずつ、左から順に上からフェードインさせる -->
        <div class="flex items-start justify-center gap-3 text-xs">
          <div class="flex flex-col items-center gap-0.5 transition-all duration-500" :class="$clicks < 1 && '-translate-y-4 opacity-0'">
            <ph-arrow-down-left-bold class="self-end text-lg text-violet-600" />
            <div class="h-10 w-24 flex items-center justify-center rounded border-2 border-violet-500 bg-white">
              <div class="rounded border border-gray-400 px-1">スニ<span class="text-violet-600">|</span><span class="opacity-40">ーカー</span></div>
            </div>
            <div class="font-bold">入力補完</div>
          </div>
          <div class="flex flex-col items-center gap-0.5 transition-all duration-500 delay-300" :class="$clicks < 1 && '-translate-y-4 opacity-0'">
            <ph-arrow-down-bold class="text-lg text-violet-600" />
            <div class="relative h-10 w-24 rounded border-2 border-violet-500 bg-white">
              <div class="absolute left-3 top-1 h-2 w-14 rounded bg-gray-200" />
              <div class="absolute left-5 top-4 h-4 w-14 rounded border border-gray-400 bg-white shadow-md" />
            </div>
            <div class="font-bold">ポップアップ</div>
          </div>
          <div class="flex flex-col items-center gap-0.5 transition-all duration-500 delay-600" :class="$clicks < 1 && '-translate-y-4 opacity-0'">
            <ph-arrow-down-right-bold class="self-start text-lg text-violet-600" />
            <div class="h-10 w-24 flex flex-col justify-center rounded border-2 border-violet-500 bg-white px-2 text-[10px] leading-tight">
              <div class="bg-violet-100 px-1">スニーカー</div>
              <div class="px-1">サンダル</div>
            </div>
            <div class="font-bold">候補リスト</div>
          </div>
        </div>
        <!-- ページの中にいる AI。3列目（delay-600 + 0.5秒）が出終わってから出す -->
        <div class="mt-5 text-xs transition-opacity duration-500" :class="$clicks < 1 ? 'opacity-0' : $clicks === 1 && 'delay-1100'">
          <div class="flex items-center gap-1 font-bold"><ph-robot-duotone class="text-base" />サイトに組み込んだ AI</div>
          <div class="flex items-center gap-1 font-bold text-green-500"><ph-check-circle-bold />見える</div>
        </div>
      </div>
      <!-- ブラウザの横の拡張機能のパネル。クリック2で幅を開き、中身は幅を固定して隠しておく -->
      <div class="shrink-0 overflow-hidden bg-gray-50 transition-all duration-700" :class="$clicks < 2 ? 'w-0' : 'w-64 border-l-2 border-gray-300'">
        <div class="w-64 h-full flex flex-col gap-2 p-3 text-xs">
          <div class="flex items-center gap-1 font-bold"><ph-puzzle-piece class="text-base" />外部の AI（拡張機能）</div>
          <div class="self-end rounded-lg bg-gray-200 px-2 py-1 transition-opacity duration-500" :class="$clicks < 2 ? 'opacity-0' : 'delay-700'">スニーカーを探して</div>
          <!-- 目の矢印がページの境目へ進んでぶつかり、跳ね返る（下の style の poke）。パネルが開き切ってから動かす -->
          <!-- 次のスライドで目の矢印の下に WebMCP の橋が入るので、同じ高さ（h-5）を空けて行の位置をそろえる -->
          <div class="flex flex-col gap-0.5">
            <div class="flex text-xl opacity-60" :class="$clicks < 2 ? 'opacity-0' : 'poke'"><ph-arrow-left-bold /><ph-eye /></div>
            <div class="h-5" />
          </div>
          <div class="flex items-start gap-1 transition-opacity duration-500" :class="$clicks < 2 ? 'opacity-0' : 'delay-1800'">
            <ph-robot-duotone class="shrink-0 text-base" />
            <div class="rounded-lg border border-gray-300 bg-white px-2 py-1">画面から推測します…</div>
          </div>
          <div class="flex items-center gap-1 font-bold text-red-500 transition-opacity duration-500" :class="$clicks < 2 ? 'opacity-0' : 'delay-1800'"><ph-x-circle-bold />見えない（見えるのは画面だけ）</div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex items-center">
    <div class="text-xl font-bold transition-opacity duration-500" :class="$clicks < 2 ? 'opacity-0' : 'delay-2300'">でも、分解した UI の要素にアクセスできるのは、サイトに組み込んだ AI だけ</div>
  </div>
</div>

<style>
/* パネルの中からページの境目（左へ padding 分）へ進み、ぶつかって少し跳ね返った位置で止まる。開始はパネルが開き切った後（1秒） */
@keyframes poke {
  0% { transform: translateX(40px); opacity: 0; }
  20% { opacity: 0.6; }
  60% { transform: translateX(-10px); }
  80% { transform: translateX(8px); }
  100% { transform: translateX(4px); opacity: 0.6; }
}
.poke { animation: poke 0.9s ease-out 1s both; }
</style>

---
layout: default
clicks: 2
---

<!-- 目安: 40秒。5枚目の「???」に答える。前のスライドで弾かれた外部の AI に、WebMCP が橋を架ける。UI SDK の registerTools は UI の操作を document.modelContext.registerTool で WebMCP のツールとして登録するので、分解した UI の要素が外部の AI にも届く。実際に登録されるツールは snapshot / query / act の3つで、チップは届く操作の例 -->

# UI SDK が WebMCP に対応している…???

<!-- 前のスライドの最後の状態から始める。ウィンドウのマークアップは前のスライドの複製
クリック:
1: ⊘ が消え、境目に WebMCP の橋が伸びる → 目の矢印が橋を渡ってページへ → 3つの操作がチップになってパネルへ流れ込む → ✗ が ✓ に変わる
2: 答えの1文
-->
<!-- 前のスライドと同じ2段のグリッド -->
<div class="h-11/12 grid grid-rows-[auto_1fr] justify-items-center">
  <div class="mt-8 overflow-hidden rounded-xl border-2 border-gray-500 bg-white text-sm shadow">
    <div class="flex items-center gap-2 border-b border-gray-300 bg-gray-100 px-2 py-1">
      <div class="flex gap-1">
        <span class="h-2 w-2 rounded-full bg-red-400" /><span class="h-2 w-2 rounded-full bg-yellow-400" /><span class="h-2 w-2 rounded-full bg-green-400" />
      </div>
      <div class="flex-1 rounded bg-white px-2 text-[10px] opacity-60">shop.example</div>
    </div>
    <div class="relative flex">
      <ph-prohibit-bold class="absolute left-[26rem] top-1/2 z-10 -ml-3 -mt-3 text-2xl text-red-500 transition-opacity duration-300" :class="$clicks >= 1 && 'opacity-0'" />
      <div class="w-[26rem] flex flex-col items-center gap-1 px-6 py-4">
        <div class="w-40 rounded-full border border-gray-400 px-2 py-0.5 text-xs ring-2 ring-violet-500"><ph-magnifying-glass class="inline" /> 商品を検索</div>
        <div class="flex items-start justify-center gap-3 text-xs">
          <div class="flex flex-col items-center gap-0.5">
            <ph-arrow-down-left-bold class="self-end text-lg text-violet-600" />
            <div class="h-10 w-24 flex items-center justify-center rounded border-2 border-violet-500 bg-white">
              <div class="rounded border border-gray-400 px-1">スニ<span class="text-violet-600">|</span><span class="opacity-40">ーカー</span></div>
            </div>
            <div class="font-bold">入力補完</div>
          </div>
          <div class="flex flex-col items-center gap-0.5">
            <ph-arrow-down-bold class="text-lg text-violet-600" />
            <div class="relative h-10 w-24 rounded border-2 border-violet-500 bg-white">
              <div class="absolute left-3 top-1 h-2 w-14 rounded bg-gray-200" />
              <div class="absolute left-5 top-4 h-4 w-14 rounded border border-gray-400 bg-white shadow-md" />
            </div>
            <div class="font-bold">ポップアップ</div>
          </div>
          <div class="flex flex-col items-center gap-0.5">
            <ph-arrow-down-right-bold class="self-start text-lg text-violet-600" />
            <div class="h-10 w-24 flex flex-col justify-center rounded border-2 border-violet-500 bg-white px-2 text-[10px] leading-tight">
              <div class="bg-violet-100 px-1">スニーカー</div>
              <div class="px-1">サンダル</div>
            </div>
            <div class="font-bold">候補リスト</div>
          </div>
        </div>
        <div class="mt-5 text-xs">
          <div class="flex items-center gap-1 font-bold"><ph-robot-duotone class="text-base" />サイトに組み込んだ AI</div>
          <div class="flex items-center gap-1 font-bold text-green-500"><ph-check-circle-bold />見える</div>
        </div>
      </div>
      <div class="w-64 shrink-0 border-l-2 border-gray-300 bg-gray-50">
        <div class="h-full flex flex-col gap-2 p-3 text-xs">
          <div class="flex items-center gap-1 font-bold"><ph-puzzle-piece class="text-base" />外部の AI（拡張機能）</div>
          <div class="self-end rounded-lg bg-gray-200 px-2 py-1">スニーカーを探して</div>
          <!-- 目の矢印は、前のスライドで弾かれた位置から、橋が伸び切ったら（1秒）橋の上を渡ってページへ消えていく（下の style の cross） -->
          <div class="flex flex-col gap-0.5">
            <div class="flex text-xl" :class="$clicks >= 1 ? 'cross' : 'translate-x-1 opacity-60'"><ph-arrow-left-bold /><ph-eye /></div>
            <!-- 目の矢印のすぐ下に WebMCP の橋を置く。パネルの左端から境目を越えてページへ少しはみ出す（-left-6） -->
            <div class="relative h-5">
              <div class="absolute -left-6 inset-y-0 w-36 origin-left flex items-center justify-center rounded-full bg-sky-500 text-xs font-bold text-white shadow transition-transform duration-700" :class="$clicks < 1 ? 'scale-x-0' : 'delay-300'">WebMCP</div>
            </div>
          </div>
          <!-- 「推測します」と、橋を渡ってくる3つの操作を同じ位置に重ねて入れ替える -->
          <div class="grid [&>*]:col-start-1 [&>*]:row-start-1">
            <div class="flex items-start gap-1 transition-opacity duration-300" :class="$clicks >= 1 && 'opacity-0 delay-1500'">
              <ph-robot-duotone class="shrink-0 text-base" />
              <div class="rounded-lg border border-gray-300 bg-white px-2 py-1">画面から推測します…</div>
            </div>
            <div class="flex flex-wrap gap-1">
              <span class="rounded-full border border-violet-500 bg-white px-1.5 py-0.5 ring-1 ring-violet-500 transition-all duration-500" :class="$clicks < 1 ? '-translate-x-12 opacity-0' : 'delay-1800'">文字を入力</span>
              <span class="rounded-full border border-violet-500 bg-white px-1.5 py-0.5 ring-1 ring-violet-500 transition-all duration-500" :class="$clicks < 1 ? '-translate-x-12 opacity-0' : 'delay-2000'">開く・閉じる</span>
              <span class="rounded-full border border-violet-500 bg-white px-1.5 py-0.5 ring-1 ring-violet-500 transition-all duration-500" :class="$clicks < 1 ? '-translate-x-12 opacity-0' : 'delay-2200'">候補を選ぶ</span>
            </div>
          </div>
          <div class="grid font-bold [&>*]:col-start-1 [&>*]:row-start-1">
            <div class="flex items-center gap-1 text-red-500 transition-opacity duration-300" :class="$clicks >= 1 && 'opacity-0 delay-2700'"><ph-x-circle-bold />見えない（見えるのは画面だけ）</div>
            <div class="flex items-center gap-1 text-green-500 transition-opacity duration-500" :class="$clicks < 1 ? 'opacity-0' : 'delay-2700'"><ph-check-circle-bold />見える</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex items-center">
    <div class="text-2xl font-bold text-center transition-opacity duration-500" :class="$clicks < 2 && 'opacity-0'">
      <div>UI SDK の WebMCP 対応</div>
      <div class="text-xl leading-none opacity-60"><span class="inline-block rotate-90">=</span></div>
      <div>分解した UI の要素を、外部の AI にも渡す</div>
    </div>
  </div>
</div>

<style>
/* 弾かれて止まった位置（translate-x-1）から、橋の上を渡ってページ側へ進み、消える */
@keyframes cross {
  0% { transform: translateX(4px); opacity: 0.6; }
  80% { opacity: 0.6; }
  100% { transform: translateX(-80px); opacity: 0; }
}
.cross { animation: cross 0.8s ease-in 1s both; }
</style>
