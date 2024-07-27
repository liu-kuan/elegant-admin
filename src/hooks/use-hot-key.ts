import { useEventListener } from '@vueuse/core'

const useHotKey = (handleKeyDown: (event: KeyboardEvent) => void) => {
  useEventListener(document, 'keydown', handleKeyDown)
}
export default useHotKey

export const useEnterKey = (cb: () => void) => {
  // 防止输入中文时按下的回车键导致触发回车快捷键
  let isComposing = false
  // 开始输入中文
  useEventListener(document, 'compositionstart', () => {
    isComposing = true
  })

  // 结束输入中文
  useEventListener(document, 'compositionend', () => {
    isComposing = false
  })

  const onEnterDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && !isComposing) {
      event.preventDefault()

      cb()
    }
  }

  useHotKey(onEnterDown)
}
