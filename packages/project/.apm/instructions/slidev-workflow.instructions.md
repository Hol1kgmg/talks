# Slidevスライド作成ワークフロー全般のルール

`rules/slidev-assets.md`（背景画像・共有アセット固有のルール）とは別に、スライド作成作業全般に関わるルールをここに集約する。

## 見た目の検証はユーザー（開発者）が行う
コード変更後の見た目（レイアウト崩れ、余白、画像の表示位置など）の確認は、ユーザーが`just dev`等のdevサーバーで実際に目視確認する。Claude側でPlaywright等のヘッドレスブラウザを使った自動レンダリング確認を行う必要はない（ユーザーから明示的に依頼された場合を除く）。

- ビルドが通ること（`npx slidev build` や `just build`）の確認まではClaude側で行ってよい
- 一時ビルド出力を作った場合は作業終了時に片付ける

## リンクカード（OGP画像）
各トークの `slides.md` headmatter には以下を入れる。`ogImage: auto` によりビルド時に1枚目のスライドが `<talk>/src/og-image.png` として生成され、`og:image` に使われる。

```yaml
seoMeta:
  ogDescription: <READMEの説明文と同じ一文>
  ogImage: auto
  twitterCard: summary_large_image
```

- `og:description` は `seoMeta.ogDescription` に書く。headmatter の `info` でも出力されるが、Slidevが `JSON.stringify` を通すため値が引用符で囲まれてしまうので使わない
- `og:url` / `og:type` / `og:site_name` は `scripts/build.ts` がベースパスと定数から注入するため、headmatterには書かない

- 生成された `<talk>/src/og-image.png` は**コミットする**。Slidevは既存ファイルがあれば再生成せずコピーするだけなので、Playwrightのブラウザが無いGitHub Actionsのビルド環境でも壊れない。1枚目を変更して画像を更新したい場合はこのファイルを削除して `just build` する
- Slidevは `og:image` を相対パスで出力する（初回生成時は `./og-image.png`、`src/og-image.png` がコミット済みならViteが `/<base>/assets/og-image-<hash>.png` に書き換える）。クローラーは絶対URLしか解釈しないため、`scripts/build.ts` がどちらの形式も本番URLに書き換えている
- og-image生成は固定ポート12445を使うため、`pnpm run build` のワークスペース並列度は1に固定している（`--workspace-concurrency=1`）。並列に戻すとポート衝突で失敗する
- トップページのカード画像は `scripts/assets/og-image.png`（1200x630）。`scripts/homepage.ts` が `dist/og-image.png` にコピーする

## PDFエクスポート（クリック状態の固定）
`just export`（各トークの `slidev export --per-slide`）では、各スライドが**最後のクリック状態**で1ページになる。`$clicks`・コードの行ハイライト `{*|…}`・magic-move・`v-click` はすべてそのスライドの最大クリック数で描画される（Slidev の print モードの仕様）。

- クリックで見た目が変わるスライドを作ったり変えたりしたときは、PDFでどのクリック状態を出すかをユーザーに確認する。最後の状態でよければ何もしない
- 最後以外の状態で出したいスライドには、`<PrintClicks :at="N" />` を1行置く（`reuse/components/PrintClicks.vue`）。PDF出力時だけそのスライドのクリック数を N に戻すので、発表時の動きは変わらない
  - 例: 0 = 最初の状態、5 = 5クリック目の状態
  - 見出しの直後に置き、意図が分かりにくい場合はHTMLコメントで添える（例: `<!-- PDF では型定義の窓を出す前（⑤まで）の状態にする -->`）
- export スクリプトには `--wait 1500` を必ず付ける。付けないと、前のスライドが消え切る前に撮影され、文字が半透明に重なったり、1つ前のスライドがそのまま写ったりする（全トーク共通で発生。2026-11 に確認）。新規トークの `package.json` でも同じ書き方にする
- エクスポートが通るところまではClaude側で確認してよい。ページの見た目の確認はユーザーが行う（上記「見た目の検証はユーザーが行う」と同じ）
