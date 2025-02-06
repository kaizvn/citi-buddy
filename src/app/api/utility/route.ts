import prisma from '@/lib/prisma'
import { UtilityResponse } from './types'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const cityId = parseInt(searchParams.get('city_id') ?? '1')

  const utilities = await prisma.utility.findMany({})
  const dataLogs = await prisma.dataLog.groupBy({
    by: ['type_id', 'city_id'],
    _sum: {
      amount: true,
    },
  })

  return Response.json(
    utilities.map((utility) => ({
      ...utility,
      total:
        dataLogs.find(
          (log) => log.type_id === utility.id && log.city_id === cityId
        )?._sum.amount || 0,
    })) as UtilityResponse[]
  )
}
