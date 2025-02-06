import prisma from '@/lib/prisma'
import { UtilityResponse } from './types'

export async function GET() {
  const utilities = await prisma.utility.findMany({})
  const dataLogs = await prisma.dataLog.groupBy({
    by: ['type_id'],
    _sum: {
      amount: true,
    },
  })

  return Response.json(
    utilities.map((utility) => ({
      ...utility,
      total:
        dataLogs.find((log) => log.type_id === utility.id)?._sum.amount || 0,
    })) as UtilityResponse[]
  )
}
