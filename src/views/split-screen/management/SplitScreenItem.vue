<template>
  <div
    class="split-screen-item"
    :class="{
      current: isCurrent,
      'not-sorting': notSorting,
    }"
    @click="onClick"
  >
    <div v-if="id && currentSplitScreenInfo" class="form-box">
      <Row class="header">
        <LongTextEllipsis
          :content="`“${$router.resolve({ name: currentSplitScreenInfo.pages[0] }).meta.label}” 与 “${$router.resolve({ name: currentSplitScreenInfo.pages[1] }).meta.label}”`"
          :max-line="1"
          type="popover"
        />

        <el-tag
          style="margin-inline: 6px"
          effect="dark"
          v-if="isCurrent"
          disable-transitions
        >
          当前页
        </el-tag>

        <el-dropdown class="ml-auto">
          <el-button
            size="small"
            circle
            :icon="Operation"
            @click.stop="void 0"
          />

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="onChangeMode">
                改为{{
                  currentSplitScreenInfo.isHorizontal ? '左右' : '上下'
                }}分屏
              </el-dropdown-item>

              <el-dropdown-item @click="onSwitchPage">
                {{
                  currentSplitScreenInfo.isHorizontal ? '上下' : '左右'
                }}页面交换
              </el-dropdown-item>

              <el-dropdown-item @click="onChangePage('first')">
                编辑{{
                  currentSplitScreenInfo.isHorizontal ? '上方' : '左侧'
                }}页面
              </el-dropdown-item>

              <el-dropdown-item @click="onChangePage('second')">
                编辑{{
                  currentSplitScreenInfo.isHorizontal ? '下方' : '右侧'
                }}页面
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <el-tooltip
          content="不支持删除当前分屏页"
          placement="top"
          :disabled="!isCurrent"
        >
          <el-button
            class="ml-2"
            size="small"
            circle
            :icon="Close"
            :disabled="isCurrent"
            @click.stop="onRemove"
          />
        </el-tooltip>
      </Row>

      <div
        class="view"
        v-center
        :style="{
          flexDirection: currentSplitScreenInfo.isHorizontal ? 'column' : 'row',
        }"
      >
        <div
          class="first"
          :style="{
            borderTopRightRadius: currentSplitScreenInfo.isHorizontal
              ? borderRadius
              : '0',
            borderBottomLeftRadius: currentSplitScreenInfo.isHorizontal
              ? '0'
              : borderRadius,
          }"
        >
          {{
            $router.resolve({ name: currentSplitScreenInfo.pages[0] }).meta
              .label
          }}
        </div>

        <div
          class="second"
          :style="{
            marginTop: currentSplitScreenInfo.isHorizontal ? spacing : '0',
            marginLeft: currentSplitScreenInfo.isHorizontal ? '0' : spacing,
            borderTopRightRadius: currentSplitScreenInfo.isHorizontal
              ? '0'
              : borderRadius,
            borderBottomLeftRadius: currentSplitScreenInfo.isHorizontal
              ? borderRadius
              : '0',
          }"
        >
          {{
            $router.resolve({ name: currentSplitScreenInfo.pages[1] }).meta
              .label
          }}
        </div>
      </div>
    </div>

    <div class="add" v-else>
      <el-icon>
        <Plus />
      </el-icon>
    </div>

    <AddDialog v-model:show="isShowAddDialog" />

    <ChoosePageDialog
      v-model:show="isShowChooseDialog"
      @success="onChoosePage"
    />
  </div>
</template>

<script setup lang="ts">
import RouteNames from '@/router/route-names'
import useMetaStore from '@/stores/meta'
import { SplitScreenInfo, type PageInfo, type Side } from '@/types/split-screen'
import { Close, Operation, Plus } from '@element-plus/icons-vue'
import AddDialog from './AddSplitScreenDialog.vue'
import ChoosePageDialog from './ChoosePageDialog.vue'

const props = withDefaults(
  defineProps<{
    id?: string
    sorting?: boolean
  }>(),
  {
    sorting: false,
  },
)

const emit = defineEmits<{
  dismiss: []
}>()

const notSorting = ref(true)

watch(
  () => props.sorting,
  (sorting) => {
    if (sorting) {
      notSorting.value = false
    } else {
      nextTick(() => {
        notSorting.value = true
      })
    }
  },
)
const { splitScreenList } = storeToRefs(useMetaStore())
const currentSplitScreenInfo = ref<SplitScreenInfo>()
watch(
  () => props.id,
  (id) => {
    const _ssInfo = splitScreenList.value.find((ssInfo) => ssInfo.id === id)

    currentSplitScreenInfo.value = _ssInfo
  },
  {
    immediate: true,
  },
)

const route = useRoute()
const isCurrent = computed(() => {
  const query = route.query as {
    id: string
  }

  return currentSplitScreenInfo.value?.id === query.id
})

const router = useRouter()
const isShowAddDialog = ref(false)
const onClick = async () => {
  if (props.id) {
    try {
      await router.push({
        name: `${RouteNames.SplitScreen}_${props.id}`,
        query: {
          id: props.id,
        },
      })

      emit('dismiss')
    } catch (error) {
      ElMessage.error(`跳转路由失败，原因：${error}`)
    }
  } else {
    isShowAddDialog.value = true
  }
}

const onChangeMode = () => {
  const index = splitScreenList.value.findIndex(
    (item) =>
      item.pages[0] === currentSplitScreenInfo.value?.pages[0] &&
      item.pages[1] === currentSplitScreenInfo.value?.pages[1],
  )

  if (index === -1) return

  splitScreenList.value[index].isHorizontal =
    !splitScreenList.value[index].isHorizontal
}

const onSwitchPage = () => {
  const ssInfo = splitScreenList.value.find((item) => item.id === props.id)
  if (!ssInfo) {
    ElMessage.error('被编辑的分屏已不存在')
    return
  }

  const planPages = [ssInfo.pages[1], ssInfo.pages[0]]

  const index = splitScreenList.value.findIndex((ssInfo) => {
    return ssInfo.pages[0] === planPages[0] && ssInfo.pages[1] === planPages[1]
  })
  if (index !== -1) {
    ElMessage.error(
      `${ssInfo.isHorizontal ? '上下' : '左右'}页面交换失败，原因：该分屏已存在，在第 ${index + 1} 个`,
    )
    return
  }

  ;[ssInfo.pages[0], ssInfo.pages[1]] = planPages
}
const isShowChooseDialog = ref(false)
let currentSide: Side = 'first'
const onChangePage = (side: Side) => {
  currentSide = side
  isShowChooseDialog.value = true
}
const onChoosePage = (pageInfo: PageInfo) => {
  const ssInfo = splitScreenList.value.find((item) => item.id === props.id)
  if (!ssInfo) {
    ElMessage.error('被编辑的分屏已不存在')
    return
  }

  const planPages = [
    currentSide === 'first' ? pageInfo.name : ssInfo.pages[0],
    currentSide === 'second' ? pageInfo.name : ssInfo.pages[1],
  ]

  if (planPages[0] === planPages[1]) {
    ElMessage.error(
      `修改第 ${currentSide === 'first' ? 1 : 2} 屏失败，原因：两屏的页面不能相同`,
    )
    return
  }

  const index = splitScreenList.value.findIndex(
    (ssInfo) =>
      ssInfo.pages[0] === planPages[0] && ssInfo.pages[1] === planPages[1],
  )

  if (index !== -1) {
    ElMessage.error(`该分屏已存在，在第 ${index + 1} 个`)
    return
  }

  ssInfo.pages[currentSide === 'first' ? 0 : 1] = pageInfo.name
}

const onRemove = () => {
  if (!props.id) return

  splitScreenList.value = splitScreenList.value.filter(
    (item) =>
      item.pages[0] !== currentSplitScreenInfo.value?.pages[0] ||
      item.pages[1] !== currentSplitScreenInfo.value?.pages[1],
  )

  router.removeRoute(`${RouteNames.SplitScreen}_${props.id}`)
}

const borderRadius = '6px'
const spacing = '5px'
</script>

<style lang="scss" scoped>
.split-screen-item {
  position: relative;
  aspect-ratio: 7/5;
  padding: 12px;
  cursor: pointer;
  background-color: var(--el-bg-color);
  border: 1px solid $border-color;
  border-radius: $border-radius-2;

  &.not-sorting:not(:active):hover {
    padding: 11px;
    border: 2px solid $color-primary;
  }

  &:has(.add):hover {
    background-color: var(--el-color-primary-light-9);
  }

  .form-box {
    display: flex;
    flex-direction: column;
    height: 100%;

    .header {
      @include text2;

      height: 22px;
      margin-bottom: $spacing-s;
    }

    .view {
      display: flex;
      flex-grow: 1;
      height: 100%;
      margin-block: $spacing-xl;

      $border-radius: 6px;

      .first {
        border-top-left-radius: $border-radius;
      }

      .second {
        margin-left: 6px;
        border-bottom-right-radius: $border-radius;
      }

      .first,
      .second {
        display: flex;
        flex: 1 0 0;
        align-items: center;
        justify-content: center;
        background-color: $fill-color;
      }
    }
  }

  .add {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    /* stylelint-disable-next-line no-descending-specificity */
    &:hover .el-icon {
      color: $color-primary;
    }

    /* stylelint-disable-next-line no-descending-specificity */
    .el-icon {
      font-size: 50px;
      color: $text-color-3;
    }
  }
}
</style>
