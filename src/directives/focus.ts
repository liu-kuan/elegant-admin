import type { Directive } from 'vue'

/**
 * 自动获取焦点
 */
const vFocus: Directive<{ focus: Function }, boolean | undefined> = {
  mounted(el, binding) {
    if (binding.value === false) {
      return
    }

    el.focus()
  },
}

export default vFocus
