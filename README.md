# talks

個人の登壇資料・スライド管理リポジトリ。[Slidev](https://sli.dev) を使用。

登壇一覧: TODO: 個人サイト公開後にリンクを追加

###### 2026

- `ja` [このリポジトリについて](./2026-08-10)

## 差分ビルド

`pnpm run build`（`pnpm -r run build`）は各トークを毎回ビルドするが、`dist-stale/<talk>` が存在する場合はビルドをスキップしてそこからコピーする（`scripts/build.ts`）。

編集が完了して今後変更しないトークは、以下でビルド成果物を固定化してコミットすることで、以降のビルドをスキップできる。

```bash
pnpm run build            # 通常ビルド（dist/ に出力）
pnpm run freeze 2026-08-10  # dist/<talk> を dist-stale/<talk> にコピー
git add dist-stale
git commit -m "build: freeze 2026-08-10"
```

再度編集する場合は対応する `dist-stale/<talk>` ディレクトリを削除してからビルドする。

