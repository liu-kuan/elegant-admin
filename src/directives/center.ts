import type { Directive } from 'vue'

/**
 * 自动将组件在其父组件中居中展示
 */
const vCenter: Directive<HTMLElement, boolean | undefined> = {
  mounted(el, binding) {
    if (binding.value === false) {
      return
    }

    if (el.parentNode) {
      const parent = document.createElement('div')
      parent.style.width = '100%'
      parent.style.height = '100%'
      parent.style.display = 'flex'
      parent.style.justifyContent = 'center'
      parent.style.alignItems = 'center'

      el.parentNode.insertBefore(parent, el)
      parent.appendChild(el)
    }
  },
}

export default vCenter
