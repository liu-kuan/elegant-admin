export type RequestErrorType = 'network' | 'api'

export const getNetworkErrorTypeString = (type: RequestErrorType) => {
  switch (type) {
    case 'network':
      return '网络异常'
    case 'api':
      return 'API 异常'
  }
}

export class RequestError {
  type: RequestErrorType
  content: any
  time: number
  isRead = false

  constructor(type: RequestErrorType, content: any, time: number) {
    this.type = type
    this.content = content
    this.time = time
  }
}
