'use client'

import { UtilityLogResponse } from '@/app/api/_utils/responseTypes'
import { calculateAvg } from '@/utils/client'
import React from 'react'
import {
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

interface UtilityChartProps {
  data: UtilityLogResponse[]
}

const UtilityChart: React.FC<UtilityChartProps> = ({ data }) => {
  const average = calculateAvg(data, 'total')

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="logged_date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="total" stroke="#8884d8" />
        <ReferenceLine y={average} label="Average" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default UtilityChart
