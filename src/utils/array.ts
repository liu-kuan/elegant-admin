export const hasSameContent = <T>(arr1: T[], arr2: T[]) => {
  if (arr1.length !== arr2.length) return false

  for (const item of arr1) {
    if (!arr2.includes(item)) {
      return false
    }
  }

  for (const item of arr2) {
    if (!arr1.includes(item)) {
      return false
    }
  }

  return true
}

export const findFirstDuplicateElementInArray = <T = any>(
  array: T[],
): T | undefined => {
  const set = new Set()
  for (const item of array) {
    if (set.has(item)) {
      return item
    }
    set.add(item)
  }
  return void 0
}

export const groupBy = <T>(arr: T[], generateKey: (item: T) => any) => {
  const result: Record<string, T[]> = {}

  for (const item of arr) {
    const key = generateKey(item)

    if (!result[key]) {
      result[key] = []
    }

    result[key].push(item)
  }

  return result
}

export type ElementType<T extends any[]> = T extends (infer U)[] ? U : never
