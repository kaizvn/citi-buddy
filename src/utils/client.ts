'use client'

import { clsx, type ClassValue } from 'clsx'
import { flow, map, fromPairs, toPairs } from 'lodash/fp'
import moment from 'moment'
import { twMerge } from 'tailwind-merge'

export const calculateAvg = (data: Record<string, unknown>[], key: string) => {
  const totalVal = data.reduce((result, next) => {
    return result + ((next[key] as number) ?? 0)
  }, 0)
  return Number((totalVal / data.length).toFixed(2))
}

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const revertKeyValueObj = flow(
  toPairs,
  map(([key, value]) => [value, key]),
  fromPairs
)

// eg. generateSampleData(new Date('2025-01-01'),new Date('2025-02-01'),500)
export const generateSampleData = (
  startDate: Date,
  endDate: Date,
  maxNumberOfItems: number
) => {
  const data = []
  const currentDate = new Date(startDate)

  while (data.length < maxNumberOfItems && currentDate <= endDate) {
    const randomDate = new Date(
      startDate.getTime() +
        Math.random() * (endDate.getTime() - startDate.getTime())
    )
    data.push({
      id: Math.ceil(Math.random() * 3),
      date: moment(randomDate).format('YYYY-MM-DD'),
      amount: Number((Math.random() * 1000).toFixed(2)),
      city_id: 1,
      source: 'integration',
      created_at: Date.now().toString(),
    })
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return data
}

/* TODO :
 * []  GET datalog : JSON.parse(metadata) , merge with dataLog
 * []  POST datalog : JSON.stringify(dataLog) , set metadata for specific metadata key
 * [x] upload : map columns of csv to metadata, then JSON.stringify(object metadata) and set metadata before create dataLog
 * []  GET: /api/dataLog?city_id=1&utility_id=1 : add params to get list of metadata attribute of dataLog : JSON.parse(metadata) , merge with dataLog and return object has keys is metadata attribute
 * []  get : /api/metadata/?city_id=1&utility_id=1 : get list of metadata attribute of dataLog by city_id and utility_id
 */
