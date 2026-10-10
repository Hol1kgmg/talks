<script setup lang="ts">
import { mine } from './keyboard-layout'

withDefaults(defineProps<{ width?: string }>(), { width: 'w-full' })

// 1u = 1 の座標系で描く。MX スイッチ穴は 14mm / 19.05mm ≒ 0.73u
const HOLE = 0.73
const PAD = 0.3 // 基板の縁(u)
const { cols, rows, keys } = mine
</script>

<template>
  <svg
    class="mx-auto"
    :class="width"
    :viewBox="`${-PAD} ${-PAD} ${cols + PAD * 2} ${rows + PAD * 2}`"
  >
    <rect :x="-PAD" :y="-PAD" :width="cols + PAD * 2" :height="rows + PAD * 2" rx="0.3" class="fill-green-700" />
    <rect
      v-for="k in keys"
      :key="k.id"
      :x="k.x + (k.w - HOLE) / 2"
      :y="k.y + (k.h - HOLE) / 2"
      :width="HOLE"
      :height="HOLE"
      rx="0.03"
      class="fill-green-950"
    />
  </svg>
</template>
