export const copy = async (data: string) => {
  try {
    if (window.isSecureContext) {
      if (!navigator.clipboard) {
        throw new Error('该浏览器不支持剪贴板操作')
      }

      await navigator.clipboard.writeText(data)

      ElMessage.success('复制成功！')
    } else {
      throw new Error('当前网络协议安全性较低，不支持自动复制操作，请手动复制')
    }
  } catch (error) {
    ElMessage.error(`${error}`)
  }
}

export const paste = async (): Promise<{
  data?: string
  isSuccess: boolean
}> => {
  try {
    if (window.isSecureContext) {
      if (!navigator.clipboard) {
        throw new Error('该浏览器不支持剪贴板操作')
      }

      const data = await navigator.clipboard.readText()

      return { data, isSuccess: true }
    } else {
      throw new Error('当前网络协议安全性较低，不支持自动粘贴操作，请手动粘贴')
    }
  } catch (error) {
    ElMessage.error(`${error}`)

    return {
      isSuccess: false,
    }
  }
}
