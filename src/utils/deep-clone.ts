const _deepClone = <T>(obj: T, cache: Map<any, any>): T => {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  if (cache.has(obj)) {
    return cache.get(obj)
  }

  let result: T

  if (Array.isArray(obj)) {
    result = [] as T
  } else {
    result = {} as T
  }

  // 将当前对象添加到缓存中
  cache.set(obj, result)

  for (const key in obj) {
    result[key] = _deepClone(obj[key], cache)
  }

  return result
}

export default <T>(obj: T) => _deepClone(obj, new Map())
