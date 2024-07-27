<template>
  <div class="card">
    <div class="bg-fill-light px-3 py-2 border-rd-1">
      <div class="font-size-1 color-1">组件名：{{ name }}</div>
      <div class="font-size-3 color-2 mt-1">介绍：{{ des }}</div>
    </div>

    <div class="mt-4">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  des: string
}>()
</script>
