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
---

# 事例紹介


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
layout: default
---

# まとめ

- TODO
