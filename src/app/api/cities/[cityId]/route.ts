import prisma from '@/lib/prisma'

import { NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ cityId: string }> }
) {
  const cityId = Number((await params).cityId)
  const city = await prisma.city.findFirst({
    where: {
      id: cityId,
    },
  })

  const utilities = await prisma.utility.findMany({})
  const dataLogs = await prisma.dataLog.groupBy({
    by: ['type_id', 'city_id'],
    where: {
      city_id: cityId,
    },
    _sum: {
      amount: true,
    },
  })

  return Response.json({
    ...city,
    utilities: utilities.map((utility) => ({
      ...utility,
      total:
        dataLogs.find(
          (log) => log.type_id === utility.id && log.city_id === cityId
        )?._sum.amount || 0,
    })),
  })
}
