<template>
  <el-divider>开发者选项</el-divider>

  <Tile label="显示开发者工具">
    <el-switch v-model="showDevTools" />
  </Tile>

  <Tile label="显示元素外轮廓">
    <el-switch v-model="elementOutlineVisible" />
  </Tile>
</template>

<script setup lang="ts">
import useDevModeStore from '@/stores/dev-mode'
import Tile from './Tile.vue'

const { showDevTools, elementOutlineVisible } = storeToRefs(useDevModeStore())
</script>
