import '@/styles/init.scss'
import App from './App.vue'

// 引入状态管理 pinia
import { createPinia } from 'pinia'
// pinia 数据持久化
import { getLocalStorageKeysById } from '@/config/pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

// 引入路由
import router from '@/router'
import '@/router/guard'

// 自定义指令
import { registerDirectives } from '@/directives'

// Element Plus 暗黑模式样式表
import 'element-plus/theme-chalk/dark/css-vars.css'

// UnoCSS
import 'virtual:uno.css'

// Mock
// import '@/mock'

import { useTheme } from '@/hooks/theme'
import * as Sentry from '@sentry/vue'

const app = createApp(App)
const pinia = createPinia()
pinia.use(
  createPersistedState({
    key: getLocalStorageKeysById,
  }),
)
app.use(pinia)
app.use(router)
registerDirectives(app)

if (!import.meta.env.DEV) {
  // 接入 Sentry 监控系统
  // 账号: liukuan@sailvan.com
  // 密码: rg!iQ!Z26mUtBAm
  Sentry.init({
    app,
    dsn: 'https://dc56ec33ed870a05d9d74a4200ed55dd@o4506023782711296.ingest.sentry.io/4506103149363200',
    integrations: [
      new Sentry.BrowserTracing({
        // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
        tracePropagationTargets: [
          'localhost',
          /^https:\/\/yourserver\.io\/api/,
        ],
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      }),
      new Sentry.Replay(),
    ],
    environment: import.meta.env.MODE,
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of the transactions
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  })
}

app.mount('#app')

// 响应主题变化
useTheme()
