<template>
  <el-divider>样式设置</el-divider>

  <Tile label="主题模式">
    <el-segmented v-model="theme" :options="options" size="default">
      <template #default="{ item }: { item: Option }">
        <Row>
          <component :is="item.icon" />
          <div class="ml-1">{{ item.label }}</div>
        </Row>
      </template>
    </el-segmented>
  </Tile>

  <Tile label="侧边菜单折叠">
    <el-switch v-model="isMenuCollapse" />
  </Tile>

  <Tile
    label="侧边菜单手风琴"
    tip="开启后，侧边菜单将只保持一个子菜单的展开"
    tip-width="190"
  >
    <el-switch v-model="asideMenuUniqueOpened" />
  </Tile>

  <Tile label="页面切换动画">
    <el-switch v-model="pageTransitionAnimation" />
  </Tile>
</template>

<script setup lang="ts">
import usePreferenceStore from '@/stores/preference'
import type { Theme } from '@/types/theme'
import MdiCircleHalfFull from '~icons/mdi/circle-half-full'
import MdiMoonWaningCrescent from '~icons/mdi/moon-waning-crescent'
import MdiWhiteBalanceSunny from '~icons/mdi/white-balance-sunny'
import Tile from './Tile.vue'

const {
  theme,
  isMenuCollapse,
  asideMenuUniqueOpened,
  pageTransitionAnimation,
} = storeToRefs(usePreferenceStore())

interface Option {
  label: string
  icon: Component
  value: Theme
}

const options: Option[] = [
  {
    label: '浅色',
    icon: MdiWhiteBalanceSunny,
    value: 'light',
  },
  {
    label: '深色',
    icon: MdiMoonWaningCrescent,
    value: 'dark',
  },
  {
    label: '自动',
    icon: MdiCircleHalfFull,
    value: 'auto',
  },
]
</script>
