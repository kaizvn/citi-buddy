import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const cities = [
    {
      id: 1,
      name: 'Ho Chi Minh City',
      code: 'HCM',
      countryCode: 'VN',
      phoneCode: 84,
    },
  ]

  for (const city of cities) {
    await prisma.city.upsert({
      where: { id: city.id },
      update: city,
      create: city,
    })
  }

  const utilities = [
    { id: 1, type: 'water supply', unit: 'm3', icon: 'droplet' },
    { id: 2, type: 'electricity', unit: 'kWh', icon: 'zap' },
    { id: 3, type: 'waste', unit: 'kg', icon: 'trash' },
  ]

  for (const utility of utilities) {
    await prisma.utility.upsert({
      where: { id: utility.id },
      update: utility,
      create: utility,
    })
  }

  console.log('Seed data for Utilities model created.')

  const data = [
    {
      id: 1,
      type_id: 1,
      city_id: 1,
      amount: Math.random() * 100,
      source: 'integration',
      date: '2025-01-04',
      created_at: new Date('2025-01-04'),
    },
    {
      id: 2,
      type_id: 2,
      city_id: 1,
      amount: Math.random() * 100,
      source: 'uploaded',
      date: '2025-01-04',
      created_at: new Date('2025-01-04'),
    },
    {
      id: 3,
      type_id: 3,
      city_id: 1,
      amount: Math.random() * 100,
      source: 'manual',
      date: '2025-01-04',
      created_at: new Date('2025-01-04'),
    },
    {
      id: 4,
      type_id: 1,
      city_id: 1,
      amount: Math.random() * 100,
      source: 'integration',
      date: '2025-01-05',
      created_at: new Date('2025-01-05'),
    },
    {
      id: 5,
      type_id: 2,
      city_id: 1,
      amount: Math.random() * 100,
      source: 'uploaded',
      date: '2025-01-05',
      created_at: new Date('2025-01-05'),
    },
    {
      id: 6,
      type_id: 3,
      city_id: 1,
      amount: Math.random() * 100,
      source: 'manual',
      date: '2025-01-05',
      created_at: new Date('2025-01-05'),
    },
    {
      id: 7,
      type_id: 1,
      city_id: 1,
      amount: Math.random() * 100,
      source: 'integration',
      date: '2025-01-06',
      created_at: new Date('2025-01-06'),
    },
    {
      id: 8,
      type_id: 2,
      city_id: 1,
      amount: Math.random() * 100,
      source: 'uploaded',
      date: '2025-01-06',
      created_at: new Date('2025-01-06'),
    },
    {
      id: 9,
      type_id: 3,
      city_id: 1,
      amount: Math.random() * 100,
      source: 'manual',
      date: '2025-01-06',
      created_at: new Date('2025-01-06'),
    },
  ]

  for (const log of data) {
    await prisma.dataLog.upsert({
      where: { id: log.id },
      update: log,
      create: log,
    })
  }

  console.log('Sample dataLogs created.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
