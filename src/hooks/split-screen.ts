import RouteNames from '@/router/route-names'
import useMetaStore from '@/stores/meta'

export const useRegisterSplitScreenRoute = () => {
  const router = useRouter()
  const { splitScreenList } = storeToRefs(useMetaStore())

  for (const ssInfo of splitScreenList.value) {
    router.addRoute(RouteNames.Layout, {
      path: '/split-screen',
      name: `${RouteNames.SplitScreen}_${ssInfo.id}`,
      component: () =>
        import('@/views/split-screen/page/index.vue').then((component) => ({
          ...component.default,
          name: `${RouteNames.SplitScreen}_${ssInfo.id}`,
        })),
    })
  }
}
