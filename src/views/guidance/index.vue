<template>
  <div class="card">
    <div class="content">
      <Part title="开发者">
        1. 前端：刘宽。
        <br />
        2. 服务端：xxx。
        <br />
        遇到问题可以联系开发者，或反馈到
        <a href="xxx" target="_blank">后台管理系统问题记录</a>
      </Part>

      <Part title="设置">
        点击右上方
        <SettingOutlined class="mx-1" />
        按钮，即可实现设置主题模式、设置最大请求并发数、清理缓存等功能。
      </Part>

      <Part title="请求异常日志">
        点击右上方
        <ExceptionOutlined class="mx-1" />
        按钮，即可查看最近的请求异常日志。
      </Part>

      <Part title="分屏功能">
        点击右上方
        <SplitCellsOutlined class="mx-1" />
        按钮，即可使用分屏功能，可以做到同时查看任意两个页面。
      </Part>

      <Part title="快捷键">
        <HotKey />
      </Part>
    </div>

    <BackTop />
  </div>
</template>

<script setup lang="ts">
import RouteNames from '@/router/route-names'
import {
  ExceptionOutlined,
  SettingOutlined,
  SplitCellsOutlined,
} from '@ant-design/icons-vue'
import HotKey from './components/HotKey.vue'
import Part from './components/Part.vue'

defineOptions({
  name: RouteNames.Guidance,
})
</script>

<style lang="scss" scoped>
.card {
  @include card;

  display: flex;
  align-items: start;
  justify-content: space-between;
}

.content {
  margin-right: 30px;
}

a + a {
  margin-top: $spacing-m;
}
</style>
