'use client'

import StyledCard from '@/components/ui/card'
import { type IconName } from 'lucide-react/dynamic'
import useSWR from 'swr'

import React, { useContext, useState } from 'react'
import UtilityDetails from './details'
import CreateNewLog from '../log/create'
import { fetcher } from '@/lib/utils'
import { AppContext } from '../context'
import {
  GetCityByIDResponse,
  UtilityResponse,
} from '@/app/api/_utils/responseTypes'

const UtilitiesDashboard: React.FC = () => {
  const [selectedUtilityID, setSelectedUtilityID] = useState<number | null>(
    null
  )

  const handleCardClick = (utility: UtilityResponse) => {
    setSelectedUtilityID(selectedUtilityID === utility.id ? null : utility.id)
  }

  const { cityID } = useContext(AppContext)
  const { data }: { data: GetCityByIDResponse } = useSWR(
    `/api/cities/${cityID}`,
    fetcher
  )

  if (!data) {
    return
  }

  const utilityCards: UtilityResponse[] = data.utilities

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
              isSelected={utility.id === selectedUtilityID}
            >
              <div className="text-2xl font-bold">
                {utility?.total ?? 0} {utility.unit}
              </div>
              <p className="text-xs text-muted-foreground">Total consumption</p>
            </StyledCard>
          ))}
        </div>

        {selectedUtilityID && <UtilityDetails id={selectedUtilityID} />}
      </div>
      <CreateNewLog />
    </>
  )
}

export default UtilitiesDashboard
