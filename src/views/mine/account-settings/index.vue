<template>
  <el-tabs v-model="activeTab" type="border-card">
    <el-tab-pane
      v-for="tab in tabList"
      :key="tab.label"
      :label="tab.label"
      :name="tab.label"
    >
      <div style="height: 12px"></div>
      <component :is="tab.component" />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import RouteNames from '@/router/route-names'
import ChangePassword from './components/ChangePassword.vue'

defineOptions({
  name: RouteNames.My_AccountSettings,
})

enum TabLabel {
  ChangePassword = '修改密码',
}

interface Tab {
  label: TabLabel
  component: Component
}

const tabList: Tab[] = [
  {
    label: TabLabel.ChangePassword,
    component: ChangePassword,
  },
]

const activeTab = ref(TabLabel.ChangePassword)
</script>
