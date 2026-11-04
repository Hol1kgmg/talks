<script setup lang="ts">
defineProps<{ active: number }>()

const titles = ['ディレクトリに放り込む', 'スキルの本文をコピペ', 'npx skills で入れる']
</script>

<template>
  <div class="h-9/10 flex items-center">
    <div class="w-full grid grid-cols-3 gap-6">
      <div
        v-for="(title, i) in titles"
        :key="title"
        class="rounded-xl border border-gray-300 bg-white p-5 transition-all duration-500"
        :class="[active === i + 1 ? 'play opacity-100 -translate-y-3 shadow-xl' : active > i + 1 ? 'play played opacity-60' : 'opacity-30 grayscale']"
      >
        <div class="text-center text-xl font-bold">
          {{ title }}
        </div>

        <div class="relative mt-4 h-40 text-xs font-mono">
          <!-- 3: ターミナルで npx を打つ -->
          <div v-if="i === 2" class="h-full rounded-lg bg-gray-900 text-gray-100 overflow-hidden">
            <div class="flex gap-1.5 px-3 py-2 bg-gray-700">
              <span class="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span class="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <span class="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <div class="px-3 py-2 leading-5">
              <div>
                <span class="text-green-400">$ </span><span class="typed">npx skills add foo</span><span class="cursor">▌</span>
              </div>
              <div class="fetch">
                <span class="inline-grid w-3">
                  <span class="spin-wrap text-cyan-400" style="grid-area: 1 / 1"><span class="spin inline-block">◐</span></span>
                  <span class="check text-green-400" style="grid-area: 1 / 1">✔</span>
                </span>
                Fetching foo
              </div>
              <div class="bar-wrap h-1.5 my-1.5 rounded bg-gray-700 overflow-hidden">
                <div class="bar h-full bg-gradient-to-r from-cyan-400 to-green-400" />
              </div>
              <div class="install text-gray-400">
                ◆ Linking .claude/skills
              </div>
              <div class="done inline-block font-bold text-green-400">
                ✔ foo installed 🎉
              </div>
            </div>
          </div>

          <!-- 2: ⌘+V で一気に貼り付く -->
          <div v-else-if="i === 1" class="h-full flex flex-col gap-3">
            <div class="flex justify-center gap-2">
              <kbd class="key key-cmd">⌘</kbd>
              <span class="self-center text-gray-400">+</span>
              <kbd class="key key-v">V</kbd>
            </div>
            <div class="editor flex-1 rounded-lg border border-gray-300 overflow-hidden">
              <div class="px-2 py-1 bg-gray-100 border-b border-gray-300 text-gray-500">
                SKILL.md
              </div>
              <div class="pasted p-2 leading-4 text-gray-700">
                ---<br>name: foo<br>description: ...<br>---<br># foo
              </div>
            </div>
          </div>

          <!-- 1: マウスでドラッグ&ドロップ -->
          <div v-else class="h-full">
            <div class="absolute top-0 inset-x-0 rounded-lg border border-gray-300 p-2">
              <div class="text-gray-400">
                ~/Downloads
              </div>
              <div class="src">
                📄 SKILL.md
              </div>
            </div>
            <div class="absolute bottom-0 inset-x-0 rounded-lg border border-gray-300 p-2 leading-5">
              <div class="text-gray-400">
                .claude/skills/
              </div>
              <div>└ 📁 foo/</div>
              <div class="dropped rounded px-1 -mx-1 ml-3">
                └ 📄 SKILL.md
              </div>
            </div>
            <!-- ponytail: 移動量は固定レイアウト前提の目測値。ずれたら --dx/--dy を調整 -->
            <div class="ghost absolute left-2 top-6" style="--dx: 1.4rem; --dy: 6.3rem">
              <span class="bg-blue-100 rounded px-1">📄 SKILL.md</span>
              <svg class="absolute left-6 top-2" width="14" height="20" viewBox="0 0 14 20">
                <path d="M1 1v15l4-4 3 7 2.5-1-3-7H13z" fill="#111" stroke="#fff" stroke-width="1" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* .play が付いていない時は再生前の状態を表示する */
/* .played は再生済み: 全アニメーションを即座に最終フレームへ進める */
.played * {
  animation-duration: 0s !important;
  animation-delay: 0s !important;
}

/* 3: ターミナル */
.typed {
  display: inline-block;
  width: 18ch;
  overflow: hidden;
  white-space: nowrap;
  vertical-align: bottom;
}
/* 全要素を 4s の同じタイムライン上で % 指定して同期させる */
.typed {
  width: 0;
}
.fetch,
.bar-wrap,
.install,
.done,
.spin-wrap {
  opacity: 0;
}
.play .typed {
  animation: type 4s both;
}
.play .cursor {
  animation: cursor 4s both;
}
.play .fetch {
  animation: line-fetch 4s both;
}
.play .spin-wrap {
  animation: spin-vis 4s both;
}
.play .spin {
  animation: rot 0.4s linear infinite;
}
.play .check {
  animation: check 4s both;
}
.play .bar-wrap {
  animation: line-fetch 4s both;
}
.play .bar {
  animation: bar 4s both;
}
.play .install {
  animation: line-install 4s both;
}
.play .done {
  animation: done 4s both;
}
@keyframes type {
  0%,
  8% {
    width: 0;
    animation-timing-function: steps(18);
  }
  38%,
  100% {
    width: 18ch;
  }
}
@keyframes cursor {
  0%,
  10%,
  20%,
  30%,
  40% {
    opacity: 1;
    animation-timing-function: step-end;
  }
  5%,
  15%,
  25%,
  35%,
  42%,
  100% {
    opacity: 0;
    animation-timing-function: step-end;
  }
}
@keyframes line-fetch {
  0%,
  42% {
    opacity: 0;
    transform: translateX(-6px);
  }
  46%,
  100% {
    opacity: 1;
    transform: none;
  }
}
@keyframes spin-vis {
  0%,
  42% {
    opacity: 0;
  }
  43%,
  68% {
    opacity: 1;
  }
  69%,
  100% {
    opacity: 0;
  }
}
@keyframes rot {
  to {
    transform: rotate(360deg);
  }
}
@keyframes check {
  0%,
  68% {
    opacity: 0;
  }
  69%,
  100% {
    opacity: 1;
  }
}
@keyframes bar {
  0%,
  44% {
    width: 0;
  }
  68%,
  100% {
    width: 100%;
  }
}
@keyframes line-install {
  0%,
  74% {
    opacity: 0;
    transform: translateX(-6px);
  }
  78%,
  100% {
    opacity: 1;
    transform: none;
  }
}
@keyframes done {
  0%,
  82% {
    opacity: 0;
    transform: translateX(-6px);
  }
  86%,
  100% {
    opacity: 1;
    transform: none;
  }
}

/* 2: ⌘+V */
.key {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid #d1d5db;
  border-bottom-width: 4px;
  border-radius: 0.4rem;
  background: #fff;
  font-size: 1rem;
}
/* ⌘ と V を同時に押し込み、底に着いたら青 → その後に本文が青く光って貼り付く */
.play .key {
  animation: press 1.4s 0.3s both;
}
.play .pasted {
  animation: paste 1.4s 0.3s both;
}
.play .editor {
  animation: flash 1.4s 0.3s both;
}
@keyframes press {
  20% {
    transform: translateY(3px);
    border-bottom-width: 1px;
    background: #fff;
  }
  21%,
  70% {
    transform: translateY(3px);
    border-bottom-width: 1px;
    background: #dbeafe;
  }
}
.pasted {
  opacity: 0;
}
@keyframes paste {
  0%,
  34% {
    opacity: 0;
  }
  35%,
  100% {
    opacity: 1;
  }
}
@keyframes flash {
  0%,
  34% {
    background: #fff;
  }
  35% {
    background: #dbeafe;
  }
  100% {
    background: #fff;
  }
}

/* 1: ドラッグ&ドロップ */
.ghost,
.dropped {
  opacity: 0;
}
.play .src {
  animation: grab 2.4s 0.3s both;
}
.play .ghost {
  animation: drag 2.4s 0.3s both;
}
.play .dropped {
  animation: drop 2.4s 0.3s both;
}
@keyframes grab {
  0%,
  20% {
    opacity: 1;
  }
  25%,
  100% {
    opacity: 0.3;
  }
}
@keyframes drag {
  0% {
    opacity: 0;
    transform: translate(1.5rem, 1rem);
  }
  15% {
    opacity: 1;
    transform: none;
  }
  25% {
    transform: scale(1.1);
  }
  70% {
    opacity: 1;
    transform: translate(var(--dx), var(--dy)) scale(1.1);
  }
  80%,
  100% {
    opacity: 0;
    transform: translate(var(--dx), var(--dy));
  }
}
@keyframes drop {
  0%,
  72% {
    opacity: 0;
    background: transparent;
  }
  75% {
    opacity: 1;
    background: #bfdbfe;
  }
  100% {
    opacity: 1;
    background: transparent;
  }
}
</style>
