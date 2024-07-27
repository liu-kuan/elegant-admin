<template>
  <div class="diff-text" v-html="html"></div>
</template>

<script setup lang="ts">
import { getDiffAsHtml } from './helper'

const props = defineProps<{
  oldText: string
  newText: string
}>()

const html = computed(() => getDiffAsHtml(props.oldText, props.newText))
</script>

<style lang="scss" scoped>
:deep(ins) {
  color: green;
  background-color: var(--el-color-success-light-7);
}

:deep(del) {
  color: var(--el-color-danger);
  background-color: var(--el-color-danger-light-7);
}
</style>
