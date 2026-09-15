<script setup lang="ts">
import { animate } from 'animejs'
import { onMounted, onUnmounted, useTemplateRef } from 'vue'

const box = useTemplateRef<HTMLElement>('box')
let animation: ReturnType<typeof animate> | undefined

onMounted(() => {
  animation = animate(box.value!, {
    x: 100,
    rotate: 360,
    duration: 1000,
    loop: true,
    alternate: true,
  })
})

onUnmounted(() => animation?.pause())
</script>

<template>
  <div class="h-40 w-full flex items-center rounded bg-gray-400/10 px-6">
    <div ref="box" class="h-14 w-14 rounded bg-blue-400/70" />
  </div>
</template>
