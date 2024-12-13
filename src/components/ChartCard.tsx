import { cn } from '@/lib/utils'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './ui/card'

export function ChartCard({
  children,
  title,
  description,
  footer,
  className,
}: React.PropsWithChildren<{
  title: string
  description?: string
  footer?: JSX.Element
}> &
  React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Card
      className={cn('flex flex-col size-full shadow-md rounded-md', className)}
    >
      <CardHeader className="items-center pb-2">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {children}
        <CardFooter className="flex-col gap-2 text-sm">{footer}</CardFooter>
      </CardContent>
    </Card>
  )
}
