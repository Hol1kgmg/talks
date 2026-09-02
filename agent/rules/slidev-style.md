# Slidevデフォルトスタイル

新規トークの`slides.md`を作成する際、特に指示がない限りこのスタイルをデフォルトとして使う。実例は`2026-08-06/src/`を参照。

## headmatter

```yaml
---
layout: center
highlighter: shiki
css: unocss
colorSchema: light
transition: fade-out
mdc: true
lang: ja
title: <トークタイトル>
---
```

- 1枚目（タイトルスライド）のレイアウトは`layout: cover`ではなく`layout: center`
- `colorSchema`は`light`をデフォルトにする
- タイトルスライドの本文には日付・登壇者名を直書きする（`reuse/intro.md`のinclude、`reuse/thanks.md`のincludeは使わない。末尾は通常の「まとめ」スライドで締める）

## レイアウト構成

- 本文スライドは基本`layout: default`
- 話題が切り替わる節目（新しい章に入るタイミング）には`layout: section`のスライドを挟み、短いフレーズだけを見出しとして置く
  - 例: 「欲しかったのは tmux ではない」「ツールを乗り換えてきた」のような、その章の主張・キャッチフレーズを1行で
  - 章立てされた内容全体に対し2〜3箇所程度が目安（内容量に応じて調整）

## 共有アセット

新規トーク作成時、以下のシンボリックリンクを作成する（詳細は[slidev-assets.md](./slidev-assets.md)参照）:

```
<talk>/src/components -> ../../reuse/components
<talk>/src/public/images/shared -> ../../../../reuse/images
```

さらに`<talk>/src/global-bottom.vue`を用意し、共有背景画像`slide-bg-under-light-blue.webp`を全スライド共通の背景として敷く:

```vue
<script setup lang="ts">
const bg = `${import.meta.env.BASE_URL}images/shared/slide-bg-under-light-blue.webp`
</script>

<template>
  <div
    class="fixed inset-0 -z-1"
    :style="{
      backgroundImage: `url(${bg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }"
  />
</template>
```

- スライド本文中で強調コメントを入れたい場合は`CornerComment`コンポーネントを使う（`reuse/components/CornerComment.vue`、詳細は[slidev-assets.md](./slidev-assets.md)参照）

## このスタイルから外れてよいケース

トークの内容上、上記構成が合わない場合（例: ダークテーマの方が映える内容、別の共有背景を使いたい等）はユーザーの指示に従って個別に調整する。このドキュメントは「特に指定がない場合のデフォルト」であり、絶対のルールではない。
