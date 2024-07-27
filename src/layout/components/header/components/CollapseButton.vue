<template>
  <component
    @click="onIsCollapseChanged"
    class="header__icon"
    :is="isMenuCollapse ? MenuUnfoldOutlined : MenuFoldOutlined"
  />
</template>

<script setup lang="ts">
import useHotKey from '@/hooks/use-hot-key'
import usePreferenceStore from '@/stores/preference'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import { storeToRefs } from 'pinia'

const { isMenuCollapse } = storeToRefs(usePreferenceStore())

const onIsCollapseChanged = () => {
  isMenuCollapse.value = !isMenuCollapse.value
}

// #region 快捷键
const handleKeyDown = (event: KeyboardEvent) => {
  if ((event.ctrlKey || event.metaKey) && event.key === 'b') {
    event.preventDefault()

    onIsCollapseChanged()
  }
}

useHotKey(handleKeyDown)
// #endregion
</script>
