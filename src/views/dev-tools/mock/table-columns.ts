import type { SVTableColumns } from '@/components/Table/types'
import type { MockApi } from '@/types/mock'

export default [
  {
    prop: 'custom:sort',
    label: '排序',
    width: 82,
    fixed: 'left',
    attrs: {
      align: 'center',
    },
  },
  {
    prop: 'name',
    label: '名称',
    minWidth: 200,
    fixed: 'left',
    formatter: (value, row) => {
      if (value) return value

      return row.url.split('/').slice(-3).join('/')
    },
  },
  {
    prop: 'method',
    label: '请求方法',
    minWidth: 100,
    formatter: (value) => (value === 'ALL' ? '所有' : value),
  },
  {
    prop: 'url',
    label: '接口地址',
    minWidth: 300,
  },
  {
    prop: 'delay',
    label: '网络延时',
    minWidth: 120,
    formatter: (value) => `${value} 毫秒`,
  },
  {
    prop: 'responseBody',
    label: '响应体',
    minWidth: 400,
  },
  {
    prop: 'active',
    label: '是否启用',
    width: 100,
    fixed: 'right',
    attrs: {
      align: 'center',
    },
  },
  {
    prop: 'custom:operation',
    label: '操作',
    width: 180,
    fixed: 'right',
    attrs: {
      align: 'center',
    },
  },
] satisfies SVTableColumns<MockApi>
