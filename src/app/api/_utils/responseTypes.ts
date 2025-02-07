import { City, Utility } from '@prisma/client'

export type GetCityByIDResponse = City & {
  utilities: (Utility & { total: number })[]
}

export type UtilityResponse = Utility & {
  total: number
}

export type UtilityLogResponse = {
  date: string
  total: number
}

export type GetUtilityByIDResponse = Utility & {
  dataLogs: UtilityLogResponse[]
}
