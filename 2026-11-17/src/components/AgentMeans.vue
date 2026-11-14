<script setup lang="ts">
// step: スライドのクリック数
// 0: 全部薄く表示 / 1〜3: 左のカードから順に、その1枚だけを明るくする（最後の WebMCP は強調も兼ねる）
// 4: WebMCP のカードを明るくしたまま、チャットと navigate を動かす
// 各カードの上段は何が提供されているか、下段はどうやって実行させるか
// DOM のカードだけは、画面そのものが提供されているもの・推測で押すのが実行なので上下を入れ替えない
const props = defineProps<{ step: number }>()

// WebMCP のカードが明るくなった次のクリックで、チャットの依頼 → AI の返事 → 画面の navigate が光る、の順に見せる
// 光るのは、AI が画面のツールを見つけたことを示す
const chat = (delay: number, origin: string) => ({
  class: [origin, props.step === 4 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'],
  style: { transitionDelay: `${delay}ms`, transitionTimingFunction: 'cubic-bezier(.34, 1.56, .64, 1)' },
})

// i: 左からのカード番号
const card = (i: number) => {
  const active = i === 2 ? props.step >= 3 : props.step === i + 1
  if (!active)
    return 'opacity-25'
  return i === 2 ? 'border-sky-500 scale-105 shadow-lg' : ''
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
      <div :class="section" class="border-t border-dashed border-gray-300">
        <div class="flex h-20 items-center gap-2">
          <div class="rounded-lg border border-gray-400 px-2 py-1 text-xs">
            <ph-chat-circle-dots class="text-lg" />
            <div class="mt-1 rounded bg-gray-100 px-1">
              作って
            </div>
          </div>
          <ph-arrow-right />
          <div class="rounded-lg border border-gray-400 px-2 py-1 text-center text-xs">
            <ph-plugs class="text-lg" />API
          </div>
        </div>
        <div :class="caption">
          画面とは別の窓口から
        </div>
      </div>
    </div>

    <!-- DOM を操作するエージェント -->
    <div :class="[box, card(1), { paused: step !== 2 }]">
      <div class="flex items-center gap-2 border-b-2 border-inherit px-3 py-2 font-bold">
        <ph-cursor-click class="text-xl" />DOM を操作
      </div>
      <div :class="section">
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
      <div :class="section" class="border-t border-dashed border-gray-300">
        <div class="relative flex h-16 items-center gap-3">
          <div v-for="i in 3" :key="i" :class="btn" class="flex items-center justify-center">
            <ph-question-bold class="guess text-xs text-orange-500" :style="{ animationDelay: `${i * 0.4}s` }" />
          </div>
          <ph-robot-duotone class="cursor-wander absolute text-lg" />
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
              :style="step === 4
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

/* どれを押すか迷うエージェント */
.cursor-wander {
  animation: wander 2.4s ease-in-out infinite;
  top: 0;
}
@keyframes wander {
  0%,
  100% {
    left: 0.5rem;
  }
  50% {
    left: 9rem;
  }
}
.guess {
  animation: guess 1.2s ease-in-out infinite;
}
@keyframes guess {
  0%,
  100% {
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
}

/* 薄く表示している間は止める */
.paused :is(.cursor-click, .cursor-wander, .guess) {
  animation-play-state: paused;
}
</style>
