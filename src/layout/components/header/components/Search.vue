<template>
  <el-autocomplete
    ref="autocomplete"
    style="display: block; width: 220px"
    v-model="inputValue"
    :placeholder="`搜索 ${metaKey} + k（支持拼音）`"
    :debounce="0"
    clearable
    :fetch-suggestions="querySearch"
    highlight-first-item
    value-key="label"
    @blur="inputValue = ''"
    @keydown.enter="handleCode"
    @select="handleSelect"
  >
    <template #suffix>
      <SearchOutlined />
    </template>
  </el-autocomplete>
</template>

<script setup lang="ts">
import useHotKey from '@/hooks/use-hot-key'
import { getMenuRoutes } from '@/router/routes'
import useDevModeStore from '@/stores/dev-mode'
import { Platform, getPlatform } from '@/utils/platform'
import { SearchOutlined } from '@ant-design/icons-vue'
import { storeToRefs } from 'pinia'
import pinyinMatch from 'pinyin-match'
import type { RouteRecordRaw } from 'vue-router'

const metaKey = getPlatform() === Platform.Mac ? '⌘' : 'ctrl'

const autocomplete = ref<HTMLInputElement>()

const { devMode } = storeToRefs(useDevModeStore())

const codeMap = {
  'dev mode': () => {
    if (import.meta.env.DEV) {
      inputValue.value = ''
      devMode.value = !devMode.value
      ElMessage.success(`已${devMode.value ? '打开' : '关闭'}开发者模式`)
    }
  },
}

const handleCode = () => {
  const input = inputValue.value.toLowerCase()

  if (input in codeMap) {
    codeMap[input as keyof typeof codeMap]()
  }
}

// #region 快捷键
const handleKeyDown = (event: KeyboardEvent) => {
  if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
    event.preventDefault()

    nextTick(() => autocomplete.value!.focus())
  }
}

useHotKey(handleKeyDown)
// #endregion

// #region 搜索菜单功能
const inputValue = ref('')

const searchList = computed<Record<string, any>[]>(() => {
  const menuItems = getMenuRoutes()

  const searchList: Record<string, any>[] = []

  const processMenuItems = (menuItems: RouteRecordRaw[], prefix = '') => {
    for (const item of menuItems) {
      if (item.children) {
        processMenuItems(item.children, item.meta!.label as string)
      } else {
        const label = prefix
          ? `${prefix} > ${item.meta!.label}`
          : (item.meta!.label as string)

        searchList.push({
          label,
          name: item.name as string,
        })
      }
    }
  }
  processMenuItems(menuItems)

  return searchList
})

const querySearch = (input: string, cb: Function) => {
  const createFilter = (input: string) => {
    return (item: Record<string, any>) => pinyinMatch.match(item.label, input)
  }

  cb(input ? searchList.value.filter(createFilter(input)) : searchList.value)
}

const router = useRouter()

const handleSelect = (item: Record<string, any>) => {
  router.push({ name: item.name })

  inputValue.value = ''

  autocomplete.value!.blur()
}
// #endregion
</script>
