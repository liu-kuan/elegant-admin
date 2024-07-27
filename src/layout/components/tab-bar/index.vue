<template>
  <div class="tab-bar">
    <div
      class="shadow-container"
      :class="{
        'scroll-left': arrivedState.left,
        'scroll-right': arrivedState.right,
      }"
    ></div>

    <div class="scroll-container" ref="tabBarRef">
      <EleRow>
        <Tab
          class="tab"
          v-for="(tab, index) in tabs"
          :key="index"
          @contextmenu.prevent="onRightClicked(index, $event)"
          :closable="tab.name !== RouteNames.Home"
          @click="onTabClick(tab)"
          @close="onClose(index)"
          :active="route.name === tab.name"
        >
          {{
            (tab.name as string).includes(RouteNames.SplitScreen)
              ? getSplitScreenPageLabelByRouteName(tab.name as string)
              : tab.meta.label
          }}
        </Tab>
      </EleRow>

      <Transition>
        <ul
          v-if="menuInfo.isShow"
          :style="{ left: `${menuInfo.left}px`, top: `${menuInfo.top}px` }"
        >
          <li
            @click="onClose(selectedTabIndex)"
            v-show="selectedTabIndex !== 0"
          >
            关闭
          </li>
          <li @click="closeOthersTabs">关闭其他</li>
          <li @click="closeAllTabs" v-if="selectedTabIndex !== 0">关闭所有</li>
        </ul>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import useHotKey from '@/hooks/use-hot-key'
import RouteNames from '@/router/route-names'
import useMetaStore from '@/stores/meta'
import { getSplitScreenPageLabelByRouteName } from '@/utils/split-screen'
import { useEventListener, useScroll } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { type RouteLocationNormalizedLoaded } from 'vue-router'
import Tab from './Tab.vue'

const route = useRoute()
const router = useRouter()

const homeRoute = router.resolve({ name: RouteNames.Home })
const tabs: RouteLocationNormalizedLoaded[] = reactive([homeRoute])
const { keepAliveTabs } = storeToRefs(useMetaStore())

// #region 基础功能
watch(
  route,
  () => {
    if (
      tabs.every((item) => item.name !== route.name) &&
      !/^\/error/.test(route.path) &&
      route.name !== RouteNames.SplitScreen_Redirect
    ) {
      tabs.push({ ...route })
    }

    // MARK 这里是因为 scrollIntoView 在 behavior 为 smooth 时，别处有 dom 更新会导致 scroll 被打断
    nextTick(() => {
      const currentTab = document.querySelector('.tab.active')

      currentTab?.scrollIntoView({
        inline: 'center',
      })
    })
  },
  { immediate: true },
)

watch(tabs, (value) => {
  keepAliveTabs.value = value.map((tab) => tab.name as string)
})
const { splitScreenList } = storeToRefs(useMetaStore())
watch(splitScreenList, (splitScreenList) => {
  for (const [index, tab] of tabs.entries()) {
    const tabName = tab.name as string

    if (!tabName.includes(RouteNames.SplitScreen)) continue

    if (
      !splitScreenList
        .map((ssInfo) => `${RouteNames.SplitScreen}_${ssInfo.id}`)
        .includes(tabName)
    ) {
      onClose(index)
    }
  }
})

const onTabClick = (tab: RouteLocationNormalizedLoaded) => {
  if (tab.name !== route.name) {
    router.replace(tab)
  }
}

const onClose = (index: number) => {
  if (tabs[index].name === route.name) {
    if (index < tabs.length - 1) {
      router.replace(tabs[index + 1])
    } else {
      router.replace(tabs[index - 1])
    }
  }

  tabs.splice(index, 1)
}
// #endregion

// #region 右键打开菜单栏
const menuInfo = reactive({
  isShow: false,
  left: 0,
  top: 0,
})

let selectedTabIndex: number

const onRightClicked = (index: number, e: PointerEvent) => {
  selectedTabIndex = index

  const { pageX, pageY } = e
  menuInfo.left = pageX + 12
  menuInfo.top = pageY + 6

  // 先把 menuInfo 置为 false 是为了触发 transition 的动画
  menuInfo.isShow = false
  nextTick(() => (menuInfo.isShow = true))
}

const closeMenu = () => (menuInfo.isShow = false)

watchEffect(() => {
  if (menuInfo.isShow) {
    document.body.addEventListener<'click'>('click', closeMenu)
  } else {
    document.body.removeEventListener<'click'>('click', closeMenu)
  }
})

const closeOthersTabs = () => {
  const tab = tabs[selectedTabIndex]

  tabs.splice(1)

  if (tab.name !== RouteNames.Home) {
    tabs.push(tab)
  }

  router.replace(tabs[tabs.length - 1])
}

const closeAllTabs = () => {
  tabs.splice(1)
  router.replace({ name: RouteNames.Home })
}
// #endregion

// #region 快捷键
const getCurrentTabIndex = () => {
  for (const [index, tab] of tabs.entries()) {
    if (tab.name === route.name) {
      return index
    }
  }
  return 0
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.ctrlKey || event.metaKey) {
    const currentTabIndex = getCurrentTabIndex()
    if (event.key === 'ArrowUp' && !event.shiftKey) {
      event.preventDefault()

      if (currentTabIndex <= 0) {
        router.replace(tabs[tabs.length - 1])
      } else {
        router.replace(tabs[currentTabIndex - 1])
      }
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()

      if (currentTabIndex >= tabs.length - 1) {
        router.replace(tabs[0])
      } else {
        router.replace(tabs[currentTabIndex + 1])
      }
    }
  }
}

useHotKey(handleKeyDown)
// #endregion

const tabBarRef = ref<HTMLDivElement>()
const { arrivedState, x } = useScroll(tabBarRef, {
  behavior: 'smooth',
  idle: 0,
})

useEventListener(tabBarRef, 'wheel', (event) => {
  if (event.deltaY) {
    event.preventDefault()
    x.value += event.deltaY
  }
})
</script>

<style lang="scss" scoped>
.tab-bar {
  position: relative;

  .scroll-container {
    display: flex;
    align-items: center;
    height: $tab-bar-height;
    overflow-x: auto;

    // 兼容 Firefox
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;

      // 兼容 Chrome Safari
    }

    .tab {
      margin: 0 6px;

      &:first-child {
        margin-left: $card-spacing;
      }

      &:last-child {
        margin-right: $card-spacing;
      }
    }
  }

  // tab-bar 左右两端阴影
  .shadow-container {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;

    &::before,
    &::after {
      position: absolute;
      width: 50px;
      height: 100%;
      pointer-events: none;
      content: '';
      transition: opacity 0.2s;
    }

    &::before {
      left: 0;
      background: linear-gradient(to right, $bg-color-overlay, transparent);
    }

    &::after {
      right: 0;
      background: linear-gradient(to left, $bg-color-overlay, transparent);
    }

    &.scroll-left::before {
      opacity: 0;
    }

    &.scroll-right::after {
      opacity: 0;
    }
  }
}

ul {
  position: fixed;
  z-index: 999;
  padding: 4px;
  margin: 0;
  font-size: 13px;
  color: $text-color-2;
  list-style-type: none;
  background: $bg-color-overlay;
  border-radius: $border-radius-2;
  box-shadow: var(--el-box-shadow-light);

  li {
    padding: 6px 12px;
    cursor: pointer;
    border-radius: $border-radius-1;

    &:hover {
      color: $text-color-1;
      background: $fill-color;
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: all 0.1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
