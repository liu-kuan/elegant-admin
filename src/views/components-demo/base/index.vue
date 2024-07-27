<template>
  <div>
    <NumberTransitionDemo />
    <LongTextEllipsisDemo />
    <EleDialogDemo />
    <div class="mt-2">敬请期待...</div>
  </div>
</template>

<script setup lang="ts">
import EleDialogDemo from './DialogDemo.vue'
import LongTextEllipsisDemo from './LongTextEllipsisDemo.vue'
import NumberTransitionDemo from './NumberTransitionDemo.vue'
</script>

<style lang="scss" scoped>
.card + .card {
  margin-top: $spacing-m;
}
</style>
