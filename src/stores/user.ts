import { getLocalStorageKeysById, ids } from '@/config/pinia'
import router from '@/router'
import { User } from '@/types/user'
import { defineStore } from 'pinia'

export default defineStore(
  ids.user,
  () => {
    // 用户信息
    const info = ref(new User())

    // token
    const token = ref<string | null>(null)

    const loginOut = () => {
      localStorage.removeItem(getLocalStorageKeysById(ids.user))

      ElNotification.success('您已成功退出登录')

      router.go(0)
    }

    return {
      info,
      token,
      loginOut,
    }
  },
  {
    persist: true,
  },
)
