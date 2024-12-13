'use client'

import { XAxis, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'
import { parseISO, differenceInYears } from 'date-fns'

import members from '@/data/free_school_meal_eligible_children.json'
import { type ChartConfig, ChartContainer } from '@/components/ui/chart'
import { ChartCard } from './ChartCard'
import { Member } from '@/types'

const prepareAgeDistributionData = (members: Member[]) => {
  const ageGroups = {
    '0-5': 0,
    '6-10': 0,
    '11-15': 0,
    '16-20': 0,
    '21+': 0,
  }

  // biome-ignore lint/complexity/noForEach: <explanation>
  members.forEach((member) => {
    const age = differenceInYears(new Date(), parseISO(member.dateOfBirth))
    if (age <= 5) ageGroups['0-5']++
    else if (age <= 10) ageGroups['6-10']++
    else if (age <= 15) ageGroups['11-15']++
    else if (age <= 20) ageGroups['16-20']++
    else ageGroups['21+']++
  })

  return Object.entries(ageGroups).map(([ageGroup, count]) => ({
    ageGroup,
    count,
  }))
}

const chartConfig = {
  count: {
    label: 'Attendance',
  },
} satisfies ChartConfig

export const FreeSchoolMealDistributionChart = () => {
  const data = prepareAgeDistributionData(members)

  return (
    <ChartCard title="Free school meal age distribution">
      <ChartContainer config={chartConfig}>
        <BarChart
          width={600}
          height={300}
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis
            dataKey="ageGroup"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value}
          />
          <Bar
            dataKey="count"
            fill="hsl(var(--chart-4))"
            radius={2}
            isAnimationActive={false}
          />
        </BarChart>
      </ChartContainer>
    </ChartCard>
  )
}
