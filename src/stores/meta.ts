import { ids } from '@/config/pinia'
import usePreferenceStore from '@/stores/preference'
import type { RequestError } from '@/types/bug-log'
import type { SplitScreenInfo } from '@/types/split-screen'
import { defineStore } from 'pinia'
import type { RouteLocationRaw } from 'vue-router'

export default defineStore(
  ids.meta,
  () => {
    const { maxRequestErrorCount } = storeToRefs(usePreferenceStore())

    // layout
    const keepAliveTabs = ref<string[]>([])

    // 分屏
    const splitScreenList = ref<SplitScreenInfo[]>([])

    const redirectRoute = ref<RouteLocationRaw>()

    // 异常处理
    const requestErrors = ref<RequestError[]>([])
    const addBugLog = (bug: RequestError) => {
      requestErrors.value.unshift(bug)

      if (requestErrors.value.length > maxRequestErrorCount.value) {
        requestErrors.value.splice(maxRequestErrorCount.value)
      }
    }

    return {
      keepAliveTabs,
      splitScreenList,
      redirectRoute,
      requestErrors,
      addBugLog,
    }
  },
  {
    persist: true,
  },
)
