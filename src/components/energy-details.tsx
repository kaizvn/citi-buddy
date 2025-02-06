import React from 'react'
import { EnergyChart } from './energy-chart'
import { TabsList, TabsTrigger, TabsContent, Tabs } from './ui/tab'
import { EnergyResponse } from '@/app/api/energies/route'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const EnergyDetails: React.FC<{ card: EnergyResponse | undefined }> = ({
  card,
}) => {
  const { data } = useSWR(`/api/energies/${card?.id}`, fetcher)

  if (!data || !card) return null

  return (
    <details open className="bg-white shadow-md rounded-lg overflow-hidden">
      <summary className="px-4 py-2 bg-gray-100 font-medium cursor-pointer">
        {card.type} Consumption Details
      </summary>
      <div className="p-4">
        <Tabs defaultTab="chart">
          <TabsList>
            <TabsTrigger value="chart">Chart</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
          </TabsList>
          <TabsContent value="chart">
            <EnergyChart data={data} />
          </TabsContent>
          <TabsContent value="data">
            <div className="mb-4 flex flex-col-reverse">
              {data.map((item: { date: string; total: number }) => (
                <div key={item.date} className="flex justify-between mt-0 mb-2">
                  <span>{item.date}</span>
                  <span>
                    {item.total} {card.unit}
                  </span>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </details>
  )
}

export default EnergyDetails
