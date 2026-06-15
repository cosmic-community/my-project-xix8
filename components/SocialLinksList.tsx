import { SocialLink } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import SocialIcon from '@/components/SocialIcon'

interface SocialLinksListProps {
  links: SocialLink[]
}

export default function SocialLinksList({ links }: SocialLinksListProps) {
  if (!links || links.length === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {links.map((link) => {
        const url = getMetafieldValue(link.metadata?.url)
        const label = getMetafieldValue(link.metadata?.label) || link.title
        const platform = getMetafieldValue(link.metadata?.platform)

        if (!url) return null

        return (
          <a
            key={link.id}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
            title={label}
          >
            <SocialIcon platform={platform} className="h-4 w-4 text-muted-foreground" />
            <span>{label}</span>
          </a>
        )
      })}
    </div>
  )
}