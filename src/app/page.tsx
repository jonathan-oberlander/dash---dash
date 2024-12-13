import Link from 'next/link'

export default function Page() {
  return (
    <nav className="overflow-hidden mt-2 p-4 max-w-6xl mx-auto">
      <Link href="/dashboard/all" scroll>
        <h1 className="text-3xl font-bold tracking-tight hover:underline">
          View Dashboard
        </h1>
      </Link>
    </nav>
  )
}
