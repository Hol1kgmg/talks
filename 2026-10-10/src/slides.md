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

# 今回はサイズと配列の技術選定に絞ります

<div class="absolute bottom-8 right-10 text-sm op-60">
  形状が気になる人は、懇親会で聞きに来てください
</div>

---
layout: default
clicks: 2
---

# 技術選定 -サイズ-

<div class="flex flex-col h-5/6 text-center">
  <div class="flex-1 flex flex-col justify-center">
    <div class="text-3xl font-bold">業務効率化</div>
    <div class="grid transition-all duration-700 ease-out" :class="$clicks >= 1 ? 'grid-rows-[1fr] op-100' : 'grid-rows-[0fr] op-0'">
      <div class="overflow-hidden min-h-0">
        <div class="pt-4 text-2xl op-40">↓</div>
        <div class="pt-4 text-2xl">キーボードの業務効率化 = 「入力する」動作に集中すること</div>
      </div>
    </div>
    <div class="grid transition-all duration-700 ease-out delay-1200" :class="$clicks >= 1 ? 'grid-rows-[1fr] op-100' : 'grid-rows-[0fr] op-0'">
      <div class="overflow-hidden min-h-0">
        <div class="pt-4 text-2xl op-40">↓</div>
        <div class="pt-4 text-xl">一番大きなノイズは、キーを「見失う」こと</div>
      </div>
    </div>
  </div>
  <div v-click="2" class="mx-auto px-8 py-4 border-2 border-sky-200 rounded-xl text-2xl" style="transition-duration: 700ms">その結果、全てのキーがホームポジションの隣にある<br>40%サイズを選定するに至りました</div>
</div>

<!--
口頭で補う:
- 入力以外の動作はすべてノイズ。集中を妨げるもの
- 見失う → 探す → 視線が落ちる → 入力が止まる → 効率が落ちる
- +α: 動作の切り替えで生まれるストレスも消える
- 「隣」は上下左右・斜めを含む1キー分の距離
-->

---
layout: default
---

# おすすめの1台

<div class="flex h-5/6 items-center justify-center gap-16">
  <SharedImage src="images/epomaker-keyboard.webp" img-class="w-1/2 object-contain" />
  <div class="flex flex-col gap-5">
    <div class="text-3xl font-bold">Epomaker TH40</div>
    <div class="flex gap-3 text-base">
      <span class="px-3 py-1 rounded-full bg-sky-100">一体型</span>
      <span class="px-3 py-1 rounded-full bg-sky-100">40%</span>
      <span class="px-3 py-1 rounded-full bg-sky-100">通常配列</span>
    </div>
    <div class="text-2xl op-70">¥13,300</div>
    <SharedImage src="images/epomaker-keyboard-qrcode.webp" img-class="w-28 h-28" />
  </div>
</div>

<!--
口頭で補う:
- Amazonで買える。専門店に行かなくても通販で普通に買える
- 完成品なので組み立て・部品購入は不要
- 公式: https://epomaker.jp/ja/products/epomaker-th40
-->

---
layout: default
clicks: 2
---

# 技術選定 -配列-

<div class="flex flex-col h-9/10">
  <div class="flex flex-1 items-center justify-center gap-10 font-mono">
    <div
      v-for="([name, en], i) in [['通常配列（横ずれ）', 'Row Staggered'], ['縦ずれ配列', 'Column Staggered'], ['格子状配列', 'Ortholinear']]"
      :key="name"
      class="flex flex-col items-center transition-colors duration-500"
      :class="i === $clicks ? 'text-gray-700' : 'text-gray-300'"
    >
      <span class="text-3xl font-bold">{{ name }}</span>
      <span class="text-sm">{{ en }}</span>
    </div>
  </div>
  <div class="flex flex-col justify-center">
    <Keyboard layout="stagger" :step="$clicks" width="w-3/5" />
  </div>
  <div class="flex flex-1 items-center justify-center text-xl op-70">
    <Transition name="fade" mode="out-in">
      <span :key="$clicks">{{ ['行ごとに横へずれている。一般的なキーボード', '指の長さに合わせて、列ごとに縦へずれている。人間工学に基づいた配列', 'ずれがなく、縦横まっすぐ並んでいる'][$clicks] }}</span>
    </Transition>
  </div>
</div>

<style>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease-out; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>

<!--
口頭で補う:
- 通常配列はタイプライター時代の名残。アームが干渉しないようにずらした
- 縦ずれは指の長さに合わせるので、手を置いた形に近い
- 格子状は見た目どおり。慣れるまでは打ち間違えるが、構造が単純
-->

---
layout: default
clicks: 2
---

# 技術選定 -配列-

<div class="flex flex-col h-5/6 items-center justify-center gap-12">
  <!-- 列幅は最初から 4 列分固定。4 列目(カスタマイズ性)は空白にしておき、1 クリック目で中身だけフェードインする -->
  <!-- 各行は subgrid で親の列幅に揃え、行単位で赤枠を付けられるようにする -->
  <div class="grid w-4/5 text-2xl" style="grid-template-columns: max-content 1fr 1fr 1fr">
    <div
      v-for="(row, r) in [['', 'アクセスのしやすさ', '人気度（需要）', 'カスタマイズ性'], ['通常配列', '△', '◎', '△'], ['縦ずれ配列', '◎', '○', '○'], ['格子状配列', '○', '△', '◎']]"
      :key="row[0]"
      class="grid col-span-full items-center rounded-xl border-2 transition-colors duration-500"
      :class="[r === 0 ? 'text-lg op-70' : '', $clicks >= 2 && row[0] === '格子状配列' ? 'border-red-500' : 'border-transparent']"
      style="grid-template-columns: subgrid"
    >
      <div
        v-for="(cell, c) in row"
        :key="c"
        class="px-4 py-3 whitespace-nowrap transition-opacity duration-700"
        :class="[c === 0 ? 'text-left font-bold' : 'text-center', c === 3 && $clicks < 1 ? 'op-0' : 'op-100']"
      >{{ cell }}</div>
    </div>
  </div>
  <div v-click="2" class="px-8 py-4 border-2 border-sky-200 rounded-xl text-2xl" style="transition-duration: 700ms">カスタマイズ性を重視し、格子状配列を選定するに至りました</div>
</div>

<!--
口頭で補う:
- アクセスのしやすさ: 指の長さに合った縦ずれが最も楽。格子状は横ずれより良いが、小指列は遠い
- 人気度: 通常配列は市販品のほぼ全て。縦ずれは自作キーボード界隈で主流。格子状は選択肢が少ない
- この2軸なら縦ずれを選ぶのが順当。ここで「カスタマイズ性」を出す
- カスタマイズ性: キーが全部同じ形・同じ間隔なので、キーキャップ・キーマップ・分割など自分の配列(私のプロダクトのスライド)を自由に組める
- 縦ずれは指の長さ前提の配置なので、キーを入れ替えると前提が崩れる
-->

---
layout: center
class: text-center
---

# おまけ

---
layout: default
clicks: 3
---

# キーボード沼の話

<!-- クリック1: 傾けて3層に分解 / クリック2: 基板を点滅+ラベル / クリック3: 残り2層のラベル -->
<Keyboard3D :step="$clicks" width="w-4/5 mt-4" />

---
layout: center
class: text-center
---

# おしまい
