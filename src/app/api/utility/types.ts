import { Utility } from '@prisma/client'

export type UtilityResponse = Utility & {
  total: number
}

export type UtilityLogResponse = {
  date: string
  total: number
}
