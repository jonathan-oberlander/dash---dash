import { format, parseISO } from 'date-fns'
import { useSearchParams } from 'next/navigation'

export function usDateRange() {
  const searchParams = useSearchParams()

  const fromParam = searchParams.get('from')
  const toParam = searchParams.get('to')

  if (fromParam) {
    const from = parseISO(fromParam)
    const to = parseISO(toParam)
    const description = `${format(from, 'dd MMMM yyyy')} - ${format(
      to,
      'dd MMMM yyyy',
    )}`
    return {
      description,
      from,
      to,
    }
  }

  return {
    description: '',
  }
}
