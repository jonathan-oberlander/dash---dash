'use client'

import { useParams } from 'next/navigation'
import { getVenueName, score } from '@/lib/utils'
import { Member, Interaction } from '@/types'
import { ChartCard } from '@/components/ChartCard'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { usDateRange } from '@/hooks/useDateRange'
import { useVenueName } from '@/hooks/useVenueName'

export function AttendanceTopMembers({
  fsmData,
  interactionsData,
}: {
  fsmData: Member[]
  interactionsData: Interaction[]
}) {
  const { venueName } = useVenueName()
  const { description } = usDateRange()

  const members = fsmData.map((member) => {
    const engagementScore = score(member, interactionsData)
    return { ...member, engagementScore }
  })

  const sortedMembers = members
    .sort((a, b) => b.engagementScore - a.engagementScore)
    .slice(0, 10)

  return (
    <ChartCard
      title="Top 10 active member "
      description={'Most active members, ' + description}
      footer={
        <div className="leading-none p-2 text-muted-foreground">
          Activites for {venueName}
        </div>
      }
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Score</TableHead>
            <TableHead className="text-right">Postcode</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedMembers.map((member) => (
            <TableRow key={member.name}>
              <TableCell className="font-medium">{member.name}</TableCell>
              <TableCell>{member.engagementScore.toString()}</TableCell>
              <TableCell className="text-right">{member.postcode}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ChartCard>
  )
}
