<template>
  <el-tooltip
    :content="`${
      isFullscreen ? '退出全屏' : '全屏展示'
    } ${metaKey} + shift + ⬆️`"
    placement="bottom"
  >
    <component
      @click="toggle"
      class="header__icon"
      :is="isFullscreen ? FullscreenExitOutlined : FullscreenOutlined"
    />
  </el-tooltip>
</template>

<script setup lang="ts">
import useHotKey from '@/hooks/use-hot-key'
import { Platform, getPlatform } from '@/utils/platform'
import {
  FullscreenExitOutlined,
  FullscreenOutlined,
} from '@ant-design/icons-vue'
import { useFullscreen } from '@vueuse/core'

const metaKey = getPlatform() === Platform.Mac ? '⌘' : 'ctrl'

const { isFullscreen, toggle } = useFullscreen()

// #region 快捷键
const handleKeyDown = (event: KeyboardEvent) => {
  if (
    (event.ctrlKey || event.metaKey) &&
    event.shiftKey &&
    event.key === 'ArrowUp'
  ) {
    event.preventDefault()

    toggle()
  }
}

useHotKey(handleKeyDown)
// #endregion
</script>
