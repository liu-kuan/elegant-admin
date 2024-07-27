import { ids } from '@/config/pinia'
import type { MockApi } from '@/types/mock'
import { defineStore } from 'pinia'

export default defineStore(
  ids.devMode,
  () => {
    // 展示开发者工具页面
    const devMode = ref(true)

    const mockApiList = ref<MockApi[]>([
      {
        name: '模拟接口例子（可删）',
        url: 'http://example/xxxx/xxxx',
        method: 'POST',
        delay: 200,
        active: true,
        responseBody: {
          code: 200,
          data: {
            items: [
              {
                id: 1,
                name: 'item1',
              },
              {
                id: 2,
                name: 'item2',
              },
            ],
            totalCount: 2,
          },
          err_msg: 'success',
        },
      },
    ])

    const showDevTools = ref(true)
    const elementOutlineVisible = ref(false)

    return {
      devMode,
      mockApiList,
      showDevTools,
      elementOutlineVisible,
    }
  },
  {
    persist: true,
  },
)
