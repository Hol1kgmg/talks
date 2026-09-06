<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  src: string
  imgClass?: string
}>(), {
  imgClass: '',
})

const resolvedSrc = computed(() => `${import.meta.env.BASE_URL}${props.src.replace(/^\//, '')}`)
</script>

<template>
  <img :src="resolvedSrc" :class="imgClass">
</template>
