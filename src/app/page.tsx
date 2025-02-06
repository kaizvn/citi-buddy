import UtilitiesDashboard from '@/components/utilities/dashboard'

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        City Utilities Dashboard
      </h1>
      <UtilitiesDashboard />
    </main>
  )
}
