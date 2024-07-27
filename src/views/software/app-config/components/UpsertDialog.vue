<template>
  <el-dialog
    :title="currentMode + ' App 配置'"
    v-model="isShow"
    append-to-body
    @open="init"
    width="600"
  >
    <el-form
      ref="form"
      :model="req"
      label-width="100"
      label-position="left"
      inline-message
      :rules="formRules"
    >
      <el-form-item prop="appOsType" label="操作系统">
        <el-select
          :disabled="currentMode === Mode.Update"
          v-model="req.appOsType"
          placeholder="请选择操作系统"
          class="w-40!"
        >
          <el-option
            :label="AppOsType.getString(AppOsType.iOS)"
            :value="AppOsType.iOS"
          />
          <el-option
            :label="AppOsType.getString(AppOsType.Android)"
            :value="AppOsType.Android"
          />
        </el-select>
      </el-form-item>

      <el-form-item prop="appChannel" label="下载渠道">
        <el-select
          v-if="req.appOsType === AppOsType.iOS"
          :disabled="currentMode === Mode.Update"
          v-model="req.appChannel"
          class="w-40!"
        >
          <el-option label="app_store" value="app_store" />
        </el-select>

        <el-input
          v-else
          :disabled="currentMode === Mode.Update"
          v-model="req.appChannel"
          placeholder="请输入下载渠道"
          class="w-40!"
        />
      </el-form-item>

      <el-form-item prop="versionCode" label="版本号">
        <el-input
          :disabled="currentMode === Mode.Update"
          v-model.number="req.versionCode"
          placeholder="请输入版本号（仅支持数字）"
          class="w-55!"
        />
      </el-form-item>

      <el-form-item prop="versionName" label="版本名称">
        <el-input
          :disabled="currentMode === Mode.Update"
          v-model="req.versionName"
          placeholder="请输入版本名称（选填）"
          class="w-55!"
        />
      </el-form-item>

      <el-form-item prop="releaseNotes" label="更新内容">
        <el-input
          v-model="req.releaseNotes"
          placeholder="请输入更新内容"
          type="textarea"
          :rows="2"
        />
      </el-form-item>

      <el-form-item
        prop="checksumMd5"
        label="发布包 md5"
        v-if="req.appOsType === AppOsType.Android"
      >
        <el-input
          v-model="req.checksumMd5"
          placeholder="请输入发布包 md5"
          type="textarea"
          :rows="2"
        />
      </el-form-item>

      <el-form-item prop="downloadUrl" label="下载 URL">
        <el-input
          v-model="req.downloadUrl"
          placeholder="请输入下载 URL"
          type="textarea"
          :rows="3"
        />
      </el-form-item>

      <el-form-item prop="enable" label="启用标记">
        <el-switch v-model="req.enable" />
        <el-text type="info" class="block ml-2! text-3!"
          >如关闭，App 将无法使用</el-text
        >
      </el-form-item>

      <el-form-item prop="releaseTime" label="发布时间">
        <el-date-picker
          :model-value="req.releaseTime! * 1000"
          @update:model-value="onDateTimeChanged"
          type="datetime"
          placeholder="请选择发布时间（选填）"
          format="YYYY/MM/DD HH:mm:ss"
          value-format="x"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="isShow = false"> 取消 </el-button>
      <el-button
        type="primary"
        @click="onConfirm"
        :loading="isLoading"
        :disabled="isConfirmDisabled"
      >
        确定
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { apiUpsertAppConfig } from '@/api/software/app-config'
import { AppConfig, AppOsType } from '@/types/software/app-config'
import deepClone from '@/utils/deep-clone'
import type { FormInstance } from 'element-plus'
import formRules from './form-rules'

const props = defineProps<{
  config?: AppConfig
}>()

const emit = defineEmits<{
  (e: 'success'): void
}>()

const isShow = defineModel<boolean>('show')

enum Mode {
  Create = '添加',
  Update = '编辑',
}
const currentMode = ref(Mode.Create)
const req = ref(new AppConfig())
const form = ref<FormInstance>()

watch(
  () => req.value.appOsType,
  () => {
    if (currentMode.value === Mode.Update) return

    if (req.value.appOsType === AppOsType.iOS) {
      req.value.appChannel = 'app_store'
      form.value!.validateField('appChannel', () => {})
    } else {
      req.value.appChannel = ''
    }
  },
)

const init = () => {
  form.value!.resetFields()

  if (props.config) {
    currentMode.value = Mode.Update
    req.value = deepClone(props.config)
  } else {
    currentMode.value = Mode.Create
  }
}

const onDateTimeChanged = (value: number) => {
  req.value.releaseTime = Math.floor(value / 1000)
}

const isConfirmDisabled = computed(() => {
  if (!props.config) return false

  return (
    req.value.releaseNotes === props.config.releaseNotes &&
    req.value.checksumMd5 === props.config.checksumMd5 &&
    req.value.downloadUrl === props.config.downloadUrl &&
    req.value.enable === props.config.enable
  )
})

const isLoading = ref(false)
const onConfirm = () => {
  form.value!.validate(async (valid) => {
    if (valid) {
      try {
        isLoading.value = true
        delete req.value.id
        if (!req.value.releaseTime) {
          delete req.value.releaseTime
        }

        await apiUpsertAppConfig(req.value)
        ElMessage.success(`${currentMode.value} App 配置成功`)
        isShow.value = false
        emit('success')
      } catch (error) {
        ElMessage.error(`${currentMode.value} App 配置失败，原因：${error}`)
      } finally {
        isLoading.value = false
      }
    }
  })
}
</script>

<style lang="scss" scoped>
:deep(textarea) {
  resize: none;
}
</style>
