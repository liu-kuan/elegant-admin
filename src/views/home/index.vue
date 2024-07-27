<template>
  <div class="card">
    ELEGANT-ADMIN 是基于 Vue 3、TypeScript、Vite、Vue-Router、Pinia、Element
    Plus、SASS、UNOCSS 等前沿技术开发的后台管理系统模板
  </div>
</template>

<script setup lang="ts">
import RouteNames from '@/router/route-names'

defineOptions({
  name: RouteNames.Home,
})
</script>
