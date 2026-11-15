<script setup lang="ts">
// step: スライドのクリック数
// 0: 全部薄く表示 / 以降、左のカードから順に2クリックずつ使う
// 1枚目のクリックでカードを明るくし、2枚目のクリックで下段（AI にどうさせるか）を動かす
// 1・2: API・MCP / 3・4: DOM（上段のカーソルは3から動かす）/ 5・6: WebMCP
// 7: 最後に WebMCP のカードだけ枠を水色にして強調する
// 各カードの上段は何が提供されているか、下段はどうやって実行させるか
// DOM のカードだけは、画面そのものが提供されているもの・推測で押すのが実行なので上下を入れ替えない
const props = defineProps<{ step: number }>()

// WebMCP のカードが明るくなった次のクリックで、チャットの依頼 → AI の返事 → 画面の navigate が光る、の順に見せる
// 光るのは、AI が画面のツールを見つけたことを示す
const chat = (delay: number, origin: string) => ({
  class: [origin, props.step >= 6 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'],
  style: { transitionDelay: `${delay}ms`, transitionTimingFunction: 'cubic-bezier(.34, 1.56, .64, 1)' },
})

// i: 左からのカード番号
const card = (i: number) => {
  const active = i === 2 ? props.step >= 5 : Math.ceil(props.step / 2) === i + 1
  if (!active)
    return 'opacity-25'
  return i === 2 && props.step >= 7 ? 'border-sky-500 scale-105 shadow-lg' : ''
}

const box = 'w-72 flex flex-col rounded-xl border-2 border-gray-500 bg-white shadow transition-all duration-500'
const section = 'flex flex-col items-center gap-1 px-3 py-2 transition-all duration-500'
const caption = 'text-xs opacity-60'
// 画面のモック
const page = 'relative overflow-hidden rounded border border-gray-400 bg-gray-50'
const btn = 'h-4 w-12 rounded bg-gray-300'
const tool = 'flex items-center gap-1 rounded-full border border-sky-500 bg-white px-2 text-xs'
</script>

<template>
  <div class="flex items-stretch justify-center gap-6">
    <!-- API・MCP サーバー・Bot -->
    <div :class="[box, card(0)]">
      <div class="flex items-center gap-2 border-b-2 border-inherit px-3 py-2 font-bold">
        <ph-plugs class="text-xl" />API・MCP サーバー・Bot
      </div>
      <div :class="section">
        <div class="flex h-16 items-stretch gap-2 text-xs">
          <div class="rounded-lg border border-gray-400 px-2 py-1">
            <div class="opacity-60">
              公開 API
            </div>
            <div class="font-mono">
              GET /items<br>POST /items
            </div>
          </div>
          <div class="flex flex-col rounded-lg border border-gray-400 px-2 py-1">
            <div class="opacity-60">
              MCP サーバー
            </div>
            <div class="flex flex-1 items-center">
              <span class="flex items-center gap-1 rounded-full border border-gray-400 px-2"><ph-wrench />list_items</span>
            </div>
          </div>
        </div>
        <div :class="caption">
          公開された API・MCP のツール
        </div>
      </div>
      <div :class="[section, { paused: step !== 2 }]" class="border-t border-dashed border-gray-300">
        <!-- サーバーを作る → AI がつなぐ → 依頼が線を通ってサーバーへ届き、✓ が返る -->
        <div class="flex h-20 items-center text-xs">
          <div class="relative">
            <div class="bubble absolute bottom-full left-1/2 mb-1 whitespace-nowrap rounded-xl rounded-bl-sm bg-gray-100 px-2">
              作って
            </div>
            <ph-robot-duotone class="text-xl" />
          </div>
          <div class="relative mx-1 h-4 w-20">
            <div class="wire absolute inset-x-0 top-1/2 origin-left border-t-2 border-dashed border-gray-500" />
            <ph-plug class="plug absolute right-0 top-1/2 -translate-y-1/2" />
            <div class="packet absolute top-1/2 h-2 w-2 rounded-full bg-gray-700" />
            <ph-check-bold class="reply absolute top-1/2 text-green-600" />
          </div>
          <div class="flex w-20 flex-col gap-1 rounded-lg border border-gray-400 p-1">
            <div class="flex items-center justify-between">
              MCP<span class="lamp h-2 w-2 rounded-full bg-gray-300" />
            </div>
            <div class="code-1 h-1.5 w-12 origin-left rounded bg-gray-400" />
            <div class="code-2 h-1.5 w-8 origin-left rounded bg-gray-400" />
            <div class="code-3 h-1.5 w-14 origin-left rounded bg-gray-400" />
          </div>
        </div>
        <div :class="caption">
          画面とは別の窓口から
        </div>
      </div>
    </div>

    <!-- DOM を操作するエージェント -->
    <div :class="[box, card(1)]">
      <div class="flex items-center gap-2 border-b-2 border-inherit px-3 py-2 font-bold">
        <ph-cursor-click class="text-xl" />DOM を操作
      </div>
      <div :class="[section, { paused: step !== 3 && step !== 4 }]">
        <div :class="page" class="h-20 w-56">
          <div class="flex gap-3 p-3">
            <div :class="btn" /><div :class="btn" /><div :class="btn" />
          </div>
          <ph-cursor-fill class="cursor-click absolute text-lg" />
        </div>
        <div :class="caption">
          画面を代わりに操作
        </div>
      </div>
      <div :class="[section, { paused: step !== 4 }]" class="border-t border-dashed border-gray-300">
        <div class="relative flex h-16 items-center gap-3">
          <!-- 左から順に押してみて、外れなら ×、最後のボタンで当たりの ✓ -->
          <div
            v-for="i in 3" :key="i" :class="btn"
            class="press relative flex items-center justify-center"
            :style="{ animationDelay: `${(i - 1) * 1.5}s` }"
          >
            <ph-question-bold class="ask absolute text-xs text-orange-500" :style="{ animationDelay: `${(i - 1) * 1.5}s` }" />
            <ph-check-bold v-if="i === 3" :class="`hit-${i}`" class="absolute text-xs text-green-600" />
            <ph-x-bold v-else :class="`hit-${i}`" class="absolute text-xs text-red-500" />
          </div>
          <ph-robot-duotone class="cursor-try absolute text-lg" />
        </div>
        <div :class="caption">
          エージェントが推測
        </div>
      </div>
    </div>

    <!-- WebMCP -->
    <div :class="[box, card(2)]">
      <div class="flex items-center gap-2 border-b-2 border-inherit px-3 py-2 font-bold">
        <ph-wrench class="text-xl" />WebMCP
      </div>
      <div :class="section">
        <div class="flex h-16 items-center">
          <!-- サイトの枠の中にツールを置き、サイトが持っていることを示す -->
          <div class="flex items-center gap-2 rounded-lg border border-gray-400 px-2 py-1 text-xs">
            <ph-app-window class="text-lg" />サイト
            <span :class="tool"><ph-wrench />navigate</span>
          </div>
        </div>
        <div :class="caption">
          サイトがツールを持つ
        </div>
      </div>
      <div :class="section" class="border-t border-dashed border-gray-300">
        <div :class="page" class="flex h-20 w-56">
          <div class="flex flex-1 flex-col justify-between p-3">
            <div class="flex gap-2">
              <div :class="btn" class="w-8" /><div :class="btn" class="w-8" />
            </div>
            <!-- 画面が持っているツール。AI の返事の後に光って、見つけられたことを示す -->
            <span
              :class="tool"
              class="self-center transition-all duration-500"
              :style="step >= 6
                ? { transitionDelay: '1700ms', boxShadow: '0 0 8px 2px rgb(14 165 233 / 0.7)' }
                : { opacity: 0.4 }"
            ><ph-wrench />navigate</span>
          </div>
          <div class="flex w-24 flex-col gap-1 border-l border-gray-400 bg-white p-1 text-xs">
            <div class="flex items-center gap-1 border-b border-gray-200 pb-0.5 text-[10px] opacity-60">
              <ph-robot-duotone />AI チャット
            </div>
            <div
              v-bind="chat(700, 'origin-bottom-right')"
              class="self-end rounded-xl rounded-br-sm bg-sky-500 px-2 text-white transition-all duration-300"
            >
              作って
            </div>
            <div
              v-bind="chat(1200, 'origin-bottom-left')"
              class="self-start rounded-xl rounded-bl-sm bg-gray-100 px-2 transition-all duration-300"
            >
              了解
            </div>
          </div>
        </div>
        <div :class="caption">
          AI がサイトのツールを使う
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ボタンを順にクリックしていくカーソル */
.cursor-click {
  animation: click 3s ease-in-out infinite;
}
@keyframes click {
  0%,
  100% {
    left: 2rem;
    top: 1.5rem;
  }
  33% {
    left: 5.5rem;
    top: 1.5rem;
  }
  66% {
    left: 9.5rem;
    top: 1.5rem;
  }
}

/*
 * 推測で押してみるエージェント。5秒で1周し、ボタン1つに1.5秒ずつ使う
 * 各ボタンで: 着く(+0.3s) → ? で迷う → 押す(+0.8〜1.0s) → 結果を出す
 * left はボタンの中心にロボットの中心を合わせた値
 */
.cursor-try {
  animation: try 5s ease-in-out infinite;
}
@keyframes try {
  0%,
  14%,
  20%,
  30% {
    left: 0.94rem;
    top: 0;
  }
  16% {
    left: 0.94rem;
    top: 0.4rem;
  }
  36%,
  46%,
  52%,
  60% {
    left: 4.69rem;
    top: 0;
  }
  48% {
    left: 4.69rem;
    top: 0.4rem;
  }
  66%,
  76%,
  82%,
  92% {
    left: 8.44rem;
    top: 0;
  }
  78% {
    left: 8.44rem;
    top: 0.4rem;
  }
  100% {
    left: 0.94rem;
    top: 0;
  }
}
/* ? と押し込みは各ボタンの1.5秒の中で完結するので、animation-delay でずらして共有する */
.ask {
  animation: ask 5s infinite;
  opacity: 0;
}
@keyframes ask {
  0%,
  5%,
  18%,
  100% {
    opacity: 0;
  }
  6%,
  17% {
    opacity: 1;
  }
}
.press {
  animation: press 5s infinite;
}
@keyframes press {
  0%,
  15%,
  21%,
  100% {
    transform: none;
  }
  16%,
  20% {
    transform: translateY(2px);
    background-color: rgb(156 163 175);
  }
}
/* 結果は周の終わりまで残すため、ボタンごとに出すタイミングを書く */
.hit-1,
.hit-2,
.hit-3 {
  animation: 5s infinite;
  opacity: 0;
}
.hit-1 {
  animation-name: hit-1;
}
.hit-2 {
  animation-name: hit-2;
}
.hit-3 {
  animation-name: hit-3;
}
@keyframes hit-1 {
  0%,
  19%,
  96%,
  100% {
    opacity: 0;
  }
  20%,
  92% {
    opacity: 1;
  }
}
@keyframes hit-2 {
  0%,
  49%,
  96%,
  100% {
    opacity: 0;
  }
  50%,
  92% {
    opacity: 1;
  }
}
@keyframes hit-3 {
  0%,
  79%,
  96%,
  100% {
    opacity: 0;
  }
  80%,
  92% {
    opacity: 1;
  }
}

/*
 * 頼まれてから窓口を用意してつなぐ。6秒で1周する
 * 頼む(0.3s): 「作って」 → 作る(〜2s): コードが1行ずつ伸びる → つなぐ(〜3s): 線が伸びてランプが緑 → 使う(〜5s): 呼び出して ✓ が返る
 * 92%〜96% で全部消して最初に戻る
 */
:is(.code-1, .code-2, .code-3, .wire) {
  animation: 6s infinite;
  transform: scaleX(0);
}
.code-1 {
  animation-name: code-1;
}
.code-2 {
  animation-name: code-2;
}
.code-3 {
  animation-name: code-3;
}
.wire {
  animation-name: wire;
}
@keyframes code-1 {
  0%,
  8%,
  96%,
  100% {
    transform: scaleX(0);
  }
  14%,
  92% {
    transform: scaleX(1);
  }
}
@keyframes code-2 {
  0%,
  15%,
  96%,
  100% {
    transform: scaleX(0);
  }
  22%,
  92% {
    transform: scaleX(1);
  }
}
@keyframes code-3 {
  0%,
  25%,
  96%,
  100% {
    transform: scaleX(0);
  }
  32%,
  92% {
    transform: scaleX(1);
  }
}
@keyframes wire {
  0%,
  34%,
  96%,
  100% {
    transform: scaleX(0);
  }
  48%,
  92% {
    transform: scaleX(1);
  }
}
:is(.plug, .lamp, .bubble, .packet, .reply) {
  animation: 6s infinite;
}
.plug {
  animation-name: plug;
  opacity: 0;
}
@keyframes plug {
  0%,
  47%,
  96%,
  100% {
    opacity: 0;
  }
  50%,
  92% {
    opacity: 1;
  }
}
.lamp {
  animation-name: lamp;
}
@keyframes lamp {
  0%,
  50%,
  96%,
  100% {
    background-color: rgb(209 213 219);
  }
  52%,
  92% {
    background-color: rgb(34 197 94);
    box-shadow: 0 0 4px rgb(34 197 94);
  }
}
.bubble {
  animation-name: bubble;
  opacity: 0;
}
/* 「作って」は人から AI への依頼なのでその場に残す */
@keyframes bubble {
  0%,
  2%,
  96%,
  100% {
    opacity: 0;
  }
  5%,
  92% {
    opacity: 1;
  }
}
/* AI と MCP のやりとり: 呼び出しが左から右へ、✓ が右から左へ線の上を進む */
.packet {
  animation-name: packet;
  opacity: 0;
  translate: -50% -50%;
}
@keyframes packet {
  0%,
  61% {
    left: 0;
    opacity: 0;
  }
  62% {
    left: 0;
    opacity: 1;
  }
  72% {
    left: 100%;
    opacity: 1;
  }
  73%,
  100% {
    left: 100%;
    opacity: 0;
  }
}
.reply {
  animation-name: reply;
  opacity: 0;
  translate: -50% -50%;
}
@keyframes reply {
  0%,
  73% {
    left: 100%;
    opacity: 0;
  }
  74% {
    left: 100%;
    opacity: 1;
  }
  84%,
  92% {
    left: 0;
    opacity: 1;
  }
  96%,
  100% {
    left: 0;
    opacity: 0;
  }
}

/* 薄く表示している間は止める */
.paused
  :is(
    .cursor-click,
    .cursor-try,
    .ask,
    .press,
    .hit-1,
    .hit-2,
    .hit-3,
    .code-1,
    .code-2,
    .code-3,
    .wire,
    .plug,
    .lamp,
    .bubble,
    .packet,
    .reply
  ) {
  animation-play-state: paused;
}
</style>
