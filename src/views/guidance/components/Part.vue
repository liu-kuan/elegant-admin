<template>
  <div class="part">
    <h1>{{ title }}</h1>
    <div class="form-box" v-if="$slots.default">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<style lang="scss" scoped>
.part + .part {
  margin-top: 24px;
}

h1 {
  margin-bottom: $spacing-m;
  font-size: 18px;
  font-weight: normal;
}

.form-box {
  @include text2;

  line-height: 22px;
}
</style>
