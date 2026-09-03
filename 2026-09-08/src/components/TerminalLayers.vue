<script setup lang="ts">
withDefaults(defineProps<{
  height?: string
}>(), {
  height: 'h-88',
})
</script>

<template>
  <div class="relative mx-auto w-full" :class="height">
    <!-- 背後に重なる window（それぞれが別のworkspaceであることを示す） -->
    <div class="absolute left-0 top-0 h-3/4 w-4/5 rounded-lg border-2 border-gray-300 bg-gray-50 shadow">
      <div class="absolute -top-3 left-3 rounded bg-gray-500 px-2 py-0.5 text-xs font-bold text-white">
        workspace C
      </div>
    </div>
    <div class="absolute left-[8%] top-[10%] h-3/4 w-4/5 rounded-lg border-2 border-gray-300 bg-gray-50 shadow">
      <div class="absolute -top-3 left-3 rounded bg-gray-500 px-2 py-0.5 text-xs font-bold text-white">
        workspace B
      </div>
    </div>

    <!-- 手前の window（tab / pane を内包） -->
    <div class="absolute left-[16%] top-[20%] flex h-3/4 w-4/5 flex-col rounded-lg border-1.5 border-[#b4b2a9] bg-white p-3 shadow-lg">
      <div class="absolute -top-3 left-3 rounded bg-gray-500 px-2 py-0.5 text-xs font-bold text-white">
        workspace A
      </div>
      <div class="my-1 flex gap-1.5">
        <div class="rounded-t-lg bg-[#CECBF6] px-4 py-2 text-sm font-semibold text-[#26215C]">
          タブ1
        </div>
        <div class="rounded-t-lg bg-[#EEEDFE] px-4 py-2 text-sm text-[#534AB7]">
          タブ2
        </div>
        <div class="rounded-t-lg bg-[#EEEDFE] px-4 py-2 text-sm text-[#534AB7]">
          タブ3
        </div>
      </div>
      <div class="flex flex-1 flex-col rounded-lg border-1.5 border-[#7F77DD] bg-[#F7F7FC] p-2">
        <div class="mb-2 text-[11px] text-[#3C3489]">
          選択中のタブの中身
        </div>
        <div class="flex flex-1 gap-1.5">
          <div class="flex flex-[1.3] items-center justify-center rounded bg-[#9FE1CB] text-sm font-semibold text-[#04342C]">
            ペインA
          </div>
          <div class="flex flex-1 flex-col gap-1.5">
            <div class="flex flex-1 items-center justify-center rounded bg-[#E1F5EE] text-sm text-[#085041]">
              ペインB
            </div>
            <div class="flex flex-1 items-center justify-center rounded bg-[#E1F5EE] text-sm text-[#085041]">
              ペインC
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
