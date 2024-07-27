import { Pagination } from './common'

export class User {
  id = 0
  username = ''
  email = ''
}

export enum ActivityErrType {
  All = 0,
  Success = 1,
  Error = -1,
}
export namespace ActivityErrType {
  export const getString = (deleteFlag: ActivityErrType): string => {
    switch (deleteFlag) {
      case ActivityErrType.All:
        return '所有'
      case ActivityErrType.Success:
        return '成功'
      case ActivityErrType.Error:
        return '失败'
    }
  }
}

export class GetActivitiesReq extends Pagination {
  userIds: number[] = []
  apiResourceId = 0
  errSelect = {
    all: ActivityErrType.All,
    some: [] as number[],
  }

  timeAfter = 0
}

export class Activity {
  userId = 0
  username = ''
  activityId = ''
  errCode = 0
  createTimeMs = 0
  displayGroup = ''
  displayMember = ''
  displayDescription = ''
  apiResourceId = 107
  url = ''
  // options: Record<string, string> = {}
}
