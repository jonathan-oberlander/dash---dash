import { Activity, Gamepad2Icon, HomeIcon, UserRound } from 'lucide-react'
import {
  getTotalMembers,
  getTotalInteractions,
  getActivities,
  getUniqueActivities,
  getNumberOfVenues,
} from '@/lib/utils'
import { groupInteractionsByDate, sortByDate } from '@/lib/utils'
import { UsersRoundIcon } from 'lucide-react'
import { OverviewCard } from './OverviewCard'
import { Member, Interaction, Venue } from '@/types'

export function MembersCard({
  members,
  className,
}: { members?: Member[] } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <OverviewCard
      icon={UserRound}
      title="Members"
      description="total"
      data={getTotalMembers(members)}
      className={className}
    />
  )
}

export function InteractionsCard({
  interactions,
  className,
}: {
  interactions?: Interaction[]
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <OverviewCard
      icon={Activity}
      title="Interactions"
      description="total"
      data={getTotalInteractions(interactions)}
      className={className}
    />
  )
}

export function ActivitiesCard({
  interactions,
  className,
}: {
  interactions?: Interaction[]
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <OverviewCard
      icon={Gamepad2Icon}
      title="Activities"
      description={Array.from(getActivities(interactions)).join(', ')}
      data={getUniqueActivities(interactions)}
      className={className}
    />
  )
}

export function VenuesCard({
  venues,
  className,
}: { venues?: Venue[] } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <OverviewCard
      icon={HomeIcon}
      title="Venues"
      description="total"
      data={getNumberOfVenues(venues)}
      className={className}
    />
  )
}

export function AttendanceAverageCard({
  interactions,
  className,
  venue = 'All venues',
}: {
  interactions: Interaction[]
  venue: string
} & React.HTMLAttributes<HTMLDivElement>) {
  const groupedByDate = groupInteractionsByDate(interactions)
  const sortedData = sortByDate(groupedByDate)

  const totalCount = sortedData.reduce((sum, item) => sum + item.count, 0)
  const average = Math.floor(totalCount / sortedData.length)

  return (
    <OverviewCard
      title="Average attendance"
      description={venue}
      data={average}
      icon={UsersRoundIcon}
      className={className}
    />
  )
}
