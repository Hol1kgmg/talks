<script setup lang="ts">
import NumberFlow from '@number-flow/vue'
import { onUnmounted, ref, watch } from 'vue'

const props = defineProps<{ active: number }>()

const titles = ['skill が更新されても気付けない', '中身が少しずつ違う skill が広がる']
// 版が上がるほどチップを大きく派手にして「すごくなっていく」を見せる
const upstream = [
  { tag: 'v1.1', class: 'text-sm bg-blue-200 text-blue-800' },
  { tag: 'v1.2', class: 'text-base bg-indigo-300 text-indigo-900' },
  { tag: 'v2.0 🚀', class: 'text-lg text-white bg-gradient-to-r from-indigo-500 to-pink-500 shadow-lg' },
]
// 全員同じ八角形から始まり、人ごとに少しずつ違う形・色へ崩れていく
// 止まるタイミング(dur)をバラバラにして、どれが最新か分からなくする
// clip-path を補間させるため、頂点数は全て 8 に揃える
const members = [
  {
    name: 'Aさん',
    steps: [
      'polygon(30% 0, 78% 0, 100% 22%, 100% 70%, 70% 100%, 30% 100%, 0 70%, 0 30%)',
      'polygon(30% 0, 85% 0, 100% 15%, 100% 70%, 70% 100%, 30% 100%, 0 75%, 0 30%)',
      'polygon(25% 0, 85% 0, 100% 15%, 100% 70%, 75% 100%, 30% 100%, 0 75%, 0 35%)',
    ],
    bg: '#3b82f6',
    dur: 1.4,
  },
  {
    name: 'Bさん',
    steps: [
      'polygon(30% 0, 70% 0, 100% 30%, 100% 70%, 78% 100%, 22% 100%, 10% 65%, 0 30%)',
      'polygon(30% 0, 70% 0, 100% 30%, 100% 70%, 85% 100%, 15% 100%, 25% 60%, 0 30%)',
      'polygon(30% 0, 70% 0, 100% 35%, 100% 65%, 85% 100%, 15% 100%, 30% 60%, 0 30%)',
    ],
    bg: '#06b6d4',
    dur: 0.8,
  },
  {
    name: 'Cさん',
    steps: [
      'polygon(40% 0, 68% 5%, 100% 35%, 95% 75%, 70% 100%, 25% 95%, 0 65%, 5% 25%)',
      'polygon(50% 0, 65% 10%, 100% 45%, 85% 80%, 70% 100%, 20% 90%, 0 60%, 15% 15%)',
      'polygon(50% 0, 60% 15%, 100% 50%, 80% 85%, 65% 100%, 15% 85%, 0 55%, 20% 10%)',
    ],
    bg: '#8b5cf6',
    dur: 2.1,
  },
]

// カレンダーは10月固定で、形の変化(CSS の .play .shape の delay 0.5s)が始まってから
// 最後の1人が止まるまでに 10/2 → 10/31 を1日ずつ進める(delay 0.5s + 最長 dur 2.1s = 2.6s で終了、約 0.072s 間隔)
// 数字は NumberFlow で常に上方向へ回す。回転時間は進める間隔に収める
const DELAY = 0.5
const FIRST_DAY = 2
const LAST_DAY = 31
const END = DELAY + Math.max(...members.map(m => m.dur))
const STEP = (END - DELAY) / (LAST_DAY - FIRST_DAY)
const SPIN = { duration: 70, easing: 'ease-out' }
const day = ref(FIRST_DAY)
let timer: ReturnType<typeof setInterval> | undefined

watch(() => props.active, (active) => {
  clearInterval(timer)
  day.value = FIRST_DAY
  if (active !== 2)
    return
  const t0 = performance.now()
  timer = setInterval(() => {
    const t = Math.min((performance.now() - t0) / 1000, END)
    day.value = FIRST_DAY + Math.max(0, Math.floor((t - DELAY) / STEP))
    if (t >= END)
      clearInterval(timer)
  }, 20)
}, { immediate: true })
onUnmounted(() => clearInterval(timer))
</script>

<template>
  <div class="h-9/10 flex items-center">
    <div class="w-full grid grid-cols-2 gap-8">
      <div
        v-for="(title, i) in titles"
        :key="title"
        class="rounded-xl border border-gray-300 bg-white p-5 transition-all duration-500"
        :class="[active === i + 1 ? 'play opacity-100 -translate-y-3 shadow-xl' : active > i + 1 ? 'play played opacity-60' : 'opacity-30 grayscale']"
      >
        <div class="text-center text-xl font-bold">
          {{ title }}
        </div>

        <div class="relative mt-4 h-60 text-sm font-mono">
          <!-- 1: 最初は同じ v1.0 → 管理元だけ育っていき、手元は置いていかれる -->
          <div v-if="i === 0" class="h-full flex flex-col justify-center gap-1">
            <div class="flex items-center gap-1 text-gray-500">
              <div class="i-carbon-logo-github text-lg text-gray-900" /> 管理元 org/foo
            </div>
            <div class="h-12 flex items-center gap-1">
              <span class="relative rounded px-2 bg-blue-100 text-blue-700">
                v1.0
                <!-- ponytail: 移動量は行の高さ(h-12 / h-6 / gap-1)から求めた値。レイアウトを変えたら --dy を調整 -->
                <span class="ghost absolute left-0 top-0 rounded px-2 bg-blue-100 text-blue-700 shadow-lg" style="--dy: 5rem">v1.0</span>
              </span>
              <template v-for="(v, j) in upstream" :key="v.tag">
                <span class="up text-gray-400" :style="{ animationDelay: `${1.2 + j * 0.4}s` }">→</span>
                <span class="up rounded px-2 font-bold" :class="v.class" :style="{ animationDelay: `${1.2 + j * 0.4}s` }">{{ v.tag }}</span>
              </template>
            </div>

            <div class="h-6" />

            <div class="h-12 flex items-center gap-2">
              <span class="local rounded px-2 bg-blue-100 text-blue-700">v1.0</span>
              <span class="left-behind text-gray-400">……</span>
            </div>
            <div class="flex items-center gap-1 text-gray-500">
              📁 手元 .claude/skills/foo
            </div>
          </div>

          <!-- 2: 出発点は同じ skill なのに、人ごとに少しずつ形が崩れていく -->
          <div v-else class="h-full flex flex-col justify-center gap-2">
            <!-- 日めくりカレンダー: 形が崩れている間だけ日付が進む -->
            <div class="mx-auto w-14 rounded-md border border-gray-300 overflow-hidden text-center font-sans shadow">
              <div class="bg-red-500 text-white text-xs leading-4">
                10月
              </div>
              <div class="text-2xl font-bold leading-8">
                <NumberFlow :value="day" :trend="1" :spin-timing="SPIN" />
              </div>
            </div>
            <div class="w-full grid grid-cols-3 gap-3">
              <div
                v-for="m in members"
                :key="m.name"
                class="rounded-lg border border-gray-300 p-2 flex flex-col items-center gap-2"
              >
                <span class="text-gray-500">👤 {{ m.name }}</span>
                <span
                  class="shape w-16 h-16"
                  :style="{ '--s1': m.steps[0], '--s2': m.steps[1], '--s3': m.steps[2], '--to-bg': m.bg, 'animationDuration': `${m.dur}s` }"
                />
                <span class="text-xs text-gray-400">foo/SKILL.md</span>
              </div>
            </div>
            <div class="comment text-right font-sans text-base text-gray-600" :style="{ animationDelay: `${END}s` }">
              みんな skill をカスタマイズしがち
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

/* 1: 管理元の v1.0 を手元へコピー → 管理元だけ育つ → 手元が色褪せて取り残される */
.ghost,
.up,
.left-behind {
  opacity: 0;
}
.play .ghost {
  animation: copy 0.8s 0.2s both;
}
.play .up {
  animation: pop 0.4s both;
}
.play .local {
  animation:
    fade-in 0.1s 0.9s both,
    fade-gray 0.6s 2.4s both;
}
.play .left-behind {
  animation: fade-in 0.4s 2.5s both;
}
@keyframes copy {
  0% {
    opacity: 0;
    transform: none;
  }
  15% {
    opacity: 1;
    transform: scale(1.1);
  }
  85% {
    opacity: 1;
    transform: translateY(var(--dy)) scale(1.1);
  }
  100% {
    opacity: 0;
    transform: translateY(var(--dy));
  }
}
@keyframes fade-gray {
  to {
    background: #e5e7eb;
    color: #9ca3af;
  }
}

/* 2: 同じ八角形から3段階で崩れ、人ごとにバラバラのタイミングで止まる */
.shape {
  background: #60a5fa;
  clip-path: polygon(30% 0, 70% 0, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0 70%, 0 30%);
}
/* コメントは全員の形が止まった後(delay はインラインで END を指定)に出す */
.comment {
  opacity: 0;
}
.play .comment {
  animation: fade-in 0.4s both;
}
/* duration はインラインの animationDuration で人ごとに上書きする */
.play .shape {
  animation: drift 1s 0.5s ease-in-out both;
}
@keyframes drift {
  33% {
    clip-path: var(--s1);
  }
  66% {
    clip-path: var(--s2);
  }
  100% {
    background: var(--to-bg);
    clip-path: var(--s3);
  }
}
@keyframes pop {
  0% {
    opacity: 0;
    transform: scale(0.6);
  }
  70% {
    opacity: 1;
    transform: scale(1.15);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
