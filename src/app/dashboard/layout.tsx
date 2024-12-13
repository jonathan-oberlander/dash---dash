import { DatePickerWithRange } from '@/components/DateRangePicker'
import { Separator } from '@/components/ui/separator'
import { VenueNavigation } from '@/components/VenueNavigation'

import {
  MembersCard,
  InteractionsCard,
  ActivitiesCard,
  VenuesCard,
} from '@/components/Overview'

import interactions from '@/data/interactions.json'
import members from '@/data/free_school_meal_eligible_children.json'
import venues from '@/data/venues.json'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="max-w-6xl mx-auto animate-appear">
      <div className="flex flex-col gap-6">
        <div className="space-y-2 p-4 ">
          <h1 className="text-3xl font-bold tracking-tight">Zebra .ltd</h1>
          <p className="text-base text-muted-foreground">
            <span>
              Insights for your venues, members and their interactions.
            </span>
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-4">
          <MembersCard members={members} />
          <InteractionsCard interactions={interactions} />
          <ActivitiesCard interactions={interactions} />
          <VenuesCard venues={venues} />
        </div>
        <div className="flex flex-col bg-background p-4 sticky top-16 z-10 md:flex-row gap-4 md:gap-8 ">
          <VenueNavigation />
          <DatePickerWithRange />
        </div>
        <Separator />
        <div>{children}</div>
      </div>
    </div>
  )
}
