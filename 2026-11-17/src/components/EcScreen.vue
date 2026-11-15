<script setup lang="ts">
// 5枚目と9枚目で共用する EC サイトの画面のモック
// lit: 検索欄とカートボタンを、AI のツールと同じ光り方にする
// delay: 光り始めを遅らせる（9枚目で左の図が動き終わってから光らせる）
const props = defineProps<{ lit: boolean, delay?: string }>()

const glow = `ring-2 ring-sky-500 shadow-[0_0_8px_2px_rgb(14_165_233_/_0.5)] ${props.delay ?? ''}`
</script>

<template>
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
      <div :class="lit && glow" class="flex flex-1 items-center gap-1 rounded-full border border-gray-400 px-2 py-0.5 transition-shadow duration-500">
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
      <div :class="lit && glow" class="rounded-lg bg-gray-700 px-3 py-1 text-white transition-shadow duration-500">
        カートに入れる
      </div>
    </div>
  </div>
</template>
