<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="(item, index) in breadcrumbList"
      :key="item.name"
    >
      <EleRow
        class="item"
        :class="{ last: index === breadcrumbList.length - 1 }"
      >
        <el-icon v-if="item.meta?.icon">
          <component :is="item.meta.icon" />
        </el-icon>

        <div>
          {{ item.meta.label }}
        </div>
      </EleRow>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import RouteNames from '@/router/route-names'
import { getSplitScreenPageLabelByRouteName } from '@/utils/split-screen'
import { ArrowRight } from '@element-plus/icons-vue'

const route = useRoute()
const breadcrumbList = computed(() => {
  if ((route.name as string).includes(RouteNames.SplitScreen)) {
    return [
      {
        name: RouteNames.SplitScreen,
        meta: {
          icon: void 0,
          label: '分屏',
        },
      },
      {
        name: route.name as string,
        children: [],
        meta: {
          icon: void 0,
          label: getSplitScreenPageLabelByRouteName(route.name as string),
        },
      },
    ]
  }

  return route.matched.filter((item) => {
    return item.meta?.label
  })
})
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  display: flex;
  align-items: center;
}

.item {
  .el-icon {
    margin-right: 6px;
    font-size: 17px;
  }

  color: $text-color-3;
  cursor: default;

  &.last {
    color: $text-color-2;
  }
}
</style>
