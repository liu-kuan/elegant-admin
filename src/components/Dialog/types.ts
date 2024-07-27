import type { ButtonType } from 'element-plus'
import type { Component, Ref } from 'vue'

export type DialogAction = 'confirm' | 'cancel' | 'close'

export type BeforeClose = (
  action: DialogAction,
  loading: {
    isLoadingConfirm: Ref<boolean>
    isLoadingCancel: Ref<boolean>
  },
  done: () => void,
) => void

export interface DialogOptions {
  /**
   * 绑定到 ElDialog 上的属性
   */
  attrs?: Record<string, any>
  confirmButtonText?: string
  cancelButtonText?: string
  confirmButtonType?: ButtonType
  cancelButtonType?: ButtonType
  confirmButtonIcon?: Component
  cancelButtonIcon?: Component
  hideCancelButton?: boolean
  hideFooter?: boolean
}
