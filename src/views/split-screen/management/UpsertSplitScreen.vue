<template>
  <Center>
    <el-button type="primary" @click="isHorizontal = !isHorizontal"
      >改为{{ isHorizontal ? '左右' : '上下' }}分屏</el-button
    >

    <el-button type="primary" @click="onSwitchPages"
      >{{ isHorizontal ? '上下' : '左右' }}页面交换</el-button
    >
  </Center>

  <div
    class="screen"
    v-center
    :style="{
      flexDirection: isHorizontal ? 'column' : 'row',
    }"
  >
    <div
      class="first"
      @click="addPage('first')"
      :style="{
        borderTopRightRadius: isHorizontal ? borderRadius : '0',
        borderBottomLeftRadius: isHorizontal ? '0' : borderRadius,
      }"
    >
      <div v-if="firstRouteName">
        {{ firstRouteLabel }}
      </div>

      <el-icon v-else>
        <Plus />
      </el-icon>
    </div>

    <div
      class="second"
      @click="addPage('second')"
      :style="{
        marginTop: isHorizontal ? spacing : '0',
        marginLeft: isHorizontal ? '0' : spacing,
        borderTopRightRadius: isHorizontal ? '0' : borderRadius,
        borderBottomLeftRadius: isHorizontal ? borderRadius : '0',
      }"
    >
      <div v-if="secondRouteName">
        {{ secondRouteLabel }}
      </div>

      <el-icon v-else>
        <Plus />
      </el-icon>
    </div>
  </div>

  <ChoosePageDialog v-model:show="isShowChooseDialog" @success="onChoosePage" />
</template>

<script setup lang="ts">
import useMetaStore from '@/stores/meta'
import type { PageInfo, Side } from '@/types/split-screen'
import { Plus } from '@element-plus/icons-vue'
import ChoosePageDialog from './ChoosePageDialog.vue'

const firstRouteName = defineModel<string>('first', {
  required: true,
})
const secondRouteName = defineModel<string>('second', {
  required: true,
})
const isHorizontal = defineModel<boolean>('horizontal', {
  required: true,
})

const router = useRouter()
const firstRouteLabel = computed(() => {
  return router.resolve({
    name: firstRouteName.value,
  }).meta.label as string
})
const secondRouteLabel = computed(() => {
  return router.resolve({
    name: secondRouteName.value,
  }).meta.label as string
})

const side = ref<Side>('first')

const isShowChooseDialog = ref(false)
const addPage = (_side: Side) => {
  side.value = _side
  isShowChooseDialog.value = true
}
const { splitScreenList } = storeToRefs(useMetaStore())
const onChoosePage = (page: PageInfo) => {
  if (side.value === 'first') {
    const errStr = '修改第 1 屏失败，原因：'
    const _firstRouteName = page.name
    if (_firstRouteName === secondRouteName.value) {
      ElMessage.error(errStr + '两屏的页面不能相同')
      return
    }

    const index = splitScreenList.value.findIndex(
      (ssInfo) =>
        ssInfo.pages[0] === _firstRouteName &&
        ssInfo.pages[1] === secondRouteName.value,
    )
    if (index !== -1) {
      ElMessage.error(errStr + `该分屏已存在，在第 ${index + 1} 个`)
      return
    }

    firstRouteName.value = _firstRouteName
  } else {
    const errStr = '修改第 2 屏失败，原因：'
    const _secondRouteName = page.name
    if (firstRouteName.value === _secondRouteName) {
      ElMessage.error(errStr + '两屏的页面不能相同')
      return
    }

    const index = splitScreenList.value.findIndex(
      (ssInfo) =>
        ssInfo.pages[0] === firstRouteName.value &&
        ssInfo.pages[1] === _secondRouteName,
    )
    if (index !== -1) {
      ElMessage.error(errStr + `该分屏已存在，在第 ${index + 1} 个`)
      return
    }

    secondRouteName.value = _secondRouteName
  }
}

const onSwitchPages = () => {
  const planPages = [secondRouteName.value, firstRouteName.value]

  const index = splitScreenList.value.findIndex(
    (ssInfo) =>
      ssInfo.pages[0] === planPages[0] && ssInfo.pages[1] === planPages[1],
  )
  if (index !== -1) {
    ElMessage.error(
      `${isHorizontal.value ? '上下' : '左右'}页面交换失败，原因：该分屏已存在，在第 ${index + 1} 个`,
    )
    return
  }

  ;[firstRouteName.value, secondRouteName.value] = planPages
}

const borderRadius = '8px'
const spacing = '5px'
</script>

<style lang="scss" scoped>
.screen {
  display: flex;
  width: 400px;
  height: 250px;
  margin-block: $spacing-l;

  $border-radius: 8px;
  $border: 1.5px solid $border-color-dark;

  .first {
    flex: 1;
    border: $border;
    border-top-left-radius: $border-radius;
  }

  .second {
    flex: 1;
    margin-left: 6px;
    border: $border;
    border-bottom-right-radius: $border-radius;
  }

  .first,
  .second {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    .el-icon {
      font-size: 32px;
      color: $text-color-3;
    }

    &:hover {
      background-color: var(--el-color-primary-light-9);
      border-color: $color-primary;

      .el-icon {
        color: $color-primary;
      }
    }
  }
}
</style>
