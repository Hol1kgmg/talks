# talks リポジトリについて

個人の登壇資料・スライド管理リポジトリ。[Slidev](https://sli.dev) を使い、日付ディレクトリ（例: `2026-08-10/`）単位でスライドとソースを管理する。元は [antfu/talks](https://github.com/antfu/talks) のフォーク。

デプロイ先: Cloudflare Pages。ルート（`/`）は各トークへのリンク一覧（`dist/index.html`）で、各トークは `/<year>/<slug>/` 配下に配信される。

## セットアップ

```bash
mise run setup   # pnpm install + git hooks の有効化
```

## 開発

```bash
mise run dev      # トークを選んでSlidevの開発サーバーを起動
mise run typecheck
mise run lint
```

## ビルド

```bash
mise run build    # 全トークをビルドし、dist/ にトップページと_redirectsを生成
```

`pnpm run build`（`pnpm -r run build`）は各トークを毎回ビルドするが、`dist-stale/<talk>` が存在する場合はビルドをスキップしてそこからコピーする（`scripts/build.ts`）。

編集が完了して今後変更しないトークは、以下でビルド成果物を固定化してコミットすることで、以降のビルドをスキップできる。

```bash
pnpm run build              # 通常ビルド（dist/ に出力）
pnpm run freeze 2026-08-10  # dist/<talk> を dist-stale/<talk> にコピー
git add dist-stale
git commit -m "build: freeze 2026-08-10"
```

再度編集する場合は対応する `dist-stale/<talk>` ディレクトリを削除してからビルドする。

## ビルド結果をローカルで確認

`dist/`（トップページ・各トーク・`_redirects`・404ページ）を静的にローカル配信して、Cloudflare Pagesと近い形で確認できる。`vite preview`はSPAフォールバックにより未定義パスも`index.html`を返してしまうため、`serve`パッケージで配信することで未定義パスに対する404の挙動（`dist/404.html`が返る）まで含めて確認できる。

```bash
mise run dev:home
```

`http://localhost:4321/` でトップページ（`dist/index.html`）、`http://localhost:4321/2026/talks-repo-intro/` で個別のトーク、存在しないパス（例: `http://localhost:4321/foo`）で404ページ（`dist/404.html`）を確認できる。

## 画像の追加

```bash
mise run image <path-to-image>   # .webpに変換してsrc/public/images/に格納
```

## 新しいトークの追加

1. 日付ディレクトリ（例: `2026-08-10/`）を作成し、`README.md`（1行目に `# <タイトル>`、2行目以降に概要）と `src/` 配下のSlidevプロジェクトを用意する
2. `src/package.json` の `build` スクリプトで `--base` の配信パスを指定する（例: `tsx ../../scripts/build.ts /2026/talks-repo-intro/`）
3. `mise run build` を実行すると、`scripts/homepage.ts` が各トークの `README.md` からトップページ（`dist/index.html`）を自動生成する

トップページのデザイン方針（カラーパレット・タイポグラフィ等）は [docs/design-system.md](./docs/design-system.md) を参照。
