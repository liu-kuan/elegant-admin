<template>
  <el-dialog
    v-model="isShow"
    append-to-body
    :width="dialogWidth"
    title="分屏管理"
    @open="init"
    @closed="_splitScreenList = []"
  >
    <template v-if="isShowCurrent">
      <el-divider>当前分屏</el-divider>

      <UpsertSplitScreen
        v-model:first="first"
        v-model:second="second"
        v-model:horizontal="isHorizontal"
      />

      <el-divider>
        <EleRow>
          分屏列表
          <el-button
            style="margin-left: 12px"
            :icon="AimOutlined"
            @click="onPositioning"
            >定位到当前分屏</el-button
          >
        </EleRow>
      </el-divider>
    </template>

    <VueDraggable
      v-model="list"
      :animation="300"
      draggable=".draggable-item"
      target=".items-container"
      @start="drag = true"
      @end="
        $nextTick(() => {
          drag = false
        })
      "
    >
      <TransitionGroup
        tag="div"
        :name="drag ? void 0 : 'list'"
        class="items-container"
        :style="`--columns: ${columns}`"
      >
        <SplitScreenItem key="__add__" class="add-item" />

        <SplitScreenItem
          v-for="ssInfo of _splitScreenList"
          :key="ssInfo.id"
          class="draggable-item"
          :id="ssInfo.id"
          :sorting="drag"
          @dismiss="isShow = false"
        />
      </TransitionGroup>
    </VueDraggable>
  </el-dialog>
</template>

<script setup lang="ts">
import RouteNames from '@/router/route-names'
import useMetaStore from '@/stores/meta'
import type { SplitScreenInfo } from '@/types/split-screen'
import { AimOutlined } from '@ant-design/icons-vue'
import { useWindowSize } from '@vueuse/core'
import { VueDraggable } from 'vue-draggable-plus'
import SplitScreenItem from './SplitScreenItem.vue'
import UpsertSplitScreen from './UpsertSplitScreen.vue'

const isShow = defineModel<boolean>('show')

const route = useRoute()
const isShowCurrent = ref(false)

const init = () => {
  clearSplitScreenList()
  _splitScreenList.value = splitScreenList.value
  isShowCurrent.value = (route.name as string).includes(RouteNames.SplitScreen)
}

const { width } = useWindowSize()
const dialogWidth = computed(() => Math.min(1400, width.value * 0.9))
const { splitScreenList } = storeToRefs(useMetaStore())
const router = useRouter()
const clearSplitScreenList = () => {
  const result: SplitScreenInfo[] = []
  for (const ssInfo of splitScreenList.value) {
    const { pages } = ssInfo
    if (router.hasRoute(pages[0]) && router.hasRoute(pages[1])) {
      result.push(ssInfo)
    }
  }

  splitScreenList.value = result
}

const _splitScreenList = ref<SplitScreenInfo[]>([])

const list = computed<(string | SplitScreenInfo)[]>({
  get: () => ['add', ...splitScreenList.value],
  set: (value) => {
    splitScreenList.value = value.slice(1) as SplitScreenInfo[]
  },
})

const first = ref('')
const second = ref('')
const isHorizontal = ref(false)

const id = computed(() => {
  const { id } = route.query as {
    id: string
  }

  return id
})

watchEffect(() => {
  const ssInfo = splitScreenList.value.find((ssInfo) => ssInfo.id === id.value)
  if (!ssInfo) return

  first.value = ssInfo.pages[0]
  second.value = ssInfo.pages[1]
  isHorizontal.value = ssInfo.isHorizontal
})

watchEffect(() => {
  const ssInfo = splitScreenList.value.find((ssInfo) => ssInfo.id === id.value)
  if (!ssInfo) return

  ssInfo.pages[0] = first.value
  ssInfo.pages[1] = second.value
  ssInfo.isHorizontal = isHorizontal.value
})

const onPositioning = () => {
  const currentSplitScreen = document.querySelector(
    '.split-screen-item.current',
  )

  if (currentSplitScreen) {
    currentSplitScreen.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }
}

const drag = ref(false)

const columns = computed(() => Math.floor(dialogWidth.value / 420))
</script>

<style lang="scss" scoped>
.add {
  @include card;
}

.items-container {
  display: grid;

  // 在 el-dialog 且 append-to-body = true 时无法在 css 中使用 v-bind，
  // 所以这里使用 css 变量实现类似功能
  grid-template-columns: repeat(var(--columns), 1fr);
  gap: 16px;
}

.list-move {
  transition: transform 0.3s;
}

.list-leave-active {
  display: none;
}
</style>
