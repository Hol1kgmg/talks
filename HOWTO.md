# talks リポジトリについて

個人の登壇資料・スライド管理リポジトリ。[Slidev](https://sli.dev) を使い、日付ディレクトリ（例: `2026-08-10/`）単位でスライドとソースを管理する。元は [antfu/talks](https://github.com/antfu/talks) のフォーク。

デプロイ先: GitHub Pages（`.github/workflows/deploy.yml` が main への push で `pnpm run build` → `actions/deploy-pages` を実行する）。ルート（`/`）は各トークへのリンク一覧（`dist/index.html`）で、各トークは `/<year>/<slug>/` 配下に配信される。

## セットアップ

開発環境（Node.js / pnpm / ffmpeg / lefthook / just）は `flake.nix` の devShell で揃える。

```bash
direnv allow   # 以降このディレクトリに入ると devShell が自動で有効化される
just setup     # pnpm install + git hooks の有効化
```

direnv を使わない場合は `nix develop` でシェルに入る。pnpm は corepack 経由で `package.json` の `packageManager` に書かれたバージョンが使われる（shim は `.direnv/state/corepack-bin` に隔離される）。

利用できるタスクの一覧は `just`（または `just list`）で確認できる。

## 開発

```bash
just dev      # トークを選んでSlidevの開発サーバーを起動
just dev-remote # 同上。LAN内の他端末からも開けるよう 0.0.0.0 で待ち受け
just typecheck
just lint
```

## ビルド

```bash
just build    # 全トークをビルドし、dist/ にトップページ・リダイレクト用スタブ・404ページを生成
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

`dist/`（トップページ・各トーク・リダイレクト用スタブ・404ページ）を静的配信して、GitHub Pagesと近い形で確認できる。

```bash
just dev-home
```

`http://localhost:4321/` でトップページ（`dist/index.html`）、`http://localhost:4321/2026/talks-repo-intro/` で個別のトーク、存在しないパス（例: `http://localhost:4321/foo`）で404ページ（`dist/404.html`）を確認できる。

各トークは headmatter の `routerMode: hash` によりページ遷移を `#/3` のようなハッシュで表すため、サーバー側のSPAフォールバックが無くてもリロードや直リンクが動く。移行前の `/2026/<slug>/3` 形式のリンクは `dist/404.html` 内のスクリプトがハッシュ形式へ書き換える。

`/2026/<slug>/pdf` や `/2026/<slug>/src` へのリダイレクトは、GitHub Pagesにサーバー側リダイレクトが無いため `scripts/redirects.ts` が meta refresh 入りの `index.html` を各パスに生成して代用している。

## 本番デプロイ（GitHub Pages）

main への push で `.github/workflows/deploy.yml` が走り、`dist/` が GitHub Pages に配信される。独自ドメイン `talks.hol1kgmg.com` は `scripts/homepage.ts` が出力する `dist/CNAME` で維持される（`hol1kgmg.github.io/talks/` へのアクセスはGitHub側で独自ドメインへ自動リダイレクトされる）。

## 画像の追加

```bash
just image <path-to-image>   # .webpに変換してsrc/public/images/に格納
```

## 新しいトークの追加

1. 日付ディレクトリ（例: `2026-08-10/`）を作成し、`README.md`（1行目に `# <タイトル>`、2行目以降に概要）と `src/` 配下のSlidevプロジェクトを用意する
2. `src/package.json` の `build` スクリプトで `--base` の配信パスを指定する（例: `tsx ../../scripts/build.ts /2026/talks-repo-intro/`）
3. `just build` を実行すると、`scripts/homepage.ts` が各トークの `README.md` からトップページ（`dist/index.html`）を自動生成する

トップページのデザイン方針（カラーパレット・タイポグラフィ等）は [docs/design-system.md](./docs/design-system.md) を参照。
