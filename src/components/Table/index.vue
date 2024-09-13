<template>
  <div class="sv-table">
    <div class="filter" v-if="$slots._filter">
      <slot name="_filter"></slot>
    </div>

    <Row class="header" v-if="!hideHeader">
      <LongTextEllipsis
        :content="title"
        :max-line="1"
        type="popover"
        class="title"
        v-if="title"
      />

      <Row class="operation" v-if="$slots._operation">
        <slot name="_operation"></slot>
      </Row>

      <Spacer />

      <Row>
        <SyncOutlined
          v-if="onRefresh"
          class="header-icon"
          @click="onRefresh"
          :spin="loading"
        />

        <el-dropdown trigger="click">
          <DownloadOutlined class="header-icon" />

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="exportFormatDateXlsx"
                >导出格式化数据</el-dropdown-item
              >
              <el-dropdown-item @click="exportRawDateXlsx"
                >导出原始数据</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <SettingOutlined
          class="header-icon"
          @click="
            () => {
              isShowSettingDrawer = true
            }
          "
        />
      </Row>
    </Row>

    <el-table
      :data="data"
      :header-cell-style="{
        backgroundColor: 'var(--header-color)',
        userSelect: 'initial',
      }"
      v-loading="loading"
      border
      v-bind="{ ...$attrs, class: void 0, style: void 0 }"
      @selection-change="onTableSelectionChange"
      @select="onTableSelect"
      ref="tableRef"
    >
      <TableColumn
        v-if="_withIndex"
        :data-length="data?.length"
        :column="{
          prop: '_index',
          label: '#',
          width: 60,
          fixed: 'left',
          attrs: {
            type: 'index',
            align: 'center',
          },
        }"
      />

      <TableColumn
        v-for="column of _columns.filter((c) => columnProps.includes(c.prop))"
        :key="column.prop"
        :data-length="data?.length"
        :column
        :slots="$slots"
      />

      <template #empty>
        <slot name="_empty" v-if="$slots.empty"></slot>
        <el-empty v-else :image-size="60" description="暂无数据" />
      </template>
    </el-table>

    <div class="pagination" v-if="$slots._pagination">
      <slot name="_pagination"></slot>
    </div>

    <el-drawer v-model="isShowSettingDrawer" title="编辑表格" :size="400">
      <el-divider>编辑列</el-divider>

      <div class="row">
        展示序号列
        <el-switch v-model="_withIndex" />
      </div>

      <el-checkbox-group v-model="columnProps">
        <VueDraggable
          v-model="_columns"
          :animation="250"
          class="flex flex-col items-stretch"
          handle=".drag-handle"
          @start="drag = true"
          @end="drag = false"
        >
          <Row v-for="column of _columns" :key="column.prop">
            <el-icon :size="18" class="drag-handle">
              <Rank />
            </el-icon>

            <el-checkbox :value="column.prop" :label="column.label" />

            <Spacer />

            <el-tag
              size="small"
              type="info"
              v-if="column.fixed"
              closable
              disable-transitions
              @close="column.fixed = void 0"
            >
              已固定到{{ column.fixed === 'left' ? '左' : '右' }}侧</el-tag
            >

            <template v-if="!column.fixed">
              <el-tooltip
                content="固定到左侧"
                placement="top"
                :show-after="300"
              >
                <MdiFormatHorizontalAlignLeft
                  class="fix-icon"
                  @click="column.fixed = 'left'"
                />
              </el-tooltip>

              <el-tooltip
                content="固定到右侧"
                placement="top"
                :show-after="300"
              >
                <MdiFormatHorizontalAlignRight
                  class="fix-icon"
                  @click="column.fixed = 'right'"
                />
              </el-tooltip>
            </template>
          </Row>
        </VueDraggable>
      </el-checkbox-group>

      <template #footer>
        <el-button @click="onReset"> 恢复默认值 </el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import {
  findFirstDuplicateElementInArray,
  type ElementType,
} from '@/utils/array'
import deepClone from '@/utils/deep-clone'
import { exportJSONToXlsx } from '@/utils/xlsx'
import {
  DownloadOutlined,
  SettingOutlined,
  SyncOutlined,
} from '@ant-design/icons-vue'
import { Rank } from '@element-plus/icons-vue'
import { useMagicKeys } from '@vueuse/core'
import type { ElTable } from 'element-plus'
import { VueDraggable } from 'vue-draggable-plus'
import MdiFormatHorizontalAlignLeft from '~icons/mdi/format-horizontal-align-left'
import MdiFormatHorizontalAlignRight from '~icons/mdi/format-horizontal-align-right'
import TableColumn from './TableColumn.vue'
import { type TableColumns } from './types'

const props = withDefaults(
  defineProps<{
    title?: string
    data: T[]
    columns: TableColumns<T>
    loading?: boolean
    onRefresh?: () => any
    withIndex?: boolean
    hideHeader?: boolean
  }>(),
  {
    loading: false,
    withIndex: false,
    hideHeader: false,
  },
)

const emit = defineEmits<{
  selectionChange: [T[]]
}>()

defineSlots<
  {
    _filter: any
    _operation: any
    _empty: any
    _pagination: any
  } & {
    [K in ElementType<TableColumns<T>>['prop']]: (props: {
      row: T
      value: any
    }) => any
  }
>()

const selectionRows = ref<T[]>([]) as Ref<T[]>

const drag = ref(false)
const _columns = ref([]) as Ref<TableColumns<T>>
watch(
  () => props.columns,
  (columns) => {
    _columns.value = deepClone(columns)
  },
  {
    deep: true,
    immediate: true,
  },
)

const columnProps = ref(props.columns.map((column) => column.prop)) as Ref<
  ElementType<TableColumns<T>>['prop'][]
>

watch(
  () => props.columns,
  (columns) => {
    columnProps.value = columns.map((column) => column.prop)
  },
  {
    deep: true,
  },
)

const _withIndex = ref(false)
watch(
  () => props.withIndex,
  (withIndex) => {
    _withIndex.value = withIndex
  },
  {
    immediate: true,
  },
)

const isShowSettingDrawer = ref(false)

const onReset = () => {
  _withIndex.value = props.withIndex
  _columns.value = deepClone(props.columns)
  columnProps.value = props.columns.map((column) => column.prop)
}

const slots = useSlots()
watchEffect(() => {
  const columnProps: ElementType<TableColumns<T>>['prop'][] = []
  for (const column of props.columns) {
    if (slots[column.prop as keyof typeof slots] && column.render) {
      throw new Error(
        `TableColumns 中 label = '${column.label}', prop = '${column.prop}' 的 column 同时拥有 render 或 slot 中超过两个，请只使用其中之一！`,
      )
    }

    columnProps.push(column.prop)
  }

  const firstDuplicateColumnProp = findFirstDuplicateElementInArray(columnProps)

  if (firstDuplicateColumnProp) {
    throw new Error(
      `Table 的 columns 中的 prop 不能有重复，这里 ${firstDuplicateColumnProp} 重复了！`,
    )
  }
})

const tableRef = ref<InstanceType<typeof ElTable>>()

// #region 批量勾选功能
const onTableSelectionChange = () => {
  selectionRows.value = tableRef.value!.getSelectionRows()
  emit('selectionChange', selectionRows.value)
}

const { shift } = useMagicKeys()
const isActive = ref(true)
onActivated(() => (isActive.value = true))
onDeactivated(() => (isActive.value = false))

const selectable = computed(() =>
  props.columns.some((column) => column.attrs?.type === 'selection'),
)

watch(shift, (shift) => {
  if (!isActive.value || !selectable.value) return

  if (shift) {
    // 如果按住 Shift 说明用户可能知晓批量勾选功能，将不做提示
    hasPromptedBatchSelectionMessage = true
  } else {
    startIndex = void 0
  }
})

let startIndex: number | undefined
const onTableSelect = (_: never, row: T) => {
  if (!shift.value) return

  if (startIndex !== void 0) {
    const currentIndex = props.data.indexOf(row)
    if (currentIndex === -1) return

    for (
      let index = Math.min(startIndex, currentIndex);
      index <= Math.max(startIndex, currentIndex);
      index++
    ) {
      const row = props.data[index]
      tableRef.value!.toggleRowSelection(row, true)
    }

    return
  }

  startIndex = props.data.indexOf(row)
}

let hasPromptedBatchSelectionMessage = false
watch(selectionRows, (newVal, oldVal) => {
  if (
    oldVal.length === 2 &&
    newVal.length === 3 &&
    !hasPromptedBatchSelectionMessage
  ) {
    ElMessage.warning('按住 Shift 可进行批量勾选')
    hasPromptedBatchSelectionMessage = true
  }
})
// #endregion

// #region 导出表格数据为 xlsx
const exportFormatDateXlsx = () => {
  const result: Record<string, string>[] = []

  for (const row of props.data) {
    const newRow: Record<string, string> = {}
    for (const key in row) {
      const value = row[key]

      if (typeof value === 'object' && !Array.isArray(value)) {
        for (const _key in value) {
          const column = props.columns.find(
            (column) => column.prop === `${key}@${_key}`,
          )
          if (column) {
            newRow[column.label] =
              column.exportOptions?.formatter?.(value[_key], row) ?? value[_key]
          } else {
            newRow[`${key}.${_key}`] = value[_key]
          }
        }
        continue
      }

      const column = props.columns.find((column) => column.prop === key)
      if (column) {
        newRow[column.label] =
          column.exportOptions?.formatter?.(value, row) ?? value
      } else {
        newRow[key] = value
      }
    }
    result.push(newRow)
  }

  exportJSONToXlsx(result, `${props.title ?? '无名表格'}_格式化数据`)
}

const exportRawDateXlsx = () => {
  exportJSONToXlsx(props.data, `${props.title ?? '无名表格'}_原始数据`)
}
// #endregion

defineExpose({
  tableInstance: tableRef,
})
</script>

<style lang="scss" scoped>
.sv-table {
  --header-color: #f6f6f6;

  display: flex;
  flex-direction: column;
  overflow-y: hidden;
}

:root.dark .sv-table {
  --header-color: #2d2d2d;
}

.filter {
  padding: 12px;
  margin-bottom: 12px;
  border: 1px solid $border-color-light;
  border-radius: $border-radius-2;
}

.header {
  flex-wrap: wrap;
  row-gap: 10px;
  margin-bottom: 8px;

  .title {
    @include text2;

    margin-right: 12px;
  }

  .operation {
    flex-wrap: wrap;
    row-gap: 10px;

    :deep(.el-button) {
      margin-right: 12px;
      margin-left: 0;
    }
  }

  .header-icon {
    padding: 8px;
    font-size: 17px;
    color: $text-color-1;
    cursor: pointer;

    &:hover {
      color: $color-primary;
    }

    &:active {
      color: var(--el-color-primary-dark-2);
    }
  }
}

.pagination {
  display: flex;
  justify-content: end;
  width: 100%;
  margin-top: $spacing-l;
}

.el-drawer .row {
  @include text2;

  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 35px;
}

.el-empty {
  padding: 22px 0 26px;

  :deep(.el-empty__description) {
    margin-top: 12px;
    line-height: normal;
  }
}

.drag-handle {
  margin-right: $spacing-s;
  color: $text-color-2;
  cursor: move;
}

.fix-icon {
  font-size: 1.25rem;
  color: $text-color-3;
  cursor: pointer;

  &:hover {
    color: $color-primary;
  }
}
</style>
