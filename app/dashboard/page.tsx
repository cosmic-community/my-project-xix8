import { getProfile, getSocialLinks, getServices, getMetafieldValue } from '@/lib/cosmic'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DashboardStatCard from '@/components/DashboardStatCard'
import DashboardSection from '@/components/DashboardSection'
import SocialIcon from '@/components/SocialIcon'
import Link from 'next/link'

export const revalidate = 30

export default async function DashboardPage() {
  const [profile, socialLinks, services] = await Promise.all([
    getProfile(),
    getSocialLinks(),
    getServices(),
  ])

  const brandColor = getMetafieldValue(profile?.metadata?.brand_color) || '#1e293b'
  const fullName = getMetafieldValue(profile?.metadata?.full_name) || profile?.title || 'No profile'
  const jobTitle = getMetafieldValue(profile?.metadata?.job_title)
  const isActive = profile?.metadata?.active === true

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-muted/30">
        <section className="mx-auto max-w-5xl px-4 py-10">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="mt-2 text-muted-foreground">
              Overview of your business card content.
            </p>
          </div>

          {/* Stats */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <DashboardStatCard label="Profile Status" value={isActive ? 'Active' : 'Inactive'} icon="👤" accent={brandColor} />
            <DashboardStatCard label="Services" value={services.length} icon="🛠️" accent={brandColor} />
            <DashboardStatCard label="Social Links" value={socialLinks.length} icon="🔗" accent={brandColor} />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Profile overview */}
            <DashboardSection title="Profile" description="Your business card identity">
              {profile ? (
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-muted">
                    {profile.metadata?.profile_photo ? (
                      <img
                        src={`${profile.metadata.profile_photo.imgix_url}?w=128&h=128&fit=crop&auto=format,compress`}
                        alt={fullName}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div
                        className="flex h-full w-full items-center justify-center text-xl font-bold text-white"
                        style={{ backgroundColor: brandColor }}
                      >
                        {fullName.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-card-foreground">{fullName}</p>
                    {jobTitle && <p className="text-sm text-muted-foreground">{jobTitle}</p>}
                    <Link href="/" className="mt-1 inline-block text-xs font-medium text-foreground hover:underline">
                      View card &rarr;
                    </Link>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No profile configured.</p>
              )}
            </DashboardSection>

            {/* Social links overview */}
            <DashboardSection title="Social Links" description="Connected social accounts">
              {socialLinks.length > 0 ? (
                <ul className="space-y-2">
                  {socialLinks.map((link) => (
                    <li
                      key={link.id}
                      className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 px-3 py-2"
                    >
                      <SocialIcon platform={getMetafieldValue(link.metadata?.platform)} className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">
                        {getMetafieldValue(link.metadata?.label) || link.title}
                      </span>
                      <span className="ml-auto truncate text-xs text-muted-foreground">
                        {getMetafieldValue(link.metadata?.url)}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No social links added.</p>
              )}
            </DashboardSection>
          </div>

          {/* Services overview */}
          <div className="mt-6">
            <DashboardSection title="Services" description="Services displayed on your card">
              {services.length > 0 ? (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {services.map((service) => (
                    <Link
                      key={service.id}
                      href={`/services/${service.slug}`}
                      className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 px-3 py-3 transition-colors hover:bg-muted"
                    >
                      {service.metadata?.image && (
                        <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                          <img
                            src={`${service.metadata.image.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                            alt={getMetafieldValue(service.metadata?.title) || service.title}
                            width={48}
                            height={48}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">
                          {getMetafieldValue(service.metadata?.title) || service.title}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {getMetafieldValue(service.metadata?.description)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No services added.</p>
              )}
            </DashboardSection>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}