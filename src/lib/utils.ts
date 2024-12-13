import type { DateRange } from 'react-day-picker'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { parseISO, format, isWithinInterval } from 'date-fns'

// styles --------------------------------------------------

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// fn ------------------------------------------------------

export const getTotalMembers = (fsmData?: Member[]) => fsmData?.length ?? 0

export const getTotalInteractions = (interactions?: Interaction[]) =>
  interactions?.length ?? 0

export const getActivities = (interactions?: Interaction[]) =>
  new Set(interactions?.map((interaction) => interaction.name))

export const getUniqueActivities = (interactions?: Interaction[]) =>
  getActivities(interactions).size

export const getNumberOfVenues = (venues?: Venue[]) => venues?.length ?? 0

// dates ------------------------------------------------------

export const getDateRange = (dates: Date[]): DateRange => {
  const sortedDates = [...dates].sort((a, b) => a.getTime() - b.getTime())
  return { from: sortedDates[0], to: sortedDates[sortedDates.length - 1] }
}

export const groupInteractionsByDate = (
  interactions: Interaction[],
  from?: Date,
  to?: Date,
) => {
  return interactions.reduce(
    (acc, interaction) => {
      const interactionDate = parseISO(interaction.date)
      const date = format(interactionDate, 'yyyy-MM-dd')

      if (from && to) {
        if (isWithinInterval(interactionDate, { start: from, end: to })) {
          if (!acc[date]) {
            acc[date] = 0
          }
          acc[date]++
        }
      } else {
        if (!acc[date]) {
          acc[date] = 0
        }
        acc[date]++
      }

      return acc
    },
    {} as { [date: string]: number },
  )
}

export const sortByDate = (groupedByDate: { [date: string]: number }) =>
  Object.entries(groupedByDate)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date)))

// members ------------------------------------------

export const score = (member: Member, interactions: Interaction[]) => {
  const memberInteractions = interactions.filter(
    (i) => i.member.name === member.name,
  )

  // const out = interactions.reduce((acc, i) => {
  //   const mem = i.member.name;
  //   const set = new Set();
  //   if (!acc[mem]) {
  //     acc[mem] = [i.venueId];
  //   } else {
  //     acc[mem] = acc[mem].concat(i.venueId);
  //   }
  //   return acc;
  // }, {});

  // console.log(out);

  if (memberInteractions.length === 0) {
    return 0
  }

  const mostRecentInteraction = Math.max(
    ...memberInteractions.map((i) => Number(new Date(i.date))),
  )

  // avergae is 4 days berween interactions
  const daysSinceLastInteraction =
    (Number(new Date()) - mostRecentInteraction) / (1000 * 60 * 60 * 24)

  const membershipDuration =
    (Number(new Date()) - Number(new Date(member.dateOfBirth))) /
    (1000 * 60 * 60 * 24 * 365)

  const uniqueActivities = getUniqueActivities(memberInteractions)

  let score = memberInteractions.length * 10 // base
  score += uniqueActivities * 5 // 5 points per unique activty
  score += (30 - Math.min(daysSinceLastInteraction, 30)) * 2 // 2 regularity
  score += Math.min(membershipDuration, 10) * 5 // 5 points per year of membership duration

  return Math.round(score)
}

import venues from '@/data/venues.json'

export const getVenueName = (id?: string) =>
  id && id === 'all'
    ? 'All venues'
    : (venues.find((v) => v.id === id)?.name ?? '')
