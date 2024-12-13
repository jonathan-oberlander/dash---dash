import { getVenueName } from '@/lib/utils'
import { useParams } from 'next/navigation'

export function useVenueName() {
  const { venue } = useParams()

  return { venueName: getVenueName(venue?.toString()) }
}
