'use client'

import React from 'react'

export type DashboardAppContext = {
  cityID?: number
}

export const AppContext = React.createContext<DashboardAppContext>({})
