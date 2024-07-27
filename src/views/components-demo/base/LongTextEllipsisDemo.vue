<template>
  <Card name="LongTextEllipsis" des="文字过长省略">
    <div
      class="px-5 py-3 border-rd-1 border-solid"
      :style="{
        width: `${width}px`,
      }"
    >
      <LongTextEllipsis :content="content" :max-line :type />
    </div>

    <ElForm class="mt-4 flex items-start flex-wrap" inline>
      <ElFormItem label="内容">
        <ElInput type="textarea" autosize v-model="content" class="w-100!" />
      </ElFormItem>

      <ElFormItem label="最大行数">
        <ElInputNumber v-model="maxLine" />
      </ElFormItem>

      <ElFormItem label="宽度">
        <ElInputNumber v-model="width" :min="50" :step="10" />
      </ElFormItem>

      <ElFormItem label="展示全部方式">
        <ElSelect v-model="type" class="w-30!">
          <ElOption label="弹窗" value="dialog" />
          <ElOption label="Popover" value="popover" />
        </ElSelect>
      </ElFormItem>
    </ElForm>
  </Card>
</template>

<script setup lang="ts">
import Card from '../Card.vue'

const content = ref(
  '很长，非常长，特别长的文案！long text！很长，非常长，特别长的文案！long text！很长，非常长，特别长的文案！long text！很长，非常长，特别长的文案！long text！很长，非常长，特别长的文案！long text！很长，非常长，特别长的文案！long text！很长，非常长，特别长的文案！long text！很长，非常长，特别长的文案！long text！很长，非常长，特别长的文案！long text！',
)
const maxLine = ref(3)
const width = ref(100)
const type = ref<'dialog' | 'popover'>('dialog')
</script>

<style lang="scss" scoped>
.aaa {
  resize: both;
}
</style>
