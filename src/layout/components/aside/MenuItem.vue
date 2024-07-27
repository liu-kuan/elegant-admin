<template>
  <el-sub-menu v-if="item.children" :index="(item.name as string)">
    <template #title>
      <el-icon v-if="item.meta?.icon">
        <component :is="item.meta.icon" />
      </el-icon>
      <span class="label">{{ item.meta?.label }}</span>
    </template>
    <menu-item
      v-for="subItem in item.children"
      :key="subItem.path"
      :index="subItem.name"
      :item="subItem"
    >
      {{ subItem.meta?.label }}
    </menu-item>
  </el-sub-menu>

  <el-menu-item
    v-else
    :index="(item.name as string)"
    @click="onClicked(item.name)"
  >
    <el-icon v-if="item.meta?.icon">
      <component :is="item.meta.icon" />
    </el-icon>
    <template #title>
      <span class="label">{{ item.meta?.label }}</span>
    </template>
  </el-menu-item>
</template>

<script setup lang="ts">
import { type RouteRecordName, type RouteRecordRaw } from 'vue-router'

defineProps<{ item: RouteRecordRaw }>()

const router = useRouter()

const onClicked = (name: RouteRecordName | undefined) => {
  router.push({ name })
}
</script>

<style lang="scss" scoped>
// 给子菜单添加颜色
// .el-sub-menu .el-menu-item {
//   background-color: $aside-sub-item-bg-color;
// }

// 选中菜单背景色
.el-menu-item {
  &.is-active {
    position: relative;
    background-color: $aside-bg-color-active;

    &::before {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 4px;
      content: '';
      background-color: $color-primary;
    }
  }

  &:not(.is-active):hover {
    background-color: $aside-bg-color-hover !important;
  }
}

.el-sub-menu {
  &.is-active {
    :deep(> .el-sub-menu__title) {
      color: white !important;
    }

    &:not(.is-opened) :deep(.el-sub-menu__title) {
      color: $color-primary !important;
      background-color: $aside-bg-color-active !important;
    }
  }

  :deep(.el-sub-menu__title):hover {
    background-color: $aside-bg-color-hover !important;
  }
}
</style>
