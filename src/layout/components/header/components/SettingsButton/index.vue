<template>
  <el-tooltip content="设置" placement="bottom">
    <SettingOutlined class="header__icon" @click="isShowSettingDrawer = true" />
  </el-tooltip>

  <el-drawer v-model="isShowSettingDrawer" title="设置" :size="360">
    <StyleSettings />

    <SystemSettings />

    <template #footer>
      <ClearCacheButton />
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { SettingOutlined } from '@ant-design/icons-vue'
import ClearCacheButton from './ClearCacheButton.vue'
import StyleSettings from './StyleSettings.vue'
import SystemSettings from './SystemSettings.vue'

const isShowSettingDrawer = ref(false)
</script>

<style lang="scss" scoped>
:deep(.el-drawer__body) {
  padding-top: 0;
}
</style>
