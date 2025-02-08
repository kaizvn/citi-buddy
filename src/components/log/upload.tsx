import React, { useState } from 'react'
import * as Progress from '@radix-ui/react-progress'
import { Upload, CheckCircle, AlertCircle } from 'lucide-react'
import Button from '../ui/button'
import { revertKeyValueObj } from '@/libs/utils'

type FieldMapping = {
  [key: string]: string
}

const REQUIRED_FIELDS = ['type_id', 'amount', 'logged_date', 'city_id']

async function uploadCSV(file: File, fieldMapping: FieldMapping) {
  const formData = new FormData()
  formData.append('file', file)
  const revertKeysFieldMapping = revertKeyValueObj(fieldMapping)
  formData.append('fieldMapping', JSON.stringify(revertKeysFieldMapping))

  const response = await fetch('/api/logs?type=upload', {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error('CSV upload failed')
  }

  return response.json()
}

export function CSVUploadForm({ callback }: { callback?: () => void }) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadResult, setUploadResult] = useState<{
    processedRows: number
    errorRows: number
  } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [fieldMapping, setFieldMapping] = useState<FieldMapping>({})
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setError(null)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload')
      return
    }

    setIsUploading(true)
    setUploadProgress(0)
    setError(null)

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90))
      }, 500)

      const result = await uploadCSV(file, fieldMapping)

      clearInterval(progressInterval)
      setUploadProgress(100)
      setUploadResult(result)
    } catch (error) {
      if (error instanceof Error) setError('Upload failed. Please try again.')
    } finally {
      setIsUploading(false)
      callback?.()
    }
  }

  const updateFieldMapping = (field: string, value: string) => {
    setFieldMapping({ ...fieldMapping, [field]: value })
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-lg font-medium mb-4">Upload CSV File</h2>
      <p className="text-sm text-gray-500 mb-4">
        Upload a CSV file to import data into the system.
      </p>

      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 mb-4">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload className="w-8 h-8 mb-2 text-gray-400" />
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500">CSV file up to 10MB</p>
        </div>
        <input
          type="file"
          className="hidden"
          accept=".csv"
          onChange={handleFileChange}
        />
      </label>

      {file && (
        <div className="mb-4">
          <p className="text-md font-medium">
            <b>Selected file: {file.name}</b>
          </p>
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-md font-medium mb-2">Field Mapping</h3>
        <p className="text-sm text-gray-500 mb-2">
          Map the required fields to the corresponding columns in your CSV file.
        </p>
        {REQUIRED_FIELDS.map((field) => (
          <div key={field} className="flex items-center mb-2">
            <label className="w-1/3 text-sm font-medium">{field}:</label>
            <input
              type="text"
              className="flex-1 px-2 py-1 text-sm border rounded"
              placeholder="CSV column name"
              value={fieldMapping[field] || ''}
              onChange={(e) => updateFieldMapping(field, e.target.value)}
            />
          </div>
        ))}
      </div>

      <Button
        onClick={handleUpload}
        disabled={isUploading}
        className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-primary/90 disabled:opacity-50"
      >
        {isUploading ? 'Uploading...' : 'Upload'}
      </Button>

      {isUploading && (
        <div className="mt-4">
          <Progress.Root
            className="relative overflow-hidden bg-gray-200 rounded-full w-full h-2"
            value={uploadProgress}
          >
            <Progress.Indicator
              className="bg-primary w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
              style={{ transform: `translateX(-${100 - uploadProgress}%)` }}
            />
          </Progress.Root>
          <p className="text-sm text-gray-500 mt-2">
            Uploading... {uploadProgress}%
          </p>
        </div>
      )}

      {uploadResult && (
        <div className="mt-4">
          <div className="flex items-center mb-2">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            <p className="text-sm text-gray-700">
              Upload completed successfully
            </p>
          </div>
          <p className="text-sm text-gray-500">
            Processed rows: {uploadResult.processedRows}
          </p>
          <p className="text-sm text-gray-500">
            Error rows: {uploadResult.errorRows}
          </p>
        </div>
      )}

      {error && (
        <div className="mt-4 flex items-center text-red-500">
          <AlertCircle className="w-5 h-5 mr-2" />
          <p className="text-sm">{error}</p>
        </div>
      )}
    </div>
  )
}
