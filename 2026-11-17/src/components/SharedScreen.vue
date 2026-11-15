<script setup lang="ts">
// step: スライドのクリック数
// 0: 画面だけ（利用者はここで何ができるかを確かめる） / 1: 画面で見たことをそのまま AI に頼む / 2: AI のツールが画面の部品と一致している
// AI に頼むのは利用者なので、このページで何ができるかが利用者と AI の両方の視点でわかる必要がある
const props = defineProps<{ step: number }>()

const show = (n: number) => props.step >= n ? 'opacity-100' : 'opacity-0'

const label = 'mb-3 text-center text-sm font-bold opacity-70'
// step 2 で、画面の部品と AI のツールを同じ光り方にして1対1の対応を見せる
const lit = (on: boolean) => on && 'ring-2 ring-sky-500 shadow-[0_0_8px_2px_rgb(14_165_233_/_0.5)]'
const tool = 'flex items-center gap-1 rounded-full border border-sky-500 bg-white px-2 py-0.5 text-xs transition-shadow duration-500'
</script>

<template>
  <div class="flex flex-col items-center gap-10">
    <div class="flex items-center gap-10">
      <!-- 利用者から見えること: ブラウザで開いた EC サイト -->
      <div>
        <div :class="label">
          利用者から見えること
        </div>
        <div class="w-88 overflow-hidden rounded-xl border-2 border-gray-500 bg-white text-xs shadow-md">
          <div class="flex items-center gap-2 border-b border-gray-300 bg-gray-100 px-2 py-1">
            <div class="flex gap-1">
              <span class="h-2 w-2 rounded-full bg-red-400" /><span class="h-2 w-2 rounded-full bg-yellow-400" /><span class="h-2 w-2 rounded-full bg-green-400" />
            </div>
            <div class="flex-1 rounded bg-white px-2 text-[10px] opacity-60">
              shop.example
            </div>
          </div>
          <div class="flex items-center gap-4 border-b border-gray-200 px-4 py-3">
            <div class="flex items-center gap-1 font-bold">
              <ph-storefront class="text-base" />ショップ
            </div>
            <div :class="lit(step >= 2)" class="flex flex-1 items-center gap-1 rounded-full border border-gray-400 px-2 py-0.5 transition-shadow duration-500">
              <ph-magnifying-glass />
              <span class="opacity-50">商品を検索</span>
            </div>
            <ph-shopping-cart class="text-lg" />
          </div>
          <div class="flex items-center gap-4 px-4 py-5">
            <div class="flex h-12 w-12 items-center justify-center rounded bg-gray-200">
              <ph-sneaker class="text-2xl opacity-50" />
            </div>
            <div class="flex-1">
              <div class="font-bold">
                スニーカー
              </div>
              <div class="opacity-60">
                ¥8,800
              </div>
            </div>
            <div :class="lit(step >= 2)" class="rounded-lg bg-gray-700 px-3 py-1 text-white transition-shadow duration-500">
              カートに入れる
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 text-4xl font-bold text-sky-500 transition-opacity duration-500" :class="show(2)">
        ＝
      </div>

      <!-- AI から見えること: 画面の部品と同じアイコンでツールを並べる -->
      <div class="transition-opacity duration-500" :class="show(2)">
        <div :class="label">
          AI から見えること
        </div>
        <div class="w-48 flex flex-col items-start gap-3 rounded-xl border-2 border-gray-500 bg-white px-5 py-4 shadow">
          <div class="flex items-center gap-1 text-sm font-bold">
            <ph-robot-duotone class="text-xl" />使えるツール
          </div>
          <span :class="[tool, lit(step >= 2)]"><ph-magnifying-glass />search</span>
          <span :class="[tool, lit(step >= 2)]"><ph-shopping-cart />add_to_cart</span>
        </div>
      </div>
    </div>

    <!-- 画面で見たことを、そのまま AI に頼む -->
    <div class="flex items-center gap-3 text-base transition-opacity duration-500" :class="show(1)">
      <ph-user class="text-2xl" />
      <div class="rounded-xl rounded-bl-sm bg-sky-500 px-3 py-1 text-white">
        スニーカーをカートに入れて
      </div>
      <ph-arrow-right class="text-xl" />
      <ph-robot-duotone class="text-2xl" />
    </div>
  </div>
</template>
