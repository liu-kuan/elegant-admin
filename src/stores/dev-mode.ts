import { ids } from '@/config/pinia'
import { defineStore } from 'pinia'

export default defineStore(
  ids.devMode,
  () => {
    // 展示开发者工具页面

    const elementOutlineVisible = ref(false)

    return {
      elementOutlineVisible,
    }
  },
  {
    persist: true,
  },
)
