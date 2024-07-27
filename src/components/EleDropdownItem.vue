当下拉菜单有选中状态时使用 SVDropdownItem，否则使用 el-dropdown-item
<template>
  <div class="sv-dropdown-item">
    <el-dropdown-item
      v-bind="$attrs"
      :class="{
        active,
      }"
    >
      <slot></slot>
    </el-dropdown-item>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'SVDropdownItem',
})

withDefaults(
  defineProps<{
    active?: boolean
  }>(),
  {
    active: false,
  },
)
</script>

<style lang="scss" scoped>
:deep(.el-dropdown-menu__item) {
  &.active {
    color: var(--el-dropdown-menuItem-hover-color);
    background-color: var(--el-dropdown-menuItem-hover-fill);
  }

  &:not(.active):focus {
    color: $text-color-1;
    background-color: $fill-color;
  }
}
</style>
