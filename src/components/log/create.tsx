import { PlusCircle } from 'lucide-react'
import Button from '../ui/button'
import StyledDialog, { DialogContext } from '../ui/dialog'
import StyledTabs from '../ui/tab'
import { DataLogForm } from './manual'
import { CSVUploadForm } from './upload'
import React, { useContext, useMemo } from 'react'
import { mutate } from 'swr'
import { AppContext } from '../context'

const isRealtimeUrl = (
  key: string | undefined,
  cityID?: number,
  selectedUtilityID?: number | null
) => {
  if (typeof key !== 'string' || !cityID || !selectedUtilityID) {
    return false
  }
  return [
    (key: string) => key === `/api/cities/${cityID}`,
    (key: string) => key.startsWith(`/api/utilities/${selectedUtilityID}`),
  ].some((check) => check(key))
}

const CreateNewLog: React.FC<{ selectedUtilityID: number | null }> = ({
  selectedUtilityID,
}) => {
  const [open, setOpen] = React.useState(false)
  const { cityID } = useContext(AppContext)

  const tabList = useMemo(
    () => [
      {
        value: 'upload',
        label: 'Upload CSV',
        content: (
          <div className="max-w-96 m-auto">
            <CSVUploadForm
              callback={() => {
                mutate((key: string) =>
                  isRealtimeUrl(key, cityID, selectedUtilityID)
                )
              }}
            />
          </div>
        ),
      },
      {
        value: 'manually',
        label: 'Manually Input',
        content: (
          <div className="max-w-96 m-auto">
            <DataLogForm
              callback={() => {
                setOpen(false)
                mutate((key: string) =>
                  isRealtimeUrl(key, cityID, selectedUtilityID)
                )
              }}
            />
          </div>
        ),
      },
    ],
    [cityID, selectedUtilityID]
  )

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      <StyledDialog
        title="Add New Utility Data"
        TriggerButton={
          <Button className="fixed bottom-10 right-16 z-auto">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Data
          </Button>
        }
      >
        <StyledTabs tabList={tabList} />
      </StyledDialog>
    </DialogContext.Provider>
  )
}

export default CreateNewLog
