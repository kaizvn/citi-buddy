import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface DataLog {
  date: string
  value: number
}

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
      date: randomDate.toISOString().split('T')[0],
      value: Math.random() * 1000,
    })
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return data
}
