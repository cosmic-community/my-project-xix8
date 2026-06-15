// app/services/[slug]/page.tsx
import { getServiceBySlug, getMetafieldValue } from '@/lib/cosmic'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const revalidate = 60

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  const title = getMetafieldValue(service.metadata?.title) || service.title
  const description = getMetafieldValue(service.metadata?.description)
  const image = service.metadata?.image
  const profile = service.metadata?.profile

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-4 py-12">
          <Link
            href="/services"
            className="mb-6 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            &larr; Back to services
          </Link>

          {image && (
            <div className="mb-8 aspect-video w-full overflow-hidden rounded-xl bg-muted">
              <img
                src={`${image.imgix_url}?w=1200&h=675&fit=crop&auto=format,compress`}
                alt={title}
                width={600}
                height={338}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <h1 className="text-3xl font-bold text-foreground">{title}</h1>

          {profile && profile.metadata?.full_name && (
            <p className="mt-2 text-sm text-muted-foreground">
              Offered by {getMetafieldValue(profile.metadata?.full_name)}
            </p>
          )}

          {description && (
            <div className="prose prose-slate mt-6 max-w-none text-muted-foreground">
              <p className="whitespace-pre-line leading-relaxed">{description}</p>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </div>
  )
}