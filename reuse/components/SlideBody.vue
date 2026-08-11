<script setup lang="ts">
withDefaults(defineProps<{
  height?: string
  leftClass?: string
  rightClass?: string
}>(), {
  height: 'h-9/10',
  leftClass: 'w-1/2',
  rightClass: 'w-1/2 flex items-center',
})
</script>

<template>
  <div class="flex" :class="height">
    <div :class="leftClass">
      <slot name="left" />
    </div>
    <div :class="rightClass">
      <slot name="right" />
    </div>
  </div>
</template>
