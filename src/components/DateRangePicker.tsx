'use client'

import * as React from 'react'
import { format, formatISO } from 'date-fns'
import type { DateRange } from 'react-day-picker'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn, getDateRange } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import Interactions from '@/data/interactions.json'
import { Interaction } from '@/types'
const interactions: Interaction[] = Interactions

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const range = getDateRange(interactions.map((i) => new Date(i.date)))

  React.useEffect(() => {
    if (searchParams.size === 0) {
      const p = new URLSearchParams()
      p.set('from', formatISO(range.from!))
      p.set('to', formatISO(range.to!))

      router.push(`${pathname}?${p.toString()}`)
    }
  }, [pathname, range, router.push, searchParams])

  if (!searchParams.get('from') || !searchParams.get('to')) {
    return <>loading</>
  }

  const onSelect = (date: DateRange | undefined) => {
    const p = new URLSearchParams()
    p.set('from', formatISO(date?.from ?? range.from!))
    p.set('to', formatISO(date?.to ?? range.to!))

    router.push(`${pathname}?${p.toString()}`)
  }

  const date = {
    from: new Date(formatISO(searchParams.get('from')!)),
    to: new Date(formatISO(searchParams.get('to')!)),
  }

  return (
    <div>
      <p className="text-sm text-muted-foreground pb-2">
        <span>Pick a date:</span>
      </p>
      <div className={cn('grid gap-2 size-full', className)}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={'outline'}
              className={cn(
                'w-[300px] justify-start text-left font-normal',
                searchParams.size === 0 && 'text-muted-foreground',
              )}
            >
              <CalendarIcon />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, 'LLL dd, y')} -{' '}
                    {format(date.to, 'LLL dd, y')}
                  </>
                ) : (
                  format(date.from, 'LLL dd, y')
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date.from}
              selected={date}
              onSelect={onSelect}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
