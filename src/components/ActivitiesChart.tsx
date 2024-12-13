'use client'

import * as React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { ChartCard } from './ChartCard'
import { Interaction } from '@/types'
import { useVenueName } from '@/hooks/useVenueName'

export const ActivityBreakdownChart = ({
  interactions,
}: {
  interactions: Interaction[]
}) => {
  const { venueName } = useVenueName()

  const activityCounts = interactions.reduce(
    (acc, interaction) => {
      const activity = interaction.name
      if (!acc[activity]) {
        acc[activity] = 0
      }
      acc[activity]++
      return acc
    },
    {} as { [activity: string]: number },
  )

  const data = Object.entries(activityCounts).map(([name, value]) => ({
    name,
    value,
  }))

  const colors = (name: string) =>
    ({
      'Homework Club': 'hsl(var(--chart-1))',
      'Football Club': 'hsl(var(--chart-2))',
      Mentoring: 'hsl(var(--chart-3))',
      Tutoring: 'hsl(var(--chart-4))',
      Ballet: 'hsl(var(--chart-5))',
    })[name]

  return (
    <ChartCard
      title="Activities"
      footer={
        <div className="leading-none text-muted-foreground">
          Activites for {venueName}
        </div>
      }
    >
      <ResponsiveContainer width="100%" height={320}>
        <PieChart width={500} height={250}>
          <Pie
            data={data}
            dataKey="value"
            strokeWidth={0}
            outerRadius={70}
            innerRadius={40}
            isAnimationActive={false}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry) => (
              <Cell key={`cell-${entry.name}`} fill={colors(entry.name)} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
