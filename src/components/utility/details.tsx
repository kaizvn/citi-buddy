import React, { useMemo } from 'react'
import UtilityChart from './chart'
import { UtilityResponse } from '@/app/api/utility/types'
import useSWR from 'swr'
import StyledTabs, { TabItem } from '../ui/tab'
import { fetcher } from '@/lib/utils'

const UtilityDetails: React.FC<{ card: UtilityResponse | undefined }> = ({
  card,
}) => {
  const { data } = useSWR(`/api/utility/${card?.id}`, fetcher)

  const tabList: TabItem[] = useMemo(() => {
    if (!data || !card) {
      return []
    }

    return [
      {
        value: 'chart',
        label: 'Chart',
        content: <UtilityChart data={data} />,
      },
      {
        value: 'logs',
        label: 'Logs',
        content: (
          <div className="max-w-96 m-auto">
            <div className="mb-4 flex flex-col-reverse">
              {data.map((item: { date: string; total: number }) => (
                <div key={item.date} className="flex justify-between mt-0 mb-2">
                  <span>{item.date}</span>
                  <span>
                    {item.total} {card?.unit ?? ''}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ),
      },
    ]
  }, [card, data])

  if (!data || !card) return null

  return (
    <details open className="shadow-md rounded-lg overflow-hidden">
      <summary className="px-4 py-2 font-medium cursor-pointer">
        {card.type} Consumption Details
      </summary>
      <div className="p-1">
        <StyledTabs tabList={tabList} />
      </div>
    </details>
  )
}

export default UtilityDetails
