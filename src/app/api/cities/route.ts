import prisma from '@/lib/prisma'
import { City } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function GET(): Promise<Response> {
  try {
    const cities: City[] = await prisma.city.findMany({})

    return Response.json(cities)
  } catch (error) {
    console.error('Error creating DataLog:', error)
    return NextResponse.json(
      { error: 'Error creating DataLog' },
      { status: 500 }
    )
  }
}
