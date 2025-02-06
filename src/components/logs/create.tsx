import { PlusCircle } from 'lucide-react'
import Button from '../ui/button'
import StyledDialog from '../ui/dialog'

const CreateNewLog = () => {
  const onDataCreated = () => {}
  return (
    <StyledDialog
      title="Add New Utility Data"
      TriggerButton={
        <Button className="fixed bottom-10 right-16 z-10">
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Data
        </Button>
      }
    >
      this is the main content
      <div>
        <Button className="Button green" onSubmit={() => onDataCreated()}>
          Save changes
        </Button>
      </div>
    </StyledDialog>
  )
}

export default CreateNewLog
