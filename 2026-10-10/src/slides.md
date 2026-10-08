---
layout: center
highlighter: shiki
css: unocss
colorSchema: light
transition: fade-out
mdc: true
lang: ja
title: このPJ（キーボード）の技術選定についてレビューしてください
---

# このPJ（キーボード）の技術選定についてレビューしてください

2026.10.10

Hol1kgmg(ほりかわ)

---
layout: default
---

# 自己紹介

<SelfIntro />


---
layout: center
class: text-center
---

# 皆さんに質問です

---
layout: center
class: text-center
---

# 皆さんのPJ（キーボード）、技術選定していますか？

---
layout: center
class: text-center
---

# 今回は、技術選定をしていない人に<br>知見を共有する回です

---
layout: default
clicks: 9
---

# 私のプロダクト

<div class="flex flex-col h-9/10">
  <div class="flex flex-1 items-center justify-center">
    <KeyboardStateLabel :step="$clicks" />
  </div>
  <div class="flex flex-col justify-center">
    <Keyboard layout="morph" :step="$clicks" width="w-full" />
  </div>
  <div class="flex-1" />
</div>

---
layout: center
class: text-center
---

# キーボードの<ruby>技術選定<rt>こだわり</rt></ruby>

---
layout: center
class: text-center
clicks: 4
---

<KeyboardElements :step="$clicks" />

---
layout: center
class: text-center
---

# 形状 × サイズ × 配列、全部話すと<br>時間が足りません

---
layout: center
class: text-center
---

# 今回はサイズの技術選定に絞ります

<div class="absolute bottom-8 right-10 text-sm op-60">
  形状・配列が気になる人は、懇親会で聞きに来てください
</div>

---
layout: default
clicks: 2
---

# 40%サイズの技術選定

<div class="flex flex-col h-5/6 text-center">
  <div class="flex-1 flex flex-col justify-center">
    <div class="text-3xl font-bold">業務効率化</div>
    <div class="grid transition-all duration-700 ease-out" :class="$clicks >= 1 ? 'grid-rows-[1fr] op-100' : 'grid-rows-[0fr] op-0'">
      <div class="overflow-hidden min-h-0">
        <div class="pt-4 text-2xl op-40">↓</div>
        <div class="pt-4 text-2xl">「入力する」動作に専念する</div>
      </div>
    </div>
    <div class="grid transition-all duration-700 ease-out delay-1200" :class="$clicks >= 1 ? 'grid-rows-[1fr] op-100' : 'grid-rows-[0fr] op-0'">
      <div class="overflow-hidden min-h-0">
        <div class="pt-4 text-2xl op-40">↓</div>
        <div class="pt-4 text-xl">「入力する」から「探す」に動作を切り替えないこと</div>
      </div>
    </div>
  </div>
  <div v-click="2" class="mx-auto px-8 py-4 border-2 border-sky-200 rounded-xl text-2xl" style="transition-duration: 700ms">その結果、全てのキーがホームポジションの隣にある<br>40%サイズを選定するに至りました</div>
</div>

<!--
口頭で補う:
- 探す → 視線が落ちる → 入力が止まる → 効率が落ちる
- +α: 動作の切り替えで生まれるストレスも消える
- 「隣」は上下左右・斜めを含む1キー分の距離
-->

---
layout: default
---

# まとめ

- TODO
