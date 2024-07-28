<template>
  <el-table-column
    :label="column.label"
    :width="column.width"
    :min-width="column.minWidth"
    :fixed="column.fixed"
    v-bind="column.attrs"
  >
    <template v-if="column.children?.length">
      <TableColumn
        v-for="subColumn of column.children"
        :key="subColumn.prop"
        :column="subColumn"
        :data-length
        :slots
      />
    </template>

    <!-- TODO 这里不加 v-if 的话会在首次打开时重复渲染里面的内容，后续看看原因 -->
    <template
      v-if="dataLength && !column.attrs?.type && !column.children?.length"
      #default="{ row }: { row: T }"
    >
      <component
        v-if="column.render"
        :is="column.render(getPropValue(row, column.prop), row)"
      />

      <!-- TODO 这里不加 Object.keys(row).length 会导致每次都多渲染一次，并且 row 为空对象：{} -->
      <component
        v-else-if="slots?.[column.prop] && Object.keys(row).length"
        :is="slots[column.prop]"
        :row="row"
        :value="getPropValue(row, column.prop)"
      />

      <LongTextEllipsis
        v-else
        :content="
          column.formatter?.(getPropValue(row, column.prop), row) ??
          getPropValue(row, column.prop) ??
          ''
        "
        :max-line="5"
      />
    </template>

    <template #header v-if="column.tip">
      <Row>
        {{ column.label }}
        <el-popover :width="column.tipWidth" placement="top">
          <div class="text-3.25">
            <slot name="tip"></slot>
            {{ column.tip }}
          </div>

          <template #reference>
            <div>
              <MdiInformation class="info" />
            </div>
          </template>
        </el-popover>
      </Row>
    </template>
  </el-table-column>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import type { ElementType } from '@/utils/array'
import deepClone from '@/utils/deep-clone'
import MdiInformation from '~icons/mdi/information'
import type { SVTableColumns } from './types'

defineProps<{
  column: ElementType<SVTableColumns<T>>
  dataLength?: number
  slots?: any
}>()

const getPropValue = (obj: T, prop: string): any => {
  const properties = prop.split('@')

  let result = deepClone(obj)

  for (const p of properties) {
    if (!result || !Object.prototype.hasOwnProperty.call(result, p)) {
      return void 0
    }

    result = result[p]
  }

  return result
}
</script>

<style lang="scss" scoped>
.info {
  margin-left: 4px;
  color: $text-color-4;
  cursor: pointer;

  &:hover {
    color: $color-primary;
  }
}
</style>
