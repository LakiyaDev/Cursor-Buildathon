import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { mockTimelines } from '@/lib/mock-data'
import { Header } from '@/components/layout/header'
import { ExpandableTimelineCard } from '@/components/timelines/expandable-timeline-card'

export default function TimelinesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-16 px-6">
        <div className="mx-auto max-w-5xl">
          {/* Breadcrumb */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          {/* Header */}
          <div className="mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Historical Timelines
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Browse pivotal moments in history. Expand any era, select a critical incident, and ask &ldquo;what if&rdquo; to explore alternate realities.
            </p>
          </div>
          
          {/* Timeline Cards */}
          <div className="space-y-6">
            {mockTimelines.map((timeline, index) => (
              <ExpandableTimelineCard 
                key={timeline.slug} 
                timeline={timeline} 
                index={index}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
