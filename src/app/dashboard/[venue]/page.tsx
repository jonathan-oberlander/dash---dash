import { ActivityBreakdownChart } from '@/components/ActivitiesChart'
import { AttendanceTrendsChart } from '@/components/AttendanceChart'

import { AttendanceTopMembers } from '@/components/TopMembers'
import {
  InteractionsCard,
  ActivitiesCard,
  AttendanceAverageCard,
} from '@/components/Overview'

import interactions from '@/data/interactions.json'
import members from '@/data/free_school_meal_eligible_children.json'

import { MembersMap } from '@/components/MembersMap'

export default async function Page({ params }: { params: { venue: string } }) {
  const { venue } = await params
  const filteredInteractions =
    venue === 'all'
      ? interactions
      : interactions.filter((i) => i.venueId === venue)

  return (
    <div className="flex flex-col gap-4 px-4 w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <ActivitiesCard interactions={filteredInteractions} />
        <InteractionsCard interactions={filteredInteractions} />
        <AttendanceAverageCard
          interactions={filteredInteractions}
          venue={venue}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ActivityBreakdownChart interactions={filteredInteractions} />
        <AttendanceTrendsChart interactions={filteredInteractions} />
        <MembersMap interactions={filteredInteractions} />
        <AttendanceTopMembers
          fsmData={members}
          interactionsData={filteredInteractions}
        />
        {/* <FreeSchoolMealDistributionChart /> */}
      </div>
    </div>
  )
}
