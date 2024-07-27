<template>
  <div
    class="tab"
    :class="{
      active: active,
    }"
    @click="emit('click')"
  >
    <slot></slot>
    <el-icon
      class="close"
      :style="`--close__bg-color: ${isDark ? '#666' : '#bbb'}`"
      v-if="closable"
      @click.stop="emit('close')"
    >
      <close />
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { useDark } from '@/hooks/theme'
import { Close } from '@element-plus/icons-vue'

defineProps<{
  active?: boolean
  closable?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'click'): void
}>()

const isDark = useDark()
</script>

<style lang="scss" scoped>
.tab {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 10px;
  font-size: $text-size-3;
  line-height: 1;
  color: $text-color-2;
  white-space: nowrap;
  cursor: pointer;
  background-color: $fill-color;
  border-radius: 6px;

  &:not(.active):hover {
    background-color: $fill-color-dark;
  }

  .close {
    padding: 1px;
    margin-left: 5px;
    border-radius: 50%;

    &:hover {
      color: white;
      background-color: var(--close__bg-color);
    }

    &.active:hover {
      background-color: white;
    }
  }
}

.active {
  color: white;
  background-color: $color-primary;

  .close:hover {
    background-color: var(--el-color-primary-light-3);
  }
}
</style>
