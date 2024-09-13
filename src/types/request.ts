export interface ResponseData<T = never> {
  code: number
  err_msg: string
  data: T
}

export interface TokenPayload {
  email: string
  exp: number
  iat: number
  id: number
  iss: string
  username: string
}
