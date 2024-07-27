export const formatTime = (
  rowTime: number | string | Date,
  formatter?: (
    opts: {
      year: number
      month: number
      day: number
      hours: number
      minutes: number
      seconds: number
    },
    pad: (value: number) => string,
  ) => string,
) => {
  if (!rowTime) return '--'

  if (typeof rowTime === 'number' && rowTime.toString().length === 10) {
    rowTime *= 1000
  }

  const dateTime = new Date(rowTime)

  const year = dateTime.getFullYear()
  const month = dateTime.getMonth() + 1
  const day = dateTime.getDate()
  const hours = dateTime.getHours()
  const minutes = dateTime.getMinutes()
  const seconds = dateTime.getSeconds()

  const _pad = (value: number) => String(value).padStart(2, '0')

  if (formatter) {
    return formatter(
      {
        year,
        month,
        day,
        hours,
        minutes,
        seconds,
      },
      _pad,
    )
  }

  return `${year}-${_pad(month)}-${_pad(day)} ${_pad(hours)}:${_pad(minutes)}:${_pad(seconds)}`
}

export const timestamps = {
  oneDayAgo: Math.floor((Date.now() - 24 * 60 * 60 * 1000) / 1000),
  threeDayAgo: Math.floor((Date.now() - 3 * 24 * 60 * 60 * 1000) / 1000),
  oneWeekAgo: Math.floor((Date.now() - 7 * 24 * 60 * 60 * 1000) / 1000),
  oneMonthAgo: Math.floor(
    new Date(Date.now()).setMonth(new Date(Date.now()).getMonth() - 1) / 1000,
  ),
  threeMonthsAgo: Math.floor(
    new Date(Date.now()).setMonth(new Date(Date.now()).getMonth() - 3) / 1000,
  ),
  sixMonthsAgo: Math.floor(
    new Date(Date.now()).setMonth(new Date(Date.now()).getMonth() - 6) / 1000,
  ),
  oneYearAgo: Math.floor(
    new Date(Date.now()).setFullYear(new Date(Date.now()).getFullYear() - 1) /
      1000,
  ),
  threeYearAgo: Math.floor(
    new Date(Date.now()).setFullYear(new Date(Date.now()).getFullYear() - 3) /
      1000,
  ),
}

interface TimestampLabel {
  timestamp: number
  label: string
}
export const getTimeRangesAfter = (timestamp: number = 0) => {
  const times: TimestampLabel[] = [
    {
      timestamp: timestamps.oneDayAgo,
      label: '一天内',
    },
    {
      timestamp: timestamps.threeDayAgo,
      label: '三天内',
    },
    {
      timestamp: timestamps.oneWeekAgo,
      label: '一周内',
    },
    {
      timestamp: timestamps.oneMonthAgo,
      label: '一个月内',
    },
    {
      timestamp: timestamps.threeMonthsAgo,
      label: '三个月内',
    },
    {
      timestamp: timestamps.sixMonthsAgo,
      label: '六个月内',
    },
    {
      timestamp: timestamps.oneYearAgo,
      label: '一年内',
    },
    {
      timestamp: timestamps.threeYearAgo,
      label: '三年内',
    },
    {
      timestamp: 0,
      label: '所有',
    },
  ]

  const result: TimestampLabel[] = []

  for (const time of times) {
    if (time.timestamp >= timestamp) {
      result.push(time)
    } else {
      break
    }
  }

  return result
}

export const sleep = (delay: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, delay)
  })
}

export const getCurrentTimestamp = () => Math.floor(new Date().getTime() / 1000)

export const getTimeDifference = (
  timestamp1: number,
  timestamp2: number,
): string => {
  if (timestamp1.toString().length === 13) {
    timestamp1 /= 1000
  }

  if (timestamp2.toString().length === 13) {
    timestamp2 /= 1000
  }

  const timeDiff = timestamp2 - timestamp1
  const minutes = Math.floor(timeDiff / 60) % 60
  const hours = Math.floor(timeDiff / (60 * 60)) % 24
  const days = Math.floor(timeDiff / (60 * 60 * 24)) % 30
  const months = Math.floor(timeDiff / (60 * 60 * 24 * 30)) % 12
  const years = Math.floor(timeDiff / (60 * 60 * 24 * 30 * 12))

  let result = ''

  if (years > 0) {
    result += `${years}年`
  }

  if (months > 0) {
    result += `${months}月`
  }

  if (days > 0) {
    result += `${days}天`
  }

  if (hours > 0) {
    result += `${hours}小时`
  }

  if (minutes > 0) {
    result += `${minutes}分钟`
  }

  return result
}
