import useDevModeStore from '@/stores/dev-mode'

export const useDevMode = () => {
  const { devMode, elementOutlineVisible } = storeToRefs(useDevModeStore())

  const setElementOutline = () => {
    document.documentElement.style.setProperty(
      '--dev-mode__outline',
      elementOutlineVisible.value ? 'var(--dev-mode__outline-dashed)' : 'none',
    )
  }
  watch(elementOutlineVisible, setElementOutline, {
    immediate: true,
  })

  watch(
    devMode,
    (devMode) => {
      if (devMode) {
        setElementOutline()
      } else {
        elementOutlineVisible.value = false
      }
    },
    {
      immediate: true,
    },
  )
}
