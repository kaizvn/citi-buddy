"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tab"
import { EnergyChart } from "./energy-chart"
import { DynamicIcon, type IconName } from 'lucide-react/dynamic';
import useSWR from "swr"
import { EnergyResponse } from "@/app/api/energies/route"


type MockData = {
  daily: {
    date: string;
    value: number;
  }[]
}

const mockData: Record<number,MockData> = {
  1: {
    daily: [
      { date: "2023-06-01", value: 150 },
      { date: "2023-06-02", value: 160 },
      { date: "2023-06-03", value: 140 },
      { date: "2023-06-04", value: 170 },
      { date: "2023-06-05", value: 155 },
      { date: "2023-06-06", value: 165 },
      { date: "2023-06-07", value: 160 },
    ],
  },
  2: {
    daily: [
      { date: "2023-06-01", value: 70 },
      { date: "2023-06-02", value: 75 },
      { date: "2023-06-03", value: 68 },
      { date: "2023-06-04", value: 80 },
      { date: "2023-06-05", value: 72 },
      { date: "2023-06-06", value: 76 },
      { date: "2023-06-07", value: 74 },
    ],
  },
  3: {
    daily: [
      { date: "2023-06-01", value: 40 },
      { date: "2023-06-02", value: 45 },
      { date: "2023-06-03", value: 38 },
      { date: "2023-06-04", value: 50 },
      { date: "2023-06-05", value: 42 },
      { date: "2023-06-06", value: 46 },
      { date: "2023-06-07", value: 44 },
    ],
  },
}


const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function EnergyDashboard() {

  const { data  } = useSWR('/api/energies', fetcher);
  const energyCards: EnergyResponse[]  = data;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {energyCards?.map((card) => (
        <Dialog key={card.id}>
          <DialogTrigger asChild>
            <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{card.type}</CardTitle>
                {!!card.icon && <DynamicIcon name={card.icon as IconName} className="h-4 w-4 text-muted-foreground" />}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {card.total?.toFixed(2)} {card.unit}
                </div>
                <p className="text-xs text-muted-foreground">Total consumption</p>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{card.type} Consumption</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="chart" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="chart">Chart</TabsTrigger>
                <TabsTrigger value="data">Data</TabsTrigger>
              </TabsList>
              <TabsContent value="chart">
                <EnergyChart data={mockData[card.id].daily} />
              </TabsContent>
              <TabsContent value="data">
                <div className="space-y-2">
                  {mockData[card.id].daily.map((item) => (
                    <div key={item.date} className="flex justify-between">
                      <span>{item.date}</span>
                      <span>
                        {item.value} {card.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  )
}

