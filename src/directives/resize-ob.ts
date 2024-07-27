import type { Directive } from 'vue'

interface ResizeHandler {
  (size: { width: number; height: number }): void
}

const map = new WeakMap<Element, ResizeHandler>()

const observer = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const handler = map.get(entry.target)
    if (handler) {
      const { inlineSize, blockSize } = entry.borderBoxSize[0]
      handler({
        width: inlineSize,
        height: blockSize,
      })
    }
  }
})

/**
 * 监听组件的边框盒子的尺寸变化尺寸变化
 */
const vResizeOb: Directive<Element, ResizeHandler> = {
  mounted(el, binding) {
    observer.observe(el)
    map.set(el, binding.value)
  },
  unmounted(el) {
    observer.unobserve(el)
    map.delete(el)
  },
}

export default vResizeOb
