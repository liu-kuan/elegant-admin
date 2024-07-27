import useDevModeStore from '@/stores/dev-mode'
import { HomeFilled, Menu } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import MdiHelpCircle from '~icons/mdi/help-circle'
import RouteNames from './route-names'

/**
 * - path 路由路径
 * - name 路由名称，禁止使用硬编码，请将名称定义到 RouteNames 变量中
 * - component 路由组件
 * - children 子路由
 * - meta 自定义元数据
 * - meta.label: string 路由的标题，用于展示在菜单栏和面包屑
 * - meta.icon: Component 路由的图标，用于展示在菜单栏和面包屑
 * - meta.hide: boolean = false 表示该路由是否展示在菜单栏中
 */
export const routes: RouteRecordRaw[] = [
  {
    path: 'home',
    name: RouteNames.Home,
    component: () => import('@/views/home/index.vue'),
    meta: { label: '首页', icon: HomeFilled, static: true },
  },
  {
    path: 'components-demo',
    name: RouteNames.ComponentDemo,
    meta: { label: '组件', icon: Menu },
    children: [
      {
        path: 'base',
        name: RouteNames.ComponentDemo_Base,
        component: () => import('@/views/components-demo/base/index.vue'),
        meta: {
          label: '基础组件',
        },
      },
      {
        path: 'json-editor',
        name: RouteNames.ComponentDemo_JsonEditor,
        component: () => import('@/views/components-demo/JsonEditorDemo.vue'),
        meta: {
          label: 'JSON 编辑器',
        },
      },
    ],
  },
  {
    path: 'guidance',
    name: RouteNames.Guidance,
    component: () => import('@/views/guidance/index.vue'),
    meta: { label: '使用指南', icon: MdiHelpCircle },
  },
  // 以下页面不在侧边栏显示
  {
    path: 'split-screen',
    name: RouteNames.SplitScreen_Redirect,
    component: () => import('@/views/split-screen/redirect/index.vue'),
    meta: { hide: true },
  },
]

// 测试环境给一个页面用于测试
if (import.meta.env.DEV) {
  // routes.push({
  //   path: 'dev-tools',
  //   name: RouteNames.DevTools,
  //   meta: { label: '开发者工具', icon: MdiTools },
  //   children: [
  //     {
  //       path: 'mock',
  //       name: RouteNames.DevTools_Mock,
  //       component: () => import('@/views/dev-tools/mock/index.vue'),
  //       meta: {
  //         label: '模拟接口管理',
  //       },
  //     },
  //     {
  //       path: 'playground',
  //       name: RouteNames.DevTools_Playground,
  //       component: () => import('@/views/dev-tools/playground/index.vue'),
  //       meta: {
  //         label: '试验场',
  //       },
  //     },
  //   ],
  // })
}

// 通过一定规则匹配路由
export const filterRoutes = (
  routes: RouteRecordRaw[],
  cb: (route: RouteRecordRaw) => boolean,
) => {
  const result: RouteRecordRaw[] = []

  for (const route of routes) {
    const _route = { ...route }
    if (_route.children?.length) {
      _route.children = filterRoutes(_route.children, cb)
      if (_route.children.length) {
        result.push(_route)
      }
    } else {
      if (cb(route)) {
        result.push(_route)
      }
    }
  }

  return result
}

export const getMenuRoutes = () => {
  const { devMode, showDevTools } = storeToRefs(useDevModeStore())

  return filterRoutes(routes, (route) => {
    if (route.meta!.hide) {
      return false
    }

    if (
      (route.name as string).includes(RouteNames.DevTools) &&
      (!devMode.value || !showDevTools.value)
    ) {
      return false
    }

    return true
  })
}
