<template>
  <div class="card">
    多级菜单
    <div class="container bg-blue-1">
      一级菜单
      <div class="container bg-blue-3">
        二级菜单
        <div class="container bg-blue-5">三级菜单</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.container {
  @apply border-rd-1 p-4 mt-4 box-border;
}
</style>
