<template>
  <div
    class="sv-table"
    :class="{
      boxed,
    }"
  >
    <div class="filter" v-if="$slots._filter">
      <slot name="_filter"></slot>
    </div>

    <EleRow class="header" v-if="!tableOnly">
      <LongTextEllipsis
        :content="title"
        :max-line="1"
        type="tooltip"
        class="title"
        v-if="title"
      />

      <EleRow class="operation" v-if="$slots._operation">
        <slot name="_operation"></slot>
      </EleRow>

      <EleSpacer />

      <EleRow>
        <AutoRefresh
          v-if="_autoRefresh.exist && refresh"
          ref="autoRefreshRef"
          :duration="_autoRefresh.duration"
          :cb="refresh"
          style="margin-right: 10px"
        />

        <SyncOutlined
          v-if="refresh"
          class="header-icon"
          @click="refresh"
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

        <el-dropdown trigger="click">
          <FontSizeOutlined class="header-icon" />
          <template #dropdown>
            <el-dropdown-menu>
              <SVDropdownItem
                v-for="item of fontSizeArr"
                :key="item.value"
                @click="fontSize = item.value"
                :active="fontSize === item.value"
                >{{ item.label }}</SVDropdownItem
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
      </EleRow>
    </EleRow>

    <el-table
      :data="data"
      :header-cell-style="{
        backgroundColor: 'var(--header-color)',
        userSelect: 'initial',
      }"
      v-loading="loading"
      :size="fontSize"
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
          <EleRow v-for="column of _columns" :key="column.prop">
            <el-icon :size="18" class="drag-handle">
              <Rank />
            </el-icon>

            <el-checkbox :value="column.prop" :label="column.label" />

            <EleSpacer />

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
          </EleRow>
        </VueDraggable>
      </el-checkbox-group>

      <template v-if="refresh">
        <el-divider>定时刷新</el-divider>
        <div class="row">
          定时刷新
          <el-switch
            v-model="_autoRefresh.exist"
            active-text="开"
            inactive-text="关"
            inline-prompt
          ></el-switch>
        </div>

        <div class="row">
          设置时长

          <el-radio-group
            v-model="_autoRefresh.duration"
            size="small"
            @change="autoRefreshRef?.reset"
            :disabled="!_autoRefresh.exist"
          >
            <el-radio-button :value="30">30 秒</el-radio-button>
            <el-radio-button :value="60">60 秒</el-radio-button>
            <el-radio-button :value="120">120 秒</el-radio-button>
          </el-radio-group>
        </div>
      </template>

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
  FontSizeOutlined,
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
import { type SVTableColumns } from './types'

defineOptions({
  name: 'SVTable',
})

const props = withDefaults(
  defineProps<{
    title?: string
    data: T[]
    columns: SVTableColumns<T>
    loading?: boolean
    refresh?: () => any
    withIndex?: boolean

    /**
     * 填数字代表自动刷新间隔时间
     * 传 false 代表不使用自动刷新功能
     */
    autoRefresh?: number | false
    tableOnly?: boolean
    boxed?: boolean
  }>(),
  {
    loading: false,
    withIndex: false,
    autoRefresh: 120,
    tableOnly: false,
    boxed: false,
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
    [K in ElementType<SVTableColumns<T>>['prop']]: (props: {
      row: T
      value: any
    }) => any
  }
>()

const selectionRows = ref<T[]>([]) as Ref<T[]>

const drag = ref(false)
const _columns = ref([]) as Ref<SVTableColumns<T>>
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
  ElementType<SVTableColumns<T>>['prop'][]
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

const _autoRefresh = reactive({
  exist: true,
  duration: 60,
})

const initAutoRefresh = () => {
  _autoRefresh.exist = props.autoRefresh !== false
  _autoRefresh.duration = props.autoRefresh || 60
}

watch(() => props.autoRefresh, initAutoRefresh, {
  immediate: true,
})

const fontSizeArr: { value: 'large' | 'default' | 'small'; label: string }[] = [
  { value: 'large', label: '大' },
  { value: 'default', label: '中' },
  { value: 'small', label: '小' },
]
const fontSize = ref<'large' | 'default' | 'small'>('default')

const isShowSettingDrawer = ref(false)

const onReset = () => {
  _withIndex.value = props.withIndex
  _columns.value = deepClone(props.columns)
  columnProps.value = props.columns.map((column) => column.prop)
  initAutoRefresh()
}

const autoRefreshRef = ref<InstanceType<typeof AutoRefresh>>()

if (_autoRefresh.exist) {
  watch(
    () => props.loading,
    (loading) => {
      if (!loading) {
        autoRefreshRef.value?.reset()
      }
    },
  )
}

const slots = useSlots()
watchEffect(() => {
  const columnProps: ElementType<SVTableColumns<T>>['prop'][] = []
  for (const column of props.columns) {
    if (
      slots[column.prop as keyof typeof slots] &&
      column.render &&
      column.formatter
    ) {
      throw new Error(
        `SVTableColumns 中 label = '${column.label}', prop = '${column.prop}' 的 column 同时拥有 render 或 slot 或 formatter 中超过两个，请只使用其中之一！`,
      )
    }

    columnProps.push(column.prop)
  }

  const firstDuplicateColumnProp = findFirstDuplicateElementInArray(columnProps)

  if (firstDuplicateColumnProp) {
    throw new Error(
      `SVTable 的 columns 中的 prop 不能有重复，这里 ${firstDuplicateColumnProp} 重复了！`,
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
              column.formatter?.(row, value[_key]) ?? value[_key]
          } else {
            newRow[`${key}.${_key}`] = value[_key]
          }
        }
        continue
      }

      const column = props.columns.find((column) => column.prop === key)
      if (column) {
        newRow[column.label] = column.formatter?.(row, value) ?? value
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

  &.boxed {
    padding: $spacing-s $spacing-m $spacing-m $spacing-m;
    border: 1px solid $border-color-light;
    border-radius: $border-radius-2;
  }
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
