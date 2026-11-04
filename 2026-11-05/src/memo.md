# pnpm skills で agent skill をバージョン管理してみる（仮）

2026/11/05 新卒N年目の勉強会&交流会！ 〜若手エンジニアのAIの使い方・向き合い方〜（LT 7分、スライド10〜20枚程度）
https://fresh-engineers.connpass.com/event/409436/

## テーマ

pnpm skills に触れて、agent skill のバージョン管理をしてみる話

- 中盤の素材: https://github.com/Hol1kgmg/playground-pnpm-skills の `PNPM_SKILLS_REPORT.md`（検証日 2026-11-03、pnpm 12.16.1）

## 対象

agent skill を `npx skills` やコピペで導入している人

## 目的（聴衆に知ってもらうこと）

- agent skill の管理はアナログになりがち（更新に気付けない、組織内に内容の少しずつ違う skill が広がる）
- pnpm skills を使うと、skill を依存パッケージとしてバージョン管理できる
- ただし現状は対応範囲が狭い。GitHub の skill をコミット単位で管理するなら agent-skills-nix がある

## 結論

- Dependabot などで skill も更新できるとはいえ、対応しているパッケージが少ないのは本末転倒気味。今後の発展に期待
- 代替手段として agent-skills-nix を使った nix 開発環境を紹介する
  - npm で公開されたパッケージという制限がない
  - GitHub リポジトリで公開された skill を、コミット単位で更新状態を管理できる
  - Dependabot（nix ecosystem）で更新 PR を出せる
  - このリポジトリ（talks）自体が実例（`flake.nix` / `sources.nix` / `skills.nix` / `.github/dependabot.yml`）

## 構成

話の流れ: 導入（課題） → pnpm skills を試す → 9枚目付近で「良さそう！」と盛り上げる → 「でも使える skill がない」で反転 → agent-skills-nix で締める

1. タイトル
2. 自己紹介
3. 導入: agent skill をどう入れているか（`npx skills` / コピペ、リポジトリや `~/.agents/skills`）
4. 何が困るのか（更新に気付けない、内容のばらつき）
5. section: AI を使った開発環境なのに、管理はアナログ
6. そこで pnpm skills
7. 仕組み（配布側 → lockfile → approve → `.agents/skills` にリンク → Dependabot）
8. 試してみた（`pnpm add -D` → `pnpm approve`、`permissions`、リンク結果）
9. いつもの依存管理がそのまま使える（npm パッケージとの対応表）＋「pnpm skills、良さそう！」← 山場
10. section: でも、使える skill がない
11. 主要パッケージの対応状況（shadcn / next / drizzle-kit はすべて ❌）
12. 更新の仕組みはあっても、本末転倒気味。今後に期待
13. 代わりに agent-skills-nix
14. このスライドのリポジトリでも使っている（設定の抜粋と Dependabot の PR 例）
15. まとめ

## 今後の調整候補

- 7・8枚目は縦にはみ出しやすいため、分割を検討する
- 14枚目に実際の Dependabot PR のスクリーンショットを入れる（`just image` で取り込む）
- 時間に余裕があれば追加する: direnv で lockfile の変更を検知して自動で `pnpm install` する話、レポートの未検証事項（Dependabot の lockfile 更新など）
- タイトルは仮。確定したら `slides.md` の title・1枚目、`README.md` を更新し、`src/og-image.png` を消して作り直す
