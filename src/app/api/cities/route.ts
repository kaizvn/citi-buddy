import prisma from '@/lib/prisma'

export async function GET() {
  const city = await prisma.city.findMany({})
  return Response.json(city)
}
