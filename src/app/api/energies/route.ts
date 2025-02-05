import { type Energies, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type EnergyResponse = Energies & {
    total: number;
};

export async function GET() {
    const energies = await prisma.energies.findMany({});
    const dataLogs = await prisma.dataLogs.groupBy({
        by: ["type_id"],
        _sum: {
            amount: true,
        },
    });

    console.log("energies", energies);
    return Response.json(
        energies.map((energy) => ({
            ...energy,
            total:
                dataLogs.find((log) => log.type_id === energy.id)?._sum
                    .amount || 0,
        })) as EnergyResponse[]
    );
}
