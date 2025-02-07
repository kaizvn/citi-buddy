import { PlusCircle } from 'lucide-react'
import Button from '../ui/button'
import StyledDialog from '../ui/dialog'
import StyledTabs from '../ui/tab'
import CreateDataLogForm from './create-manually'

const CreateNewLog = () => {
  const tabList = [
    {
      value: 'manually',
      label: 'Manually Input',
      content: <CreateDataLogForm />,
    },
    {
      value: 'upload',
      label: 'Upload CSV',
      content: <div className="max-w-96 m-auto">coming soon</div>,
    },
  ]

  return (
    <StyledDialog
      title="Add New Utility Data"
      TriggerButton={
        <Button className="fixed bottom-10 right-16 z-10">
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Data
        </Button>
      }
    >
      <StyledTabs tabList={tabList} />
    </StyledDialog>
  )
}

export default CreateNewLog
