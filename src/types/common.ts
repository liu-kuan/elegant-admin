export class Pagination {
  page: number
  pageSize: number

  constructor(p?: Partial<Pagination>) {
    this.page = p?.page ?? 0
    this.pageSize = p?.pageSize ?? 10
  }
}

export class ListData<Item> {
  items: Item[] = []
  totalCount: number = 0
}

// 获取 api 接口的 await 之后的返回值类型
// export type ApiReturnType<T extends (...args: any) => any> = Awaited<
//   ReturnType<T>
// >
