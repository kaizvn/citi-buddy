import { DataLog } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import uploadHandler from './upload'
import manualCreateHandler from './manual'
import { DEFAULT_LIMIT_ITEMS } from '../_utils/constant'
import streamCreateHandler from './stream'
import DataLogService from '@/services/servers/dataLog'

export async function GET() {
  try {
    const dataLog: DataLog[] = await DataLogService.findMany({
      take: DEFAULT_LIMIT_ITEMS,
    })

    return Response.json(dataLog)
  } catch (error) {
    console.error('Error creating DataLog:', error)
    return NextResponse.json(
      { error: 'Error creating DataLog' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const type = searchParams.get('type') ?? 'manual'
  if (type === 'upload') {
    return uploadHandler(request)
  } else if (type === 'url') {
    return streamCreateHandler(request)
  } else {
    return manualCreateHandler(request)
  }
}
