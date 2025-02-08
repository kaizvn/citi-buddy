import { NextResponse } from 'next/server'
import { DEFAULT_LIMIT_ITEMS } from '../_utils/constant'
import UtilityService from '@/services/servers/utility'

export async function GET() {
  try {
    const utilities = await UtilityService.findMany({
      take: DEFAULT_LIMIT_ITEMS,
    })
    return Response.json(utilities)
  } catch (error) {
    console.error('Error creating DataLog:', error)
    return NextResponse.json(
      { error: 'Error creating DataLog' },
      { status: 500 }
    )
  }
}
