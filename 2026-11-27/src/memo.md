# Vercel の UI SDK と WebMCP の役割を整理する

2026/11/27 DMM meetup #41 ~DMM.go × Think! FrontEnd~（5分 LT）
https://dmm.connpass.com/event/402090/

## テーマ

Vercel の UI SDK と WebMCP の役割の違いを整理する話

## 参考

- https://azukiazusa.dev/blog/ui-sdk-agent-ready-behaviors/
- https://ui-sdk.dev/docs/agents/connect-an-agent
- https://ui-sdk.dev/docs/agents/connect-an-agent/webmcp
  - `registerTools(agent, { allow })` は `snapshot` / `query` / `act` の3つを `document.modelContext.registerTool` で登録する（コンポーネントごとではない）
- 2026-11-17「WebMCP をどう使うべきか」（「WebMCP とは」「既存のコードを活用できる」を流用。コンポーネントは `src/components/` にシンボリックリンク）
## 結論

- UI SDK: 伝える中身（部品と、できる操作）を用意する。サイトに組み込んだ AI には `agentTools` で直接渡せる
- WebMCP: ページのツールをブラウザの AI に伝える経路。hooks の処理も UI SDK の操作も渡せる
- 2つは並列ではなく直列。UI SDK の WebMCP 対応 = 分解した UI の要素を、外部の AI にも届けること

## 構成と時間配分

| # | スライド | 目安 |
|---|---|---|
| 1–2 | タイトル・自己紹介 | 30秒 |
| 3 | AI 向けのフロントエンド技術が増えている | 20秒 |
| 4 | UI SDK の公式の説明（WebMCP に対応） | 25秒 |
| 5 | 「…をサポートしている…???」（ジョジョの1コマ） | 10秒 |
| 6 | section「この2つを掘り下げる」 | 10秒 |
| 7 | WebMCP とは（流用） | 30秒 |
| 8 | 既存のコードを活用できる（流用） | 30秒 |
| 9 | UI SDK とは（実装サイド / ユーザーサイドの AI） | 35秒 |
| 10 | UI SDK の限界（分解した要素にアクセスできるのは内部の AI だけ） | 30秒 |
| 11 | UI SDK が WebMCP に対応している…???（弾かれた外部の AI に WebMCP が橋を架ける。「???」への答え） | 35秒 |
| 12 | WebMCP（続き）（hooks につなぐ＝裏側でアプリの処理を渡す、UI コンポーネントにつなぐ＝表側で画面の情報（操作と状態）を渡す） | 30秒 |
| 13 | まとめ（UI SDK＝AI に伝わる UI の要素を作るライブラリ、WebMCP＝表と裏から2種類の情報を AI に渡す経路）。台本はスライドのコメント | 10秒 |
| 14 | 他にも話したかったこと（表示して流すだけ） | 5秒 |
| | **合計** | **300秒** |
