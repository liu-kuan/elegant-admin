<template>
  <el-table :data="tableData" border style="width: 500px">
    <el-table-column prop="hotKey" label="快捷键" width="180" />
    <el-table-column prop="function" label="功能" />
  </el-table>
</template>

<script setup lang="ts">
import { Platform, getPlatform } from '@/utils/platform'

const metaKey = getPlatform() === Platform.Mac ? '⌘' : 'ctrl'

const tableData: {
  hotKey: string
  function: string
}[] = [
  {
    hotKey: `${metaKey} + B`,
    function: '打开 / 折叠 菜单栏',
  },
  {
    hotKey: `${metaKey} + K`,
    function: '打开搜索功能',
  },
  {
    hotKey: `${metaKey} + ⬆️`,
    function: '切换至上个 tab',
  },
  {
    hotKey: `${metaKey} + ⬇️`,
    function: '切换至下个 tab',
  },
  {
    hotKey: `${metaKey} + shift + ⬆️`,
    function: '全屏 / 取消全屏（网站全屏，不是浏览器全屏）',
  },
  {
    hotKey: `${metaKey} + shift + R`,
    function: '刷新内容区域',
  },
]
</script>
