---
layout: center
highlighter: shiki
css: unocss
colorSchema: light
transition: fade-out
mdc: true
lang: ja
title: dotfilesの世界から覗くランチャーアプリ
---

# dotfilesの世界から覗くランチャーアプリ

2026.08.06 新卒N年目の勉強会&交流会

Hol1kgmg

---
layout: default
---

# 自己紹介

- 名前: Hol1kgmg(ほりかわ)
- 新卒N年目 （N = 3）
- 好きなもの: キーボード、コーヒー

---
layout: default
---

# `brew list` の中身は見たことありますか？

<!-- macOS中心の話になる旨の断りを入れる -->

<CenterImage src="/images/brew-list-terminal.webp" />

---
layout: default
---

# 自分の場合はこんな感じでした

<CenterImage src="/images/brew-list-result.webp" />

<CornerComment>
  ......き、汚い
</CornerComment>

---
layout: section
---

# 「どれに何を使っているのか」わからない

---
layout: default
---

# dotfilesとは

- 自分のPC環境を宣言的に管理する手法
  - `~/.config/` などの設定ファイルを、最初からGitで管理してしまおうというもの

<div class="grid grid-cols-2 gap-4 mt-4">
  <img src="/images/dotfiles-directory.webp" class="mx-auto h-60 object-contain" />
  <img src="/images/dotfiles-logo.webp" class="mx-auto h-60 object-contain" />
</div>

---
layout: default
---

# Githubで管理するということは

- 環境ファイルをAIエージェントに見せて相談できる

<div class="flex flex-col items-center gap-8 mt-8">
  <img src="/images/dotfiles-logo.webp" class="w-60 object-contain" />
  <img src="/images/claude-code.svg" class="w-80 object-contain" />
</div>

---
layout: section
---

# ランチャーアプリ

---
layout: default
---

# ランチャーアプリとは

- 簡単に言えば、PC操作を検索ベースで実行できるツール

<CenterImage src="/images/raycast-screenshot.webp" />

---
layout: default
---

# Raycast

- 高い人気度を誇るランチャーアプリ

<CenterImage src="/images/raycast-introduction.webp" />
<!-- raycastのスクショ画像 -->

---
layout: default
---

# Raycastの弱点

- とにかく使いやすいが、configファイルサポートがされていない
  - バイナリデータとして管理されている

<CenterImage src="/images/binary-file-icon.webp" img-class="h-50 mt-20" />

---
layout: default
---

# 3つのランチャーアプリ

<div class="flex justify-center gap-25 mt-20">
    <div class="flex flex-col items-center gap-4">
        <div class="text-3xl">Raycast</div>
        <img src="/images/raycast-icon.webp" class="mx-auto w-50 object-contain" />
    </div>
    <div class="flex flex-col items-center gap-4">
        <div class="text-3xl">tuna</div>
        <img src="/images/tuna-icon.webp" class="mx-auto w-50 object-contain" />
    </div>
    <div class="flex flex-col items-center gap-4">
        <div class="text-3xl">Vicinae</div>
        <img src="/images/vicinae-icon.webp" class="mx-auto w-50 object-contain" />
    </div>
</div> 

---
layout: default
---

# Raycast

- ずっと人気。VSCodeのように拡張機能が作られているエコシステム
  - 2000個以上
- これを使えばまず間違いなし。何でもできる万能感

<CenterImage src="/images/raycast-store.webp" img-class="mt-5 h-75" />

---
layout: default
---

# Tuna

- 6月末ごろから話題のSwift製アプリ
  - 現在はβ版
  - 「何のアプリ」×「何をする」の主語・述語2要素で超シンプル
- 設定ファイルで管理できる

<CenterImage src="/images/tuna-demo.webp" img-class="mt-5 h-70" />

---
layout: default
---

# Tuna

- OSSではなくコミュニティがDiscord
- brewでインストールはできるけど😢

<div class="flex items-center">
    <img src="/images/github-icon-red-cross.webp" class="mx-auto mt-10 h-50 object-contain" />
    <img src="/images/tuna-homebrew.webp" class="mx-auto mt-10 w-100 object-contain" />
</div>

---
layout: default
---

# Vicinae

<SlideBody>
<template #left>

- C++製、Raycastにかなり近い
  - β版
  - 最近Windows OSにも対応
- Raycastの拡張機能が使える
- 設定ファイル管理可能

</template>
<template #right>
<img src="/images/vicinae-screenshot.webp" class="rounded object-contain">
</template>
</SlideBody>

---
layout: default
---

# Vicinae

- ハードルが高い
  - ドキュメントがまだ不十分
  - ランチャーアプリを初めて触る人には多分厳しい

<!-- 右下にコメント的なテキスト表示 -->
<CornerComment height="h-75">
    手探りでconfigファイル作成頑張りました
</CornerComment>


---
layout: default
---

# まとめ

- 個人的には最近Vicinaeを使い始めて満足している
  - ただ、人に薦めるのは難しいところ
- まずはRaycastを触って、ランチャーアプリの魅力に触れるのがおすすめ
- 設定ファイル管理可能なランチャーアプリの選択肢はまだ少ない

<!-- dotfilesにハマった時に、今回のLTを思い出してくれると嬉しい-->

---
layout: default
---

# おまけ

- macOS Tahoe 26からSpotlightが強化
  - クリップボード履歴なども遡れるようになった
- 人によってはそもそもRaycastすらいらないかもしれない

<CenterImage src="/images/spotlight-clipboard-history.webp" img-class="w-200 mt-15" />

