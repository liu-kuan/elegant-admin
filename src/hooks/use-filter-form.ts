import deepClone from '@/utils/deep-clone'

const pickProperties = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> => {
  const result: Partial<Pick<T, K>> = {}

  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key]
    } else {
      throw new Error(`object: ${obj} 上不存在属性: ${String(key)}`)
    }
  }

  return deepClone(result) as Pick<T, K>
}

const useFilterForm = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[],
) => {
  const initFilterFormData = pickProperties(obj, keys)
  const filterFormData = reactive(deepClone(initFilterFormData))

  const reset = () => {
    // TODO 这里和 filter 都要使用 deepClone 不然会有问题，有空研究一下
    Object.assign(filterFormData, deepClone(initFilterFormData))
  }

  const filter = () => {
    Object.assign(obj, deepClone(filterFormData))
  }

  return {
    filterFormData,
    reset,
    filter,
  }
}

export default useFilterForm
