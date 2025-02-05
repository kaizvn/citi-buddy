import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const energies = [
        { id: 1, type: "water supply", unit: "m3", icon: "droplet" },
        { id: 2, type: "electricity", unit: "kWh", icon: "zap" },
        { id: 3, type: "waste", unit: "kg", icon: "trash" },
    ];

    for (const energy of energies) {
        await prisma.energies.upsert({
            where: { id: energy.id },
            update: energy,
            create: energy,
        });
    }

    console.log("Seed data for energies model created.");

    const data = [
        {
            id: 1,
            type_id: 1,
            amount: Math.random() * 100,
            source: "integration",
            created_at: new Date(),
        },
        {
            id: 2,
            type_id: 2,
            amount: Math.random() * 100,
            source: "uploaded",
            created_at: new Date(),
        },
        {
            id: 3,
            type_id: 3,
            amount: Math.random() * 100,
            source: "manual",
            created_at: new Date(),
        },
        {
            id: 4,
            type_id: 1,
            amount: Math.random() * 100,
            source: "integration",
            created_at: new Date(),
        },
        {
            id: 5,
            type_id: 2,
            amount: Math.random() * 100,
            source: "uploaded",
            created_at: new Date(),
        },
        {
            id: 6,
            type_id: 3,
            amount: Math.random() * 100,
            source: "manual",
            created_at: new Date(),
        },
        {
            id: 7,
            type_id: 1,
            amount: Math.random() * 100,
            source: "integration",
            created_at: new Date(),
        },
        {
            id: 8,
            type_id: 2,
            amount: Math.random() * 100,
            source: "uploaded",
            created_at: new Date(),
        },
        {
            id: 9,
            type_id: 3,
            amount: Math.random() * 100,
            source: "manual",
            created_at: new Date(),
        },
    ];

    for (const log of data) {
        await prisma.dataLogs.upsert({
            where: { id: log.id },
            update: {},
            create: log,
        });
    }

    console.log("Sample dataLogs created.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
