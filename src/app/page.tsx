import { EnergyDashboard } from "@/components/energy-dashboard"

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Energy Dashboard</h1>
      <EnergyDashboard />
    </main>
  )
}

