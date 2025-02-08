'use client'

import { AppContext } from '@/components/context'
import UtilitiesDashboard from '@/components/utility/dashboard'
import React, { useState } from 'react'

export default function Home() {
  const [appContext] = useState({ cityID: 1 })

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        City Utilities Dashboard
      </h1>
      <AppContext.Provider value={appContext}>
        <UtilitiesDashboard />
      </AppContext.Provider>
    </main>
  )
}
