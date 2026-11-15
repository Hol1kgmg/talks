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
clicks: 7
---

<!-- 目安: 45秒。次の「両立」と主張が重なるので、こちらは手段の違いだけに絞る -->

# AI にサイトを使わせる方法

<div class="h-9/10 flex items-center justify-center">
<AgentMeans :step="$clicks" />
</div>

---
layout: default
clicks: 3
---

<!-- 目安: 30秒。AI に頼むのは利用者で、利用者は画面を見てできることを確かめてから頼む。だから「このページで何ができるか」が、利用者と AI の両方の視点でわかる必要がある -->

# ユーザー親和性と AI フレンドリーの両立

<div class="h-9/10 flex flex-col items-center justify-center gap-10">
<SharedScreen :step="$clicks" />
<div v-click="3" class="text-xl"><b>このページで何ができるか</b>が、利用者と AI の両視点で一致している必要がある</div>
</div>

---
layout: section
---

<!-- 目安: 10秒 -->

# ここからは作ってみる

---
layout: default
---

<!-- 目安: 30秒。名前とアイコンを見せて流し、詳しい説明は脚注のリンクに任せる -->

# 開発環境

<!-- カードは AgentMeans.vue と同じ見た目（上段: カテゴリ / 下段: ツールのアイコン・名前・一行の定義）。w-48 ×4 + gap-4 で横幅に収める -->
<!-- 下段の3つは固定の高さにして、カード間で位置をそろえる（名前は2行、説明は3行まで入る） -->
<!-- Playwright・Chrome・Cloudflare のアイコンは @iconify/json の logos セット。リンクは脚注の代わりにツール名へ埋め込む -->
<div class="h-9/10 flex items-stretch justify-center gap-4 py-16">
  <div class="w-48 flex flex-col rounded-xl border-2 border-gray-500 bg-white shadow">
    <div class="border-b-2 border-inherit px-3 py-2 font-bold">型</div>
    <div class="flex flex-1 flex-col items-center justify-center gap-2 px-3 py-4 text-center">
      <div class="h-12 flex items-center"><SharedImage src="images/webmcp-types-icon.webp" img-class="h-12" /></div>
      <div class="h-12 flex items-center"><a href="https://github.com/webmachinelearning/webmcp-types" target="_blank"><code>webmcp-types</code><ph-arrow-square-out class="ml-0.5 inline text-xs opacity-60" /></a></div>
      <div class="h-12 text-xs opacity-60">ブラウザ API の型（仕様の団体が提供）</div>
    </div>
  </div>
  <div class="w-48 flex flex-col rounded-xl border-2 border-gray-500 bg-white shadow">
    <div class="border-b-2 border-inherit px-3 py-2 font-bold">目視確認</div>
    <div class="flex flex-1 flex-col items-center justify-center gap-2 px-3 py-4 text-center">
      <div class="h-12 flex items-center"><SharedImage src="images/WebMCP_extend_icon.webp" img-class="h-12" /></div>
      <div class="h-12 flex items-center"><a href="https://github.com/beaufortfrancois/model-context-tool-inspector" target="_blank">Model Context Tool Inspector<ph-arrow-square-out class="ml-0.5 inline text-xs opacity-60" /></a></div>
      <div class="h-12 text-xs opacity-60">ツールを一覧して手で実行できる Chrome 拡張</div>
    </div>
  </div>
  <div class="w-48 flex flex-col rounded-xl border-2 border-gray-500 bg-white shadow">
    <div class="border-b-2 border-inherit px-3 py-2 font-bold">テスト</div>
    <div class="flex flex-1 flex-col items-center justify-center gap-2 px-3 py-4 text-center">
      <div class="h-12 flex items-center"><logos-playwright class="text-5xl" /></div>
      <div class="h-12 flex items-center"><a href="https://playwright.dev/docs/api/class-webmcp" target="_blank">Playwright 1.64<ph-arrow-square-out class="ml-0.5 inline text-xs opacity-60" /></a></div>
      <div class="h-12 text-xs opacity-60"><code>page.webmcp.callTool()</code> でツールを呼べる</div>
    </div>
  </div>
  <div class="w-48 flex flex-col rounded-xl border-2 border-gray-500 bg-white shadow">
    <div class="border-b-2 border-inherit px-3 py-2 font-bold">実行環境</div>
    <div class="flex flex-1 flex-col items-center justify-center gap-2 px-3 py-4 text-center">
      <div class="relative h-12 flex items-center gap-4 text-3xl"><span class="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-sky-500 px-1.5 text-[10px] leading-4 text-sky-600">WebMCP 対応</span><logos-chrome /><logos-cloudflare-icon /></div>
      <div class="h-12 flex flex-col justify-center whitespace-nowrap"><a href="https://developer.chrome.com/docs/modern-web-guidance/guides/webmcp/webmcp?hl=ja" target="_blank">Chromium<ph-arrow-square-out class="ml-0.5 inline text-xs opacity-60" /></a><a href="https://developers.cloudflare.com/browser-run/features/webmcp/" target="_blank">Kitesurf<ph-arrow-square-out class="ml-0.5 inline text-xs opacity-60" /></a></div>
      <div class="h-12 text-xs opacity-60">Kitesurf は Cloudflare が OSS 化した AI エージェント向けのヘッドレスブラウザ</div>
    </div>
  </div>
</div>

---
layout: section
---

<!-- 目安: 10秒 -->

# 今あるフロントエンドに<br>つないでみる

---
layout: default
clicks: 1
transition: view-transition
---

<!-- 目安: 45秒。左がコードの全体像、右が画面での見え方。hooks から WebMCP の枝が生えると、画面は同じまま AI にもツールが見える -->

# 既存のコードはそのまま、UI の隣に WebMCP を足す

<SlideBody left-class="w-1/2 flex items-center justify-center" right-class="w-1/2 flex flex-col items-center justify-center gap-4">
<template #left>
<FrontendBranch :step="$clicks" />
</template>
<template #right>
<div>
  <div class="mb-2 text-center text-sm font-bold opacity-70">利用者から見えること</div>
  <!-- 左の図（寄る 0.5秒 → 矢印 0.5秒 → registerTool 0.5秒）が動き終わってから、画面が光り、ツールが出る -->
  <EcScreen :lit="$clicks >= 1" delay="delay-1500" />
</div>
<div>
  <div class="mb-2 text-center text-sm font-bold opacity-70">AI から見えること</div>
  <div class="relative w-88 flex items-center gap-3 rounded-xl border-2 border-gray-500 bg-white px-5 py-3 text-sm shadow">
    <ph-robot-duotone class="text-xl" />
    <span class="opacity-50 transition-opacity duration-300" :class="$clicks >= 1 && 'opacity-0!'">使えるツール: なし</span>
    <div class="absolute left-14 flex gap-3 transition-opacity duration-500" :class="$clicks >= 1 ? 'opacity-100 delay-2000' : 'opacity-0'">
      <span class="flex items-center gap-1 rounded-full border border-sky-500 bg-white px-2 py-0.5 text-xs ring-2 ring-sky-500"><ph-magnifying-glass />search</span>
      <span class="flex items-center gap-1 rounded-full border border-sky-500 bg-white px-2 py-0.5 text-xs ring-2 ring-sky-500"><ph-shopping-cart />add_to_cart</span>
    </div>
  </div>
</div>
</template>
</SlideBody>

---
layout: section
---

<!-- 目安: 10秒。9枚目の図の registerTool の文字が、View Transition でこの見出しの位置へ動いてくる（9枚目の transition: view-transition と、両方の view-transition-name: register-tool で対応づけている） -->

# <span style="view-transition-name: register-tool">registerTool</span> の作り方

---
layout: default
---

<!-- 目安: 75秒。左は3枚目と同じ形のコード（ツール名だけ9枚目の add_to_cart）から始まる Magic Move、右はクリックごとに「何を変えたか」が1項目ずつ増える。手書きの JSON Schema → Zod 定義に置き換え → 実行時の検証を追加 → 関数に包む（「状態が変わればツールも変わる」で呼ぶ形） → ジェネリクスで型をつなぐ -->

<!-- TODO(本実装):
- text() の説明がスライドにない（実装は [{ type: 'text', text }] を直接返している）。口頭で補うか、スライドに書き戻すか決める
-->

# 1つの Zod 定義から作る

<SlideBody left-class="w-3/5 flex flex-col justify-center" right-class="w-2/5 flex flex-col justify-center gap-6 pl-6">
<template #left>
<!-- 上端を固定するため、最終ステップ（③と同じ19行で最も長い）と同じコードを invisible で重ね、その高さで中央寄せする -->
<div class="relative grid items-start [&>*]:col-start-1 [&>*]:row-start-1">
<div class="invisible">

```ts
const registerTool = <I extends z.ZodType>(
  tool: Tool<I>,
  signal: AbortSignal,
) =>
  document.modelContext.registerTool(
    {
      name: tool.name,
      description: tool.description,
      inputSchema: z.toJSONSchema(tool.input),
      execute: async (raw) => {
        const { success, data, error } = tool.input.safeParse(raw)
        if (!success)
          return { content: text(error.message), isError: true }
        return { content: text(await tool.execute(data)) }
      },
    },
    { signal },
  )
```

</div>
<div>

````md magic-move
```ts
await document.modelContext.registerTool(
  {
    name: 'add_to_cart',
    description: '…',
    inputSchema: { /* … */ },
    execute: async (input) => { /* … */ },
  },
  { signal },
)
```
```ts
await document.modelContext.registerTool(
  {
    name: 'add_to_cart',
    description: '…',
    inputSchema: {
      type: 'object',
      properties: {
        productId: { type: 'string' },
        quantity: { type: 'integer', minimum: 1 },
      },
      required: ['productId', 'quantity'],
    },
    execute: async (input) => { /* … */ },
  },
  { signal },
)
```
```ts
const input = z.object({
  productId: z.string(),
  quantity: z.int().min(1),
})
await document.modelContext.registerTool(
  {
    name: 'add_to_cart',
    description: '…',
    inputSchema: z.toJSONSchema(input),
    execute: async (raw) => { /* … */ },
  },
  { signal },
)
```
```ts
const input = z.object({
  productId: z.string(),
  quantity: z.int().min(1),
})
await document.modelContext.registerTool(
  {
    name: 'add_to_cart',
    description: '…',
    inputSchema: z.toJSONSchema(input),
    execute: async (raw) => {
      const { success, data, error } = input.safeParse(raw)
      if (!success)
        return { content: text(error.message), isError: true }
      await addToCart(data)
      return { content: text('カートに追加しました') }
    },
  },
  { signal },
)
```
```ts
const registerTool = (
  tool: Tool,
  signal: AbortSignal,
) =>
  document.modelContext.registerTool(
    {
      name: tool.name,
      description: tool.description,
      inputSchema: z.toJSONSchema(tool.input),
      execute: async (raw) => {
        const { success, data, error } = tool.input.safeParse(raw)
        if (!success)
          return { content: text(error.message), isError: true }
        return { content: text(await tool.execute(data)) }
      },
    },
    { signal },
  )
```
```ts {*|5}
const registerTool = <I extends z.ZodType>(
  tool: Tool<I>,
  signal: AbortSignal,
) =>
  document.modelContext.registerTool(
    {
      name: tool.name,
      description: tool.description,
      inputSchema: z.toJSONSchema(tool.input),
      execute: async (raw) => {
        const { success, data, error } = tool.input.safeParse(raw)
        if (!success)
          return { content: text(error.message), isError: true }
        return { content: text(await tool.execute(data)) }
      },
    },
    { signal },
  )
```
````

</div>
<!-- 6クリック目（行ハイライトの 0.7秒後。戻るときは遅延なしで消すため、表示中だけ delay を効かせる）: 5行目の modelContext の真下に、エディタの hover のような型定義の窓を出す。中身は webmcp-types の index.d.ts から抜粋。位置はコードの寸法（余白 8px・1行 18px・1文字約 7.2px）からの目安 -->
<div v-click="6" class="duration-500! [&:not(.slidev-vclick-hidden)]:delay-700 absolute left-[88px] top-[112px] rounded-md border border-gray-400 bg-gray-300 shadow-lg" style="--slidev-code-background: #d1d5db; --slidev-code-font-size: 10px; --slidev-code-line-height: 15px;">

<!-- eslint-skip -->

```ts
(property) Document.modelContext?: WebMCP.ModelContext
```

<div class="border-t border-gray-300" />

<!-- eslint-skip -->

```ts
interface ModelContext extends EventTarget {
  registerTool(tool, options?): Promise<void>
  getTools(options?): Promise<RegisteredTool[]>
  executeTool(tool, inputObject?, options?): Promise<string>
}
```

<div class="px-2 pb-1 text-right text-[10px] opacity-50">webmcp-types · index.d.ts</div>
</div>
</div>
</template>
<template #right>
<div v-click="1" class="duration-500!">① ツールの入力を JSON Schema で書く</div>
<div v-click="2" class="duration-500!">② 入力の Zod 定義に置き換える</div>
<div v-click="3" class="duration-500!">③ 実行時の検証を追加し、品質を担保</div>
<div v-click="4" class="duration-500!">④ 関数に包み、どのツールにも使えるようにする</div>
<div v-click="5" class="duration-500!">⑤ ジェネリクスで型をつなぐ</div>
<!-- 7枚目「開発環境」の型のカードと同じアイコン。⑤で型の話をした後の補足として出す -->
<div v-click="6" class="duration-500! flex items-center gap-2 border-t border-gray-400 pt-4 text-sm opacity-80">
  <SharedImage src="images/webmcp-types-icon.webp" img-class="h-6" />
  <span><code>document.modelContext</code> の型定義は<br /><code>webmcp-types</code></span>
</div>
<!-- コードは簡潔さを優先して ?. を省いているので、hover に出る optional の理由をここで補う -->
<div v-click="6" class="duration-500! -mt-4 pl-8 text-xs opacity-60">対応ブラウザが一部のため optional（<code>modelContext?:</code>）</div>
</template>
</SlideBody>

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
- 「1つの Zod 定義から作る」の registerTool は tool.execute が文字列を返す前提（実装の Tool 型も string）。execute を `await navigate({ to })` のあと `${to} に移りました` を返す形にそろえる
- 目安: 60秒
-->

# 状態が変わればツールも変わる

<div class="h-9/10 flex flex-col justify-center gap-4">

```ts {*|2-4|9-10|12}
useEffect(() => {
  const routes = routesFor(state)
  if (routes.length === 0)
    return // guest: ツールを登録しない
  const controller = new AbortController()
  registerTool({
    name: 'navigate',
    description: '…',
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
- 開発環境（型・目視確認・テスト・実行環境）はもうそろっている
- 既存のフロントエンドはそのままで、足すのは**つなぐ部分**だけ
- 状態を型で表せば、**ツールも状態で型安全に仕分けられる**

</div>
