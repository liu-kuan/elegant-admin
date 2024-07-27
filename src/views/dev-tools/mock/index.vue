<template>
  <PageView>
    <template #body>
      <SVTable
        title="模拟接口列表"
        :data="mockApiList"
        :columns="tableColumns"
        with-index
      >
        <template #_operation>
          <el-button
            type="primary"
            :icon="PlusCircleOutlined"
            @click="onUpsert()"
          >
            添加模拟接口
          </el-button>
        </template>

        <template #custom:sort>
          <el-button :icon="Rank" class="sort cursor-move!" />
        </template>

        <template #responseBody="{ value }">
          <JsonEditor :model-value="value" readonly />
        </template>

        <template #active="{ row }">
          <el-switch v-center v-model="row.active" />
        </template>

        <template #custom:operation="{ row }">
          <EleRow justify-content="center">
            <el-button
              size="small"
              type="primary"
              :icon="FormOutlined"
              @click="onUpsert(row)"
              >编辑</el-button
            >

            <el-button
              size="small"
              type="danger"
              :icon="DeleteOutlined"
              @click="onDelete(row)"
              >删除</el-button
            >
          </EleRow>
        </template>
      </SVTable>
    </template>

    <UpsertDialog
      :mock-api="currentMockApi"
      v-model:show="isShowUpsertDialog"
    />
  </PageView>
</template>

<script setup lang="ts">
import Dialog from '@/components/Dialog'
import RouteNames from '@/router/route-names'
import useDevModeStore from '@/stores/dev-mode'
import type { MockApi } from '@/types/mock'
import {
  DeleteOutlined,
  FormOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons-vue'
import { Rank } from '@element-plus/icons-vue'
import { useDraggable } from 'vue-draggable-plus'
import UpsertDialog from './UpsertDialog.vue'
import tableColumns from './table-columns'

defineOptions({
  name: RouteNames.Software_AppConfig,
})

const { mockApiList } = storeToRefs(useDevModeStore())

const isShowUpsertDialog = ref(false)

const currentMockApi = ref<MockApi>()

const onUpsert = (api?: MockApi) => {
  isShowUpsertDialog.value = true

  currentMockApi.value = api
}

const onDelete = async (api: MockApi) => {
  const { action } = Dialog('删除模拟接口', '确定删除该删除模拟接口吗？', {
    confirmButtonType: 'danger',
    attrs: {
      width: 360,
    },
  })

  if ((await action) === 'confirm') {
    mockApiList.value = mockApiList.value.filter((item) => item !== api)
  }
}

useDraggable('.el-table__body > tbody', mockApiList, {
  animation: 300,
  handle: '.sort',
})
</script>
