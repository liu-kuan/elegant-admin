<template>
  <el-tooltip content="消息" placement="bottom">
    <el-badge
      class="header__icon"
      :value
      :max="99"
      @click="toMessage"
      :show-zero="false"
    >
      <MessageOutlined />
    </el-badge>
  </el-tooltip>
</template>

<script setup lang="ts">
import RouteNames from '@/router/route-names'
import { MessageOutlined } from '@ant-design/icons-vue'

const router = useRouter()

const toMessage = () => {
  router.push({
    name: RouteNames.My_Messages,
  })
}
const value = ref(6)
</script>
