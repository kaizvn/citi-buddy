import { Dialog } from 'radix-ui'
import { X } from 'lucide-react'
import React from 'react'
import { cn } from '@/lib/utils'

type AddDataPopupProps = {
  title: string
  TriggerButton: React.ReactElement
  submitButtonText?: string
  onClose?: () => void
  onDataCreated?: () => void
  children: React.ReactNode
}

const StyledDialog: React.FC<AddDataPopupProps> = ({
  children,
  title,
  TriggerButton,
}) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {React.cloneElement(TriggerButton)}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 bg-black/50" />
        <Dialog.Content
          className={cn(
            'fixed z-50',
            'w-[95vw] max-w-md rounded-lg p-4 md:w-full',
            'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
            'bg-white dark:bg-gray-800',
            'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
          )}
        >
          <Dialog.Title className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {title}
          </Dialog.Title>
          <div className="mt-2 space-y-2">{children}</div>
          <Dialog.Close asChild>
            <button
              className="absolute top-3.5 right-3.5 inline-flex items-center justify-center rounded-full p-1"
              aria-label="Close"
            >
              <X />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default StyledDialog
