<template>
  <div class="long-text-ellipsis">
    <template v-if="type === 'dialog'">
      <div class="form-box" ref="contentRef">
        {{ String(content) }}
      </div>

      <div class="flex">
        <el-link
          v-if="isEllipsis"
          type="primary"
          @click="showMore"
          class="ml-auto"
          >更多</el-link
        >
      </div>
    </template>

    <el-tooltip
      v-else
      :disabled="!isEllipsis"
      placement="top"
      :content="String(content)"
    >
      <div class="form-box" ref="contentRef">
        {{ String(content) }}
      </div>
    </el-tooltip>
  </div>
</template>

<script setup lang="tsx">
import EleDialog from '@/components/EleDialog'
import { useResizeObserver } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    content: any
    maxLine: number
    type?: 'dialog' | 'tooltip'
  }>(),
  {
    type: 'dialog',
  },
)

const isEllipsis = ref(false)
const contentRef = ref<HTMLDivElement>()
const setIsEllipsis = () => {
  nextTick(() => {
    if (
      contentRef.value?.scrollHeight !== void 0 &&
      contentRef.value?.clientHeight !== void 0
    ) {
      isEllipsis.value =
        contentRef.value.scrollHeight > contentRef.value.clientHeight ||
        contentRef.value.scrollWidth > contentRef.value.clientWidth
    }
  })
}

watch(
  () => [props.content, props.maxLine],
  () => {
    setIsEllipsis()
  },
)

useResizeObserver(contentRef, (entries) => {
  const entry = entries[0]
  const { width, height } = entry.contentRect
  if (width > 0 && height > 0) {
    setIsEllipsis()
  }
})

const showMore = () => {
  EleDialog('详细内容', <div>{String(props.content)}</div>, {
    hideFooter: true,
    attrs: {
      width: '60%',
    },
  })
}
</script>

<style lang="scss" scoped>
.form-box {
  display: -webkit-box;
  overflow: hidden;

  // word-break: break-all;
  word-wrap: break-word;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: v-bind('$props.maxLine');
}
</style>
