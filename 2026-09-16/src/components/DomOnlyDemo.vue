<script setup lang="ts">
import { animate, createDraggable, onScroll } from 'animejs'
import { onMounted, onUnmounted, useTemplateRef } from 'vue'

const dragArea = useTemplateRef<HTMLElement>('dragArea')
const dragBox = useTemplateRef<HTMLElement>('dragBox')
const scroller = useTemplateRef<HTMLElement>('scroller')
const marker = useTemplateRef<HTMLElement>('marker')
const bar = useTemplateRef<HTMLElement>('bar')

let draggable: ReturnType<typeof createDraggable> | undefined
let anim: ReturnType<typeof animate> | undefined

onMounted(() => {
  draggable = createDraggable(dragBox.value!, { container: dragArea.value! })

  // スクロール量がそのまま進捗になる (sync)
  anim = animate(bar.value!, {
    width: ['0%', '100%'],
    ease: 'linear',
    autoplay: onScroll({ container: scroller.value!, target: marker.value!, sync: true }),
  })
})

onUnmounted(() => {
  draggable?.revert()
  anim?.revert()
})
</script>

<template>
  <div class="flex gap-6">
    <div class="flex-1">
      <div class="mb-1 text-xs op-60">
        createDraggable()
      </div>
      <div ref="dragArea" class="relative h-40 rounded bg-gray-400/10">
        <div
          ref="dragBox"
          class="absolute left-4 top-4 h-14 w-14 cursor-grab rounded bg-blue-400/70 text-center text-xs leading-14 text-gray-900/80"
        >
          drag
        </div>
      </div>
    </div>

    <div class="flex-1">
      <div class="mb-1 text-xs op-60">
        onScroll()
      </div>
      <div ref="scroller" class="h-40 overflow-y-auto rounded bg-gray-400/10 p-3 text-xs">
        <div class="h-28 op-50">
          ↓ スクロール
        </div>
        <div ref="marker" class="flex h-10 items-center justify-center rounded bg-gray-400/30">
          target
        </div>
        <div class="h-28" />
      </div>
      <div class="mt-2 h-3 rounded bg-gray-400/10">
        <div ref="bar" class="h-full rounded bg-pink-400/70" style="width:0%" />
      </div>
    </div>
  </div>
</template>
