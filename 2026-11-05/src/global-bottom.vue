<script setup lang="ts">
const bg = `${import.meta.env.BASE_URL}images/shared/slide-bg-under-light-blue.webp`
</script>

<template>
  <div
    class="fixed inset-0 -z-1"
    :style="{
      backgroundImage: `url(${bg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }"
  />
</template>
