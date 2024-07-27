<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { useDevMode } from '@/hooks/dev-mode'
import { useRegisterSplitScreenRoute } from '@/hooks/split-screen'
import useUserStore from '@/stores/user'
import * as Sentry from '@sentry/vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { storeToRefs } from 'pinia'

const { info, token } = storeToRefs(useUserStore())

watch(
  info,
  () => {
    if (token.value) {
      Sentry.setUser({
        id: info.value.id,
        username: info.value.username,
      })
    }
  },
  {
    immediate: true,
    deep: true,
  },
)

// 动态注册所有分屏页路由
useRegisterSplitScreenRoute()

useDevMode()
</script>

<style lang="scss">
:root {
  --dev-mode__outline-dashed: 0.5px dashed red;
  --dev-mode__outline: none;
}

*,
*::before,
*::after {
  outline: var(--dev-mode__outline);
}
</style>
