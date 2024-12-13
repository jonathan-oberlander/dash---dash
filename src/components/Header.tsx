import { LayoutDashboardIcon } from 'lucide-react'
import Link from 'next/link'

import { ModeToggle } from '@/components/ModeToggle'

export function Header() {
  return (
    <header className="bg-background h-18 sticky top-0 z-20 border-b-2">
      <div className="flex items-center justify-between w-full p-4">
        <Link
          href="/"
          scroll
          className="flex gap-4 p-2 rounded-sm hover:bg-accent"
        >
          <LayoutDashboardIcon /> dash - dash
        </Link>
        <ModeToggle />
      </div>
    </header>
  )
}
