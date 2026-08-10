---
layout: cover
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
mdc: true
lang: ja
title: このリポジトリについて
---

# このリポジトリについて

個人の登壇スライド管理リポジトリの紹介

---
src: '../../reuse/intro.md'
---

---
layout: default
---

# このリポジトリについて

- **Anthony Fu** 氏の [antfu/talks](https://github.com/antfu/talks) をforkして作成
- 個人の登壇資料を管理するために改造中
- ライセンスはAGPL-3.0を継承（forkである旨をLICENSEに明記）

---
layout: default
---

# 技術スタック

- **Slidev** — スライド作成
- **Vite** + **Vue** — スライドのビルド基盤
- pnpm workspace — 日付ディレクトリごとの資料をモノレポ管理
- **UnoCSS** — スタイリング
- mise — Node.js / pnpmのバージョン管理・タスクランナー
- Cloudflare Pages — デプロイ先

---
layout: default
---

# Slidevとは

- Markdownでスライドを書ける開発者向けプレゼンテーションツール
- コードハイライト・Vueコンポーネント埋め込みが可能
- `pnpm run dev` でブラウザ上にライブプレビュー

---
layout: default
---

# このリポジトリでできること（1）

- `YYYY-MM-DD/` ディレクトリ単位で登壇資料を管理
- `mise run dev` で資料ピッカーを起動し、対象の資料を選んで編集・プレビュー

---
layout: default
---

# このリポジトリでできること（2）

- `mise run build` で全資料をビルドし、Cloudflare Pages用の `_redirects` を生成
- `slidev export` でPDFエクスポートも可能

---
layout: default
---

# まとめ

- antfu氏のリポジトリ構成を活かしつつ、個人用スライド管理として運用開始
- 今後、内容・構成はどんどん改良していく予定

---
src: '../../reuse/thanks.md'
---
