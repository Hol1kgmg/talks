<script setup lang="ts">
withDefaults(defineProps<{
  src: string
  imgClass?: string
}>(), {
  imgClass: 'h-90 my-5',
})
</script>

<template>
  <img :src="src" class="mx-auto object-contain" :class="imgClass">
</template>
