// app/services/[slug]/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h2 className="text-2xl font-bold text-foreground">Service not found</h2>
      <p className="mt-2 text-muted-foreground">The service you are looking for does not exist.</p>
      <Link
        href="/services"
        className="mt-6 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        Back to services
      </Link>
    </div>
  )
}