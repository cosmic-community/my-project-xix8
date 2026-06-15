import { getProfile, getSocialLinks, getServices } from '@/lib/cosmic'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BusinessCard from '@/components/BusinessCard'
import ServicesGrid from '@/components/ServicesGrid'
import Link from 'next/link'

export const revalidate = 60

export default async function HomePage() {
  const [profile, socialLinks, services] = await Promise.all([
    getProfile(),
    getSocialLinks(),
    getServices(),
  ])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-4 py-12">
          {profile ? (
            <BusinessCard profile={profile} socialLinks={socialLinks} />
          ) : (
            <div className="mx-auto max-w-md rounded-xl border border-dashed border-border bg-muted/30 p-12 text-center">
              <p className="text-muted-foreground">
                No profile found. Add a profile in your Cosmic bucket to display your business card.
              </p>
            </div>
          )}
        </section>

        {services.length > 0 && (
          <section className="mx-auto max-w-5xl px-4 pb-16">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Services</h2>
              <Link href="/services" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                View all &rarr;
              </Link>
            </div>
            <ServicesGrid services={services.slice(0, 3)} />
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}