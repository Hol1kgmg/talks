<script setup lang="ts">
withDefaults(defineProps<{
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  height?: string
}>(), {
  position: 'bottom-right',
})

const alignMap: Record<string, string> = {
  'bottom-right': 'justify-end items-end text-right',
  'bottom-left': 'justify-start items-end text-left',
  'top-right': 'justify-end items-start text-right',
  'top-left': 'justify-start items-start text-left',
}
</script>

<template>
  <div class="flex text-3xl my-2" :class="[alignMap[position], height]">
    <slot />
  </div>
</template>
