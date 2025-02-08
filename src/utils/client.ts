'use client'

export const calculateAvg = (data: Record<string, unknown>[], key: string) => {
  const totalVal = data.reduce((result, next) => {
    return result + ((next[key] as number) ?? 0)
  }, 0)
  return Number((totalVal / data.length).toFixed(2))
}
