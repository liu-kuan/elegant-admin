<template>
  <div class="aside">
    <AsideHeader
      :class="{
        dark: isDark,
        shadow: isShowShadow,
      }"
    />
    <ElScrollbar @scroll="onScroll">
      <ElMenu
        :text-color="styles.asideTextColor"
        :background-color="styles.asideBgColor"
        :default-active="String($route.name)"
        :collapse="isMenuCollapse"
        :collapse-transition="false"
        :unique-opened="asideMenuUniqueOpened"
      >
        <MenuItem :item="item" v-for="item of menuItems" :key="item.name" />
      </ElMenu>
    </ElScrollbar>
  </div>
</template>

<script setup lang="ts">
import { useDark } from '@/hooks/theme'
import { getMenuRoutes } from '@/router/routes'
import usePreferenceStore from '@/stores/preference'
import styles from '@/styles/variables.module.scss'
import { storeToRefs } from 'pinia'
import AsideHeader from './Header.vue'
import MenuItem from './MenuItem.vue'

const { isMenuCollapse, asideMenuUniqueOpened } =
  storeToRefs(usePreferenceStore())

const menuItems = computed(() => getMenuRoutes())

const isShowShadow = ref(false)
const onScroll = ({ scrollTop }: { scrollTop: number }) => {
  isShowShadow.value = scrollTop > 0
}

const isDark = useDark()
</script>

<style lang="scss" scoped>
.aside {
  background-color: $aside-bg-color;
}

.header {
  height: $header-height;
  --box-shadow: 0 2px 2px rgb(0 0 0 / 18%);

  &.dark {
    --box-shadow: 0 2px 2px rgb(0 0 0 / 60%);
  }

  &.shadow {
    position: relative;
    z-index: 99;
    overflow: hidden;
    box-shadow: var(--box-shadow);
  }
}

.el-scrollbar {
  height: calc(100vh - $header-height);
}

.el-menu {
  background-color: transparent;
  border-right: none;
}
</style>
