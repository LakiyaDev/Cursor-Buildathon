import { Suspense } from 'react'
import { SimulatePageClient } from '@/components/simulate/simulate-page-client'
import { Header } from '@/components/layout/header'

interface SimulatePageProps {
  params: Promise<{ incidentId: string }>
}

export default async function SimulatePage({ params }: SimulatePageProps) {
  const { incidentId } = await params
  return (
    <Suspense
      fallback={
        <div className="min-h-screen">
          <Header />
          <main className="pt-24 px-6">
            <p className="text-muted-foreground">Loading…</p>
          </main>
        </div>
      }
    >
      <SimulatePageClient incidentId={incidentId} />
    </Suspense>
  )
}
