<script setup lang="ts">
// step: スライドのクリック数。コードの行ハイライト {*|1,8|3-5|6} と同じ順で進める
// 1: 登録（signal も同時に渡す） / 2: エージェントに見える / 3: 呼ばれて実行
// signal は実行とは無関係にツールを使える期間だけを決めるので、解除の場面は図に入れない
const props = defineProps<{ step: number }>()

// 0 のときは全体を見せるので全部を通常表示、以降はその step の矢印だけ強調する
const cls = (steps: number[]) =>
  props.step === 0 || steps.includes(props.step)
    ? steps.includes(props.step) ? 'text-sky-600 font-bold opacity-100' : 'opacity-100'
    : 'opacity-25'

// ツールのチップ。from の step から現れる
const chip = (from: number) => props.step >= from ? 'opacity-100' : 'opacity-0'

const box = 'w-96 rounded-xl border-2 border-gray-500 bg-white shadow'
</script>

<template>
  <div class="flex flex-col items-center">
    <!-- ページ: ウィンドウのモック -->
    <div :class="box" class="overflow-hidden">
      <div class="flex items-center gap-2 bg-gray-100 px-3 py-1 text-xs">
        <span class="text-red-400">●</span><span class="-ml-1 text-yellow-400">●</span><span class="-ml-1 text-green-400">●</span>
        <code class="flex-1 rounded bg-white px-2">/home</code>
      </div>
      <div class="flex items-center gap-3 px-3 py-2">
        <ph-app-window class="text-2xl" />
        <div class="whitespace-nowrap font-bold">
          あなたのサイト
        </div>
        <div class="ml-auto flex flex-col gap-1">
          <div class="h-1.5 w-16 rounded bg-gray-300" />
          <div class="h-1.5 w-12 rounded bg-gray-300" />
          <div class="h-1.5 w-14 rounded bg-gray-300" />
        </div>
      </div>
    </div>

    <div class="flex gap-10 py-1 text-sm">
      <div class="w-36 text-right transition-all duration-500" :class="cls([1])">
        ツールを登録 ↓
      </div>
      <div class="w-36 transition-all duration-500" :class="cls([3])">
        ↑ execute を実行
      </div>
    </div>

    <!-- ブラウザ: 登録済みツールの欄 -->
    <div :class="box" class="px-3 py-2">
      <div class="flex items-center gap-2">
        <logos-chrome class="text-xl" />
        <div class="whitespace-nowrap font-bold">
          ブラウザ
        </div>
        <code class="text-xs opacity-60">document.modelContext</code>
      </div>
      <div class="mt-1 flex items-center gap-2 text-xs">
        <span class="opacity-60">登録済みツール:</span>
        <!-- registerTool がチップを包む形にして、navigate がこの呼び出しで登録されたことを示す -->
        <span class="flex items-center gap-1 rounded border border-orange-500 bg-orange-50 px-1 font-mono text-orange-600 transition-all duration-500" :class="chip(1)">
          registerTool(
          <span class="flex items-center gap-1 rounded-full border border-sky-500 px-2 font-sans text-black transition-all duration-500" :class="step === 3 ? 'bg-sky-100 font-bold' : 'bg-white'">
            <ph-wrench />navigate
          </span>
          )
        </span>
      </div>
    </div>

    <div class="flex gap-10 py-1 text-sm">
      <div class="w-36 text-right transition-all duration-500" :class="cls([2])">
        ツールが見える ↓
      </div>
      <div class="w-36 transition-all duration-500" :class="cls([3])">
        ↑ ツールを呼ぶ
      </div>
    </div>

    <!-- エージェント: 利用者の依頼と、使えるツール -->
    <div :class="box" class="px-3 py-2">
      <div class="flex items-center gap-2">
        <ph-robot-duotone class="text-2xl" />
        <div class="whitespace-nowrap font-bold">
          エージェント
        </div>
        <span class="flex items-center gap-1 rounded-full border border-sky-500 px-2 text-xs transition-all duration-500" :class="[chip(2), step === 3 ? 'bg-sky-100 font-bold' : '']">
          <ph-wrench />navigate
        </span>
      </div>
      <div class="mt-1 flex items-center gap-2 text-xs">
        <ph-user />
        <span class="rounded-lg bg-gray-100 px-2 py-0.5">「アイテムを作る画面を開いて」</span>
      </div>
    </div>
  </div>
</template>
