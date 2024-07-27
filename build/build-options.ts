import { BuildOptions } from 'vite'

const buildOptions: BuildOptions = {
  sourcemap: true,
  rollupOptions: {
    output: {
      manualChunks(id) {
        // #region 给异步路由 chunk 命名
        // if (id.includes('/src/views/login')) {
        //   return 'login'
        // }
        // if (id.includes('/src/layout')) {
        //   return 'layout'
        // }
        // if (id.includes('/src/views/home')) {
        //   return 'views@home'
        // }
        // if (id.includes('/src/views/software')) {
        //   return 'views@software'
        // }
        // if (id.includes('/src/views/requirements')) {
        //   return 'views@requirements'
        // }
        // if (id.includes('/src/views/device')) {
        //   return 'views@device'
        // }
        // if (id.includes('/src/views/community')) {
        //   return 'views@community'
        // }
        // if (id.includes('/src/views/data-visualization')) {
        //   return 'views@data-visualization'
        // }
        // if (id.includes('/src/views/internal-web')) {
        //   return 'views@internal-web'
        // }
        // if (id.includes('/src/views/super-user')) {
        //   return 'views@super-user'
        // }
        // if (id.includes('/src/views/mine')) {
        //   return 'views@mine'
        // }
        // if (id.includes('/src/views/settings')) {
        //   return 'views@settings'
        // }
        // if (id.includes('/src/views/guidance')) {
        //   return 'views@guidance'
        // }
        // if (id.includes('/src/views/test')) {
        //   return 'views@test'
        // }
        // if (id.includes('/src/views/error')) {
        //   return 'views@error'
        // }
        // #endregion

        if (
          id.includes('@element-plus/icons-vue') ||
          id.includes('@ant-design/icons-vue')
        ) {
          return 'node_modules@icons-vue'
        }
        if (id.includes('element-plus')) {
          return 'node_modules@element-plus'
        }
        if (/(echarts|echarts-gl|vue-echarts)/.test(id)) {
          return 'node_modules@echarts'
        }
        if (id.includes('chance')) {
          return 'node_modules@chance'
        }
        if (id.includes('node_modules')) {
          return 'node_modules@others'
        }
      },
    },
  },
}

export default buildOptions
