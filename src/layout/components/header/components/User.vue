<template>
  <el-dropdown trigger="click" class="h-full">
    <div class="user-container flex flex-row items-center cursor-pointer">
      <el-avatar class="shrink-0" :size="32">{{
        userStore.info.username[0]
      }}</el-avatar>
      <div class="mr-2px ml-8px">{{ userStore.info.username }}</div>
    </div>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :icon="LogoutOutlined" @click="userStore.loginOut">
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import useUserStore from '@/stores/user'
import { LogoutOutlined } from '@ant-design/icons-vue'

const userStore = useUserStore()
</script>

<style lang="scss" scoped>
.user-container {
  height: 100%;
  padding-inline: $spacing-m;

  &:hover {
    background-color: $fill-color-light;
  }
}
</style>
