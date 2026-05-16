import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Calendar, Sparkles } from 'lucide-react'
import { getTimelineBySlug, mockTimelines } from '@/lib/mock-data'
import { Header } from '@/components/layout/header'
import { IncidentList } from '@/components/timelines/incident-list'
import { ContextBriefing } from '@/components/timelines/context-briefing'

interface TimelineDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return mockTimelines.map((timeline) => ({
    slug: timeline.slug,
  }))
}

export default async function TimelineDetailPage({ params }: TimelineDetailPageProps) {
  const { slug } = await params
  const timeline = getTimelineBySlug(slug)
  
  if (!timeline) {
    notFound()
  }
  
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-16 px-6">
        <div className="mx-auto max-w-4xl">
          {/* Breadcrumb */}
          <Link 
            href="/timelines" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Timelines
          </Link>
          
          {/* Hero Section */}
          <div className="relative rounded-xl overflow-hidden mb-8">
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={timeline.coverImage}
                alt={timeline.title}
                fill
                className="object-cover opacity-30"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/60" />
            </div>
            
            {/* Content */}
            <div className="relative z-10 p-8 md:p-12">
              {/* Era badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {timeline.era}
                </span>
              </div>
              
              {/* Title */}
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
                {timeline.title}
              </h1>
              
              {/* Description */}
              <p className="text-lg text-muted-foreground max-w-2xl">
                {timeline.description}
              </p>
            </div>
          </div>
          
          {/* Context Briefing */}
          <ContextBriefing timeline={timeline} />
          
          {/* Incidents Section */}
          <section className="mt-12">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="font-serif text-2xl font-semibold text-foreground">
                Pivotal Moments
              </h2>
            </div>
            <p className="text-muted-foreground mb-8">
              Select any moment below to explore an alternate timeline. What if history had unfolded differently?
            </p>
            
            <IncidentList incidents={timeline.incidents} />
          </section>
        </div>
      </main>
    </div>
  )
}
