import useMetaStore from '@/stores/meta'
import useUserStore from '@/stores/user'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { storeToRefs } from 'pinia'
import router from './index'
import RouteNames from './route-names'

NProgress.configure({
  showSpinner: false,
  easing: 'ease',
  minimum: 0.3,
})

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  const { token } = storeToRefs(useUserStore())

  // 没有登录信息时，所有非登录页面都重定向登录页面
  if (!token.value && to.name !== RouteNames.Login) {
    const { redirectRoute } = storeToRefs(useMetaStore())
    redirectRoute.value = to

    next({ name: RouteNames.Login })
    return
  }

  // 错误处理页面
  if (/^\/error/.test(to.path)) {
    next()
    return
  }

  if (token.value) {
    // 当登录成功时，如果跳到登录页面则重定向到首页
    if (to.name === RouteNames.Login) {
      next({ name: RouteNames.Home })
      return
    }
  }

  next()
})

router.afterEach(() => {
  NProgress.done()
})

router.onError(() => {
  NProgress.done()
})
