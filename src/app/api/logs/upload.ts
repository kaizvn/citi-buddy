import { NextRequest, NextResponse } from 'next/server'
import { parse } from 'csv-parse'
import { Readable } from 'stream'
import { createNewLogFromRawData } from '@/services/servers/dataLog'

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

    //todo: util from string to obj
    const fieldMappingString = formData.get('fieldMapping') as string
    const fieldMapper: { [key: string]: string } = fieldMappingString
      ? JSON.parse(fieldMappingString)
      : undefined

    const fileBuffer = await file.arrayBuffer()
    const fileStream = Readable.from(Buffer.from(fileBuffer))

    const parser = parse({
      columns: true,
      skip_empty_lines: true,
    })

    let processedRows = 0
    let errorRows = 0
    const cachedMetadataByUtilityID = {} // bad implementation, refactoring LogService later

    for await (const rawData of fileStream.pipe(parser)) {
      try {
        await createNewLogFromRawData({
          rawData,
          fieldMapper,
          cachedMetadataByUtilityID,
        })

        processedRows++
      } catch (error) {
        console.error('Error processing row:', error as Error)
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

export default uploadHandler
