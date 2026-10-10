<script setup lang="ts">
import NumberFlow from '@number-flow/vue'
import { computed } from 'vue'
import { KeyboardForm, KeyboardSize, KeyLayout } from './keyboard-state'

const props = defineProps<{ step: number }>()

// 0 ラベル(前スライドと同じ見た目) / 1 「+」が消えて3列に広がる → 図形が出る → 図形が動く(遅延で連続再生)
// 2 テキストを分類名に切り替え / 3 分類名の下に選択肢がスライドイン / 4 自分の選定を赤枠で囲む
const spread = computed(() => props.step >= 1)
const renamed = computed(() => props.step >= 2)
const listed = computed(() => props.step >= 3)
const chosen = computed(() => props.step >= 4)

const CATEGORY = { form: '形状', size: 'サイズ', layout: '配列' }
const OPTIONS = {
  form: ['分割型', '一体型', '折り畳み'],
  size: ['85%', '60%', '40%', 'etc'],
  layout: Object.values(KeyLayout),
}
// 自分の選定(前スライドの morph 最終状態と同じ)
const CHOSEN: string[] = [KeyboardForm.Unibody, `${KeyboardSize.Forty}%`, KeyLayout.Ortho]
</script>

<template>
  <div
    class="flex items-center justify-center font-mono text-3xl font-bold text-gray-700 transition-all duration-700 ease-out"
    :class="[spread ? 'gap-8' : 'gap-4', { spread }]"
  >
    <!-- 一体型: 左右に分かれた板が寄って1枚になる -->
    <div class="col">
      <div class="figure">
        <div class="relative h-full flex items-center justify-center transition-all duration-700 ease-out delay-1000" :class="spread ? 'gap-0' : 'gap-6'">
          <div v-for="i in 2" :key="i" class="board h-full w-16 flex-none">
            <div class="grid grid-cols-3 grid-rows-2 h-full gap-1">
              <div v-for="k in 6" :key="k" class="key" />
            </div>
          </div>
          <div class="board absolute inset-x-0 h-full transition-opacity duration-500 delay-1000" :class="spread ? 'opacity-100' : 'opacity-0'">
            <div class="grid grid-cols-6 grid-rows-2 h-full gap-1">
              <div v-for="k in 12" :key="k" class="key" />
            </div>
          </div>
        </div>
      </div>
      <Transition name="swap" mode="out-in">
        <span :key="String(renamed)" class="text-box">{{ renamed ? CATEGORY.form : KeyboardForm.Unibody }}</span>
      </Transition>
      <ul class="options" :class="{ listed }">
        <li v-for="o in OPTIONS.form" :key="o" :class="{ chosen: chosen && CHOSEN.includes(o) }">
          {{ o }}
        </li>
      </ul>
    </div>

    <span class="plus">+</span>

    <!-- 40%: フルサイズの枠の中で、塗りが左下を基点に 40% サイズへ縮む(前スライドの morph と同じ方向) -->
    <div class="col">
      <div class="figure">
        <div class="board relative h-full w-full">
          <!-- 幅は 12u/22.5u、高さは 4段/6段 の概算 -->
          <div class="absolute bottom-1 left-1 rounded bg-gray-300 transition-all duration-700 ease-out delay-1000" :class="spread ? 'right-1/2 top-1/3' : 'right-1 top-1'" />
        </div>
      </div>
      <Transition name="swap" mode="out-in">
        <span v-if="renamed" key="category" class="text-box">{{ CATEGORY.size }}</span>
        <span v-else key="size" class="text-box"><NumberFlow :value="KeyboardSize.Forty" suffix="%" /></span>
      </Transition>
      <ul class="options" :class="{ listed }">
        <li v-for="o in OPTIONS.size" :key="o" :class="{ chosen: chosen && CHOSEN.includes(o) }">
          {{ o }}
        </li>
      </ul>
    </div>

    <span class="plus">+</span>

    <!-- 格子状配列: 行ごとにずれたキーが横に動いて格子に揃う -->
    <div class="col">
      <div class="figure">
        <div class="board h-full w-full flex flex-col justify-between">
          <!-- 各行は中央寄せ。before は中段を基準に上段を左、下段を右へずらす -->
          <div
            v-for="r in 3"
            :key="r"
            class="flex justify-center gap-1 transition-transform duration-700 ease-out delay-1000"
            :style="{ transform: spread ? '' : `translateX(${(r - 2) * 6}px)` }"
          >
            <!-- 6列: 板幅(w-36 - p-1×2 = 136px)に 16px キー + 4px 隙間を並べ、before のずれ(±6px)が収まる最大列数 -->
            <div v-for="c in 6" :key="c" class="key h-3 w-4" />
          </div>
        </div>
      </div>
      <Transition name="swap" mode="out-in">
        <span :key="String(renamed)" class="text-box px-3">{{ renamed ? CATEGORY.layout : KeyLayout.Ortho }}</span>
      </Transition>
      <ul class="options" :class="{ listed }">
        <li v-for="o in OPTIONS.layout" :key="o" :class="{ chosen: chosen && CHOSEN.includes(o) }">
          {{ o }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
/* 広がった後(ルートの .spread)の状態は各 .spread .* ルールで上書き */
.plus {
  --uno: inline-block max-w-8 overflow-hidden text-2xl font-normal text-gray-400 transition-all duration-500;
}
.spread .plus {
  --uno: max-w-0 opacity-0;
}

/* 図形+単語を1ブロックにし、広がった後は等幅(min-w-44)にして中心間隔を揃える */
.col {
  --uno: relative min-w-0 flex flex-col items-center transition-all duration-700 ease-out;
}
.spread .col {
  --uno: min-w-44;
}

/* テキストは横に広がるだけで縦位置を変えない。図形はテキストの上に absolute で重ね、広がった後にフェードイン */
.figure {
  --uno: absolute bottom-full left-1/2 mb-8 h-16 w-36 -translate-x-1/2 opacity-0 transition-opacity duration-500
    delay-500;
}
.spread .figure {
  --uno: opacity-100;
}

/* 3列の高さを固定で揃える(枠付きの格子配列や NumberFlow の行高差で図形の位置がずれるのを防ぐ)。横幅は変えない */
.text-box {
  --uno: inline-flex h-12 items-center rounded-lg border-2 border-transparent;
}

/* 選択肢は分類名の真下に absolute で重ね(テキスト行の縦位置を動かさない)、少し上から下へスライドインする */
.options {
  --uno: absolute top-full left-1/2 mt-2 flex flex-col items-center -translate-x-1/2 -translate-y-2 whitespace-nowrap
    text-xl font-normal text-gray-600 opacity-0 transition-all duration-500 ease-out;
}
.options.listed {
  --uno: translate-y-0 opacity-100;
}

/* 赤枠を文字幅ぴったりにするため、親を flex-col にして li を shrink-wrap させる */
.options li {
  --uno: rounded border-2 border-transparent px-1 transition-colors duration-500;
}
.options li.chosen {
  --uno: border-red-500;
}

.board {
  --uno: rounded-lg border border-gray-400 bg-white p-1 shadow;
}

.key {
  --uno: rounded border border-gray-400 bg-gray-300;
}

.swap-enter-active,
.swap-leave-active {
  transition: all 0.3s ease-out;
}
.swap-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.swap-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
