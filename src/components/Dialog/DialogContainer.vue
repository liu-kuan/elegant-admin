该组件仅用于提供给 SVMessage 函数使用，禁止单独使用
<template>
  <el-config-provider :locale="zhCn">
    <el-dialog
      append-to-body
      :model-value="isShow"
      :title="!header || typeof header === 'string' ? header : void 0"
      v-bind="options?.attrs"
      @close="emit('close')"
      @closed="emit('closed')"
    >
      <template #header v-if="header && typeof header !== 'string'">
        <component :is="header" />
      </template>

      <template v-if="typeof content === 'string'">
        {{ content }}
      </template>
      <component v-else :is="content" />

      <template #footer v-if="!options?.hideFooter">
        <template v-if="footer">
          <component :is="footer" />
        </template>

        <template v-else>
          <el-button
            v-if="!options?.hideCancelButton"
            @click="emit('action', 'cancel')"
            :icon="options?.cancelButtonIcon"
            :type="options?.cancelButtonType"
            :loading="isLoadingCancel"
          >
            {{ options?.cancelButtonText ?? '取消' }}
          </el-button>

          <el-button
            :type="options?.confirmButtonType ?? 'primary'"
            :icon="options?.confirmButtonIcon"
            @click="emit('action', 'confirm')"
            :loading="isLoadingConfirm"
          >
            {{ options?.confirmButtonText ?? '确认' }}
          </el-button>
        </template>
      </template>
    </el-dialog>
  </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import type { JSX } from 'vue/jsx-runtime'
import type { DialogAction, DialogOptions } from './types'

defineProps<{
  header?: string | JSX.Element | Component
  content: string | JSX.Element | Component
  footer?: JSX.Element | Component
  options?: DialogOptions
}>()

const emit = defineEmits<{
  action: [DialogAction]
  close: []
  closed: []
}>()

const isShow = ref(true)
const isLoadingConfirm = ref(false)
const isLoadingCancel = ref(false)

defineExpose({
  isShow,
  isLoadingConfirm,
  isLoadingCancel,
})
</script>
