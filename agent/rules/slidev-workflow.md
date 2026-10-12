# Slidevスライド作成ワークフロー全般のルール

`agent/rules/slidev-assets.md`（背景画像・共有アセット固有のルール）とは別に、スライド作成作業全般に関わるルールをここに集約する。

## 見た目の検証はユーザー（開発者）が行う
コード変更後の見た目（レイアウト崩れ、余白、画像の表示位置など）の確認は、ユーザーが`just dev`等のdevサーバーで実際に目視確認する。Claude側でPlaywright等のヘッドレスブラウザを使った自動レンダリング確認を行う必要はない（ユーザーから明示的に依頼された場合を除く）。

- ビルドが通ること（`npx slidev build` や `just build`）の確認まではClaude側で行ってよい
- 一時ビルド出力を作った場合は作業終了時に片付ける

## リンクカード（OGP画像）
各トークの `slides.md` headmatter には以下を入れる。`ogImage: auto` によりビルド時に1枚目のスライドが `<talk>/src/og-image.png` として生成され、`og:image` に使われる。

```yaml
seoMeta:
  ogImage: auto
  twitterCard: summary_large_image
```

- 生成された `<talk>/src/og-image.png` は**コミットする**。Slidevは既存ファイルがあれば再生成せずコピーするだけなので、Playwrightのブラウザが無いCloudflare Pagesのビルド環境でも壊れない。1枚目を変更して画像を更新したい場合はこのファイルを削除して `just build` する
- Slidevは `og:image` を相対パスで出力する（初回生成時は `./og-image.png`、`src/og-image.png` がコミット済みならViteが `/<base>/assets/og-image-<hash>.png` に書き換える）。クローラーは絶対URLしか解釈しないため、`scripts/build.ts` がどちらの形式も本番URLに書き換えている
- og-image生成は固定ポート12445を使うため、`pnpm run build` のワークスペース並列度は1に固定している（`--workspace-concurrency=1`）。並列に戻すとポート衝突で失敗する
- トップページのカード画像は `scripts/assets/og-image.png`（1200x630）。`scripts/homepage.ts` が `dist/og-image.png` にコピーする
