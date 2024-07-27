import type { SVTableColumns } from '@/components/EleTable/types'
import { AppOsType, type AppConfig } from '@/types/software/app-config'
import { formatTime } from '@/utils/time'

const tableColumns: SVTableColumns<AppConfig> = [
  {
    prop: 'appOsType',
    label: '操作系统',
    minWidth: 100,
    formatter: (value) => AppOsType.getString(value),
  },
  {
    prop: 'appChannel',
    label: '应用下载渠道',
    minWidth: 130,
  },
  {
    prop: 'versionCode',
    label: '版本号',
    minWidth: 130,
  },
  {
    prop: 'versionName',
    label: '版本名称',
    minWidth: 130,
  },
  {
    prop: 'releaseNotes',
    label: '更新内容',
    minWidth: 160,
  },
  {
    prop: 'downloadUrl',
    label: '下载地址',
    minWidth: 180,
  },
  {
    prop: 'enable',
    label: '启用标记',
    minWidth: 90,
  },
  {
    prop: 'releaseTime',
    label: '发布时间',
    minWidth: 180,
    formatter: (value) => formatTime(value),
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
]

export default tableColumns
