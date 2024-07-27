import router from '@/router'
import useMetaStore from '@/stores/meta'

export const getSplitScreenPageLabelByRouteName = (name: string) => {
  const { splitScreenList } = storeToRefs(useMetaStore())

  const id = name.split('_').pop()

  const ssInfo = splitScreenList.value.find((ssInfo) => ssInfo.id === id)
  if (!ssInfo) {
    return '-- | --'
  }

  const [firstRouteName, secondRouteName] = ssInfo.pages

  const firstLabel = router.resolve({
    name: firstRouteName,
  }).meta.label as string

  const secondLabel = router.resolve({
    name: secondRouteName,
  }).meta.label as string

  return `${firstLabel} | ${secondLabel}`
}
