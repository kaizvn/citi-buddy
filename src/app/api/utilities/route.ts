import { prisma } from '@/libs'
import { NextResponse } from 'next/server'
import { DEFAULT_LIMIT_ITEMS } from '../_utils/constant'

export async function GET() {
  try {
    const utilities = await prisma.utility.findMany({
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
