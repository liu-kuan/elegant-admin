<template>
  <el-container class="page-view">
    <el-aside class="aside" v-if="$slots.aside">
      <slot name="aside"></slot>
    </el-aside>

    <el-container>
      <!-- 
        1. MARK height="dynamic" 是为了覆盖 el-header 的默认高度，设置成什么都行，这里就用 dynamic 了
        2. 这里 header 插槽是个数组，每个 item 都会包裹一个 card 样式，为了实现 order-entry 页面的效果
      -->
      <el-header class="header" height="dynamic" v-if="$slots.header">
        <div
          class="item"
          v-for="(item, index) of $slots.header?.()"
          :key="index"
        >
          <component :is="item" />
        </div>
      </el-header>

      <el-main class="body" v-loading="loadingBody">
        <div class="body-inner-wrapper" :style="bodyStyle">
          <slot name="body"></slot>

          <div class="pagination" v-if="$slots.pagination">
            <slot name="pagination"></slot>
          </div>
        </div>
      </el-main>

      <div class="footer" v-if="$slots.footer">
        <slot name="footer"></slot>
      </div>
    </el-container>

    <!-- 其他组件，比如当前页面的一些弹窗组件可以放在这个插槽 -->
    <slot></slot>
  </el-container>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    asideWidth?: number
    loadingBody?: boolean
    bodyStyle?: Record<string, string>
    full?: boolean
  }>(),
  {
    loadingBody: false,
    full: false,
  },
)

const asideWidth = computed(() => {
  if (props.asideWidth) {
    return `${props.asideWidth}px`
  }

  return 'fit-content'
})
</script>

<style lang="scss" scoped>
.page-view {
  height: v-bind('$props.full ? "100%" : "auto"');
  max-height: 100%;

  .sv-table {
    display: flex;
    flex-basis: 0;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: hidden;
  }
}

.aside {
  @include card;

  width: v-bind('asideWidth');
  margin-right: $card-spacing;
}

.header {
  padding: 0;

  .item {
    @include card;

    margin-bottom: $card-spacing;
  }
}

.body {
  @include card;

  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 0;
  overflow: hidden;
  border-radius: $border-radius-2;

  .body-inner-wrapper {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: $spacing-l;
    overflow: auto;
    border: none;

    // body 中的 header 与表格之间的距离大一点更好看
    > :deep(.sv-table) {
      margin-top: -3px;

      .header {
        margin-bottom: 12px;
      }
    }
  }
}

.pagination {
  display: flex;
  justify-content: end;
  margin-top: $spacing-l;
}

.footer {
  @include card;

  margin-top: $card-spacing;
}
</style>
