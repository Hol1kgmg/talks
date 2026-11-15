# WebMCP をどう使うべきか

2026/11/17 【HERP社開催】五反田.ts #2（10分）
https://gotanda--ts.connpass.com/event/407932/

## テーマ

WebMCP を TypeScript で実装する話

## 参考

- https://github.com/Hol1kgmg/times/pull/143 （adr/frontend/0014）
- https://developers.cloudflare.com/changelog/post/2026-11-12-kitesurf-open-source/
  - changelog には WebMCP の記載はないが、Kitesurf のドキュメントで WebMCP の提供を確認済み
- 16枚目「他にも話したかったこと」の3テーマ
  - Kitesurf と WebMCP の相性: https://developers.cloudflare.com/browser-run/features/webmcp/
  - Vercel の UI SDK と WebMCP の比較: https://azukiazusa.dev/blog/ui-sdk-agent-ready-behaviors/
  - Personal Agent Protocol と WebMCP の連携: https://personalagentprotocol.org/ （2026年11月時点、仕様に WebMCP の記述は見当たらない）

## 結論

WebMCP なら、画面と同じ状態をもとにツールを仕分けられる。既存のフロントエンドはそのままで、足すのはつなぐ部分だけ

## 構成

1. なぜ WebMCP か: 概要、他の手段との比較、ユーザー親和性と AI フレンドリーの両立
2. 開発環境はもうそろっている（型・目視確認・テスト・実行環境。Kitesurf は実行環境として触れる）
3. 今あるフロントエンドにつなぐ: hooks・API などの既存実装は話さない。既存のコードはそのまま、UI の隣に WebMCP を足す
4. registerTool の作り方: 手書きの JSON Schema → Zod の1つの定義から `inputSchema` と `safeParse` を作る → 関数に包む → ジェネリクスで型をつなぐ（Magic Move）
5. 画面の状態が使える: 状態を型（guest / member の判別共用体）で表し、`toolsFor` でツールの一覧を作る。UI のボタンとツールを同じ `State` で制御でき、guest には `state.user` がないので `add_to_cart` を作ると型エラー
6. AI と WebMCP をつなぐ: 各 AI の WebMCP 対応表（下記）。検知しない ≠ 使えない
7. まとめ: 出し分けは認可ではない（認可はサーバー側のまま）を一言添える

コードは説明用の抽象的な例で、3〜5 は EC サイト（`search` / `add_to_cart`）で通す。times#143 は実装例として脚注で触れる

## 各 AI の WebMCP 対応表（2026年11月時点）

| | デスクトップ | Chrome 上 | CLI | モバイル |
|---|---|---|---|---|
| Claude | ◯ | △ Claude in Chrome | △ Claude Code | ✕ |
| ChatGPT | ◯ 内蔵ブラウザ | ─ | △ Codex CLI | ✕ |
| Gemini | △ Antigravity 2.0 | 予定 Gemini in Chrome | △ Antigravity CLI | ✕ |

◯ 自分で気づく / △ 指示を出せば使える / ✕ 使えない / ─ 対象外。CLI は `chrome-devtools-mcp`（`--categoryExperimentalWebmcp`）をつないだ場合

- 確認済み: Claude のデスクトップ・モバイル（手元）、Claude in Chrome（[anthropics/claude-code#76809](https://github.com/anthropics/claude-code/issues/76809)。検知はしないが呼び出しはできる）、ChatGPT の内蔵ブラウザ（[OpenAI ヘルプ](https://help.openai.com/en/articles/20001423-using-site-tools-in-the-chatgpt-desktop-app)。Chrome では使えない）
- 要確認:
  - CLI の3つ（`list_webmcp_tools` が見えるか）
  - Antigravity 2.0（内蔵のブラウザエージェントが CDP で Chrome を操作する。[codelab](https://codelabs.developers.google.com/agentic-ui-automation-with-antigravity)。自分で気づけば ◯）
  - Gemini in Chrome（I/O 2026 で「近く対応」と発表。当日までに出ていれば ◯）
  - ChatGPT・Gemini のモバイル
- Gemini CLI は 2026年6月18日に個人向けの提供を終え、Antigravity CLI に移行した（[Google Developers Blog](https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/)）

## 時間配分

10分枠。各スライドの冒頭コメントにも目安を書いている。

| # | スライド | 目安 |
|---|---|---|
| 1–2 | タイトル・自己紹介 | 60秒 |
| 3 | WebMCP とは（図解） | 75秒 |
| 4 | AI にサイトを使わせる方法（3ブロック） | 45秒 |
| 5 | ユーザー親和性と AI フレンドリーの両立（図） | 30秒 |
| 7 | 開発環境 | 30秒 |
| 9 | 既存のコードはそのまま、UI の隣に WebMCP を足す | 45秒 |
| 11 | 1つの Zod 定義から作る | 75秒 |
| 13 | 状態の型定義からツールの一覧を作る | 60秒 |
| 15 | 各 AI の WebMCP 対応表 | 45〜60秒 |
| 16 | 他にも話したかったこと（テーマだけ3つ） | 20秒 |
| 17 | まとめ | 30秒 |
| 6, 8, 10, 12, 14 | section 5枚 | 各10秒 |
| | **合計** | **565〜580秒** |

デモ（録画・60秒）は今のところスライドに入っていない。入れると約10分になる

縮めるための方針:

- デモは録画にする
- 開発環境は名前とアイコンだけを見せて流す
- 手段の比較と両立は主張が重なるので、それぞれ軽くする
- 「出さないものは出さない」を削除しても、「ツールの出し分けは認可ではない」はまとめに一言残す
