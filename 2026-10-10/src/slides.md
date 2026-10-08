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
---

# 40%サイズを選んだ理由

- TODO

---
layout: default
---

# まとめ

- TODO
