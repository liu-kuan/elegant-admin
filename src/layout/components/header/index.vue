<template>
  <div class="header">
    <CollapseButton v-if="!isTooNarrow" />

    <div :style="{ width: isTooNarrow ? '0' : '14px' }"></div>

    <Breadcrumb />

    <EleSpacer />

    <Search />

    <el-space :size="18">
      <RefreshButton />
      <MessageButton />
      <SplitScreenButton />
      <SettingsButton />
      <FullScreenButton />
    </el-space>

    <User />
  </div>
</template>

<script setup lang="ts">
import usePreferenceStore from '@/stores/preference'
import { useEventListener } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import Breadcrumb from './components/Breadcrumb.vue'
import CollapseButton from './components/CollapseButton.vue'
import FullScreenButton from './components/FullscreenButton.vue'
import MessageButton from './components/MessageButton.vue'
import RefreshButton from './components/RefreshButton.vue'
import Search from './components/Search.vue'
import SettingsButton from './components/SettingsButton/index.vue'
import SplitScreenButton from './components/SplitScreenButton.vue'
import User from './components/User.vue'

// 宽度小于 600px 时，自动折叠菜单栏
const WIDTH = 600

let previousMenuCollapseState: boolean
const isTooNarrow = ref(window.innerWidth < WIDTH)
const { isMenuCollapse } = storeToRefs(usePreferenceStore())

const handleResize = () => {
  if (window.innerWidth < WIDTH) {
    if (!isTooNarrow.value) {
      previousMenuCollapseState = isMenuCollapse.value
    }

    isTooNarrow.value = true
    isMenuCollapse.value = true
  } else {
    if (isTooNarrow.value) {
      isMenuCollapse.value = previousMenuCollapseState
    }

    isTooNarrow.value = false
  }
}

useEventListener(window, 'resize', handleResize)
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  height: 100%;
  padding-left: $spacing-l;
  background-color: $bg-color-overlay;

  .el-space {
    margin-right: 6px;
    margin-left: 20px;
  }
}
</style>
