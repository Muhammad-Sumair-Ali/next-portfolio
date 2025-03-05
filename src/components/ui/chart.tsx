"use client"

import React from "react"
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend, 
  Tooltip 
} from "recharts"

// Custom colors for the pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d']

interface ChartPieProps {
  data: Array<{
    name: string
    value: number
  }>
  valueFormatter?: (value: number) => string
}

export function ChartPie({ data, valueFormatter = (value) => `${value}` }: ChartPieProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value: number) => valueFormatter(value)} 
          labelFormatter={(label) => `${label}`}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
