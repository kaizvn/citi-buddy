import prisma from '@/lib/prisma'
import { UtilityLogResponse } from '../types'
import { type NextRequest } from 'next/server'

type DataLogQuery = {
  type_id: number
  city_id?: number
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const searchParams = request.nextUrl.searchParams
    const cityId = Number(searchParams.get('city_id') ?? '1')
    const id = Number((await params).id)

    const query: DataLogQuery = {
      type_id: id,
    }

    if (cityId) {
      query.city_id = cityId
    }

    const utility = await prisma.utility.findFirst({
      where: {
        id,
      },
    })

    const matchedDataLogs = await prisma.dataLog.groupBy({
      by: ['date'],
      orderBy: { date: 'asc' },
      where: query,
      _sum: { amount: true },
    })

    const dataLogs: UtilityLogResponse[] = matchedDataLogs.map((data) => ({
      date: data.date,
      total: Number((data._sum.amount ?? 0).toFixed(2)),
    }))

    return Response.json({
      ...utility,
      dataLogs,
    })
  } catch (error) {
    let errorMessage = 'Failed to do something exceptional'
    if (error instanceof Error) {
      errorMessage = error.message
    }

    return new Response(errorMessage, { status: 500 })
  }
}
