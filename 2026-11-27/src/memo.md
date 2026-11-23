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

- UI SDK: UI 開発を助けつつ、エージェントに UI をどう操作させるかを定義する
- WebMCP: 状態操作や hooks など、UI の裏側の処理を直接ツールとして渡す

## 構成と時間配分

| # | スライド | 目安 |
|---|---|---|
| 1–2 | タイトル・自己紹介 | 30秒 |
| 3 | AI エージェント向けのフロントエンド技術が増えている | 20秒 |
| 4 | UI SDK の公式の説明（WebMCP に対応） | 25秒 |
| 5 | 「…をサポートしている…???」（ジョジョの1コマ） | 10秒 |
| 6 | section「役割の違いをざっくり」 | 10秒 |
| 7 | UI SDK とは | 40秒 |
| 8 | WebMCP とは（流用） | 35秒 |
| 9 | 既存のコードを活用できる（流用） | 35秒 |
| 10 | 役割の違い（図） | 45秒 |
| 11 | まとめ | 25秒 |
| | **合計** | **275秒** |
