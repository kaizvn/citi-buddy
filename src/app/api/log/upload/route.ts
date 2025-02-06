import { type NextRequest, NextResponse } from 'next/server'
import { parse } from 'csv-parse'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }

  try {
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const results = await processCSV(buffer)
    return NextResponse.json(
      { message: `Processed ${results.length} rows` },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing CSV:', error)
    return NextResponse.json({ error: 'Error processing CSV' }, { status: 500 })
  }
}

function processCSV(buffer: Buffer): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const results: any[] = []
    const parser = parse({
      delimiter: ',',
      columns: true,
      skip_empty_lines: true,
    })

    parser.on('readable', () => {
      let record
      while ((record = parser.read()) !== null) {
        results.push(record)
      }
    })

    parser.on('error', (err) => {
      reject(err)
    })

    parser.on('end', () => {
      resolve(results)
    })

    parser.write(buffer)
    parser.end()
  })
}
