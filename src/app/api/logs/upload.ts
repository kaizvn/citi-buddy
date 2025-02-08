import { NextRequest, NextResponse } from 'next/server'
import { parse } from 'csv-parse'
import { Readable } from 'stream'
import { z } from 'zod'
import { prisma } from '@/libs'
import { getLogTransformFunc } from '@/libs/utils'

const RowSchema = z.object({
  type_id: z.string().transform((val) => parseInt(val)),
  amount: z.string().transform((val) => parseFloat(val)),
  logged_date: z.string(),
  city_id: z.string().transform((val) => parseInt(val)),
})

const getFieldMapperTransformer = (fieldMapping?: string) => {
  if (!fieldMapping) {
    return (val: unknown) => val
  }

  const fieldMapper: { [key: string]: string } = JSON.parse(fieldMapping)

  return getLogTransformFunc(
    ['type_id', 'amount', 'logged_date', 'city_id'],
    fieldMapper
  )
}

const uploadHandler = async (request: NextRequest) => {
  const contentType = request.headers.get('content-type')
  if (!contentType || !contentType.includes('multipart/form-data')) {
    return NextResponse.json({ error: 'Invalid content type' }, { status: 400 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const fieldMapping = formData.get('fieldMapping') as string
    const transformedLog = getFieldMapperTransformer(fieldMapping)

    const fileBuffer = await file.arrayBuffer()
    const fileStream = Readable.from(Buffer.from(fileBuffer))

    const parser = parse({
      columns: true,
      skip_empty_lines: true,
    })

    let processedRows = 0
    let errorRows = 0

    for await (const row of fileStream.pipe(parser)) {
      try {
        const processedRow = transformedLog(row)
        const validatedRow = RowSchema.parse(processedRow)

        await prisma.dataLog.create({
          data: { ...validatedRow, source: 'upload' },
        })
        processedRows++
      } catch (error) {
        console.error('Error processing row:', (error as Error).message)
        errorRows++
      }
    }

    return NextResponse.json({
      message: 'CSV processing completed',
      processedRows,
      errorRows,
    })
  } catch (error) {
    console.error('Error processing CSV:', error)
    return NextResponse.json({ error: 'Error processing CSV' }, { status: 500 })
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default uploadHandler
