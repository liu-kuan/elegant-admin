import { BuildOptions } from 'vite'

const buildOptions: BuildOptions = {
  sourcemap: true,
  rollupOptions: {
    output: {
      manualChunks(id) {
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
