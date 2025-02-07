import React, { useContext, useMemo } from 'react'
import UtilityChart from './chart'
import useSWR from 'swr'
import StyledTabs, { TabItem } from '../ui/tab'
import { fetcher } from '@/lib/utils'
import { AppContext } from '../context'
import { GetUtilityByIDResponse } from '@/app/api/_utils/responseTypes'

const UtilityDetails: React.FC<{ id: number | undefined }> = ({ id }) => {
  const { cityID } = useContext(AppContext)
  const { data }: { data: GetUtilityByIDResponse } = useSWR(
    `/api/utilities/${id}?city_id=${cityID}`,
    fetcher
  )

  const tabList: TabItem[] = useMemo(() => {
    if (!data || !id) {
      return []
    }

    const dataLogs = data.dataLogs ?? []

    return [
      {
        value: 'chart',
        label: 'Chart',
        content: <UtilityChart data={dataLogs} />,
      },
      {
        value: 'logs',
        label: 'Logs',
        content: (
          <div className="max-w-96 m-auto">
            <div className="mb-4 flex flex-col-reverse">
              {dataLogs.map((item: { date: string; total: number }) => (
                <div key={item.date} className="flex justify-between mt-0 mb-2">
                  <span>{item.date}</span>
                  <span>
                    {item.total} {data?.unit ?? ''}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ),
      },
    ]
  }, [id, data])

  if (!id || !tabList?.length) return null

  return (
    <details open className="shadow-md rounded-lg overflow-hidden">
      <summary className="px-4 py-2 font-medium cursor-pointer capitalize">
        {data.type} Consumption Details
      </summary>
      <div className="p-1">
        <StyledTabs tabList={tabList} />
      </div>
    </details>
  )
}

export default UtilityDetails
