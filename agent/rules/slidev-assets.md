# Slidevアセット（背景画像・共有シンボリックリンク・共有コンポーネント）運用ルール

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
- 画像追加は`just share <path-to-image>`（`scripts/add-share.ts`）で`reuse/images/`に`.webp`変換して格納する。背景画像に限らず、トーク間で共有したい画像は全てこのコマンドを使う。個別トーク専用の画像は従来通り`just image`（`scripts/add-image.ts`）で`<talk>/src/public/images/`に格納する
- 新規トークを追加する際、共有背景を使う場合は`<talk>/src/public/images/shared`のシンボリックリンクを忘れずに作成する（相対パスの深さに注意: `<talk>/src/public/images/` から `reuse/images/` までは4階層上る）
- シンボリックリンクは`slidev build`（Viteのpublicディレクトリコピー）でも問題なく解決されることをローカルビルドで確認済み。ただしCloudflare Pagesのビルド環境でシンボリックリンクが正しく辿れるかは別途要検証（未確認事項として残っている）

## トーク間で共有するVueコンポーネント（シンボリックリンク運用）
Slidevは各トークの `<talk>/src/components/*.vue` を自動でグローバルコンポーネントとして読み込む（`@slidev/cli` の内部設定 `dirs: roots.map(i => join(i, "components"))` で確認済み）。この仕組みに乗せて、共有画像と同じシンボリックリンクのパターンでコンポーネントもトーク間再利用する。

```
reuse/components/                         # 実体（共通格納場所）
<talk>/src/components -> ../../reuse/components   # 各トークからのシンボリックリンク
```

- `<talk>/src/` から `reuse/components/` までは2階層上る（`../../reuse/components`）。共有画像用シンボリックリンク（4階層上る）とは深さが異なるので混同しないこと
- コンポーネントはslides.md内で `<ComponentName />` の形でそのまま使える（明示的なimportは不要）
- 現在用意している共通コンポーネント:
  - `CenterImage.vue`: 中央寄せの画像表示。`src` prop必須、`img-class` propで高さ/幅・余白を上書き（デフォルト `h-90 my-5`）
  - `CornerComment.vue`: コーナー配置のコメントテキスト（デフォルト右下）。`position` prop（`bottom-right` / `bottom-left` / `top-right` / `top-left`）、`height` propで親要素の高さを指定すると内部でflexにより端に寄せられる
  - `SlideBody.vue`: h1タイトル以外のコンテンツ領域を左右に配置するレイアウト。`left` / `right` の名前付きslot、`height`（デフォルト `h-9/10`）・`left-class` / `right-class`（デフォルト共に `w-1/2`、rightのみ `flex items-center`）propsで調整可能
  - `SelfIntro.vue`: 自己紹介スライドの本文（プロフィール画像・肩書き・SNSリンク）。固定内容で、`note` propに渡した一言だけが箇条書きの3項目目として追加される（未指定なら非表示）。使用例: `<SelfIntro note="anime.js は今回が初挑戦" />`
  - `SharedImage.vue`: 強制スタイルなしの汎用画像表示。`src` prop必須、`img-class` propでクラスを指定（デフォルト空文字）。`CenterImage`は`mx-auto object-contain`が常に付与され中央寄せの大きい画像向けなので、アイコンなどインライン表示したい小さい画像にはこちらを使う
- 新規トークを追加する際、これらのコンポーネントを使う場合は`<talk>/src/components`のシンボリックリンクを作成する
- 複数画像を組み合わせた複雑なレイアウト（アイコン+ラベルの並び等）は、パターンが定着するまで個別スライドごとにベタ書きし、汎用コンポーネント化は見送っている

### そのトーク専用のコンポーネントと共有コンポーネントを併存させたい場合
`<talk>/src/components`をディレクトリごとシンボリックリンクにすると、専用コンポーネントを置く場所がなくなる（symlink先の`reuse/components/`に書くと他トークにも公開されてしまう）。この場合は`<talk>/src/components`を実ディレクトリにし、共有コンポーネントは**サブディレクトリ単位**でシンボリックリンクする。

```
reuse/components/                                   # 実体（共通格納場所）
<talk>/src/components/                              # 実ディレクトリ（トーク専用コンポーネントを直接置く）
  shared -> ../../../reuse/components               # 共有コンポーネント群へのシンボリックリンク
  TerminalLayers.vue                                # このトーク専用コンポーネント（実ファイル）
```

- `<talk>/src/components/` から `reuse/components/` までは3階層上る（`../../../reuse/components`）。ディレクトリ全体をシンボリックリンクする通常パターン（2階層上る）とは基準ディレクトリが1段深くなる分、階層数が異なるので混同しないこと
- Slidevのコンポーネント自動読込（`unplugin-vue-components`）は`components/`配下をデフォルトで再帰的にスキャンするため、`components/shared/CenterImage.vue`のようにサブディレクトリに置かれていても`<CenterImage />`のようにファイル名だけで解決できる（`node_modules/@slidev/cli/dist/serve-*.mjs`の`createComponentsPlugin`で`deep`オプションを上書きしていないことを確認済み。デフォルトの`deep: true`が適用される）
- 実装例: `2026-09-08/src/components/TerminalLayers.vue`

## 検証手順の目安
`background`や共有アセットまわりの変更をした際は、`npx slidev build --base <base> --out <tmp-out>` でビルドが通ることまでは確認する。実際の見た目（背景が期待通り反映されているか等）はユーザーがdevサーバーで目視確認する（[slidev-workflow.md](./slidev-workflow.md)参照）。確認用に作った一時ビルド出力は片付ける。
