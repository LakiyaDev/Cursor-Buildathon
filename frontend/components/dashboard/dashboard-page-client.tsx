'use client'

import { useQuery } from 'convex/react'
import Link from 'next/link'
import { ArrowLeft, AlertTriangle, Gamepad2, User } from 'lucide-react'
import { api } from '@/convex/_generated/api'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'

export function DashboardPageClient() {
  const feed = useQuery(api.published.listPublic)

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-24 pb-16 px-6">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Community Timelines
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Explore alternate histories. Stabilize chaotic timelines until chaos drops below 40.
            </p>
          </div>

          {feed === undefined && (
            <p className="text-muted-foreground">Loading community timelines…</p>
          )}

          {feed?.length === 0 && (
            <p className="text-muted-foreground">
              No published timelines yet. Run{' '}
              <code className="text-primary">devSeed:run</code> with{' '}
              <code className="text-primary">force: true</code> after signing in.
            </p>
          )}

          <div className="space-y-6">
            {feed?.map((item) => {
              const chaos = item.chaosScore ?? 0
              const isHighChaos = chaos >= 70
              const isUnstable = chaos >= 40

              return (
                <article
                  key={item._id}
                  className="rounded-lg border border-border bg-card overflow-hidden hover:border-primary/30 transition-colors"
                >
                  <div className="p-6 border-b border-border">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                            <User className="w-3 h-3 text-muted-foreground" />
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {item.authorName ?? 'Historian'}
                          </span>
                        </div>
                        <h2 className="font-serif text-xl font-semibold text-foreground mb-2">
                          {item.title}
                        </h2>
                        <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                            isHighChaos
                              ? 'bg-chaos-red/10 text-chaos-red'
                              : isUnstable
                                ? 'bg-chaos-amber/10 text-chaos-amber'
                                : 'bg-chaos-green/10 text-chaos-green'
                          }`}
                        >
                          {isHighChaos && <AlertTriangle className="w-3 h-3" />}
                          Chaos: {chaos}
                        </span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Link href={`/simulation/${item.simulationId}`}>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </Link>
                        {isUnstable && (
                          <Link href={`/stabilize/${item.simulationId}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-chaos-amber border-chaos-amber/30"
                            >
                              <Gamepad2 className="w-4 h-4 mr-1" />
                              Stabilize
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
