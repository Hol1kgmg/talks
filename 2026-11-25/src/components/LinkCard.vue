<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  url: string
  image: string
}>()

const resolvedImage = computed(() => `${import.meta.env.BASE_URL}${props.image.replace(/^\//, '')}`)
</script>

<template>
  <a :href="url" target="_blank" rel="noreferrer" class="block w-120 mx-auto !no-underline !border-none !text-inherit">
    <img :src="resolvedImage" :alt="url" class="block w-full aspect-[1200/630] object-cover rounded-xl border border-gray-300 shadow-sm">
    <div class="mt-1 text-right text-xs opacity-60">{{ url }}</div>
  </a>
</template>
