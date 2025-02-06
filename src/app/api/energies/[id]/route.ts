import prisma from '@/lib/prisma'

export type EnergyResponse = {
  date: string
  total: number
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    const id = Number((await params).id)

    const dataLogs = await prisma.dataLogs.groupBy({
      by: ['date'],
      orderBy: { date: 'asc' },
      where: { type_id: id },
      _sum: { amount: true },
    })

    const response: EnergyResponse[] = dataLogs.map((data) => ({
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
