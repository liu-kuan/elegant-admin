import { createApp } from 'vue'
import type { JSX } from 'vue/jsx-runtime'
import DialogContainer from './DialogContainer.vue'
import type { BeforeClose, DialogAction, DialogOptions } from './types'

/**
 * - 点击 confirm 按钮返回 'confirm'
 * - 点击 cancel 按钮返回 'cancel'
 * - 点击 空白区域或者关闭 按钮返回 'close'
 *
 * 如果想返回之前做一些事，比如给按钮 loading 添加效果，可使用 beforeClose，使用方法如下
 * ```ts
 * Dialog(header: 'title', content: 'content',
 *   beforeClose: async (action, { isLoadingConfirm }, close) => {
 *     if (action === 'confirm') {
 *       try {
 *         isLoadingConfirm.value = true
 *         await fn()
 *         close()
 *       } catch {
 *       } finally {
 *         isLoadingConfirm.value = false
 *       }
 *     } else {
 *       close()
 *     }
 *   }
 * )
 * ```
 */
const Dialog = ({
  header,
  content,
  footer,
  beforeClose,
  options,
}: {
  header?: string | JSX.Element | Component
  content: string | JSX.Element | Component
  footer?: JSX.Element | Component
  beforeClose?: BeforeClose
  options?: DialogOptions
}) => {
  let action: DialogAction = 'close'
  const el = document.createElement('div')
  const instance = ref<InstanceType<typeof DialogContainer>>()
  const isLoadingConfirm = ref(false)
  const isLoadingCancel = ref(false)

  watch(
    [isLoadingCancel, isLoadingConfirm],
    ([isLoadingCancel, isLoadingConfirm]) => {
      instance.value!.isLoadingCancel = isLoadingCancel
      instance.value!.isLoadingConfirm = isLoadingConfirm
    },
  )

  return {
    action: new Promise<DialogAction>((resolve) => {
      const app = createApp(DialogContainer, {
        header,
        content,
        footer,
        options,
        onAction: async (_action: DialogAction) => {
          action = _action

          if (beforeClose) {
            await new Promise<void>((resolve) => {
              beforeClose(
                action,
                {
                  isLoadingConfirm,
                  isLoadingCancel,
                },
                resolve,
              )
            })
          }

          instance.value!.isShow = false
        },
        onClose: () => {
          options?.attrs?.onClose?.()

          resolve(action)
        },
        onClosed: () => {
          options?.attrs?.onClosed?.()

          app.unmount()
          el.remove()
        },
      })

      instance.value = app.mount(el) as InstanceType<typeof DialogContainer>
    }),

    close: () => {
      instance.value!.isShow = false
    },
  }
}

export default Dialog
