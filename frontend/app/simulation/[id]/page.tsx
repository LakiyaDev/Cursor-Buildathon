import { Suspense } from 'react'
import { SimulationViewerClient } from '@/components/simulation/simulation-viewer-client'
import { SimulationSkeleton } from '@/components/simulation/simulation-skeleton'
import { Header } from '@/components/layout/header'

interface SimulationPageProps {
  params: Promise<{ id: string }>
}

export default async function SimulationPage({ params }: SimulationPageProps) {
  const { id } = await params

  return (
    <Suspense
      fallback={
        <div className="min-h-screen">
          <Header />
          <main className="pt-24 pb-16 px-6">
            <div className="mx-auto max-w-4xl">
              <SimulationSkeleton />
            </div>
          </main>
        </div>
      }
    >
      <SimulationViewerClient simulationId={id} />
    </Suspense>
  )
}
