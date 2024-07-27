<template>
  <div class="error">
    <el-result :title="title" :sub-title="subTitle">
      <template #icon>
        <el-image :src="image" />
      </template>
      <template #extra>
        <el-button type="primary" :icon="ArrowLeftBold" @click="goBack">
          返回 {{ countdown }}s
        </el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeftBold } from '@element-plus/icons-vue'
import { useIntervalFn } from '@vueuse/core'

defineProps<{
  title: string
  subTitle: string
  image: string
}>()

const router = useRouter()

const goBack = () => {
  router.back()
}

const countdown = ref(10)

useIntervalFn(() => {
  if (countdown.value > 1) {
    countdown.value--
  } else {
    goBack()
  }
}, 1000)
</script>

<style lang="scss" scoped>
.error {
  @include card;
}

.el-image {
  width: 380px;
}
</style>
