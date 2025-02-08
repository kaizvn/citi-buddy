import { cn } from '@/libs/utils'
import { Tabs } from 'radix-ui'
import React from 'react'

export type TabItem = {
  label: string
  value: string
  content: React.ReactNode
}

export type TabProps = {
  tabList: TabItem[]
}

const StyledTabs: React.FC<TabProps> = ({ tabList }) => {
  if (!tabList?.length) {
    return null
  }
  return (
    <Tabs.Root defaultValue="chart" className="m-4">
      <Tabs.List className="mt-4 mb-4 flex justify-center">
        {tabList.map(({ label, value }) => (
          <Tabs.Trigger
            key={value}
            className={cn(
              'px-3 py-2 text-sm rounded-md',
              'text-md font-medium',
              'text-gray-700 dark:text-gray-100',
              'aria-selected:bg-gray-900 aria-selected:text-white aria-selected:dark:text-white'
            )}
            value={value}
          >
            {label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {tabList.map(({ content, value }) => (
        <Tabs.Content key={value} value={value}>
          {content}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  )
}

export default StyledTabs
