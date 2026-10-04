<script setup lang="ts">
import NumberFlow from '@number-flow/vue'
import { computed } from 'vue'
import { stateAt } from './keyboard-state'

const props = defineProps<{ step: number }>()
const state = computed(() => stateAt(props.step))
</script>

<template>
  <TransitionGroup tag="div" name="tag" class="flex items-center justify-center gap-4 font-mono text-3xl font-bold text-gray-700">
    <Transition key="form" name="bump" mode="out-in">
      <span :key="state.form">{{ state.form }}</span>
    </Transition>
    <span key="plus1" class="plus">+</span>
    <NumberFlow key="size" :value="state.size" suffix="%" />
    <template v-if="state.layout">
      <span key="plus2" class="plus">+</span>
      <span
        key="layout"
        class="rounded-lg border-2 px-3 py-0.5 transition-colors duration-150"
        :class="state.highlight ? 'border-gray-500 bg-gray-100' : 'border-transparent'"
      >{{ state.layout }}</span>
    </template>
  </TransitionGroup>
</template>

<style scoped>
.plus {
  --uno: text-2xl font-normal text-gray-400;
}

.tag-move,
.tag-leave-active {
  transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
/* 既存要素の move(0.6s) が終わって場所が空いてから表示する */
.tag-enter-active {
  transition: all 0.4s ease-out 0.6s;
}
.tag-enter-from {
  opacity: 0;
  transform: scale(0.9);
}
.tag-leave-to {
  opacity: 0;
  transform: translateX(-16px) scale(0.9);
}
.tag-leave-active {
  position: absolute;
}

.bump-enter-active {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.bump-enter-from {
  transform: scale(1.4);
}
.bump-leave-active {
  transition: opacity 0.1s;
}
.bump-leave-to {
  opacity: 0;
}
</style>
