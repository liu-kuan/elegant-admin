<template>
  <div class="sv-row">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'EleRow',
})

withDefaults(
  defineProps<{
    justifyContent?:
      | 'start'
      | 'end'
      | 'center'
      | 'space-around'
      | 'space-between'
      | 'space-evenly'
    alignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
  }>(),
  {
    justifyContent: 'start',
    alignItems: 'center',
  },
)
</script>

<style lang="scss" scoped>
.sv-row {
  display: flex;
  align-items: v-bind('$props.alignItems');
  justify-content: v-bind('$props.justifyContent');
}
</style>
