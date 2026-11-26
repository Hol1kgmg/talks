<script setup lang="ts">
// 「他にも話したかったこと」のカード。見出し・アイコン（slot）・リンク・一言を縦に並べる
defineProps<{ title: string, href: string, label: string, note: string }>()
</script>

<template>
  <div class="w-64 flex flex-col rounded-xl border-2 border-gray-500 bg-white shadow">
    <div class="border-b-2 border-inherit px-3 py-2 font-bold">
      {{ title }}
    </div>
    <div class="flex flex-1 flex-col items-center justify-center gap-3 px-3 py-4 text-center">
      <slot />
      <a :href="href" target="_blank">{{ label }}<ph-arrow-square-out class="ml-0.5 inline text-xs opacity-60" /></a>
      <div class="text-sm opacity-70">
        {{ note }}
      </div>
    </div>
  </div>
</template>
