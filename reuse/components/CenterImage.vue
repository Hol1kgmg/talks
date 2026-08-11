<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  src: string
  imgClass?: string
}>(), {
  imgClass: 'h-90 my-5',
})

const resolvedSrc = computed(() => `${import.meta.env.BASE_URL}${props.src.replace(/^\//, '')}`)
</script>

<template>
  <img :src="resolvedSrc" class="mx-auto object-contain" :class="imgClass">
</template>
