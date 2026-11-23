<script setup lang="ts">
// step: スライドのクリック数
// 0: API → hooks → UI がまっすぐ縦に並ぶ
// 1: UI が左にずれ、矢印が時計回りに傾いて追う → hooks から WebMCP の矢印が伸びる → registerTool が現れる（右の画面はその後に光る）
// slot ui-badge: UI コンポーネントの箱に重ねる要素（2026-11-27 で UI SDK のタグを付ける）
const props = defineProps<{ step: number }>()

// 進むときだけ delay を付けて順番に動かし、戻るときはすぐ元に戻す
const on = () => props.step >= 1
// UI の箱は最初、下段（w-96）の中央にいる: (24rem - 11rem) / 2 = 6.5rem
const slide = () => on() ? 'translate-x-0' : 'translate-x-[6.5rem]'
// 矢印は傾きながら、それぞれ向かう箱の側へ少しずれる（UI のずれ 6.5rem の半分弱）
const tilt = () => on() ? 'rotate-35 -translate-x-12' : 'rotate-0 translate-x-0'
const grow = () => on() ? '-rotate-35 translate-x-12 scale-100 delay-500' : '-rotate-35 translate-x-0 scale-0'
const appear = () => on() ? 'opacity-100 delay-1000' : 'opacity-0'

const layer = 'w-44 rounded-lg border-2 border-gray-500 bg-white px-3 py-2 text-center shadow'
const note = 'text-xs opacity-60'
// アイコンの幅は 1.2em（unplugin-icons の既定）なので、半分の 0.6em 戻して中央にそろえる
const arrow = 'absolute left-1/2 top-0 -ml-[0.6em] origin-top text-4xl transition-transform duration-500'
</script>

<template>
  <div class="flex flex-col items-center gap-3 text-sm">
    <div :class="layer">
      API<div :class="note">
        /search・/cart
      </div>
    </div>
    <!-- 下の矢印（text-4xl）と線の太さを揃えるため同じ大きさにする。小さいと線が細くなり色が薄く見える -->
    <ph-arrow-down class="text-4xl" />
    <div :class="layer">
      hooks<div :class="note">
        <code>useShop()</code> → search / addToCart
      </div>
    </div>

    <!-- hooks の真下を起点に、既存の矢印は UI へ、WebMCP の矢印は registerTool へ向く -->
    <div class="relative h-10 w-96">
      <ph-arrow-down :class="[arrow, tilt()]" />
      <ph-arrow-down class="text-sky-500" :class="[arrow, grow()]" />
    </div>

    <div class="w-96 flex justify-between">
      <div :class="[layer, slide()]" class="relative transition-transform duration-500">
        <slot name="ui-badge" />
        UI コンポーネント<div :class="note">
          検索欄・カートボタン
        </div>
      </div>
      <div :class="[layer, appear()]" class="border-sky-500! transition-opacity duration-500">
        <!-- 次の章扉の見出しへ View Transition で動かすための名前 -->
        <code style="view-transition-name: register-tool">registerTool</code><div :class="note">
          search・add_to_cart
        </div>
      </div>
    </div>
  </div>
</template>
