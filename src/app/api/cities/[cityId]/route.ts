import { NextRequest, NextResponse } from 'next/server'
import { GetCityByIDResponse } from '../../_utils/responseTypes'
import UtilityService from '@/services/servers/utility'
import DataLogService from '@/services/servers/dataLog'
import CityService from '@/services/servers/city'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ cityId: string }> }
) {
  try {
    const cityId = Number((await params).cityId)
    const city = await CityService.findFirst({
      where: {
        id: cityId,
      },
    })

    if (!city) {
      return NextResponse.json({ message: 'data not found' }, { status: 404 })
    }

    const utilities = await UtilityService.findMany({})

    const dataLogs = await DataLogService.groupBy({
      by: ['utility_id', 'city_id'],
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
            (log) => log.utility_id === utility.id && log.city_id === cityId
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
