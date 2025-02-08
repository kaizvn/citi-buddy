import { prisma } from '@/libs'

import { NextRequest, NextResponse } from 'next/server'
import { GetCityByIDResponse } from '../../_utils/responseTypes'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ cityId: string }> }
) {
  try {
    const cityId = Number((await params).cityId)
    const city = await prisma.city.findFirst({
      where: {
        id: cityId,
      },
    })

    if (!city) {
      return NextResponse.json({ message: 'data not found' }, { status: 404 })
    }

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

    const result: GetCityByIDResponse = {
      ...city,
      utilities: utilities.map((utility) => ({
        ...utility,
        total:
          dataLogs.find(
            (log) => log.type_id === utility.id && log.city_id === cityId
          )?._sum.amount || 0,
      })),
    }

    return Response.json(result)
  } catch (error) {
    console.error('Error creating DataLog:', error)
    return NextResponse.json(
      { error: 'Error creating DataLog' },
      { status: 500 }
    )
  }
}
