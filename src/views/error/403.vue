<template>
  <Error
    title="您没有权限访问该页面哦~"
    :sub-title="`请联系 ${defaultAdminUsername} 添加相关权限`"
    :image="svg403"
  />
</template>

<script setup lang="ts">
import svg403 from '@/assets/403.svg'
import { defaultAdminUsername } from '@/config/role'
import RouteNames from '@/router/route-names'
import Error from './components/Error.vue'

defineOptions({
  name: RouteNames.Error403,
})
</script>
