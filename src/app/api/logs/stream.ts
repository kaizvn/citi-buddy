import { NextRequest, NextResponse } from 'next/server'
import { parse } from 'csv-parse'
import { Readable } from 'stream'
import { createNewLogFromRawData } from '@/services/servers/dataLog'

const streamCreateHandler = async (request: NextRequest) => {
  try {
    const { fileUrl } = await request.json()

    //todo: util from string to obj
    const formData = await request.formData()
    const fieldMappingString = formData.get('fieldMapping') as string
    const fieldMapper: { [key: string]: string } = fieldMappingString
      ? JSON.parse(fieldMappingString)
      : undefined

    if (!fileUrl) {
      return NextResponse.json(
        { error: 'File URL is required' },
        { status: 400 }
      )
    }

    const response = await fetch(fileUrl)
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch file' },
        { status: 400 }
      )
    }

    const readableStream = response.body as ReadableStream
    const reader = readableStream.getReader()
    const stream = new Readable({
      async read() {
        const { done, value } = await reader.read()
        if (done) {
          this.push(null)
        } else {
          this.push(Buffer.from(value))
        }
      },
    })
    const fileStream = stream

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
          source: 'stream',
        })

        processedRows++
      } catch (error) {
        console.error('Error processing row:', error)
        errorRows++
      }
    }

    return NextResponse.json({
      message: 'Import completed',
      processedRows,
      errorRows,
    })
  } catch (error) {
    console.error('Error importing data:', error)
    return NextResponse.json({ error: 'Error importing data' }, { status: 500 })
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}

export default streamCreateHandler
