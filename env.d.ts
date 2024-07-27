/// <reference types="vite/client" />
/// <reference types="element-plus/global.d.ts" />

// 解决 unplugin-icons 导入 icons 的时候报 ts 错误
declare module '~icons/*'

// echarts-gl 暂无 TS 版本，这里声明了已解决报错问题
declare module 'echarts-gl/*'
