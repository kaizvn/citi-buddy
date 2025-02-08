import moment from 'moment'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const DataLogSchema = z.object({
  type_id: z.number().int().positive(),
  amount: z.number().positive(),
  metadata: z
    .string()
    .optional()
    .refine(
      (metadata) => {
        if (!metadata) return true
        try {
          JSON.parse(metadata)
          return true
        } catch {
          return false
        }
      },
      {
        message: 'Invalid JSON format',
      }
    ),
  logged_date: z
    .string()
    .optional()
    .refine((logged_date) => moment(logged_date).isValid(), {
      message: 'Invalid date format',
    }),
  city_id: z.number().int().positive().optional(),
})

const manualCreateHandler = async (request: NextRequest) => {
  try {
    const body = await request.json()
    const result = DataLogSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.issues },
        { status: 400 }
      )
    }

    const { type_id, city_id, amount, logged_date, metadata } = result.data

    const newDataLog = await prisma.dataLog.create({
      data: {
        type_id,
        amount,
        metadata,
        source: 'manual',
        logged_date: moment(logged_date || new Date()).format('YYYY-MM-DD'),
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
export default manualCreateHandler
