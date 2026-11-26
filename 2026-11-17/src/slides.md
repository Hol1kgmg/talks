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

<!-- PDF ではコード全体とツールが光った状態（①）にする -->
<PrintClicks :at="1" />

<SlideBody height="h-4/5" right-class="w-1/2 flex items-center justify-center">
<template #left>
<div class="h-full flex flex-col justify-center gap-4">

- ページが **ツール** を登録し、ブラウザの中のエージェントに呼ばせる API

```ts {0|*|3|6}
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

</div>
</template>
<template #right>
<WebMcpFlow :step="$clicks" />
</template>
</SlideBody>

<div class="absolute bottom-10 right-12 text-xs opacity-60">
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

# ユーザーと AI の操作体験の両立

<div class="h-9/10 flex flex-col items-center justify-center gap-10">
<SharedScreen :step="$clicks" />
<div v-click="3" class="text-xl"><b>このページで何ができるか</b>が、利用者と AI の両視点で一致</div>
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

# フロントエンドに繋ぐ

---
layout: default
clicks: 1
transition: view-transition
---

<!-- 目安: 45秒。左がコードの全体像、右が画面での見え方。hooks から WebMCP の枝が生えると、画面は同じまま AI にもツールが見える -->

# 既存のコードを活用できる

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

<!-- 目安: 75秒。左は3枚目と同じコードから始まる Magic Move、右はクリックごとに「何を変えたか」が1項目ずつ増える。手書きの JSON Schema → Zod 定義に置き換え → 実行時の検証を追加 → 関数に包む（13枚目の toolsFor が返すツールを、状態が変わるたびに登録し直せる形） → ジェネリクスで型をつなぐ -->

<!-- TODO(本実装):
- text() の説明がスライドにない（実装は [{ type: 'text', text }] を直接返している）。口頭で補うか、スライドに書き戻すか決める
-->

# 1つの Zod 定義から作る

<!-- PDF では型定義の窓を出す前（⑤まで）の状態にする -->
<PrintClicks :at="5" />

<SlideBody left-class="w-3/5 flex flex-col justify-center" right-class="w-2/5 flex flex-col justify-center pl-6">
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
<div class="flex flex-col gap-6">
<div v-click="1" class="duration-500!">① ツールの入力を JSON Schema で書く</div>
<div v-click="2" class="duration-500!">② 入力の Zod 定義に置き換える</div>
<div v-click="3" class="duration-500!">③ 実行時の検証を追加し、品質を担保</div>
<div v-click="4" class="duration-500!">④ 関数に包み、どのツールにも使えるようにする</div>
<div v-click="5" class="duration-500!">⑤ ジェネリクスで型をつなぐ</div>
</div>
<!-- ⑤までは高さ 0 にして①〜⑤を上下中央に置き、6クリック目で 0fr→1fr に広げて①〜⑤を上へずらす。リストとの間隔は高さ 0 のときに残らないよう内側の pt-6 で取る -->
<div class="grid transition-all duration-500" :class="$clicks >= 6 ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'">
<div class="overflow-hidden">
<div class="flex flex-col gap-6 pt-6">
<!-- 7枚目「開発環境」の型のカードと同じアイコン。⑤で型の話をした後の補足として出す -->
<div v-click="6" class="duration-500! flex items-center gap-2 border-t border-gray-400 pt-4 text-sm opacity-80">
  <SharedImage src="images/webmcp-types-icon.webp" img-class="h-6" />
  <span><code>document.modelContext</code> の型定義は<br /><code>webmcp-types</code></span>
</div>
<!-- コードは簡潔さを優先して ?. を省いているので、hover に出る optional の理由をここで補う -->
<div v-click="6" class="duration-500! -mt-4 pl-8 text-xs opacity-60">対応ブラウザが一部のため optional（<code>modelContext?:</code>）</div>
</div>
</div>
</div>
</template>
</SlideBody>

---
layout: section
---

<!-- 目安: 10秒。WebMCP はブラウザで動くので、フロントエンドが持っている状態とその型をそのまま使える、という前提をここで言い切る -->

# ブラウザで動くから

---
layout: section
---

# 画面の状態が使える

---
layout: default
---

<!-- 目安: 60秒。9・11枚目と同じ EC サイトの例。State は「カートに入れる」ボタンの出し分けにも使っている型で、addToCart は User を受け取って作るので、guest のときは型の上で作れない -->

# 状態の型定義からツールの一覧を作る

<PrintClicks :at="0" />

<!-- 上の段: 左にコード、右に画面。下の段: 両方をまとめて説明する箇条書きを横幅いっぱいに置く -->
<!-- コードのハイライト（1クリック目: guest / 2クリック目: member）に合わせて、右の画面と AI のツールが切り替わる。0クリック目は guest の画面 -->
<div class="h-9/10 flex flex-col justify-center gap-6">
<div class="flex items-center">
<div class="w-1/2">

```tsx {*|2,10,12|3,6-7,10-11}
type State
  = | { status: 'guest' }
    | { status: 'member', user: User }

const CartButton = (state: State) =>
  state.status === 'member'
  && <button>カートに入れる</button>

const toolsFor = (state: State) =>
  state.status === 'member'
    ? [search, addToCart(state.user)]
    : [search]
```

<div class="mt-1 text-xs opacity-60">※ 説明用に簡略化</div>
</div>
<div class="w-1/2 flex flex-col items-center gap-3">
<div>
  <div class="mb-1 text-center text-xs font-bold opacity-70">利用者から見えること</div>
  <EcScreen lit :state="$clicks >= 2 ? 'member' : 'guest'" />
</div>
<div>
  <div class="mb-1 text-center text-xs font-bold opacity-70">AI から見えること</div>
  <!-- 9枚目の「AI から見えること」と同じ見た目 -->
  <div class="w-88 flex items-center gap-3 rounded-xl border-2 border-gray-500 bg-white px-5 py-3 text-sm shadow">
    <ph-robot-duotone class="text-xl" />
    <span class="flex items-center gap-1 rounded-full border border-sky-500 bg-white px-2 py-0.5 text-xs ring-2 ring-sky-500"><ph-magnifying-glass />search</span>
    <span class="flex items-center gap-1 rounded-full border border-sky-500 bg-white px-2 py-0.5 text-xs ring-2 ring-sky-500 transition-opacity duration-500" :class="$clicks < 2 && 'opacity-0'"><ph-shopping-cart />add_to_cart</span>
  </div>
</div>
</div>
</div>

- 利用者に見せる UI と WebMCP のツールを、**同じ `State` で制御できる**
  - 「カートに入れる」ボタンも `add_to_cart` も、ログインしたときだけ出る
- guest には `state.user` がないので、`add_to_cart` を作ろうとすると**型エラー**

</div>

<!-- Slidev のコードハイライトは opacity をそのまま切り替えるだけなので、このスライドだけ右の図と同じ 0.5秒のフェードを付ける（slide 内の style はこのスライドに閉じる） -->
<style>
.slidev-code .line {
  transition: opacity 0.5s;
}
</style>

---
layout: section
---

<!-- 目安: 10秒 -->

# AI と WebMCP をつなぐ

---
layout: default
clicks: 1
---

<!-- 目安: 45〜60秒。◯ は自分で気づく、△ は自分では気づかないが、指示を出せば使える。1クリック目で △ だけを残し「検知しない ≠ 使えない」を口頭で言う -->

<!-- TODO(要確認・2026年11月時点):
- 手元で未確認: Antigravity 2.0（内蔵のブラウザエージェントが CDP で Chrome を操作する。自分でツールに気づけば ◯ に変える）、Claude Code / Codex CLI / Antigravity CLI（Gemini CLI の後継。2026年6月に個人向けの提供終了。chrome-devtools-mcp に --categoryExperimentalWebmcp を付けて list_webmcp_tools が見えるか）、Gemini in Chrome（I/O 2026 で「近く対応」と発表。当日までに出ていれば ◯ に変える）、ChatGPT・Gemini のモバイルアプリ
- 確認済み: Claude デスクトップアプリ・モバイルアプリ（本人）、Claude in Chrome（anthropics/claude-code#76809）、ChatGPT デスクトップアプリの内蔵ブラウザ（OpenAI ヘルプ。Chrome では使えない）
-->

# 各 AI の WebMCP 対応表

<PrintClicks :at="0" />

<!-- 表のセルは枠線・影なしで、白地だけで区切る。△ 以外のセルは1クリック目で薄くする -->
<div class="h-9/10 flex flex-col items-center justify-center gap-6">
<div class="mb-4 text-lg opacity-80 underline underline-offset-4">すべての AI が WebMCP に対応しているわけではない</div>
<!-- 凡例は4×3のマスに対して中央寄せする（左の AI 名の列 8rem + gap 0.5rem の分だけずらす） -->
<div class="flex flex-col gap-6">
<div class="grid grid-cols-[8rem_repeat(4,9rem)] gap-2 text-center text-sm [&_.cell]:h-16 [&_.cell]:flex [&_.cell]:flex-col [&_.cell]:items-center [&_.cell]:justify-center [&_.cell]:rounded-xl [&_.cell]:bg-white [&_.cell]:transition-opacity [&_.cell]:duration-500 [&_.mark]:text-xl [&_.mark]:font-bold [&_.name]:text-xs [&_.name]:opacity-60">
  <div />
  <div class="flex items-center justify-center gap-1 font-bold"><ph-desktop />デスクトップ</div>
  <div class="flex items-center justify-center gap-1 font-bold"><logos-chrome />Chrome 上</div>
  <div class="flex items-center justify-center gap-1 font-bold"><ph-terminal-window />CLI</div>
  <div class="flex items-center justify-center gap-1 font-bold"><ph-device-mobile />モバイル</div>

  <div class="flex items-center gap-2 font-bold"><logos-claude-icon />Claude</div>
  <div class="cell" :class="$clicks >= 1 && 'opacity-30'"><span class="mark text-sky-600">◯</span></div>
  <div class="cell"><span class="mark text-amber-600">△</span><span class="name">Claude in Chrome</span></div>
  <div class="cell"><span class="mark text-amber-600">△</span><span class="name">Claude Code</span></div>
  <div class="cell" :class="$clicks >= 1 && 'opacity-30'"><span class="mark text-gray-500">✕</span></div>

  <div class="flex items-center gap-2 font-bold"><logos-openai-icon />ChatGPT</div>
  <div class="cell" :class="$clicks >= 1 && 'opacity-30'"><span class="mark text-sky-600">◯</span><span class="name">内蔵ブラウザ</span></div>
  <div class="cell" :class="$clicks >= 1 && 'opacity-30'"><span class="mark text-gray-500">─</span></div>
  <div class="cell"><span class="mark text-amber-600">△</span><span class="name">Codex CLI</span></div>
  <div class="cell" :class="$clicks >= 1 && 'opacity-30'"><span class="mark text-gray-500">✕</span></div>

  <div class="flex items-center gap-2 font-bold"><vscode-icons-file-type-gemini />Gemini</div>
  <div class="cell"><span class="mark text-amber-600">△</span><span class="name">Antigravity 2.0</span></div>
  <div class="cell" :class="$clicks >= 1 && 'opacity-30'"><span class="mark text-gray-500 text-sm! leading-7!">予定</span><span class="name">Gemini in Chrome</span></div>
  <div class="cell"><span class="mark text-amber-600">△</span><span class="name">Antigravity CLI</span></div>
  <div class="cell" :class="$clicks >= 1 && 'opacity-30'"><span class="mark text-gray-500">✕</span></div>
</div>

<!-- 凡例も表のセルと同じく、1クリック目で △ 以外を薄くする -->
<div class="ml-[8.5rem] mt-4 flex justify-center gap-6 text-xs opacity-70 [&>span]:transition-opacity [&>span]:duration-500">
  <span :class="$clicks >= 1 && 'opacity-30'"><b class="text-sky-600">◯</b> 自分で気づく</span>
  <span><b class="text-amber-600">△</b> 指示を出せば使える</span>
  <span :class="$clicks >= 1 && 'opacity-30'"><b class="text-gray-500">✕</b> 使えない</span>
  <span :class="$clicks >= 1 && 'opacity-30'"><b class="text-gray-500">─</b> 対象外</span>
</div>
</div>
</div>

<div class="absolute bottom-8 right-12 text-xs transition-opacity duration-500" :class="$clicks >= 1 ? 'opacity-20' : 'opacity-60'">
  ※ 2026年11月時点。CLI はブラウザ操作の MCP（<code>chrome-devtools-mcp</code>）をつないだ場合
</div>

---
layout: default
---

<!-- 目安: 20秒。テーマを並べるだけにし、結論は書かない（書くと話さないといけなくなる）。カードは7枚目「開発環境」と同じ見た目 -->

# 他にも話したかったこと

<div class="h-9/10 flex items-stretch justify-center gap-6 py-16">
  <div class="w-64 flex flex-col rounded-xl border-2 border-gray-500 bg-white shadow">
    <div class="border-b-2 border-inherit px-3 py-2 font-bold">相性</div>
    <div class="flex flex-1 flex-col items-center justify-center gap-3 px-3 py-4 text-center">
      <logos-cloudflare-icon class="text-5xl" />
      <a href="https://developers.cloudflare.com/browser-run/features/webmcp/" target="_blank">Kitesurf<ph-arrow-square-out class="ml-0.5 inline text-xs opacity-60" /></a>
      <div class="text-sm opacity-70">なぜ WebMCP と相性がいいのか</div>
    </div>
  </div>
  <div class="w-64 flex flex-col rounded-xl border-2 border-gray-500 bg-white shadow">
    <div class="border-b-2 border-inherit px-3 py-2 font-bold">比較</div>
    <div class="flex flex-1 flex-col items-center justify-center gap-3 px-3 py-4 text-center">
      <logos-vercel-icon class="text-5xl" />
      <a href="https://azukiazusa.dev/blog/ui-sdk-agent-ready-behaviors/" target="_blank">UI SDK<ph-arrow-square-out class="ml-0.5 inline text-xs opacity-60" /></a>
      <div class="text-sm opacity-70">Vercel の UI SDK と WebMCP は何が違うのか</div>
    </div>
  </div>
  <div class="w-64 flex flex-col rounded-xl border-2 border-gray-500 bg-white shadow">
    <div class="border-b-2 border-inherit px-3 py-2 font-bold">連携</div>
    <div class="flex flex-1 flex-col items-center justify-center gap-3 px-3 py-4 text-center">
      <SharedImage src="images/shared/personal_agent_protocol_icon.webp" img-class="h-[3.6rem]" />
      <a href="https://personalagentprotocol.org/" target="_blank">Personal Agent Protocol<ph-arrow-square-out class="ml-0.5 inline text-xs opacity-60" /></a>
      <div class="text-sm opacity-70">WebMCP と連携できるのか</div>
    </div>
  </div>
</div>

---
layout: default
---

<!-- 目安: 30秒。5枚目・11・13枚目・15枚目を1項目ずつ振り返る。「TypeScript なら」で 7枚目の型定義・11枚目の Zod・13枚目の状態の型をまとめて指し、開発環境がそろっていることは口頭で補う -->

# まとめ

<!-- 3項目だけなので、項目の間を広く空けて上から並べる（gap は ul 1つにしか効かないため、li の余白で空ける） -->
<div class="h-9/10 px-8 [&_li]:my-10">

- WebMCP は、ユーザーと AI の操作体験を両立させるための手段
- 開発環境が整っており、既存の実装を維持したまま、型安全に導入できる
- ただし、すべての AI が能動的に WebMCP のツールを使える状態になっていない

</div>
