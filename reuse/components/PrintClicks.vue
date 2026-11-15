<script setup lang="ts">
// PDF 出力（?print）では各スライドが最後のクリック状態で固定されるので、出したいクリック数に戻す
import { useNav, useSlideContext } from '@slidev/client'

const props = defineProps<{ at: number }>()
const { isPrintMode } = useNav()
const { $clicksContext } = useSlideContext()
if (isPrintMode.value)
  $clicksContext.current = props.at
</script>

<!-- 描画するものはないが、Vue のテンプレートは要素を1つ必要とする -->
<template>
  <span hidden />
</template>
