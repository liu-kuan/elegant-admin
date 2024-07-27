import { createApp } from 'vue'
import type { JSX } from 'vue/jsx-runtime'
import DialogContainer from './DialogContainer.vue'
import type { DialogAction, DialogOptions } from './types'

/**
 * - 点击 confirm 按钮返回 'confirm'
 * - 点击 cancel 按钮返回 'cancel'
 * - 点击 空白区域或者关闭 按钮返回 'close'
 *
 * 如果想返回之前做一些事，比如给按钮 loading 添加效果，可使用 options.beforeClose，使用方法如下
 * ```ts
 * EleDialog('title', 'content', {
 *   beforeClose: async (action, { isLoadingConfirm }, done) => {
 *     if (action === 'confirm') {
 *       try {
 *         isLoadingConfirm.value = true
 *         await fn()
 *         done()
 *       } catch {
 *       } finally {
 *         isLoadingConfirm.value = false
 *       }
 *     } else {
 *       done()
 *     }
 *   }
 * })
 * ```
 */
const EleDialog = (
  title: string | JSX.Element | Component | undefined,
  content: string | JSX.Element | Component,
  options?: DialogOptions,
) => {
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
        title,
        content,
        options,
        onAction: async (_action: DialogAction) => {
          action = _action

          if (options?.beforeClose) {
            await new Promise<void>((resolve) => {
              options.beforeClose!(
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

export default EleDialog
