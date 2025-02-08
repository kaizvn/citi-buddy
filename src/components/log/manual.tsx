import React, { useState } from 'react'
import * as Form from '@radix-ui/react-form'
import * as Select from '@radix-ui/react-select'
import {
  ChevronDown,
  ChevronUp,
  Check,
  Plus,
  X,
  CheckCircle,
} from 'lucide-react'
import Button from '../ui/button'

type Metadata = {
  key: string
  value: string
  unit?: string
}

export function DataLogForm({ callback }: { callback?: () => void }) {
  const [metadata, setMetadata] = useState<Metadata[]>([])
  const [isCreateSuccess, setIsCreateSuccess] = useState<boolean>(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)

    // // Add metadata to the data object
    // data.metadata = JSON.stringify(metadata)

    const formattedData = {
      metadata: data.metadata ? JSON.stringify(metadata) : undefined,
      type_id: parseInt(data.type_id as string),
      amount: parseFloat(data.amount as string),
      source: 'manually',
      logged_date: data.logged_date,
    }

    try {
      const response = await fetch('/api/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      })

      if (!response.ok) {
        setIsCreateSuccess(false)
        throw new Error('Failed to create DataLog')
      }

      // Handle successful submission (e.g., show success message, reset form)
      console.log('DataLog created successfully')
      callback?.()
      setIsCreateSuccess(true)
    } catch (error) {
      console.error('Error creating DataLog:', error)
      setIsCreateSuccess(false)
    }
  }

  const addMetadata = () => {
    setMetadata([...metadata, { key: '', value: '' }])
  }

  const updateMetadata = (
    index: number,
    field: keyof Metadata,
    value: string
  ) => {
    const updatedMetadata = [...metadata]
    updatedMetadata[index][field] = value
    setMetadata(updatedMetadata)
  }

  const removeMetadata = (index: number) => {
    setMetadata(metadata.filter((_, i) => i !== index))
  }

  return (
    <Form.Root className="space-y-8" onSubmit={handleSubmit}>
      <Form.Field
        className="grid grid-cols-4 items-center gap-4"
        name="type_id"
      >
        <Form.Label className="text-right">Type</Form.Label>
        <Form.Control asChild>
          <Select.Root defaultValue="1">
            <Select.Trigger className="inline-flex items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 col-span-3">
              <Select.Value />
              <Select.Icon>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md">
                <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-gray-700 cursor-default">
                  <ChevronUp className="h-4 w-4" />
                </Select.ScrollUpButton>
                <Select.Viewport className="p-1">
                  <Select.Item
                    value="1"
                    className="relative flex items-center h-[25px] px-2 py-4 rounded-sm text-sm text-gray-700 data-[highlighted]:bg-gray-100 data-[highlighted]:text-gray-900 data-[highlighted]:outline-none cursor-default select-none"
                  >
                    <Select.ItemText>Water Supplier</Select.ItemText>
                    <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                      <Check className="h-4 w-4" />
                    </Select.ItemIndicator>
                  </Select.Item>
                  <Select.Item
                    value="2"
                    className="relative flex items-center h-[25px] px-2 py-4 rounded-sm text-sm text-gray-700 data-[highlighted]:bg-gray-100 data-[highlighted]:text-gray-900 data-[highlighted]:outline-none cursor-default select-none"
                  >
                    <Select.ItemText>Electricity</Select.ItemText>
                    <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                      <Check className="h-4 w-4" />
                    </Select.ItemIndicator>
                  </Select.Item>
                  <Select.Item
                    value="3"
                    className="relative flex items-center h-[25px] px-2 py-4 rounded-sm text-sm text-gray-700 data-[highlighted]:bg-gray-100 data-[highlighted]:text-gray-900 data-[highlighted]:outline-none cursor-default select-none"
                  >
                    <Select.ItemText>Waste</Select.ItemText>
                    <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                      <Check className="h-4 w-4" />
                    </Select.ItemIndicator>
                  </Select.Item>
                  {/* Add more utility types as needed */}
                </Select.Viewport>
                <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-gray-700 cursor-default">
                  <ChevronDown className="h-4 w-4" />
                </Select.ScrollDownButton>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </Form.Control>
        <Form.Message
          className="text-sm text-red-500 col-start-2 col-span-3"
          match="valueMissing"
        >
          Please select a utility type
        </Form.Message>
      </Form.Field>

      <Form.Field className="grid grid-cols-4 items-center gap-4" name="amount">
        <Form.Label className="text-right">Amount</Form.Label>
        <Form.Control asChild>
          <input
            className="col-span-3 flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            type="number"
            required
            step="0.01"
          />
        </Form.Control>
        <Form.Message
          className="text-sm text-red-500 col-start-2 col-span-3"
          match="valueMissing"
        >
          Please enter an amount
        </Form.Message>
      </Form.Field>
      <Form.Field
        className="grid grid-cols-4 items-center gap-4"
        name="logged_date"
      >
        <Form.Label className="text-right">Date</Form.Label>
        <Form.Control asChild>
          <input
            className="col-span-3 flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            type="date"
            required
          />
        </Form.Control>
        <Form.Message
          className="text-sm text-red-500 col-start-2 col-span-3"
          match="valueMissing"
        >
          Please select a date
        </Form.Message>
      </Form.Field>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Custom Metadata</h3>
          <button
            type="button"
            onClick={addMetadata}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Metadata
          </button>
        </div>
        {metadata.map((item, index) => (
          <div key={index} className="grid grid-cols-4 gap-4 items-center">
            <input
              className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              placeholder="Key"
              value={item.key}
              onChange={(e) => updateMetadata(index, 'key', e.target.value)}
            />
            <input
              className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              placeholder="Value"
              value={item.value}
              onChange={(e) => updateMetadata(index, 'value', e.target.value)}
            />
            <input
              className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              placeholder="Unit (optional)"
              value={item.unit || ''}
              onChange={(e) => updateMetadata(index, 'unit', e.target.value)}
            />
            <button
              type="button"
              onClick={() => removeMetadata(index)}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <Form.Submit asChild>
        <Button className="m-auto">Create new Data</Button>
      </Form.Submit>

      {isCreateSuccess && (
        <div className="mt-4">
          <div className="flex items-center mb-2">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            <p className="text-sm text-gray-700">Created!</p>
          </div>
        </div>
      )}
    </Form.Root>
  )
}
