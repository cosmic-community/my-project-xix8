import Link from 'next/link'
import { Service } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const title = getMetafieldValue(service.metadata?.title) || service.title
  const description = getMetafieldValue(service.metadata?.description)
  const image = service.metadata?.image

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
    >
      {image && (
        <div className="aspect-video w-full overflow-hidden bg-muted">
          <img
            src={`${image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={title}
            width={400}
            height={225}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-card-foreground">{title}</h3>
        {description && (
          <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{description}</p>
        )}
        <span className="mt-4 text-sm font-medium text-foreground">
          Learn more &rarr;
        </span>
      </div>
    </Link>
  )
}