<template>
  <div class="sv-column">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'SVColumn',
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
.sv-column {
  display: flex;
  flex-direction: column;
  align-items: v-bind('$props.alignItems');
  justify-content: v-bind('$props.justifyContent');
}
</style>
