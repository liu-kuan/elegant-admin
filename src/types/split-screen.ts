export class PageInfo {
  name: string = ''
  label: string = ''
}

export type Side = 'first' | 'second'

export class SplitScreenInfo {
  id: string = ''
  pages: [string, string] = ['', '']
  isHorizontal: boolean = false
}
