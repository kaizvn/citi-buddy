import { prisma } from '@/libs'
import { City } from '@prisma/client'
import { NextResponse } from 'next/server'
import { DEFAULT_LIMIT_ITEMS } from '../_utils/constant'

export async function GET(): Promise<Response> {
  try {
    const cities: City[] = await prisma.city.findMany({
      take: DEFAULT_LIMIT_ITEMS,
    })

    return Response.json(cities)
  } catch (error) {
    console.error('Error creating DataLog:', error)
    return NextResponse.json(
      { error: 'Error creating DataLog' },
      { status: 500 }
    )
  }
}
