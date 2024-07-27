<template>
  <Error
    title="您访问的页面不存在 ~"
    sub-title="请确认您输入的网址正确"
    :image="svg404"
  />
</template>

<script setup lang="ts">
import svg404 from '@/assets/404.svg'
import RouteNames from '@/router/route-names'
import Error from './components/Error.vue'

defineOptions({
  name: RouteNames.Error404,
})
</script>
