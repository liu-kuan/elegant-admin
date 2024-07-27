import * as xlsx from 'xlsx'

type Row = Record<string, any>

export const exportJSONToXlsx = (
  data: Row[],
  fileName: string = 'export_table_data.xlsx',
) => {
  const worksheet = xlsx.utils.json_to_sheet(flatData(data))
  const workbook = xlsx.utils.book_new()
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
  xlsx.writeFile(workbook, fileName)
}

const flatData = (data: Row[]) => {
  const result: Row[] = []

  for (const row of data) {
    const flatRow: Row = {}
    for (const [key, value] of Object.entries(row)) {
      flatRow[key] = formatValue(value)
    }
    result.push(flatRow)
  }

  return result
}

function formatValue(value: any): string {
  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  ) {
    return String(value)
  } else if (Array.isArray(value)) {
    return `[${value.map(formatValue).join(', ')}]`
  } else if (typeof value === 'object' && value !== null) {
    return `{${Object.entries(value)
      .map(([key, val]) => `${key}: ${formatValue(val)}`)
      .join(', ')}}`
  } else {
    return 'null' // 对于其他类型的值，比如 undefined 或 null，返回 'null'
  }
}
