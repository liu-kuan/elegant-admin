// 用来存放请求返回体 code 不为 0 时的错误
export class CodeError extends Error {
  code: number
  name = 'CodeError'

  constructor(code: number, message: string) {
    super(message)
    this.code = code
  }

  /**
   * 判断错误码 code
   *
   * ```ts
   * try {
   *   throw new CodeError(10001, 'xxx')
   * } catch (error) {
   *   CodeError.codeIs(error, 10001) // true
   *   CodeError.codeIs(error, 10000) // false
   * }
   * try {
   *   throw new OtherError('xxx')
   * } catch (error) {
   *   CodeError.codeIs(error, 10001) // false
   * }
   * ```
   */
  static codeIs = (error: unknown, errorcode: number | number[]): boolean => {
    if (error instanceof CodeError) {
      if (Array.isArray(errorcode)) {
        if (errorcode.includes(error.code)) {
          return true
        }
      } else {
        if (error.code === errorcode) {
          return true
        }
      }
    }

    return false
  }

  toString = () => {
    const errStrArr = this.message.match(/error=\((.*?)\)/s)
    const msgStrArr = this.message.match(/msg=\((.*?)\)/s)

    const err = errStrArr ? errStrArr[1] : null
    const msg = msgStrArr ? msgStrArr[1] : null

    return err ?? msg ?? '未知错误，请联系管理员！'
  }
}

export enum ErrorCodes {
  TokenInvalid = 200000,
}
