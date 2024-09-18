<template>
  <Card
    name="Table"
    des="功能丰富的表格组件，继承了 Element Plus 的 Table 组件的所有功能"
  >
    <div class="border-solid border-rd-1 px-4 py-3">
      <Table :title :hideHeader :data :columns :loading :onRefresh>
        <template #_operation>
          <ElButton>操作 1</ElButton>
          <ElButton type="primary">操作 2</ElButton>
        </template>

        <template #custom:operation>
          <ElButton size="small" type="primary">XX 操作</ElButton>
        </template>
      </Table>
    </div>

    <ElForm inline class="w-full mt-6 flex-wrap">
      <ElFormItem label="标题">
        <ElInput v-model="title" class="w-50!" placeholder="请输入标题" />
      </ElFormItem>

      <ElFormItem label="隐藏头部">
        <ElSwitch v-model="hideHeader" />
      </ElFormItem>

      <ElFormItem label="加载态">
        <ElSwitch v-model="loading" />
      </ElFormItem>
    </ElForm>

    <ElForm class="w-full flex-wrap" label-position="top">
      <div class="flex">
        <ElFormItem label="columns" class="flex-1">
          <JsonEditor
            :model-value="columns"
            class="w-full"
            height="400px"
            @json-change="columns = $event"
          />
        </ElFormItem>

        <ElFormItem label="data" class="ml-4 flex-1">
          <JsonEditor
            :model-value="data"
            class="w-full!"
            height="400px"
            @json-change="data = $event"
          />
        </ElFormItem>
      </div>
    </ElForm>
  </Card>
</template>

<script setup lang="ts">
import type { TableColumns } from '@/components/Table/types'
import { sleep } from '@/utils/time'
import Card from './Card.vue'

const loading = ref(false)
const onRefresh = async () => {
  loading.value = true
  await sleep(500)
  loading.value = false
}

interface Row {
  id: string
  name: string
  age: string
  gender: string
  job: string
  hobby: string
  otherColumn1: string
  otherColumn2: string
  otherColumn3: string
}

const title = ref('表格名称')
const hideHeader = ref(false)

const columns = ref<TableColumns<Row>>([
  {
    prop: 'id',
    label: 'ID',
    width: 82,
    fixed: 'left',
  },
  {
    prop: 'name',
    label: '用户名',
    width: 120,
  },
  {
    prop: 'age',
    label: '年龄',
    width: 100,
  },
  {
    prop: 'gender',
    label: '性别',
    width: 82,
  },
  {
    prop: 'job',
    label: '工作',
    width: 300,
  },
  {
    prop: 'hobby',
    label: '爱好',
    width: 200,
  },
  {
    prop: 'otherColumn1',
    label: '其他列 1',
    minWidth: 300,
  },
  {
    prop: 'otherColumn2',
    label: '其他列 2',
    minWidth: 300,
  },
  {
    prop: 'otherColumn3',
    label: '其他列 3',
    minWidth: 300,
  },
  {
    prop: 'custom:operation',
    label: '操作',
    width: 100,
    align: 'center',
    fixed: 'right',
  },
])

const data = ref<Row[]>([
  {
    id: '1',
    name: '张三',
    age: '18',
    gender: '男',
    job: '前端工程师',
    hobby: '篮球',
    otherColumn1: '其他列 1',
    otherColumn2: '其他列 2',
    otherColumn3: '其他列 3',
  },
  {
    id: '2',
    name: '李四',
    age: '20',
    gender: '男',
    job: '后端工程师',
    hobby: '足球',
    otherColumn1: '其他列 1',
    otherColumn2: '其他列 2',
    otherColumn3: '其他列 3',
  },
  {
    id: '3',
    name: '王五',
    age: '22',
    gender: '男',
    job: 'UI 设计师',
    hobby: '画画',
    otherColumn1: '其他列 1',
    otherColumn2: '其他列 2',
    otherColumn3: '其他列 3',
  },
])
</script>
