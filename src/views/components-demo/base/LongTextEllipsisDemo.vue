<template>
  <Card name="LongTextEllipsis" des="文字过长省略">
    <div
      class="mt-4 px-5 py-3 border-rd-1 border-solid"
      :style="{
        width: `${width}px`,
      }"
    >
      <LongTextEllipsis :content="content" :max-line />
    </div>

    <ElForm class="mt-5 flex items-start" inline>
      <ElFormItem label="内容">
        <ElInput type="textarea" autosize v-model="content" class="w-100!" />
      </ElFormItem>

      <ElFormItem label="最大行数">
        <ElInputNumber v-model="maxLine" />
      </ElFormItem>

      <ElFormItem label="宽度">
        <ElInputNumber v-model="width" :min="50" :step="10" />
      </ElFormItem>
    </ElForm>
  </Card>
</template>

<script setup lang="ts">
import Card from './Card.vue'

const content = ref(
  '很长，非常长，特别长的文案！long text！很长，非常长，特别长的文案！long text！很长，非常长，特别长的文案！long text！很长，非常长，特别长的文案！long text！很长，非常长，特别长的文案！long text！很长，非常长，特别长的文案！long text！很长，非常长，特别长的文案！long text！很长，非常长，特别长的文案！long text！很长，非常长，特别长的文案！long text！',
)
const maxLine = ref(3)
const width = ref(50)
</script>

<style lang="scss" scoped>
.aaa {
  resize: both;
}
</style>
