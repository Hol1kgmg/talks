# talks トップページ デザインシステム

`dist/` 配下の静的ページ（`scripts/homepage.ts` が生成するトップページ `dist/index.html`、`scripts/404.ts` が生成する404ページ `dist/404.html`）のデザイン方針。[Material Design 3](https://m3.material.io/) のカラーロール／タイポグラフィスケール／エレベーション（カード）の考え方を土台に、独自のカラーテーマを載せている。

## コンセプト

プロフィールアイコンの石像モチーフ（ブルーグレーの石材 + うっすら光るシアン）をベースに、彩度を落として明度を上げた、霧がかったような色調にまとめたパレット。

## M3を採用している範囲

- **カラーロール**: 「背景」「セクション背景」「本文」「見出し」「アクセント」のように役割で色を分離し、CSSカスタムプロパティとして定義する考え方はM3のカラーロール（primary / surface / on-surface 等）に準拠。ロール名は本プロジェクト独自の命名（下表）を採用し、値は本プロジェクトのカラーテーマで置き換えている
- **タイポグラフィスケール**: 見出し（`h1`）はHeadline Small相当、トークタイトルはTitle Medium相当、説明文はBody Medium相当のサイズ・字間で構成
- **エレベーション/シェイプ**: 各トークをM3のElevated Cardに準拠したスタイル（角丸16px、box-shadowによる浮き上がり、hoverで一段elevationを上げる）で表現。石の質感を出すため、M3にはない`border`を薄く追加している

## カラーパレット

### ベース（背景）

| 用途 | カラーロール | ライト | ダーク | 説明 |
|---|---|---|---|---|
| ページ背景 | `--color-bg` | `#E7ECEE` | `#2C3A47` | ブルーグレー。白背景の寂しさを避けるため地色に採用 |
| セクション/カード背景 | `--color-bg-section` | `#F4F6F7` | `#364554` | ページ背景より明るいブルーグレーで、カードを「浮かせる」側に使用 |

### ストーン系（グレー）

| 用途 | カラーロール | ライト | ダーク | 説明 |
|---|---|---|---|---|
| 罫線・区切り線 | `--color-border` | `#B8C2C7` | `#52616C` | 石の中間トーン |
| 本文テキスト | `--color-text-body` | `#6E7B82` | `#B8C2C7` | やや濃いめのスレートグレー |
| 見出し・強調テキスト | `--color-text-heading` | `#3A4650` | `#F4F6F7` | 濃紺寄りのグレー |

### アクセント（シアン/ティール）

| 用途 | カラーロール | ライト | ダーク | 説明 |
|---|---|---|---|---|
| リンク本体・アクティブ状態 | `--color-accent` | `#4FA8B0` | `#8FD3D9` | 少し濃いめのティール |
| ホバー・淡い強調 | `--color-accent-hover` | `#8FD3D9` | `#B4E3E7` | 薄いシアン |

ダークモードは石像モチーフの「アイコン奥の暗がり」から採った`#2C3A47`を背景基調に、ライトモードの明暗関係（ページ背景 < カード背景の明るさ）を保ったまま各色を反転・補完したもの。`prefers-color-scheme: dark` で自動切り替え。

## 使用ガイドライン

- **全体トーン**: モノトーンに近いブルーグレーをベースに、ティール/シアンをワンポイントで使う
- **テキスト**: 見出しは`--color-text-heading`、本文は`--color-text-body`。メタ情報（日付など）はさらに控えめに`--color-border`寄りの扱いにする
- **リンク/カード**: 通常時は`--color-accent`、hover時に`--color-accent-hover`へ変化させ、カードのborder色・box-shadowも合わせて強調する（石像の目や光る部分を思わせる演出）
- **罫線**: `--color-border`を薄く使い、石の質感のような静けさを出す
- **彩度**: 全体的に彩度を抑え、鮮やかな色は使わない方針を維持する

## 実装

共通のカラートークン・基本スタイル（`:root` / `@media (prefers-color-scheme: dark)` / `body` / `h1`）は `scripts/lib/theme.ts` の `baseStyles` にまとめ、`scripts/homepage.ts` と `scripts/404.ts` の双方から読み込んでいる。ページ固有のスタイル（トップページのカード一覧、404ページのエラー表示など）は各生成スクリプト側で追加する。パレットを変更する場合はこのドキュメントの値と `scripts/lib/theme.ts` を合わせて更新する。

```css
:root {
  --color-bg: #e7ecee;
  --color-bg-section: #f4f6f7;
  --color-border: #b8c2c7;
  --color-text-body: #6e7b82;
  --color-text-heading: #3a4650;
  --color-accent: #4fa8b0;
  --color-accent-hover: #8fd3d9;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #2c3a47;
    --color-bg-section: #364554;
    --color-border: #52616c;
    --color-text-body: #b8c2c7;
    --color-text-heading: #f4f6f7;
    --color-accent: #8fd3d9;
    --color-accent-hover: #b4e3e7;
  }
}
```
