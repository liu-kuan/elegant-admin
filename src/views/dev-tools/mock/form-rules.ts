import { MockApi } from '@/types/mock'
import type { FormRules } from 'element-plus'

const formRules: FormRules<MockApi & { dataValid: boolean }> = {
  method: [
    {
      required: true,
      trigger: ['blur', 'change'],
    },
  ],
  delay: [
    {
      required: true,
      trigger: ['blur', 'change'],
    },
  ],
  url: [
    {
      required: true,
      message: '接口地址不能为空',
      trigger: ['blur', 'change'],
    },
  ],
  dataValid: [
    {
      required: true,
      validator(_, value: boolean, callback: (error?: Error) => void) {
        if (!value) {
          callback(new Error('响应体需要为正确的 JSON 格式'))
        } else {
          callback()
        }
      },
      trigger: ['blur', 'change'],
    },
  ],
}

export default formRules
