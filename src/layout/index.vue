<template>
  <ElContainer>
    <ElAside :class="{ collapse: isMenuCollapse }">
      <Aside />
    </ElAside>
    <ElContainer>
      <el-header>
        <Header />
      </el-header>

      <TabBar
        :class="{
          'bottom-shadow': isShowShadow,
        }"
      />

      <ElMain>
        <div class="main-container" ref="mainRef">
          <router-view v-slot="{ Component }">
            <Transition
              :name="pageTransitionAnimation ? 'main' : 'NO_ANIMATION'"
              mode="out-in"
              appear
            >
              <keep-alive :include="keepAliveTabs" :max="maxCachePageCount">
                <component
                  v-if="isMainShow"
                  :key="$route.name"
                  :is="Component"
                />
              </keep-alive>
            </Transition>
          </router-view>
        </div>
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>

<script setup lang="ts">
import useMetaStore from '@/stores/meta'
import usePreferenceStore from '@/stores/preference'
import eventBus from '@/utils/event-bus'
import { useScroll } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import Aside from './components/aside/index.vue'
import Header from './components/header/index.vue'
import TabBar from './components/tab-bar/index.vue'

const { isMenuCollapse, maxCachePageCount, pageTransitionAnimation } =
  storeToRefs(usePreferenceStore())
const { keepAliveTabs } = storeToRefs(useMetaStore())

const mainRef = ref<HTMLDivElement>()
const { y } = useScroll(mainRef)
const isShowShadow = computed(() => y.value > 16)

const isMainShow = ref(true)
const route = useRoute()
const refresh = () => {
  isMainShow.value = false

  const index = keepAliveTabs.value.indexOf(route.name as string)
  if (index !== -1) {
    keepAliveTabs.value.splice(index, 1)
  }

  nextTick(() => {
    isMainShow.value = true
    keepAliveTabs.value.push(route.name as string)
  })
}

eventBus.on('refresh', refresh)

onUnmounted(() => {
  eventBus.off('refresh', refresh)
})
</script>

<style lang="scss" scoped>
.el-aside {
  width: $aside-width;
  border-right: 1px solid $border-color-lighter;
  transition: width 0.25s ease;

  &.collapse {
    width: $aside-width-collapse;
  }
}

.el-header {
  height: $header-height;
  padding: 0;
  background-color: $bg-color-overlay;
  border-bottom: 1px solid $border-color-lighter;
}

.tab-bar {
  z-index: 100;
  background-color: $bg-color-overlay;
  border-bottom: 1px solid $border-color-lighter;
  transition: box-shadow 0.2s ease;

  // el-main 区域滚动后的顶部阴影
  &.bottom-shadow {
    border-bottom-color: transparent;
    box-shadow: 0 2px 2px $shadow-color;
  }
}

.el-main {
  position: relative;

  // TODO 设置这个当 main 比较大时，可以让其滚动，至于原因还不知道
  height: 0;
  padding: 0;
}

.main-container {
  height: calc(100% - $card-spacing * 2);
  padding: $card-spacing;

  // 代表 overflow-x: hidden; overflow-y: auto;
  overflow: hidden auto;
  scroll-behavior: smooth;
}

.main-enter-active,
.main-leave-active {
  transition: all 0.22s;
}

.main-enter-from,
.main-leave-to {
  opacity: 0;
}

.main-enter-from {
  transform: translateX(-22px);
}

.main-leave-to {
  transform: translateX(22px);
}
</style>
