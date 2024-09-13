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
  column1: string
  column2: string
  column3: string
  column4: string
}

const title = ref('表格名称')
const hideHeader = ref(false)

const columns = ref<TableColumns<Row>>([
  {
    prop: 'column1',
    label: '列 1',
    width: 82,
    fixed: 'left',
  },
  {
    prop: 'column2',
    label: '列 2',
    width: 82,
  },
  {
    prop: 'column3',
    label: '列 3',
  },
  {
    prop: 'column4',
    label: '列 4',
    width: 82,
    fixed: 'right',
  },
])

const data = ref<Row[]>([
  {
    column1: '11',
    column2: '12',
    column3: '13',
    column4: '14',
  },
  {
    column1: '21',
    column2: '22',
    column3: '23',
    column4: '24',
  },
  {
    column1: '31',
    column2: '32',
    column3: '33',
    column4: '34',
  },
  {
    column1: '41',
    column2: '42',
    column3: '43',
    column4: '44',
  },
  {
    column1: '51',
    column2: '52',
    column3: '53',
    column4: '54',
  },
  {
    column1: '61',
    column2: '62',
    column3: '63',
    column4: '64',
  },
])
</script>
