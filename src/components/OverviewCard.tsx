import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'
import type { HTMLAttributes } from 'react'

export function OverviewCard({
  title,
  description,
  data,
  icon: Icon,
  className = '',
}: {
  title: string
  description: string
  data: number
  icon: LucideIcon
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex flex-col border p-4 rounded-md gap-3 m-h-24 shadow-md',
        className,
      )}
    >
      <div className="flex gap-2 justify-between">
        <Icon size={20} className="text-brand" />
        <h3 className="text-l text-brand">{title}</h3>
      </div>
      <div className="flex gap-2 justify-between">
        <h3 className="text-3xl text-brand-accent">{data}</h3>
        <span className="text-xs text-right text-slate-700">{description}</span>
      </div>
    </div>
  )
}
