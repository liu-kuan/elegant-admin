import { createRouter, createWebHistory } from 'vue-router'
import RouteNames from './route-names'
import { routes } from './routes'

// 写在这里的路由是不会展示在菜单栏的页面
const router = createRouter({
  history: createWebHistory('/app/admin/'),
  routes: [
    {
      path: '/login',
      name: RouteNames.Login,
      component: () => import('@/views/login/index.vue'),
      meta: { label: '登录' },
    },
    {
      path: '/',
      redirect: { name: RouteNames.Home },
      name: RouteNames.Layout,
      component: () => import('@/layout/index.vue'),
      children: [
        ...routes,
        {
          path: 'error',
          name: RouteNames.Error,
          children: [
            {
              path: '403',
              name: RouteNames.Error403,
              component: () => import('@/views/error/403.vue'),
              meta: { label: '403' },
            },
            {
              path: '404',
              name: RouteNames.Error404,
              component: () => import('@/views/error/404.vue'),
              meta: { label: '404' },
            },
          ],
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/error/404',
    },
  ],
})

export default router
