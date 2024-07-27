<template>
  <el-tooltip content="分屏" placement="bottom">
    <SplitCellsOutlined
      class="header__icon"
      @click="isShowSplitScreenManagementDialog = true"
    />
  </el-tooltip>

  <SplitScreenManagementDialog
    v-model:show="isShowSplitScreenManagementDialog"
  />
</template>

<script setup lang="ts">
import SplitScreenManagementDialog from '@/views/split-screen/management/index.vue'
import { SplitCellsOutlined } from '@ant-design/icons-vue'

const isShowSplitScreenManagementDialog = ref(false)
</script>
