export const useComputed = <T extends (...args: any[]) => any>(fn: T) => {
  const cache = new Map<string, any>()
  const generateCacheKey = (args: any[]) => {
    return JSON.stringify(args)
  }
  const setCache = (args: any[], result: any) => {
    return cache.set(generateCacheKey(args), result)
  }
  const getCache = (args: any[]) => {
    return cache.get(generateCacheKey(args))
  }

  return (...args: Parameters<T>) => {
    const cacheResult = getCache(args)

    if (cacheResult) {
      return cacheResult
    }

    const result = computed(() => fn(...args))
    setCache(args, result)
    return result
  }
}
