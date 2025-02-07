'use client'
import { UtilityLogResponse } from '@/app/api/utilities/types'
import React from 'react'
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

interface UtilityChartProps {
  data: UtilityLogResponse[]
}

const UtilityChart: React.FC<UtilityChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="total" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default UtilityChart
