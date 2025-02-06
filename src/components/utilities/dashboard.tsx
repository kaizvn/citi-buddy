'use client'

import StyledCard from '@/components/ui/card'
import { type IconName } from 'lucide-react/dynamic'
import useSWR from 'swr'
import { UtilityResponse } from '@/app/api/utility/types'
import React, { useState } from 'react'
import UtilityDetails from './details'
import CreateNewLog from '../logs/create'
import { fetcher } from '@/lib/utils'

const UtilitiesDashboard: React.FC = () => {
  const [selectedUtilities, setSelectedUtilities] =
    useState<UtilityResponse | null>(null)

  const handleCardClick = (utility: UtilityResponse) => {
    setSelectedUtilities(selectedUtilities?.id === utility.id ? null : utility)
  }

  const { data } = useSWR('/api/utility', fetcher)
  const utilityCards: UtilityResponse[] = data

  return (
    <>
      <div className="space-y-6 max-h-80">
        <div className="grid gap-4 md:grid-cols-3 ">
          {utilityCards?.map((utility) => (
            <StyledCard
              key={utility.id}
              title={utility.type}
              icon={utility.icon as IconName}
              onClick={() => handleCardClick(utility)}
              isSelected={utility.id === selectedUtilities?.id}
            >
              <div className="text-2xl font-bold">
                {utility.total?.toFixed(2)} {utility.unit}
              </div>
              <p className="text-xs text-muted-foreground">Total consumption</p>
            </StyledCard>
          ))}
        </div>

        {selectedUtilities && <UtilityDetails card={selectedUtilities} />}
      </div>
      <CreateNewLog />
    </>
  )
}

export default UtilitiesDashboard
