import { MD5, enc } from 'crypto-js'

export const getMd5FromFile = async (file: File) => {
  const reader = new FileReader()

  const hash = await new Promise<string>((resolve, reject) => {
    reader.onload = (e) => {
      const fileContent = e.target?.result

      if (!fileContent) {
        reject(new Error(`获取文件 ${file.name} 的内容失败`))
      }

      const hash = MD5(enc.Latin1.parse(fileContent as string)).toString(
        enc.Hex,
      )
      resolve(hash)
    }

    reader.onerror = (e) =>
      reject(new Error(`读取文件 ${file.name} 时发生错误：${e}`))

    reader.readAsBinaryString(file)
  })

  return hash
}

export const getBase64FromFile = async (file: File) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)

  const src = await new Promise((resolve) => {
    reader.onload = (event) => {
      resolve(event.target?.result)
    }
  })

  return src as string
}

/* ======================== 图片压缩 ======================== */
const fileToDataURL = (file: Blob): Promise<any> => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onloadend = (e) => resolve(e.target!.result)
    reader.readAsDataURL(file)
  })
}
const dataURLToImage = (dataURL: string): Promise<HTMLImageElement> => {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.src = dataURL
  })
}
const canvastoFile = (
  canvas: HTMLCanvasElement,
  type: string,
  quality: number,
) => {
  return new Promise<Blob | null>((resolve) =>
    canvas.toBlob((blob) => resolve(blob), type, quality),
  )
}
export const compressImg = async (file: File, imgSize: number) => {
  if (file.size < imgSize) return file

  const fileName = file.name
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')!
  const base64 = await fileToDataURL(file)
  const img = await dataURLToImage(base64)
  canvas.width = img.width
  canvas.height = img.height
  context.clearRect(0, 0, img.width, img.height)
  context.drawImage(img, 0, 0, img.width, img.height)

  let quality = 1.0
  let blob: Blob | null = null

  while (true) {
    if (quality <= 0) {
      throw new Error('图片压缩失败')
    }
    blob = await canvastoFile(canvas, 'image/jpeg', quality)
    if (!blob) {
      throw new Error('图片压缩失败')
    }
    if (blob.size <= imgSize) {
      break
    }

    quality -= 0.1
  }

  return await new File([blob], fileName, {
    type: file.type,
  })
}

/* ======================== 文件分块上传 ======================== */
export const uploadFileInChunks = async (
  file: File,
  uploadChunk: (opts: {
    fileName: string
    totalChunks: number
    chunkIndex: number
    chunk: Blob
  }) => Promise<void>,
  opts?: {
    chunkSize?: number
    updateProgress?: (progress: number) => void
    onError?: (index: number, error: unknown) => void
  },
) => {
  const { chunkSize = 1024 * 1024 * 1, updateProgress, onError } = opts ?? {}
  const totalChunks = Math.ceil(file.size / chunkSize)
  let chunkIndex = 0

  while (chunkIndex < totalChunks) {
    try {
      const start = chunkIndex * chunkSize
      const end = Math.min(start + chunkSize, file.size)
      const chunk = file.slice(start, end)
      await uploadChunk({ fileName: file.name, totalChunks, chunkIndex, chunk })

      chunkIndex++
      const progress = chunkIndex / totalChunks
      updateProgress?.(progress)
    } catch (error) {
      onError?.(chunkIndex, error)
      return
    }
  }
}
