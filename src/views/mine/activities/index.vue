<template>
  <Activities mode="user" />
</template>

<script setup lang="ts">
import RouteNames from '@/router/route-names'
import Activities from '@/views/activities/index.vue'

defineOptions({
  name: RouteNames.My_Activities,
})
</script>
