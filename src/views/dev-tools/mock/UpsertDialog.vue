<template>
  <el-dialog
    :title="currentMode + '模拟接口'"
    v-model="isShow"
    append-to-body
    @open="init"
    width="560"
  >
    <el-form
      ref="form"
      :model="{ ...req, dataValid }"
      label-width="86"
      label-position="top"
      inline-message
      :rules="formRules"
    >
      <el-form-item label="名称">
        <el-input v-model="req.name" placeholder="请输入名称" class="w-84!" />
      </el-form-item>

      <Row>
        <el-form-item prop="method" label="请求方法">
          <el-select v-model="req.method" class="w-40!">
            <el-option label="所有" value="ALL" />
            <el-option label="GET" value="GET" />
            <el-option label="POST" value="POST" />
          </el-select>
        </el-form-item>

        <el-form-item
          prop="delay"
          label="接口延时 (ms)"
          class="ml-4"
          label-width="116"
        >
          <el-input-number
            v-model.number="req.delay"
            placeholder="请输入接口延时"
            :step="100"
            :min="0"
            class="w-40!"
          />
        </el-form-item>
      </Row>

      <el-form-item prop="url" label="接口地址">
        <el-input
          v-model="req.url"
          placeholder="请输入接口地址"
          class="w-132!"
        />
      </el-form-item>

      <el-form-item prop="dataValid" label="响应体">
        <!-- TODO 这个组件会报警告，后续看看官方会不会处理 -->
        <JsonEditor
          :model-value="req.responseBody"
          height="380px"
          @json-change="
            ($event: any) => {
              req.responseBody = $event
              dataValid = true
              $nextTick(() => {
                form!.validateField('dataValid', () => {})
              })
            }
          "
          @has-error="
            () => {
              dataValid = false
              $nextTick(() => {
                form!.validateField('dataValid', () => {})
              })
            }
          "
          class="json-editor w-full"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="isShow = false"> 取消 </el-button>
      <el-button type="primary" @click="onConfirm"> 确定 </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import useDevModeStore from '@/stores/dev-mode'
import { MockApi } from '@/types/mock'
import deepClone from '@/utils/deep-clone'
import type { FormInstance } from 'element-plus'
import formRules from './form-rules'

const props = defineProps<{
  mockApi?: MockApi
}>()

const isShow = defineModel<boolean>('show')

const { mockApiList } = storeToRefs(useDevModeStore())

enum Mode {
  Create = '添加',
  Update = '编辑',
}
const currentMode = ref(Mode.Create)
const req = ref(new MockApi())
const form = ref<FormInstance>()

const init = () => {
  if (props.mockApi) {
    currentMode.value = Mode.Update
    req.value = deepClone(props.mockApi)
  } else {
    currentMode.value = Mode.Create
    req.value = new MockApi()
  }
  form.value!.resetFields()
}

const onConfirm = () => {
  form.value!.validate(async (valid) => {
    if (!valid) return

    const index = mockApiList.value.findIndex(
      (item) => item !== props.mockApi && item.url === req.value.url,
    )
    if (index !== -1) {
      ElMessage.error(
        `具有相同 URL 的模拟接口已存在于第 ${index + 1} 行，请不要设置有重复 URL 的模拟接口`,
      )
      return
    }

    if (props.mockApi) {
      const mockApi = mockApiList.value.find((item) => item === props.mockApi)
      if (!mockApi) return

      Object.assign(mockApi, req.value)
    } else {
      mockApiList.value.unshift({ ...req.value })
    }

    ElMessage.success(`${currentMode.value}模拟接口成功`)
    isShow.value = false
  })
}

const dataValid = ref(true)
</script>
