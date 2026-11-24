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
title: 5分でわかるキーボードのカスタマイズ
seoMeta:
  ogDescription: "TechBull mini LT&交流会！#5。キースイッチとキーキャップを選んだ理由と、そこに加えたカスタマイズの話"
  ogImage: auto
  twitterCard: summary_large_image
---

# 5分でわかるキーボードのカスタマイズ

<div class="text-sm opacity-70">TechBull mini LT&交流会！#5</div>

2026.11.25

Hol1kgmg（ほりかわ）

---
layout: default
---

# 自己紹介

<SelfIntro note="今の愛用キーボードは使い始めてそろそろ1年" />

---
layout: default
---

# 私のキーボード

<div class="h-4/5 flex items-center justify-center">
  <LinkCard
    url="https://my-keyboard.hol1kgmg.com/"
    image="images/my-keyboard-og.webp"
  />
</div>

<!--
構成パーツ（サイトの「構成パーツ」欄と同じ）
- キット: GOFORTY V2
- キーキャップ: THT 98key White
- スイッチ: Kailh Glacial Silver Switch（バネを45gに入れ替え）
- ワッシャー: Rushbox Washer
-->

---
layout: default
---

# 配列の話は前回しました

<div class="h-4/5 flex flex-col items-center justify-center gap-6">
  <LinkCard
    url="https://talks.hol1kgmg.com/2026/keyboard-tech-stack-review/"
    image="images/keyboard-tech-stack-review-og.webp"
  />
  <div class="text-center">
    <div class="text-2xl">Magic Keyboard の配列が合わず、気に入った配列から基板を決めた</div>
  </div>
</div>

---
layout: default
---

# 今回伝えたいこと

<div class="h-4/5 flex items-center justify-center text-center">
  <div class="text-3xl font-bold">自作キーボードは、一から作らなくてもこだわりを追求できる</div>
</div>

---
layout: section
---

# 目指すのは<br>Magic Keyboard の打鍵感

---
layout: section
---

# キースイッチ

---
layout: default
---

# スイッチを選んだ理由

<SlideBody height="h-4/5" right-class="w-1/2 flex flex-col items-center justify-center">
<template #left>
<div class="h-full flex flex-col justify-center gap-6 pr-6">
  <div class="text-xl text-sky-600 font-bold">Magic Keyboard と同じ「浅くて軽い」</div>
  <div>
    <div class="text-3xl font-bold">リニア</div>
    <div class="opacity-80">引っかかりがなく、底までまっすぐ沈む</div>
  </div>
  <div>
    <div class="text-3xl font-bold">40g</div>
    <div class="opacity-80">軽い力で入力できる</div>
  </div>
  <div>
    <div class="text-3xl font-bold">作動点 0.8mm</div>
    <div class="opacity-80">底まで 2.0mm。浅く押すだけで反応する</div>
  </div>
</div>
</template>
<template #right>
  <SharedImage src="images/kailh-glacial-silver.webp" img-class="h-80 rounded-xl" />
  <div class="mt-1 text-xs opacity-60">Kailh Choc Switch V2 Glacial Silver（画像: 遊舎工房）</div>
</template>
</SlideBody>

<!--
- 作動点（Pre Travel）0.8mm、底まで（Total Travel）2.0mm
- Factory Lubed（出荷時にルブ済み）
- Magic Keyboard はパンタグラフ式で「浅くて軽い」キーボード。3項目はその分解
-->

---
layout: default
---

# スイッチのカスタマイズ

<!-- grid-template-rows を 0fr → 1fr に遷移させてカードを展開し、上の見出しを押し上げる -->
<div class="h-4/5 grid grid-cols-2 gap-10 text-center">
  <div class="flex flex-col items-center justify-center gap-2">
    <div class="text-2xl font-bold text-sky-600">パタパタした打鍵感の再現</div>
    <div class="opacity-70">現状: コトコト寄りで、跳ね返りが弱い</div>
    <div v-click class="w-full grid transition-all duration-500" :style="{ gridTemplateRows: $clicks >= 1 ? '1fr' : '0fr' }">
      <div class="overflow-hidden flex flex-col items-center gap-2">
        <div class="text-xl opacity-50">↓</div>
        <div class="w-full h-64 rounded-xl border-2 border-sky-200 bg-white/60 px-6 py-5 flex flex-col items-center justify-center gap-2">
          <SharedImage src="images/rushbox-washer.webp" img-class="h-28 rounded-lg object-cover" />
          <div class="text-xs opacity-60">Rushbox Washer（画像: モイメイト）</div>
          <div class="text-xl font-bold">ワッシャーを入れる</div>
          <div class="opacity-80">浅く固い底打ちで、跳ね返りを出す</div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-col items-center justify-center gap-2">
    <div class="text-2xl font-bold text-sky-600">打鍵時のストレスを軽減</div>
    <div class="opacity-70">現状: 40g は軽すぎて連続入力を誤検知する</div>
    <div v-click class="w-full grid transition-all duration-500" :style="{ gridTemplateRows: $clicks >= 2 ? '1fr' : '0fr' }">
      <div class="overflow-hidden flex flex-col items-center gap-2">
        <div class="text-xl opacity-50">↓</div>
        <div class="w-full h-64 rounded-xl border-2 border-sky-200 bg-white/60 px-6 py-5 flex flex-col items-center justify-center gap-2">
          <div class="h-24 flex items-center text-4xl font-bold">45g</div>
          <div class="text-xl font-bold">バネを強くする</div>
          <div class="opacity-80">キーの戻りを速くする</div>
        </div>
      </div>
    </div>
  </div>
</div>

<!--
目指すもの2つと、スイッチの現状を説明する

[click] ワッシャーでストロークを浅くする

[click] バネを強くする
- バネが弱いと、入力後に指を離すのが遅れる
- 離すのが遅れると、PC側がキーの長押し（連続入力）と誤検知して同じ文字が続けて入力される
- これが打鍵時のストレスの原因。45gに強くしてキーの戻りを速くし、誤検知を防いだ
-->


---
layout: section
---

# キーキャップ

---
layout: default
---

# キーキャップを選んだ理由

<SlideBody height="h-4/5" right-class="w-1/2 flex flex-col items-center justify-center">
<template #left>
<div class="h-full flex flex-col justify-center gap-6 pr-6">
  <div>
    <div class="text-3xl font-bold">湾曲した天面</div>
    <div class="opacity-80">指の腹にフィットする</div>
  </div>
  <div>
    <div class="text-3xl font-bold">薄い</div>
    <div class="opacity-80">ロープロファイルの打鍵感を保てる</div>
  </div>
</div>
</template>
<template #right>
  <SharedImage src="images/tht-98key-white.webp" img-class="h-80 rounded-xl" />
  <div class="mt-1 text-xs opacity-60">THT 98key White（画像: TALPKEYBOARD）</div>
</template>
</SlideBody>

---
layout: default
---

# キーキャップのカスタマイズ

<SlideBody height="h-4/5" right-class="w-1/2 flex flex-col items-center justify-center">
<template #left>
<div class="h-full flex flex-col justify-center gap-6 pr-6">
  <div>
    <div class="text-3xl font-bold">親指のホームポジション</div>
    <div class="opacity-80">無刻印のキーキャップには触って分かる目印がない</div>
  </div>
  <div>
    <div class="text-3xl font-bold">UV レジンで突起を作る</div>
    <div class="opacity-80">レジン液を少量垂らし、UV ライトで固める</div>
  </div>
  <div>
    <div class="text-3xl font-bold">タッチタイピングの精度向上</div>
    <div class="opacity-80">親指のホームポジションが触って分かる</div>
  </div>
  <div class="text-xs opacity-60">
    参考: <a href="https://www.eisbahn.jp/yoichiro/2020/09/ergodash_home_position.html" target="_blank">UVレジン液でキーキャップにホームポジションのポッチを作った話</a>
  </div>
</div>
</template>
<template #right>
  <SharedImage src="images/keycap-customize.webp" img-class="h-80 rounded-xl" />
</template>
</SlideBody>

---
layout: default
---

# まとめ

<div class="h-4/5 flex flex-col justify-center gap-10 text-xl text-center">
  <div class="text-2xl font-bold">既製パーツの選び方とひと手間で、Magic Keyboard の打鍵感に近づけられる</div>
  <div class="grid grid-cols-2 gap-10">
    <div class="h-40 rounded-xl border-2 border-sky-200 bg-white/60 px-6 py-5 flex flex-col items-center justify-center gap-2">
      <div class="text-2xl font-bold text-sky-600">キースイッチでこだわる要素</div>
      <div class="opacity-80">押し心地・重さ・押す深さ</div>
    </div>
    <div class="h-40 rounded-xl border-2 border-sky-200 bg-white/60 px-6 py-5 flex flex-col items-center justify-center gap-2">
      <div class="text-2xl font-bold text-sky-600">キーキャップでこだわる要素</div>
      <div class="opacity-80">形・高さ・指触り</div>
    </div>
  </div>
</div>
