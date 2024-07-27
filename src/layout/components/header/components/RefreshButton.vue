<template>
  <el-tooltip :content="`刷新 ${metaKey} + shift + R`" placement="bottom">
    <SyncOutlined class="header__icon" @click="onRefresh" />
  </el-tooltip>
</template>

<script setup lang="ts">
import useHotKey from '@/hooks/use-hot-key'
import eventBus from '@/utils/event-bus'
import { Platform, getPlatform } from '@/utils/platform'
import { SyncOutlined } from '@ant-design/icons-vue'

const metaKey = getPlatform() === Platform.Mac ? '⌘' : 'ctrl'

const onRefresh = () => {
  eventBus.emit('refresh')
}

// #region 快捷键
useHotKey((event: KeyboardEvent) => {
  if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'r') {
    event.preventDefault()

    onRefresh()
  }
})
// #endregion
</script>
