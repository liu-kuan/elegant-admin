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
}

:deep(del) {
  color: red;
}
</style>
