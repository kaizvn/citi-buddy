import React, { useContext, useMemo } from 'react'
import UtilityChart from './chart'
import StyledTabs, { TabItem } from '../ui/tab'
import { AppContext } from '../context'
import { useGetUtilityByID } from '@/services'

const UtilityDetails: React.FC<{ id: number }> = ({ id }) => {
  const { cityID } = useContext(AppContext)
  const { utility } = useGetUtilityByID(id, cityID!)

  const tabList: TabItem[] = useMemo(() => {
    if (!utility || !id) {
      return []
    }

    const dataLogs = utility.dataLogs ?? []

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
              {dataLogs.map((item: { logged_date: string; total: number }) => (
                <div
                  key={item.logged_date}
                  className="flex justify-between mt-0 mb-2"
                >
                  <span>{item.logged_date}</span>
                  <span>
                    {item.total} {utility?.unit ?? ''}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ),
      },
    ]
  }, [id, utility])

  if (!id || !tabList?.length) return null

  return (
    <details open className="shadow-md rounded-lg overflow-hidden">
      <summary className="px-4 py-2 font-medium cursor-pointer capitalize">
        {utility.type} Consumption Details (10 days data)
      </summary>
      <div className="p-1">
        <StyledTabs tabList={tabList} />
      </div>
    </details>
  )
}

export default UtilityDetails
