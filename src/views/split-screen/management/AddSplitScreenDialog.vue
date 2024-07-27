<template>
  <el-dialog
    title="新增分屏"
    v-model="isShow"
    append-to-body
    width="600"
    @open="init"
  >
    <UpsertSplitScreen
      v-model:first="firstRouteName"
      v-model:second="secondRouteName"
      v-model:horizontal="isHorizontal"
    />

    <template #footer>
      <el-button @click="isShow = false"> 取消 </el-button>
      <el-button
        type="primary"
        @click="onConfirm"
        :disabled="!firstRouteName || !secondRouteName"
      >
        确定
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import RouteNames from '@/router/route-names'
import useMetaStore from '@/stores/meta'
import { generateRandomString } from '@/utils/string'
import UpsertSplitScreen from './UpsertSplitScreen.vue'

const isShow = defineModel<boolean>('show')

const firstRouteName = ref<string>('')
const secondRouteName = ref<string>('')
const isHorizontal = ref(false)

const init = () => {
  firstRouteName.value = ''
  secondRouteName.value = ''
  isHorizontal.value = false
}

const router = useRouter()
const { splitScreenList } = storeToRefs(useMetaStore())
const onConfirm = () => {
  let id = ''
  do {
    id = generateRandomString(6)
  } while (splitScreenList.value.map((ssInfo) => ssInfo.id).includes(id))

  splitScreenList.value.unshift({
    id,
    pages: [firstRouteName.value, secondRouteName.value],
    isHorizontal: isHorizontal.value,
  })

  router.addRoute(RouteNames.Layout, {
    path: '/split-screen',
    name: `${RouteNames.SplitScreen}_${id}`,
    component: () =>
      import('@/views/split-screen/page/index.vue').then((component) => ({
        ...component.default,
        name: `${RouteNames.SplitScreen}_${id}`,
      })),
  })

  isShow.value = false
}
</script>
