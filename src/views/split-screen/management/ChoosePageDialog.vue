<template>
  <el-dialog
    v-model="isShow"
    title="选择页面"
    append-to-body
    width="600"
    @open="init"
  >
    <div
      class="recently-page"
      v-if="!($route.name as string).includes(RouteNames.SplitScreen)"
    >
      当前页面：
      <el-button @click="onChoseRecentlyPage" class="name">
        {{ route.meta.label }}
      </el-button>
    </div>

    <div class="all-pages">
      所有页面：
      <el-tree
        :data="pages"
        :props="{ label: (node) => node.meta.label }"
        @node-click="onChoose"
      />
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import RouteNames from '@/router/route-names'
import { getMenuRoutes } from '@/router/routes'
import { PageInfo } from '@/types/split-screen'
import type { RouteRecordRaw } from 'vue-router'

const emit = defineEmits<{
  success: [PageInfo]
}>()

const pages = computed(() => getMenuRoutes())
const route = useRoute()
const isShow = defineModel<boolean>('show')

const init = () => {
  choosedPage = void 0
}

let choosedPage: PageInfo | undefined
const onChoseRecentlyPage = () => {
  choosedPage = new PageInfo()
  choosedPage.name = route.name as string
  choosedPage.label = route.meta.label as string

  emit('success', choosedPage)
  isShow.value = false
}
const onChoose = (node: RouteRecordRaw) => {
  if (node.children?.length) return

  choosedPage = new PageInfo()
  choosedPage.name = node.name as string
  choosedPage.label = node.meta!.label as string

  emit('success', choosedPage)
  isShow.value = false
}
</script>

<style lang="scss" scoped>
.recently-page {
  .name {
    cursor: pointer;
  }
}

.all-pages {
  margin-top: 12px;

  .el-tree {
    padding: $spacing-s;
    margin-top: 6px;
    border: 1px solid $border-color;
    border-radius: $border-radius-2;
  }
}
</style>
