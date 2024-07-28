import type { JSX } from 'vue/jsx-runtime'

/**
 * slot 和 render 不能同时存在
 */
export type SVTableColumns<T extends Record<string, any>> = {
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
  formatter?: (value: any, row: T) => string
  /**
   * ！！！在模版中使用自动导入的组件会自动导入 css 样式，但写在 tsx 中不会自动导入，因此为了避免该问题，
   * render 中别使用自动导入的组件
   */
  render?: (value: any, row: T) => JSX.Element

  /**
   * el-table-column 的其他属性，将会通过 v-bind 绑定到 el-table-column 上
   * 例如 attrs: {
   *   reserveSelection: true,
   * }
   */
  attrs?: Record<string, any>

  // 多级表头可使用 children
  children?: SVTableColumns<T>
}[]
