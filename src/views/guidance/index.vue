<template>
  <div class="card">
    <div class="form-box">
      <Part title="开发者">
        1. 前端：Eric Liu。
        <br />
        2. 服务端：xxx。
        <br />
        遇到问题请反馈到
        <a
          href="https://github.com/liu-kuan/elegant-admin?tab=readme-ov-file"
          target="_blank"
          >Elegant-Admin (github)</a
        >
      </Part>

      <Part title="设置">
        点击右上方
        <SettingOutlined class="mx-1" />
        按钮，即可实现设置主题模式、设置最大请求并发数、清理缓存等功能。
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
  </div>
</template>

<script setup lang="ts">
import RouteNames from '@/router/route-names'
import { SettingOutlined, SplitCellsOutlined } from '@ant-design/icons-vue'
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

.form-box {
  margin-right: 30px;
}

a + a {
  margin-top: $spacing-m;
}
</style>
