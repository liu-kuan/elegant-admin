<template>
  <Card name="NumberTransition" des="数字会有过度效果地变化到目标值">
    <div class="px-5 py-3 border-rd-1 w-fit border-solid">
      <NumberTransition :value="number" :duration="duration" />
    </div>

    <ElForm class="mt-4" inline>
      <ElFormItem label="目标值">
        <ElInputNumber v-model="targetNumber" :step="100" />
      </ElFormItem>

      <ElFormItem label="过渡时间(s)">
        <ElInputNumber v-model="targetDuration" :step="100" />
      </ElFormItem>

      <ElFormItem>
        <ElButton @click="onClickConfirm">确认</ElButton>
      </ElFormItem>
    </ElForm>
  </Card>
</template>

<script setup lang="ts">
import Card from '../Card.vue'

const number = ref(0)
const duration = ref(0)

const targetNumber = ref(0)
const targetDuration = ref(500)

const onClickConfirm = () => {
  number.value = targetNumber.value
  duration.value = targetDuration.value
}
</script>

<style lang="scss" scoped>
.a {
  border-radius: 10px;
}
</style>
