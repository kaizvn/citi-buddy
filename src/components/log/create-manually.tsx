import { DataLog } from '@prisma/client'
import React, { useState } from 'react'

const CreateDataLogForm: React.FC = () => {
  const [message, setMessage] = useState<string>('')
  const [dataLog, setDataLog] = useState<DataLog>()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setDataLog(dataLog)
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="message">Message:</label>
          <input
            type="text"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button type="submit">Create DataLog</button>
      </form>
    </div>
  )
}

export default CreateDataLogForm
