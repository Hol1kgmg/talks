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

<SelfIntro />

---
layout: default
---

# 配列の話は前回しました

<div class="h-4/5 flex flex-col items-center justify-center gap-6">
  <LinkCard
    url="https://talks.hol1kgmg.com/2026/keyboard-tech-stack-review/"
    image="images/keyboard-tech-stack-review-og.webp"
  />
  <div class="text-2xl">今回はキースイッチとキーキャップの話をします</div>
</div>

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
  <div>
    <div class="text-3xl font-bold">リニア</div>
    <div class="opacity-80">引っかかりがなく、底までまっすぐ沈む</div>
  </div>
  <div>
    <div class="text-3xl font-bold">40g</div>
    <div class="opacity-80">軽い力で入力できる</div>
  </div>
  <div>
    <div class="text-3xl font-bold">0.8mm / 2.0mm</div>
    <div class="opacity-80">浅く押すだけで反応し、ストロークも短い</div>
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
- TODO: 自分がこのスイッチを選んだ理由を口頭で補う
-->

---
layout: default
---

# スイッチのカスタマイズ

<div class="text-2xl">目指したのは、パンタグラフキーボードのような感触</div>

<SlideBody height="h-3/4" left-class="w-1/2 flex flex-col justify-center gap-4 pr-6" right-class="w-1/2 flex flex-col items-center justify-center">
<template #left>
  <div class="rounded-xl border-2 border-sky-200 bg-white/60 px-5 py-3 flex items-center gap-4">
    <div>
      <div class="text-xl font-bold">ワッシャーを入れる <span class="text-sm font-normal opacity-60">Rushbox Washer</span></div>
      <div class="mt-1">ストロークをさらに浅くし、打鍵感を固くする</div>
    </div>
    <div class="shrink-0 flex flex-col items-center">
      <SharedImage src="images/rushbox-washer.webp" img-class="w-20 h-20 rounded-lg object-cover" />
      <div class="text-[0.5rem] opacity-60">画像: モイメイト</div>
    </div>
  </div>
  <div class="rounded-xl border-2 border-sky-200 bg-white/60 px-5 py-3">
    <div class="text-xl font-bold">バネを強くする <span class="text-sm font-normal opacity-60">40g → 45g</span></div>
    <div class="mt-1">キーの戻りを調整し、余分な入力が送信されないようにする</div>
  </div>
</template>
<template #right>
  <SharedImage src="images/key-switch_spring.webp" img-class="w-full rounded-xl" />
  <div class="mt-1 text-xs opacity-60">バネやワッシャーの組み合わせを色々と試行錯誤している様子</div>
</template>
</SlideBody>

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

<!-- TODO: THT 98key White を選んだ理由 -->

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

<!-- TODO: Rushbox Washer の役割。キーキャップ側の話でなければ、この枚で話す内容を決める -->

---
layout: default
---

# まとめ

<!-- TODO: スイッチ・キーキャップそれぞれの「選んだ理由 → カスタマイズ」を振り返る -->
