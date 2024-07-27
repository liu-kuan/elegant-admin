export {}

declare module 'vue' {
  export interface ComponentCustomProperties {
    // 由于指令不是使用 unplugin-vue 插件自动引入的，而是手动全局引入的，所以没有自动声明全局类型
    // 这里手动添加指令的类型声明
    vCenter: typeof import('./src/directives/center').default
    vResizeOb: typeof import('./src/directives/resize-ob').default
    vFocus: typeof import('./src/directives/focus').default
  }
}
