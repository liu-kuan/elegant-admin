import router from '@/router'
import useMetaStore from '@/stores/meta'
import usePreferenceStore from '@/stores/preference'
import useUserStore from '@/stores/user'
import { RequestError } from '@/types/bug-log'
import { CodeError, ErrorCodes } from '@/types/code-error'
import axios from 'axios'

const controller = new AbortController()

const request = axios.create({
  timeoutErrorMessage: '请求超时，请检查网络后重试~',
  baseURL: import.meta.env.VITE_BASE_URL,
  signal: controller.signal,
})

request.interceptors.request.use((config) => {
  const { token } = useUserStore()
  const { requestTimeout } = usePreferenceStore()

  if (config.timeout === void 0 || config.timeout < requestTimeout * 1000) {
    config.timeout = requestTimeout * 1000
  }

  if (token) {
    // 给请求头添加 token
    config.headers.Authorization = token
  }

  return config
})

let activeRequests = 0
const requestQueue: Array<() => void> = []
request.interceptors.request.use((config) => {
  return new Promise((resolve) => {
    const { maxConcurrentRequestCount } = usePreferenceStore()

    if (activeRequests < maxConcurrentRequestCount) {
      activeRequests++
      resolve(config)
    } else {
      requestQueue.push(() => {
        activeRequests++
        resolve(config)
      })
    }
  })
})

const decreaseActiveRequests = () => {
  activeRequests--

  if (requestQueue.length > 0) {
    const nextRequest = requestQueue.shift()
    nextRequest!()
  }
}
request.interceptors.response.use(
  (response) => {
    decreaseActiveRequests()
    return response
  },
  (error) => {
    decreaseActiveRequests()
    throw error
  },
)

request.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { addBugLog } = useMetaStore()
    addBugLog(new RequestError('network', error, Date.now()))

    throw error
  },
)

request.interceptors.response.use(
  (response) => {
    const { loginOut } = useUserStore()

    const { redirectRoute } = storeToRefs(useMetaStore())

    const token = response.headers.authorization
    if (token) {
      useUserStore().token = token
    }

    const { data } = response

    if (data.code === 0) {
      return data.data
    }

    if (data.code === ErrorCodes.TokenInvalid) {
      redirectRoute.value = router.currentRoute.value
      loginOut()
      throw new Error('当前 Token 已过期，请重新登陆！')
    }

    const { addBugLog } = useMetaStore()
    addBugLog(new RequestError('api', response, Date.now()))

    throw new CodeError(data.code, data.err_msg)
  },
  (error) => {
    // Sentry.captureException(error)
    throw error
  },
)

export default request
