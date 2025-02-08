import { prisma } from '@/libs'
import { NextResponse, type NextRequest } from 'next/server'
import { UtilityLogResponse } from '../../_utils/responseTypes'

type DataLogQuery = {
  type_id: number
  city_id?: number
}

const LIMIT_GROUPED_LOGS = 10

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const searchParams = request.nextUrl.searchParams
    const cityId = Number(searchParams.get('city_id') ?? '1') // default 1 for POC
    const id = Number((await params).id)

    const query: DataLogQuery = {
      type_id: id,
      ...(cityId ? { city_id: cityId } : {}),
    }

    const utility = await prisma.utility.findFirst({
      where: {
        id,
      },
    })

    const matchedDataLogs = await prisma.dataLog.groupBy({
      by: ['logged_date'],
      orderBy: { logged_date: 'asc' },
      where: query,
      _sum: { amount: true },
      take: LIMIT_GROUPED_LOGS,
    })

    const dataLogs: UtilityLogResponse[] = matchedDataLogs.map((data) => ({
      logged_date: data.logged_date,
      total: Number((data._sum.amount ?? 0).toFixed(2)),
    }))

    return Response.json({
      ...utility,
      dataLogs,
    })
  } catch (error) {
    console.error('Error creating DataLog:', error)
    return NextResponse.json(
      { error: 'Error creating DataLog' },
      { status: 500 }
    )
  }
}
