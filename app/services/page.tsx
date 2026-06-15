import { getServices } from '@/lib/cosmic'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ServicesGrid from '@/components/ServicesGrid'

export const revalidate = 60

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-4 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Services</h1>
            <p className="mt-2 text-muted-foreground">
              Explore the services offered.
            </p>
          </div>
          <ServicesGrid services={services} />
        </section>
      </main>
      <Footer />
    </div>
  )
}