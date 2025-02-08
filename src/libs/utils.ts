import { clsx, type ClassValue } from 'clsx'
import { flow, map, fromPairs, toPairs, filter } from 'lodash/fp'
import moment from 'moment'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface DataLog {
  date: string
  value: number
}

export const getLogTransformFunc = (
  requiredKeys: string[],
  attrMapper: { [key: string]: string }
) =>
  flow(
    toPairs,
    map(([key, value]) => {
      if (requiredKeys.includes(key)) {
        return [key, value]
      } else if (attrMapper[key]) {
        return [attrMapper[key], value]
      } else {
        return []
      }
    }),
    filter((arr) => !!arr.length),
    fromPairs
  )

export const revertKeyValueObj = flow(
  toPairs,
  map(([key, value]) => [value, key]),
  fromPairs
)

export const generateSampleData = (
  startDate: Date,
  endDate: Date,
  numberOfItems: number
): DataLog[] => {
  const data: DataLog[] = []
  const currentDate = new Date(startDate)

  while (data.length < numberOfItems && currentDate <= endDate) {
    const randomDate = new Date(
      startDate.getTime() +
        Math.random() * (endDate.getTime() - startDate.getTime())
    )
    data.push({
      date: moment(randomDate).format('YYYY-MM-DD'),
      value: Math.random() * 1000,
    })
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return data
}

/* TODO :
 * []  GET datalog : JSON.parse(metadata) , merge with dataLog
 * []  POST datalog : JSON.stringify(dataLog) , set metadata for specific metadata key
 * [x] upload : map columns of csv to metadata, then JSON.stringify(object metadata) and set metadata before create dataLog
 * []  GET: /api/dataLog?city_id=1&type_id=1 : add params to get list of metadata attribute of dataLog : JSON.parse(metadata) , merge with dataLog and return object has keys is metadata attribute
 * []  get : /api/metadata/?city_id=1&type_id=1 : get list of metadata attribute of dataLog by city_id and type_id
 */
