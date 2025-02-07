import prisma from '@/lib/prisma'
import { Utility } from '@prisma/client'
import moment from 'moment'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const DataLogSchema = z.object({
  type_id: z.number().int().positive(),
  amount: z.number().positive(),
  source: z.string().min(1),
  date: z
    .string()
    .optional()
    .refine((date) => moment(date).isValid(), {
      message: 'Invalid date format',
    }),
  city_id: z.number().int().positive().optional(),
})

export async function GET() {
  try {
    const utilities: Utility[] = await prisma.utility.findMany({})
    return Response.json(utilities)
  } catch (error) {
    console.error('Error creating DataLog:', error)
    return NextResponse.json(
      { error: 'Error creating DataLog' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = DataLogSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.issues },
        { status: 400 }
      )
    }

    const { type_id, amount, source, date, city_id } = result.data

    const newDataLog = await prisma.dataLog.create({
      data: {
        type_id,
        amount,
        source,
        date: moment(date || new Date()).format('YYYY-MM-DD'),
        city_id: city_id || 1, // Use default for POC
      },
    })

    return NextResponse.json(newDataLog, { status: 201 })
  } catch (error) {
    console.error('Error creating DataLog:', error)
    return NextResponse.json(
      { error: 'Error creating DataLog' },
      { status: 500 }
    )
  }
}

// const response = await fetch('/api/dataLog', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     type_id: 1,
//     amount: 100.5,
//     source: 'Meter Reading',
//     date: '2023-05-15',
//     city_id: 2
//   }),
// })
