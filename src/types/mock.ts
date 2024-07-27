export class MockApi {
  name: string = ''
  url: string = ''
  method: 'GET' | 'POST' | 'ALL' = 'ALL'
  delay: number = 200
  active: boolean = true
  responseBody = {
    code: 0,
    data: {} as any,
    err_msg: 'success',
  }
}
