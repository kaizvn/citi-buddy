'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'
import useSWR from 'swr'
import { EnergyResponse } from '@/app/api/energies/route'
import { useState } from 'react'
import EnergyDetails from './energy-details'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function EnergyDashboard() {
  const [selectedEnergy, setSelectedEnergy] = useState<number | null>(null)
  const handleCardClick = (type: number) => {
    setSelectedEnergy(selectedEnergy === type ? null : type)
  }

  const { data } = useSWR('/api/energies', fetcher)
  const energyCards: EnergyResponse[] = data

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {energyCards?.map((card) => (
          <Card
            key={card.id}
            className="cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => handleCardClick(card.id)}
            isSelected={card.id === selectedEnergy}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.type}</CardTitle>
              {!!card.icon && (
                <DynamicIcon
                  name={card.icon as IconName}
                  className="h-4 w-4 text-muted-foreground"
                />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {card.total?.toFixed(2)} {card.unit}
              </div>
              <p className="text-xs text-muted-foreground">Total consumption</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedEnergy && (
        <EnergyDetails
          card={energyCards.find((card) => card.id === selectedEnergy)}
        />
      )}
    </div>
  )
}
