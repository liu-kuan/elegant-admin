import { ids } from '@/config/pinia'
import type { Theme } from '@/types/theme'
import { defineStore } from 'pinia'

export default defineStore(
  ids.perference,
  () => {
    // 系统设置
    const maxConcurrentRequestCount = ref(5)
    const requestTimeout = ref(5)
    const maxCachePageCount = ref(8)
    const maxRequestErrorCount = ref(10)

    // 样式设置
    const theme = ref<Theme>('auto')
    const isMenuCollapse = ref(false)
    const asideMenuUniqueOpened = ref(false)
    const pageTransitionAnimation = ref(true)

    return {
      isMenuCollapse,
      maxConcurrentRequestCount,
      requestTimeout,
      maxCachePageCount,
      maxRequestErrorCount,
      theme,
      asideMenuUniqueOpened,
      pageTransitionAnimation,
    }
  },
  {
    persist: true,
  },
)
