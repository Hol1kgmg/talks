# APM で agent skill をバージョン管理してみる

2026/11/05 新卒N年目の勉強会&交流会！ 〜若手エンジニアのAIの使い方・向き合い方〜（LT 7分、スライド10〜20枚程度）
https://fresh-engineers.connpass.com/event/409436/

## テーマ

当初は pnpm skills の話をする予定だったが、2026-11-03 に Dependabot が APM に対応した（[changelog](https://github.blog/changelog/2026-11-03-dependabot-version-updates-support-agent-package-manager/)）ため、APM を触る話に変更した。

- 中盤の素材: https://github.com/Hol1kgmg/playground-apm の `APM_REPORT.md`（検証日 2026-11-04、apm 0.35.0）
- Nix 側の素材: https://github.com/Hol1kgmg/playground-layat の `LAYAT_SKILLS_REPORT.md`（検証日 2026-11-04、layat 0.1.0）
- pnpm skills の素材: https://github.com/Hol1kgmg/playground-pnpm-skills の `PNPM_SKILLS_REPORT.md`

## 対象

agent skill を `npx skills` やコピペで導入している人

## 目的（聴衆に知ってもらうこと）

- agent skill の管理はアナログになりがち（更新に気付けない、組織内に内容の少しずつ違う skill が広がる）
- agent skill や rules など、AI のためのドキュメントもコミット単位でバージョン管理する手法がある
- APM はかなり使いやすいが、細かいところ（配置先、`settings.json` や `statusline.sh` などハーネスの設定）までは手が届かない
- ハーネス寄りの要素までこだわりたいなら Nix を使うべき（着地点）

## 構成

話の流れ: 導入（課題） → pnpm skills と Nix を比べる予定だった → changelog → APM の仕様をざっくり → 試してみた → APM の対応範囲（対応していないところもある） → ハーネス周りまでこだわるなら Nix → 余談

1. タイトル
2. 自己紹介
3. 導入: agent skill をどう入れているか
4. 何が困るのか
5. section: スキルの管理はアナログ（右下に小さく「AI を使った開発環境なのに……」）
6. pnpm skills というものがある
   - pnpm アイコン + 「📦 package + 📄 SKILL.md」を中央に置き、クリックで左に寄せて「VS」と Nix アイコンを表示する。次のクリックで右下に「……という話をしたかった」
7. 11/03 の changelog の OG 画像
8. ダークホース現る（pnpm skills 🆚 Nix に第三勢力 APM が参戦し、Dependabot 対応で強力になった、という抽象的なイメージだけ）
9. APM とは
10. 仕組み
11. 試してみた（`apm.yml` / `.envrc` / `apm install` / `apm audit`）
12. ハマりどころ（`.claude/skills` が symlink だと `claude` target が使えない）
13. APM が対応している範囲（`.claude/` のツリーで ✅ / △ / ❌ を示し、ハーネスの設定までは手が届かないと伝える）
14. ハーネス周りまでこだわるなら Nix（layat の例）
15. 余談（本当は pnpm skills の話をするつもりだったが、前日にニュースが飛び込んできて泣く泣く APM の話を頑張った）。オチは「AI まわりは状況の変化が激しいので、前から準備していた話ができなくなるのはよくあること」。まとめスライドは置かず、14枚目を着地点にする

## 今後の調整候補

- 10・11枚目は縦にはみ出しやすいため、分割を検討する
- 時間に余裕があれば追加する: レポートの未検証事項（semver 範囲、hooks / MCP の配布）
- Dependabot の apm ecosystem を playground-apm で実際に動かせたら、PR のスクリーンショットを8枚目に入れる
