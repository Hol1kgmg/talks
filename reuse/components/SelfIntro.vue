<script setup lang="ts">
defineProps<{
  note?: string
}>()
</script>

<template>
  <SlideBody height="h-4/5">
    <template #left>
      <div class="flex flex-col gap-8 justify-start h-full mt-5">
        <h2 class="text-lg">
          Hol1kgmg(ほりかわ)
        </h2>
        <ul class="text-lg list-disc pl-5 flex flex-col gap-2">
          <li>WebアプリのFE・BEエンジニア</li>
          <li>キーボード、nixが好き</li>
          <li v-if="note">
            {{ note }}
          </li>
          <div class="flex items-center mt-4 gap-2">
            <SharedImage src="images/shared/X_logo.svg" img-class="w-10 h-10" />
            <a href="https://x.com/Hol1kgmg" target="_blank" class="text-2xl">@Hol1kgmg</a>
          </div>
          <div class="flex items-center pl-1 mt-4 gap-2">
            <SharedImage src="images/shared/GitHub_Invertocat_Black.svg" img-class="w-8 h-8" />
            <a href="https://github.com/Hol1kgmg" target="_blank" class="text-2xl">Hol1kgmg</a>
          </div>
        </ul>
      </div>
    </template>
    <template #right>
      <div class="flex flex-col items-center justify-center h-full w-full">
        <CenterImage src="images/shared/Hol1kgmg_prof_img.webp" img-class="w-48 h-48 rounded-full object-cover ring-8 ring-blue-300 my-0" />
      </div>
    </template>
  </SlideBody>
</template>
