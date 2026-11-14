---
layout: center
highlighter: shiki
css: unocss
colorSchema: light
transition: fade-out
mdc: true
lang: ja
favicon: /images/shared/Hol1kgmg_prof_img_round.webp
routerMode: hash
title: WebMCP をどう使うべきか
seoMeta:
  ogDescription: "【HERP社開催】五反田.ts #2。WebMCP を TypeScript で実装する話"
  ogImage: auto
  twitterCard: summary_large_image
---

<!-- TODO(本実装):
- 目安: 自己紹介と合わせて60秒。全体の時間配分は memo.md の「時間配分」を参照
-->

# WebMCP をどう使うべきか

<div class="text-xl opacity-80">TypeScript で作ってみて</div>

<div class="text-sm opacity-70">【HERP社開催】五反田.ts #2</div>

2026.11.17

Hol1kgmg（ほりかわ）

---
layout: default
---

# 自己紹介

<SelfIntro />

---
layout: default
---

<!-- 目安: 75秒。コード中の「…」は Zod 定義のスライドで具体化する -->

# WebMCP とは

<SlideBody height="h-4/5" right-class="w-1/2 flex items-center justify-center">
<template #left>
<div class="h-full flex flex-col justify-center gap-4">

- ページが **ツール** を登録し、ブラウザの中のエージェントに呼ばせる API

```ts {*|1,8|3-5|6}
await document.modelContext.registerTool(
  {
    name: 'navigate',
    description: '…',
    inputSchema: { /* … */ },
    execute: async (input) => { /* … */ },
  },
  { signal },
)
```

</div>
</template>
<template #right>
<WebMcpFlow :step="$clicks" />
</template>
</SlideBody>

<div class="absolute bottom-4 left-12 text-xs opacity-60">
  ※ 実験段階。Chromium は <code>--enable-features=WebMCP</code> を付けたときだけ動く
</div>

---
layout: default
---

<!-- TODO(本実装):
- テーブルはイメージしづらいので、3ブロック（API・MCP サーバー・Bot / DOM を操作するエージェント / WebMCP）を横に並べる
- 各ブロックを UI コンポーネント風に描き、アニメーション（v-click / v-motion）で順に見せる
  - 比較軸（ブラウザの状態・操作を決めるのは・見える人）は各ブロックの中に表示する
  - 最後に WebMCP のブロックを強調する
- 目安: 45秒。次の「両立」と主張が重なるので、こちらは手段の違いだけに絞る
-->

# エージェントにサイトを扱わせる手段

<div class="h-9/10 flex items-center justify-center">

| 手段 | ブラウザの状態 | 操作を決めるのは | AI にできることが見える人 |
|---|---|---|---|
| API・MCP サーバー・Bot | 持たない | API の形 | 開発者だけ |
| DOM を操作するエージェント | 持つ | エージェント（推測） | 誰にも見えない |
| **WebMCP** | **持つ** | **サイト** | **開発者と利用者** |

</div>

---
layout: default
---

<!-- TODO(本実装):
- 言葉だけで終わらせず、図や UI コンポーネントでわかりやすく見せる
  - 例: 中央に画面（UI）のモック、その画面から生える「AI に頼めること」のツール一覧、両側に開発者と利用者
- 今の ↘↙ の矢印は gap-64 で位置を合わせているだけで崩れやすいので、SVG か flex で組み直す
- 目安: 30秒。図1枚で「同じ画面を見ればわかる」を伝えるだけにする
-->

# ユーザー親和性と AI フレンドリーの両立

<div class="h-9/10 flex flex-col items-center justify-center gap-6">
  <div class="flex gap-24 text-lg">
    <div class="w-72 rounded-xl border-2 border-gray-400 bg-white p-4 text-center shadow-md">
      <div class="text-sm opacity-60">開発者</div>
      「この画面で AI に<br>これをさせる」
    </div>
    <div class="w-72 rounded-xl border-2 border-gray-400 bg-white p-4 text-center shadow-md">
      <div class="text-sm opacity-60">利用者</div>
      「この画面なら AI に<br>これを頼める」
    </div>
  </div>
  <div class="flex gap-64 text-3xl"><span>↘</span><span>↙</span></div>
  <div class="w-96 rounded-xl border-2 border-sky-500 bg-white py-5 text-center text-2xl font-bold shadow-md">
    同じ画面（UI）
  </div>
  <div class="text-xl">画面を見れば、開発者も利用者も<b>同じ目線</b>で AI に何をさせられるかをイメージできる</div>
</div>

---
layout: section
---

<!-- TODO(本実装):
- 文言を、人が話すような言葉に調整する（今は見出しっぽく硬い）
- 目安: 10秒
-->

# 作る土台は<br>もうそろっている

---
layout: default
---

<!-- TODO(本実装):
- 4枚のカードの中身（定義の書き方、ツールのアイコン）、UI コンポーネントのスタイル、デザインを揃えて見やすくする
  - 各カードに ツールのアイコン / 名前 / 一行の定義 を同じ構成で並べる
- 補足: w-56 のカード4枚と gap-6 で横幅がほぼいっぱいなので、はみ出さないか確認する
- 補足: Kitesurf の脚注は changelog ではなく、WebMCP の提供が書かれた Kitesurf のドキュメントに差し替える（changelog には WebMCP の記載がない）
- 目安: 30秒。名前とアイコンを見せて流し、詳しい説明は脚注のリンクに任せる
-->

# 土台

<div class="h-9/10 flex items-center justify-center gap-6 text-lg">
  <div class="w-56 rounded-xl border-2 border-gray-500 bg-white p-5 text-center shadow">
    <div class="text-xl font-bold">型</div>
    <div class="mt-2"><code>webmcp-types</code></div>
    <div class="text-sm opacity-60">仕様の団体が出すブラウザ API の型</div>
  </div>
  <div class="w-56 rounded-xl border-2 border-gray-500 bg-white p-5 text-center shadow">
    <div class="text-xl font-bold">目視確認</div>
    <div class="mt-2">Model Context Tool Inspector</div>
    <div class="text-sm opacity-60">登録されたツールを一覧し、手で実行できる Chrome 拡張</div>
  </div>
  <div class="w-56 rounded-xl border-2 border-gray-500 bg-white p-5 text-center shadow">
    <div class="text-xl font-bold">テスト</div>
    <div class="mt-2">Playwright 1.64</div>
    <div class="text-sm opacity-60"><code>page.webmcp.callTool()</code></div>
  </div>
  <div class="w-56 rounded-xl border-2 border-gray-500 bg-white p-5 text-center shadow">
    <div class="text-xl font-bold">実行環境</div>
    <div class="mt-2">Chromium / Kitesurf</div>
    <div class="text-sm opacity-60">Kitesurf は Cloudflare が 2026.11.12 に OSS 化した、AI エージェント向けのヘッドレスブラウザ</div>
  </div>
</div>

<div class="absolute bottom-4 left-12 text-xs opacity-60">
  https://github.com/beaufortfrancois/model-context-tool-inspector<br>
  https://developers.cloudflare.com/changelog/post/2026-11-12-kitesurf-open-source/
</div>

---
layout: section
---

<!-- TODO(本実装):
- 文言を、人が話すような言葉に調整する
- 目安: 10秒
-->

# 既存のフロントエンドに<br>つなぐ

---
layout: default
---

<!-- TODO(本実装):
- 「既存のフロントエンド」の領域をもっと広くする
- 最初に、ユーザー向けの UI コンポーネントのボックスを表示する
- そこから矢印が切り替わるように、その下に WebMCP のコンポーネント一式（routesFor → navigate ツール → registerTool）を表示する
  - ユーザー向け UI と WebMCP が同じ既存実装から枝分かれしている構図にする
- 目安: 45秒
-->

# 足したのは「つなぐ部分」だけ

<div class="h-9/10 flex flex-col justify-center gap-6">
  <div class="flex items-center justify-center gap-3 text-base">
    <div class="w-52 rounded-lg border-2 border-dashed border-gray-400 bg-white px-4 py-3 text-center opacity-70">既存のフロントエンド<div class="text-xs">hooks・API・ルーター・認証</div></div>
    <div class="text-2xl">→</div>
    <div class="w-52 rounded-lg border-2 border-gray-500 bg-white px-4 py-3 text-center shadow"><code>routesFor(state)</code><div class="text-xs opacity-60">画面のメニューと同じ行き先</div></div>
    <div class="text-2xl">→</div>
    <div class="w-52 rounded-lg border-2 border-sky-500 bg-white px-4 py-3 text-center shadow"><code>navigate</code> ツール<div class="text-xs opacity-60">行き先からツールを定義する</div></div>
    <div class="text-2xl">→</div>
    <div class="w-52 rounded-lg border-2 border-sky-500 bg-white px-4 py-3 text-center shadow"><code>registerTool</code><div class="text-xs opacity-60"><code>document.modelContext</code> に触る唯一の場所</div></div>
  </div>
  <div class="text-center text-xl">既存の実装には手を入れず、<b>画面と同じ行き先</b>をツールに渡す</div>
</div>

---
layout: default
---

<!-- TODO(本実装):
- 4枚目「WebMCP とは」で見せた抽象的なサンプルコードを具体化するとこうなる、という説明にする
- その動きをつける: 4枚目のコードから始め、Shiki Magic Move などで「…」の部分が Zod の定義に置き換わっていく様子を見せる
- 補足: text() と Tool 型の説明がないので、補足するかコードから消す
- 目安: 75秒
-->

# 1つの Zod 定義から作る

<div class="h-9/10 flex flex-col justify-center gap-4">

```ts {*|5|7-10}
const registerTool = (tool: Tool, signal: AbortSignal) =>
  document.modelContext?.registerTool({
    name: tool.name,
    description: tool.description,
    inputSchema: z.toJSONSchema(tool.input), // AI に見せる入力の形
    execute: async (raw) => {
      const input = tool.input.safeParse(raw) // 実行時の検証
      if (!input.success)
        return { content: text(z.prettifyError(input.error)), isError: true }
      return { content: text(await tool.execute(input.data)) } // 型のついた入力
    },
  }, { signal })
```

- ブラウザは入力を `inputSchema` に**照らさない** → `execute` の中の `safeParse` が唯一の検証
- throw した文はエージェントに**届かない** → `isError: true` で返せば、直して呼び直せる

</div>

<div class="absolute bottom-4 left-12 text-xs opacity-60">
  ※ 説明用に簡略化。実装例: Hol1kgmg/times#143
</div>

---
layout: section
---

<!-- TODO(本実装):
- 文言を、人が話すような言葉に調整する
- 目安: 10秒
-->

# 状態でツールを<br>仕分ける

---
layout: default
---

<!-- TODO(本実装):
- 「判別共用体」という言い方はやめ、シンプルに「状態の型定義」と表現する
- この型はユーザー向けの UI 制御と共通で使う、ということを伝える
- 時間短縮のため、次の routesFor のスライドと1枚にまとめる（型定義は3行なので routesFor のコードの上に置く）
- 目安: routesFor と合わせて60秒
-->

# 状態を型で表す

<div class="h-9/10 flex flex-col justify-center gap-4">

```ts
type State
  = | { status: 'guest' }
    | { status: 'admin', user: User }
```

- ツールを仕分ける根拠になる状態を、**判別共用体**で表す
- 画面もツールも、この型から分岐する

</div>

<div class="absolute bottom-4 left-12 text-xs opacity-60">
  ※ 説明用に簡略化。実装例: Hol1kgmg/times#143
</div>

---
layout: default
---

<!-- TODO(本実装):
- 具体的なサンプルコードの話なので、スライドタイトルを「具体的にどうするか」がわかる表現にする
  - 例: 「状態から行き先の一覧を作る」
- 前の「状態を型で表す」と1枚にまとめる（目安は合わせて60秒）
-->

# 行き先は状態から決まる

<div class="h-9/10 flex flex-col justify-center gap-4">

```ts {*|1-5|7-8}
const adminRoutes = [
  '/timeline',
  '/admin/digests/new',
  '/admin/digests',
] as const satisfies readonly Route[] // 存在しないパスは型エラー

const routesFor = (state: State) =>
  state.status === 'admin' ? adminRoutes : []
```

- guest なら `[]`、admin なら3つ
- **画面のメニューもツールも、この1つの関数から作る**

</div>

<div class="absolute bottom-4 left-12 text-xs opacity-60">
  ※ 説明用に簡略化。実装例: Hol1kgmg/times#143
</div>

---
layout: default
---

<!-- TODO(本実装):
- 補足: 箇条書きの `tools()` がコードに出てこないので、表現をコードに合わせる
- 目安: 60秒
-->

# 状態が変わればツールも変わる

<div class="h-9/10 flex flex-col justify-center gap-4">

```ts {*|2-4|8-9|11}
useEffect(() => {
  const routes = routesFor(state)
  if (routes.length === 0)
    return // guest: ツールを登録しない
  const controller = new AbortController()
  registerTool({
    name: 'navigate',
    input: z.object({ to: z.enum(routes) }), // 状態にある行き先だけ
    execute: ({ to }) => navigate({ to }), // to の型も行き先に絞られる
  }, controller.signal)
  return () => controller.abort() // 状態が変わったら外す
}, [state])
```

- guest では**ツール自体を登録しない**（`tools()` が `[]`）
- admin では、`to` の enum が**行ける画面そのもの**になる

</div>

<div class="absolute bottom-4 left-12 text-xs opacity-60">
  ※ 説明用に簡略化。実装例: Hol1kgmg/times#143
</div>

---
layout: default
---

<!-- TODO(本実装):
- このスライドは削除し、代わりに実際のデモを見せるスライドにする
  - times のブラウザアプリで、guest → admin と状態が変わるとツールが変わる様子を Model Context Tool Inspector で見せる
- 「ツールの出し分けは認可ではない」の注意は消さず、まとめに一言残す
- デモは録画にする（本番のブラウザ操作やフラグ付き Chromium の起動で時間を取られず、失敗もしない）
- 目安: 60秒
-->

# 出さないものは出さない

<div class="h-9/10 flex flex-col justify-center gap-4">

- 公開予定の行き先を先に出さない
  - 出すと、呼んだエージェントを 404 に送り、成功の返事で利用者まで誤解させる
- 未ログインの画面に管理の操作はない → **AI にもない**
- **注意: ツールの出し分けは認可ではない**
  - ツールを隠しても API は誰でも呼べる。認可はサーバー側のまま

</div>

---
layout: default
---

<!-- TODO(本実装):
- WebMCP は、サイトを AI フレンドリーにするための適切な道具・手段である、と伝える
- そのために TypeScript で実装する意図とメリットを話す
  - 例: 状態の型から行き先とツールの入力を導ける、Zod の1つの定義から inputSchema と実行時の検証を作れる、UI とツールで同じ型を共有できる
- 「ツールの出し分けは認可ではない（認可はサーバー側のまま）」を一言添える
- 目安: 30秒
-->

# まとめ

<div class="h-9/10 flex flex-col justify-center gap-4">

- WebMCP は、開発者と利用者が**同じ画面を目印に**、AI に何をさせられるかを共有できる
- 型・目視確認・テスト・実行環境の土台はもうそろっている
- 既存のフロントエンドはそのままで、足すのは**つなぐ部分**だけ
- 状態を型で表せば、**ツールも状態で型安全に仕分けられる**

</div>
