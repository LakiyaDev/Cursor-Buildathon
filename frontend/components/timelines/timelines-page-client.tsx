'use client'

import { useQuery } from 'convex/react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { api } from '@/convex/_generated/api'
import { Header } from '@/components/layout/header'
import { ExpandableTimelineCard } from '@/components/timelines/expandable-timeline-card'
import { mapTimelineDetail, mapTimelineListItem } from '@/lib/convex-ui'
import { useState } from 'react'

export function TimelinesPageClient() {
  const timelines = useQuery(api.timelines.list)
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null)
  const detail = useQuery(
    api.timelines.getBySlug,
    expandedSlug ? { slug: expandedSlug } : 'skip',
  )

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-24 pb-16 px-6">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Historical Timelines
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Browse pivotal moments in history. Expand any era, select a critical incident,
              and ask &ldquo;what if&rdquo; to explore alternate realities.
            </p>
          </div>

          {timelines === undefined && (
            <p className="text-muted-foreground">Loading timelines…</p>
          )}

          <div className="space-y-6">
            {timelines?.map((t, index) => {
              const base = mapTimelineListItem(t)
              const timeline =
                expandedSlug === t.slug && detail
                  ? mapTimelineDetail(detail.timeline, detail.incidents)
                  : { ...base, incidents: [] }

              return (
                <ExpandableTimelineCard
                  key={t.slug}
                  timeline={timeline}
                  timelineDbId={t._id}
                  index={index}
                  isExpanded={expandedSlug === t.slug}
                  onToggle={() =>
                    setExpandedSlug((s) => (s === t.slug ? null : t.slug))
                  }
                />
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}

