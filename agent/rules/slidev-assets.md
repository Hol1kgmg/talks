# Slidevアセット（背景画像・共有シンボリックリンク）運用ルール

## 背景画像（`background`フロントマター）の制約
`@slidev/theme-default` および `@slidev/client` のビルトインレイアウトのうち、`background`フロントマターを実際に読み込んで描画するのは以下のレイアウトのみ:

- `cover`
- `image`
- `image-left`
- `image-right`

`default` / `center` / `section` / `intro` / `fact` / `quote` / `statement` などは`background`プロパティを一切参照しないため、これらのレイアウトのスライドでheadmatterやfrontmatterに`background:`を書いても**サイレントに無視される**（エラーにもならない）。

根拠: `node_modules/@slidev/theme-default/layouts/*.vue` と `node_modules/@slidev/client/layouts/*.vue` を`background`でgrepし、上記4レイアウトの`.vue`ファイルにのみ`handleBackground()`の呼び出しがあることを確認済み。

## 全スライド共通で背景を敷きたい場合
`background`フロントマターに頼らず、Slidevの**グローバルレイヤー機能**（`global-bottom.vue` / `global-top.vue`）を使う。これはレイアウトに関係なく毎スライドの最背面/最前面に描画され、`import.meta.env.BASE_URL`で本番のbaseパス（例: `/2026/<slug>/`）にも正しく追従する。

配置場所: `<talk>/src/global-bottom.vue`（Slidevが自動検出・自動ロードするため、明示的な登録は不要）

```vue
<script setup lang="ts">
const bg = `${import.meta.env.BASE_URL}images/shared/<file>.webp`
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

特定の1枚だけ背景を変えたい場合に限り、そのスライドが`cover`/`image`系レイアウトであることを確認した上でfrontmatterの`background:`を使う。それ以外のレイアウトで指定しても効かない点を必ず確認してから提案すること。

## トーク間で共有する背景画像（シンボリックリンク運用）
複数トーク（`YYYY-MM-DD/`ディレクトリ）で同じ背景画像を使い回すための構成:

```
reuse/images/                          # 実体（共通格納場所）
<talk>/src/public/images/shared -> ../../../../reuse/images   # 各トークからのシンボリックリンク
```

- 参照時のパスは常に `/images/shared/<file>.webp`（Slidevのpublicアセット解決に乗るため、`background`frontmatter・`global-bottom.vue`のどちらからも同じ書き方で参照できる）
- 画像追加は`mise run share <path-to-image>`（`scripts/add-share.ts`）で`reuse/images/`に`.webp`変換して格納する。背景画像に限らず、トーク間で共有したい画像は全てこのコマンドを使う。個別トーク専用の画像は従来通り`mise run image`（`scripts/add-image.ts`）で`<talk>/src/public/images/`に格納する
- 新規トークを追加する際、共有背景を使う場合は`<talk>/src/public/images/shared`のシンボリックリンクを忘れずに作成する（相対パスの深さに注意: `<talk>/src/public/images/` から `reuse/images/` までは4階層上る）
- シンボリックリンクは`slidev build`（Viteのpublicディレクトリコピー）でも問題なく解決されることをローカルビルドで確認済み。ただしCloudflare Pagesのビルド環境でシンボリックリンクが正しく辿れるかは別途要検証（未確認事項として残っている）

## 検証手順の目安
`background`や共有アセットまわりの変更をした際は、以下で実際に反映されているかまで確認してから完了報告すること（devサーバーのHTML出力はSPAのため`curl`だけでは判定できない）。

1. `npx slidev build --base <base> --out <tmp-out>` でビルドが通ることを確認
2. 必要なら`playwright-chromium`（devDependenciesに既存）でヘッドレスレンダリングし、`getComputedStyle(el).backgroundImage`が期待通りか確認
3. 確認用に作った一時ビルド出力（`dist-test/`等）は`.gitignore`対象であることを確認しつつ、可能なら片付ける
