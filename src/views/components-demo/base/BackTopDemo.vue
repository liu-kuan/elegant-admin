<template>
  <Card name="BackTop" des="回到顶部组件">
    <BackTop />

    <ElButton type="primary" @click="isExpanded = !isExpanded">展开</ElButton>

    <div
      class="bg-blueGray transition-all duration-0.5s ease"
      :class="{
        'mt-4': isExpanded,
      }"
      :style="{
        height: isExpanded ? '90vh' : '0',
      }"
    ></div>

    <div class="text-size-2 mt-4">
      向上滑动（如长度不足以向上滑动可点击展开按钮），看右下角有个圆形按钮，点击回到顶部
    </div>
  </Card>
</template>

<script setup lang="tsx">
import Card from '../Card.vue'

const isExpanded = ref(false)
</script>
