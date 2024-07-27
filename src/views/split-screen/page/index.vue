<template>
  <div class="split-screen-page">
    <Splitpanes v-if="ssInfo" :horizontal="ssInfo.isHorizontal">
      <Pane min-size="20">
        <div class="page-outer">
          <div class="page-inner" v-if="isShowFirstComponent">
            <component :is="firstComponent" />
          </div>
        </div>
      </Pane>

      <Pane min-size="20">
        <div class="page-outer">
          <div class="page-inner" v-if="isShowSecondComponent">
            <component :is="secondComponent" />
          </div>
        </div>
      </Pane>
    </Splitpanes>
  </div>
</template>

<script setup lang="ts">
import useMetaStore from '@/stores/meta'
import type { SplitScreenInfo } from '@/types/split-screen'
import { Pane, Splitpanes } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import type { RouteRecordRaw } from 'vue-router'

const { id } = useRoute().query as {
  id: string
}
const { splitScreenList } = storeToRefs(useMetaStore())
const ssInfo = computed<SplitScreenInfo | undefined>(() => {
  return splitScreenList.value.find((ssInfo) => ssInfo.id === id)
})

watch(
  () => ssInfo.value?.pages[0],
  (value) => {
    if (value) {
      initFirstPage()
    }
  },
)

watch(
  () => ssInfo.value?.pages[1],
  (value) => {
    if (value) {
      initSecondPage()
    }
  },
)

const router = useRouter()

type RawRouteComponent = () => Promise<{
  default: Component
}>
const getRowRouteComponentByRouteName = async (
  routes: readonly RouteRecordRaw[],
  name: string,
): Promise<RawRouteComponent | null | undefined> => {
  for (const route of routes) {
    if (route.name === name) {
      return route.component as RawRouteComponent | null | undefined
    }

    if (route.children?.length) {
      const childComponent = await getRowRouteComponentByRouteName(
        route.children,
        name,
      )

      if (childComponent) {
        return childComponent
      }
    }
  }

  return null
}

const { routes } = router.options
const getComponentByRouteName = async (name: string) => {
  const rowRouteComponent = await getRowRouteComponentByRouteName(routes, name)
  if (!rowRouteComponent) return

  return (await rowRouteComponent()).default
}

let firstComponent: Component | undefined = void 0
let secondComponent: Component | undefined = void 0
const isShowFirstComponent = ref(false)
const isShowSecondComponent = ref(false)
const initFirstPage = async () => {
  isShowFirstComponent.value = false

  try {
    firstComponent = await getComponentByRouteName(ssInfo.value!.pages[0])
    nextTick(() => {
      isShowFirstComponent.value = true
    })
  } catch (error) {
    ElMessage.error('获取第一页失败')
  }
}
const initSecondPage = async () => {
  isShowSecondComponent.value = false

  try {
    secondComponent = await getComponentByRouteName(ssInfo.value!.pages[1])
    nextTick(() => {
      isShowSecondComponent.value = true
    })
  } catch (error) {
    ElMessage.error('获取第二页失败')
  }
}
onMounted(() => {
  if (!ssInfo.value) {
    ElMessage.error('未找到该分屏')
    return
  }

  initFirstPage()
  initSecondPage()
})
</script>

<style lang="scss" scoped>
.split-screen-page {
  width: 100%;
  height: 100%;
}

:deep(.splitpanes__splitter) {
  position: relative;
  width: v-bind('ssInfo?.isHorizontal ? "" : "12px"');
  height: v-bind('ssInfo?.isHorizontal ? "12px" : ""');

  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    width: v-bind('ssInfo?.isHorizontal ? "66px" : "5px"');
    height: v-bind('ssInfo?.isHorizontal ? "5px" : "66px"');
    content: '';
    background-color: $border-color-dark;
    border-radius: 3px;
    transition: all 0.3s;
    transform: translate(-50%, -50%);
  }

  &:hover::after {
    width: v-bind('ssInfo?.isHorizontal ? "68px" : "5px"');
    height: v-bind('ssInfo?.isHorizontal ? "5px" : "68px"');
    background-color: $color-primary;
  }
}

.page-outer {
  box-sizing: border-box;
  height: 100%;
  overflow: hidden;
  border: 1px solid $border-color;
  border-radius: $border-radius-3;

  .page-inner {
    box-sizing: border-box;
    height: 100%;
    padding: $card-spacing;
    overflow: auto;
  }
}
</style>
