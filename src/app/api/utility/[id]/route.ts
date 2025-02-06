import prisma from '@/lib/prisma'
import { UtilityLogResponse } from '../types'
import { type NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    const searchParams = request.nextUrl.searchParams
    const cityId = parseInt(searchParams.get('city_id') ?? '1')
    const id = Number((await params).id)

    const dataLogs = await prisma.dataLog.groupBy({
      by: ['date'],
      orderBy: { date: 'asc' },
      where: { type_id: id, city_id: cityId },
      _sum: { amount: true },
    })

    const response: UtilityLogResponse[] = dataLogs.map((data) => ({
      date: data.date,
      total: Number((data._sum.amount ?? 0).toFixed(2)),
    }))

    return Response.json(response)
  } catch (error) {
    let errorMessage = 'Failed to do something exceptional'
    if (error instanceof Error) {
      errorMessage = error.message
    }

    return new Response(errorMessage, { status: 500 })
  }
}
