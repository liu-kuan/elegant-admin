<template>
  <div class="sv-center">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Center',
})

withDefaults(
  defineProps<{
    direction?: 'row' | 'column'
  }>(),
  {
    direction: 'row',
  },
)
</script>

<style lang="scss" scoped>
.sv-center {
  display: flex;
  flex-direction: v-bind('$props.direction');
  align-items: center;
  justify-content: center;
}
</style>
