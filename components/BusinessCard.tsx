import { Profile, SocialLink } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import SocialLinksList from '@/components/SocialLinksList'

interface BusinessCardProps {
  profile: Profile
  socialLinks: SocialLink[]
}

export default function BusinessCard({ profile, socialLinks }: BusinessCardProps) {
  const fullName = getMetafieldValue(profile.metadata?.full_name) || profile.title
  const jobTitle = getMetafieldValue(profile.metadata?.job_title)
  const company = getMetafieldValue(profile.metadata?.company)
  const bio = getMetafieldValue(profile.metadata?.bio)
  const phone = getMetafieldValue(profile.metadata?.phone)
  const email = getMetafieldValue(profile.metadata?.email)
  const website = getMetafieldValue(profile.metadata?.website)
  const address = getMetafieldValue(profile.metadata?.address)
  const brandColor = getMetafieldValue(profile.metadata?.brand_color) || '#1e293b'

  const profilePhoto = profile.metadata?.profile_photo
  const coverImage = profile.metadata?.cover_image

  return (
    <div className="mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
      {/* Cover */}
      <div className="relative h-36 w-full" style={{ backgroundColor: brandColor }}>
        {coverImage && (
          <img
            src={`${coverImage.imgix_url}?w=900&h=300&fit=crop&auto=format,compress`}
            alt={`${fullName} cover`}
            width={450}
            height={150}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      {/* Profile photo */}
      <div className="relative flex justify-center">
        <div className="-mt-14 h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-muted shadow-md">
          {profilePhoto ? (
            <img
              src={`${profilePhoto.imgix_url}?w=240&h=240&fit=crop&auto=format,compress`}
              alt={fullName}
              width={120}
              height={120}
              className="h-full w-full object-cover"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center text-3xl font-bold text-white"
              style={{ backgroundColor: brandColor }}
            >
              {fullName.charAt(0)}
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="px-6 pb-8 pt-4 text-center">
        <h1 className="text-2xl font-bold text-card-foreground">{fullName}</h1>
        {jobTitle && (
          <p className="mt-1 text-sm font-medium" style={{ color: brandColor }}>
            {jobTitle}
          </p>
        )}
        {company && <p className="text-sm text-muted-foreground">{company}</p>}

        {bio && <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{bio}</p>}

        {/* Contact rows */}
        <div className="mt-6 space-y-2 text-left">
          {phone && (
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-3 rounded-lg border border-border bg-muted/40 px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-muted"
            >
              <span className="text-muted-foreground">📞</span>
              <span>{phone}</span>
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-3 rounded-lg border border-border bg-muted/40 px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-muted"
            >
              <span className="text-muted-foreground">✉️</span>
              <span className="truncate">{email}</span>
            </a>
          )}
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg border border-border bg-muted/40 px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-muted"
            >
              <span className="text-muted-foreground">🌐</span>
              <span className="truncate">{website}</span>
            </a>
          )}
          {address && (
            <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/40 px-4 py-2.5 text-sm text-foreground">
              <span className="text-muted-foreground">📍</span>
              <span>{address}</span>
            </div>
          )}
        </div>

        {/* Social links */}
        {socialLinks.length > 0 && (
          <div className="mt-6">
            <SocialLinksList links={socialLinks} />
          </div>
        )}
      </div>
    </div>
  )
}