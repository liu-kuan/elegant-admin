<template>
  <el-tooltip content="设置" placement="bottom">
    <SettingOutlined class="header__icon" @click="isShowSettingDrawer = true" />
  </el-tooltip>

  <el-drawer v-model="isShowSettingDrawer" title="设置" :size="360">
    <StyleSettings />

    <SystemSettings />

    <DevModeSettings v-if="isShowDevPart" />

    <template #footer>
      <ClearCacheButton />
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import useDevModeStore from '@/stores/dev-mode'
import { SettingOutlined } from '@ant-design/icons-vue'
import ClearCacheButton from './ClearCacheButton.vue'
import DevModeSettings from './DevModeSettings.vue'
import StyleSettings from './StyleSettings.vue'
import SystemSettings from './SystemSettings.vue'

const { devMode } = storeToRefs(useDevModeStore())

const isShowSettingDrawer = ref(false)

const isShowDevPart = computed(() => import.meta.env.DEV && devMode.value)
</script>

<style lang="scss" scoped>
:deep(.el-drawer__body) {
  padding-top: 0;
}
</style>
