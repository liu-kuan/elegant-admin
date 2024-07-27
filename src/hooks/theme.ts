import usePreferenceStore from '@/stores/preference'
import { useMutationObserver, usePreferredColorScheme } from '@vueuse/core'

export const useTheme = () => {
  const { theme } = storeToRefs(usePreferenceStore())
  const preferredColor = usePreferredColorScheme()

  watch(preferredColor, (val) => {
    if (theme.value !== 'auto') return

    if (val === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  })

  watch(
    theme,
    (value) => {
      theme.value = value

      switch (value) {
        case 'light':
          document.documentElement.classList.remove('dark')
          break
        case 'dark':
          document.documentElement.classList.add('dark')
          break
        case 'auto':
          if (preferredColor.value === 'dark') {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
          break
      }
    },
    {
      immediate: true,
    },
  )
}

export const useDark = () => {
  const rootElement = document.documentElement
  const isDark = ref(rootElement.classList.contains('dark'))

  useMutationObserver(
    rootElement,
    ([mutation]) => {
      if (!mutation) return

      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'class'
      ) {
        isDark.value = rootElement.classList.contains('dark')
      }
    },
    {
      attributes: true,
    },
  )

  return isDark
}
