'use client'

import type { PropsWithChildren } from 'react'
import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, XAxis } from 'recharts'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { sortByDate, groupInteractionsByDate, getVenueName } from '@/lib/utils'
import { usDateRange } from '@/hooks/useDateRange'
import { ChartCard } from './ChartCard'
import { Interaction } from '@/types'
import { useVenueName } from '@/hooks/useVenueName'

const chartConfig = {
  count: {
    label: 'Attendance',
    color: 'hsl(var(--chart-4))',
  },
} satisfies ChartConfig

export function AttendanceTrendsChart({
  interactions,
}: PropsWithChildren<{
  interactions: Interaction[]
}>) {
  const { venueName } = useVenueName()
  const { description, from, to } = usDateRange()
  const data = sortByDate(groupInteractionsByDate(interactions, from, to))

  return (
    <ChartCard
      title="Attendance"
      description={description}
      footer={
        <>
          <div className="flex gap-2 font-medium leading-none">
            Trend over time
            <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Attendance for {venueName}
          </div>
        </>
      }
    >
      <ChartContainer config={chartConfig}>
        <BarChart accessibilityLayer data={data}>
          <XAxis
            dataKey="date"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(8, 10)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar
            dataKey="count"
            fill="hsl(var(--chart-3))"
            radius={2}
            isAnimationActive={false}
          />
        </BarChart>
      </ChartContainer>
    </ChartCard>
  )
}
