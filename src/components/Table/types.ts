import type { JSX } from 'vue/jsx-runtime'

interface ExportOptions {
  hidden: boolean // 表示导出时当前列是否隐藏
  formatter?: (value: any, row: any) => string // 表示导出时当前列的数据格式化函数
}

/**
 * slot 和 render 不能同时存在
 */
export type TableColumns<T extends Record<string, any>> = {
  prop:
    | (keyof T & string)
    | `${keyof T & string}@${string}`
    | `custom:${string}`
    | '_selection'
  label: string
  width?: string | number
  minWidth?: string | number
  maxWidth?: string | number
  fixed?: 'left' | 'right'
  tip?: string
  tipWidth?: string | number
  exportOptions?: ExportOptions
  /**
   * ！！！在模版中使用自动导入的组件会自动导入 css 样式，但写在 tsx 中不会自动导入，因此为了避免该问题，
   * render 中别使用自动导入的组件
   */
  render?: (value: any, row: T) => JSX.Element | string

  /**
   * el-table-column 的其他属性，将会通过 v-bind 绑定到 el-table-column 上
   * 例如 attrs: {
   *   reserveSelection: true,
   * }
   */
  attrs?: Record<string, any>

  // 多级表头可使用 children
  children?: TableColumns<T>
}[]
