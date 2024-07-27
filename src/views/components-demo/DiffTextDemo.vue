<template>
  <Card name="DiffText" des="直观展示文案变化">
    <div class="border-solid border-rd-1 px-4 py-3">
      <DiffText :oldText :newText />
    </div>

    <ElForm class="flex w-full mt-4" label-position="top">
      <ElFormItem label="旧文案" class="flex-1">
        <ElInput type="textarea" v-model="oldText" autosize />
      </ElFormItem>

      <ElFormItem class="ml-4 flex-1" label="新文案">
        <ElInput type="textarea" v-model="newText" autosize />
      </ElFormItem>
    </ElForm>
  </Card>
</template>

<script setup lang="ts">
import Card from './Card.vue'

const initText =
  'ELEGANT-ADMIN 是基于 Vue 3、TypeScript、Vite、Vue-Router、Pinia、Element Plus、SASS、UNOCSS 等前沿技术开发的后台管理系统模板。ELEGANT-ADMIN is a back-end management system template developed based on cutting-edge technologies such as Vue 3, TypeScript, Vite, Vue-Router, Pinia, Element Plus, SASS, and UNOCSS. 生活就像海洋，只有意志坚强的人才能到达彼岸！Life is like an ocean, only those with a strong will can reach the other shore!'

const oldText = ref(initText)
const newText = ref(initText)
</script>
