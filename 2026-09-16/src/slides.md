---
layout: center
highlighter: shiki
css: unocss
colorSchema: light
transition: fade-out
mdc: true
lang: ja
title: anime.js v4.5.0 を実装で使う
---

# anime.js v4.5.0 を実装で使う

2026.09.16

Hol1kgmg(ほりかわ)

---
layout: default
---

# 自己紹介

<SelfIntro note="anime.js の性能持て余しがち" />

---
layout: default
---

# anime.js とは

**DOM を時間で動かす**ライブラリ

<SlideBody height="h-4/5" left-class="w-3/5 pr-8" right-class="w-2/5 flex items-center">
<template #left>

- 対象は**DOM要素・SVG・ただのJSオブジェクト**
- 値を補間する仕組みと、**時計・イージング・再生制御**を持つ

```js
animate('.box', {
  x: 100,
  rotate: 360,
  duration: 1000,
})
```

</template>
<template #right>

<DomBoxDemo />

</template>
</SlideBody>

---
layout: default
---

# Three.js とは

**3Dオブジェクトを画面に描く**ライブラリ

<SlideBody height="h-4/5" left-class="w-3/5 pr-8" right-class="w-2/5 flex items-center">
<template #left>

- 対象は`Mesh` / `Camera` / `Light`
- 描画は自前の`requestAnimationFrame`ループ。<br />値は**毎フレーム自分で更新する**

```js
const tick = () => {
  mesh.rotation.y += 0.01 // ラジアン
  renderer.render(scene, camera)
  requestAnimationFrame(tick)
}
```

</template>
<template #right>

<ThreeRawDemo />

</template>
</SlideBody>

---
layout: section
---

# v4.5.0 で adapter が来た

---
layout: default
---

# adapter は「読み方・書き方」を教える仕組み

- これまで`animate()`が動かせたのは、**anime.js が扱い方を知っているもの**（DOM要素など）だけ
- v4.5.0 で追加された`registerAdapter()`は、その**扱い方を自分で教えられる**APIになった
- 教えることは2つだけ。**その値をどう読むか**と、**どう書き込むか**

```js
import { registerAdapter } from 'animejs/adapters'

// ① どういうものを動かしたいか
const adapter = registerAdapter()
const speaker = adapter.registerTargetAdapter(t => t instanceof Speaker)

// ② その中の値の読み方・書き方
speaker.registerProperty('volume', s => s.volume, // 読む
  (s, value) => { s.volume = value }, // 書く
)

animate(speaker, { volume: 100, duration: 1000 }) // 動かせるようになる
```

---
layout: default
---

# three.js の分は公式が用意してくれている

前のページの登録作業を、three.js 向けに済ませたものが v4.5.0 に同梱された

```js
import { animate } from 'animejs'
import 'animejs/adapters/three' // 読み込むだけ。受け取る変数もいらない

animate(mesh, { x: 3, rotateY: 360, opacity: 0.3, color: ['#0af', '#f0a'] })
```

- 自分で`registerAdapter()`を書く必要はなく、**import を1行足すだけ**
- 以降は`mesh`・マテリアル・ライト・カメラ・音まで、そのまま`animate()`に渡せる
- 値を直接セットする`utils.set()`も同じように使えるようになる

---
layout: section
---

# Before → After

---
layout: default
---

# Before → After

````md magic-move {lines: true}
```js
const state = { x: 0, ry: 0 }

animate(state, {
  x: 100,
  ry: 360,
  duration: 1000,
  onUpdate: () => {
    mesh.position.x = state.x
    mesh.rotation.y = state.ry * Math.PI / 180
  },
})
```
```js
import 'animejs/adapters/three'

animate(mesh, {
  x: 100,
  rotateY: 360,
  duration: 1000,
})
```
````

<div class="mt-4 opacity-70">

ターゲットが`mesh`そのものになるので、**配列を渡す・`stagger`を使う**もそのまま効く

</div>

---
layout: section
---

# 何ができるか

---
layout: default
---

# 実例① Object3D を動かす

```js
animate(mesh, {
  x: [-3, 3], // [from, to]
  rotateY: 360,
  opacity: 0.3, // material に transparent: true が必要
  duration: 1200,
  ease: 'inOutSine',
  loop: true,
  alternate: true,
})
```

<ThreeDemo />

---
layout: default
---

# 実例② camera / light

```js {all|1|3}
animate(camera, { fov: [50, 30], duration: 1200 })

animate(spotLight, { intensity: [30, 150], color: ['#0af', '#f0a'], duration: 1200 })
```
<div class="my-8">
<ThreeCameraLightDemo :step="$clicks" />
</div>
<div class="mt-4 text-center opacity-70">
{{ [
  '2つ同時に動かす',
  'camera.fov — 画角が狭まる（setter が updateProjectionMatrix まで呼ぶ）',
  'spotLight.intensity / color — 光量と色',
][$clicks] }}
</div>

---
layout: section
---

# anime.js で three.js を使うと

---
layout: default
---

# DOM と 3D が同じ timeline に乗る

<NicoPlayerSlotDemo />

---
layout: default
---

# 裏側のコードの変化

````md magic-move {lines: true}
```js
const start = performance.now()

const tick = () => {
  const now = performance.now() - start

  // コメント (DOM): 出現時刻を過ぎたものだけ等速で流す
  comments.forEach((el, i) => {
    const t = (now - COMMENTS[i][0]) / 4200
    if (t < 0 || t > 1) return
    el.style.transform = `translateX(${w + (-el.offsetWidth - w) * t}px)`
  })

  // リール (3D): 等速 → 減速。イージングも度→ラジアンも自前
  groups.forEach((group, k) => {
    const d = (now - decelAt(k)) / DECEL
    const deg = d < 0
      ? DECEL_DEG + OMEGA * (now - decelAt(k))
      : DECEL_DEG * (1 - (1 - Math.min(d, 1)) ** 5) * -1 + DECEL_DEG
    group.rotation.x = deg * Math.PI / 180
  })

  requestAnimationFrame(tick)
}
```
```js
// コメント (DOM)
tl.add(commentEl, { x: [w, -commentEl.offsetWidth], duration: 4200, ease: 'linear' }, at)

// リール (3D) — 等速フェーズ / 減速フェーズ
tl.add(group, { rotateX: [start, DECEL_DEG], duration: decelAt(k), ease: 'linear' }, 0)
tl.add(group, { rotateX: [DECEL_DEG, 0], duration: DECEL, ease: 'outQuint' }, decelAt(k))
```
````

---
layout: section
---

# アニメーション表現の比較

---
layout: default
---

# Three.js のアニメーション

<div class="mt-10 text-sm">

  <div class="rounded border border-gray-400/40 p-3 mb-5" style="transform:rotate(-2.5deg);margin-left:0%;width:52%">
    <div class="flex items-center gap-2 text-sm">
      <span class="text-xl">💬</span>
      <span class="font-bold">コメント</span>
    </div>
    <div class="relative h-4 mt-2 op-50 text-xs">
      <span class="absolute -translate-x-1/2" style="left:0%">0s</span>
      <span class="absolute -translate-x-1/2" style="left:33%">2s</span>
      <span class="absolute -translate-x-1/2" style="left:66%">4s</span>
      <span class="absolute -translate-x-1/2" style="left:99%">6s</span>
    </div>
    <div class="relative h-6 rounded bg-gray-400/10">
      <div class="absolute inset-y-1 rounded-sm flex items-center justify-center whitespace-nowrap text-xs text-gray-900/80 bg-blue-400/70" style="left:0%;width:26%">流れる</div>
    </div>
  </div>

  <div class="rounded border border-gray-400/40 p-3 mb-5" style="transform:rotate(1.5deg);margin-left:26%;width:74%">
    <div class="flex items-center gap-2 text-sm">
      <span class="text-xl">🎰</span>
      <span class="font-bold">リール</span>
    </div>
    <div class="relative h-4 mt-2 op-50 text-xs">
      <span class="absolute -translate-x-1/2" style="left:0%">0s</span>
      <span class="absolute -translate-x-1/2" style="left:33%">4s</span>
      <span class="absolute -translate-x-1/2" style="left:66%">8s</span>
      <span class="absolute -translate-x-1/2" style="left:99%">12s</span>
    </div>
    <div class="relative h-6 rounded bg-gray-400/10">
      <div class="absolute inset-y-1 rounded-sm flex items-center justify-center whitespace-nowrap text-xs text-gray-900/80 bg-amber-400/70" style="left:0%;width:92%">回る</div>
    </div>
  </div>

  <div class="rounded border border-gray-400/40 p-3 mb-5" style="transform:rotate(-3.5deg);margin-left:12%;width:30%">
    <div class="flex items-center gap-2 text-sm">
      <span class="text-xl">🎊</span>
      <span class="font-bold">紙吹雪</span>
    </div>
    <div class="relative h-4 mt-2 op-50 text-xs">
      <span class="absolute -translate-x-1/2" style="left:0%">0s</span>
      <span class="absolute -translate-x-1/2" style="left:50%">0.5s</span>
      <span class="absolute -translate-x-1/2" style="left:99%">1s</span>
    </div>
    <div class="relative h-6 rounded bg-gray-400/10">
      <div class="absolute inset-y-1 rounded-sm flex items-center justify-center whitespace-nowrap text-xs text-gray-900/80 bg-pink-400/70" style="left:0%;width:60%">弾ける</div>
    </div>
  </div>

</div>

<div class="mt-8 text-center op-70">

基準となるものがthree.jsにない。**揃えるには JavaScript 側で時刻を計算する**

</div>

---
layout: default
---

# anime.js のアニメーション

<div class="mt-12 text-sm">

  <div class="flex">
    <div class="w-24" />
    <div class="relative flex-1 h-5 op-60 text-xs">
      <span class="absolute -translate-x-1/2" style="left:0%">0s</span>
      <span class="absolute -translate-x-1/2" style="left:22.2%">3s</span>
      <span class="absolute -translate-x-1/2" style="left:44.4%">6s</span>
      <span class="absolute -translate-x-1/2" style="left:66.7%">9s</span>
      <span class="absolute -translate-x-1/2" style="left:88.9%">12s</span>
    </div>
  </div>

  <div class="flex items-center mb-2">
    <div class="w-24 text-right pr-4 op-80">コメント</div>
    <div class="relative flex-1 h-7 rounded bg-gray-400/10">
      <div class="absolute inset-y-1 rounded-sm flex items-center justify-center whitespace-nowrap text-xs text-gray-900/80 bg-blue-400/70" style="left:0%;width:8%">流れる</div>
      <div class="absolute inset-y-1 rounded-sm flex items-center justify-center whitespace-nowrap text-xs text-gray-900/80 bg-blue-400/70" style="left:19.3%;width:8%">流れる</div>
      <div class="absolute inset-y-1 rounded-sm flex items-center justify-center whitespace-nowrap text-xs text-gray-900/80 bg-blue-400/70" style="left:40%;width:8%">流れる</div>
      <div class="absolute inset-y-1 rounded-sm flex items-center justify-center whitespace-nowrap text-xs text-gray-900/80 bg-blue-400/70" style="left:66%;width:8%">流れる</div>
      <div class="absolute inset-y-1 rounded-sm flex items-center justify-center whitespace-nowrap text-xs text-gray-900/80 bg-blue-400/70" style="left:90.4%;width:8%">流れる</div>
    </div>
  </div>

  <div class="flex items-center mb-2">
    <div class="w-24 text-right pr-4 op-80">リール左</div>
    <div class="relative flex-1 h-7 rounded bg-gray-400/10">
      <div class="absolute inset-y-1 rounded-sm flex items-center justify-center whitespace-nowrap text-xs text-gray-900/80 bg-amber-400/70" style="left:0%;width:38.5%">回る</div>
    </div>
  </div>

  <div class="flex items-center mb-2">
    <div class="w-24 text-right pr-4 op-80">リール中</div>
    <div class="relative flex-1 h-7 rounded bg-gray-400/10">
      <div class="absolute inset-y-1 rounded-sm flex items-center justify-center whitespace-nowrap text-xs text-gray-900/80 bg-amber-400/70" style="left:0%;width:64.4%">回る</div>
    </div>
  </div>

  <div class="flex items-center mb-2">
    <div class="w-24 text-right pr-4 op-80">リール右</div>
    <div class="relative flex-1 h-7 rounded bg-gray-400/10">
      <div class="absolute inset-y-1 rounded-sm flex items-center justify-center whitespace-nowrap text-xs text-gray-900/80 bg-amber-400/70" style="left:0%;width:90.4%">回る</div>
    </div>
  </div>

  <div class="flex items-center">
    <div class="w-24 text-right pr-4 op-80">紙吹雪</div>
    <div class="relative flex-1 h-7 rounded bg-gray-400/10">
      <div class="absolute inset-y-1 rounded-sm flex items-center justify-center whitespace-nowrap text-xs text-gray-900/80 bg-pink-400/70" style="left:90.4%;width:9.6%">弾ける</div>
    </div>
  </div>

</div>

<div class="mt-10 text-center op-70">

共通の時間軸が1つ。**いつ何が起きるかが1つのスケジュール上で構築される**

</div>

---
layout: section
---

# adapter にできないこと

---
layout: default
---

# adapter が拡張したのは「値の書き込み先」だけ

オブジェクトを動かす API（`animate` / `utils.set` / `createTimeline`）は使えるが、<br />
入力を扱う API（`createDraggable` / `onScroll`）は **DOM 専用のまま**

<div class="mt-16">
<DomOnlyDemo />
</div>

<div class="mt-10">
anime.js の面白い要素でもある「ユーザー操作と連動するアニメーション」は three.js adapter で対応していない
</div>

---
layout: default
---

# まとめ

<div class="grid grid-cols-2 gap-6 mt-10">

  <div class="rounded border border-gray-400/40 p-5">
    <div class="op-50">役割分担</div>
    <div class="mt-2 leading-relaxed">three.js は<b>3Dを描く</b>担当、<br />anime.js は<b>時間で動かす</b>担当</div>
  </div>
  <div class="rounded border border-gray-400/40 p-5">
    <div class="op-50">必要なのは<b>import 1行</b></div>
    <div class="mt-2 leading-relaxed">3DのオブジェクトをDOMと同じ書き方で渡せる</div>
  </div>
  <div class="rounded border border-gray-400/40 p-5">
    <div class="op-50">変わったこと</div>
    <div class="mt-2 leading-relaxed">バラバラに動いていたものを、1本の時間軸に並べて演出できる</div>
  </div>
  <div class="rounded border border-gray-400/40 p-5">
    <div class="op-50">限界</div>
    <div class="mt-2 leading-relaxed">つながったのは<b>動かす側だけ</b>。<br />ドラッグやスクロールは、いまもDOM専用</div>
  </div>

</div>
