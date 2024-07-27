import type { AppConfig } from '@/types/software/app-config'
import type { FormRules } from 'element-plus'

const rules: FormRules<AppConfig> = {
  appOsType: [
    {
      required: true,
      message: '操作系统不能为空',
      trigger: ['blur', 'change'],
    },
  ],
  appChannel: [
    {
      required: true,
      message: '下载渠道不能为空',
      trigger: ['blur', 'change'],
    },
  ],
  versionCode: [
    {
      required: true,
      message: '版本号不能为空',
      trigger: ['blur', 'change'],
    },
    {
      validator(_, value: string, callback: (error?: Error) => void) {
        if (isNaN(Number(value))) {
          callback(new Error('版本号需要为数字'))
        } else {
          callback()
        }
      },
      trigger: ['blur', 'change'],
    },
  ],
  checksumMd5: [
    {
      required: true,
      message: '发布包 md5 不能为空',
      trigger: ['blur', 'change'],
    },
  ],
  downloadUrl: [
    {
      required: true,
      message: '下载 URL 不能为空',
      trigger: ['blur', 'change'],
    },
  ],
  enable: [
    {
      required: true,
      message: '启用标记不能为空',
      trigger: ['blur', 'change'],
    },
  ],
}

export default rules
