import prisma from '@/lib/prisma'
// import { UtilityResponse } from './types'

export async function GET() {
  const utilities = await prisma.utility.findMany({})
  return Response.json(utilities)
}
