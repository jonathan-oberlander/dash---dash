'use client'

import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'

import venues from '@/data/venues.json'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function VenueNavigation() {
  const searchParams = useSearchParams()
  const { venue: venueName } = useParams()

  return (
    <div className="flex flex-col bg-background w-full">
      <p className="text-sm text-muted-foreground pb-2">
        <span>Pick a venue:</span>
      </p>
      <nav className="grid grid-cols-2 md:grid-cols-4 gap-2 sticky">
        <Link
          className={cn(
            buttonVariants({ variant: 'outline' }),
            venueName === 'all' && 'shadow-md bg-brand-accent text-white',
          )}
          href={`all?${searchParams}`}
          scroll={false}
        >
          All
        </Link>
        {venues.map((venue) => {
          const name = venue.name.toLowerCase().replace(' ', '_')
          const href = `${name}?${searchParams}`

          return (
            <Link
              className={cn(
                buttonVariants({ variant: 'outline' }),
                name === venueName && 'shadow-md bg-brand-accent text-white',
              )}
              key={name}
              href={href}
              scroll={false}
            >
              {venue.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
