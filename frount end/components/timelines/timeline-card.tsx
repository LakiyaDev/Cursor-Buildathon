'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ChevronRight } from 'lucide-react'
import type { Timeline } from '@/lib/types'

interface TimelineCardProps {
  timeline: Timeline
  index: number
}

export function TimelineCard({ timeline, index }: TimelineCardProps) {
  return (
    <Link href={`/timelines/${timeline.slug}`} className="group">
      <article 
        className="relative h-80 rounded-lg border border-border bg-card overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Cover Image */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-card/40 z-10" />
          <Image
            src={timeline.coverImage}
            alt={timeline.title}
            fill
            className="object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              // Fallback for missing images
              e.currentTarget.style.display = 'none'
            }}
          />
        </div>
        
        {/* Content */}
        <div className="relative z-20 h-full flex flex-col justify-end p-6">
          {/* Era badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted/80 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              {timeline.era}
            </span>
            <span className="text-xs text-muted-foreground">
              {timeline.incidents.length} incidents
            </span>
          </div>
          
          {/* Title */}
          <h2 className="font-serif text-2xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {timeline.title}
          </h2>
          
          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {timeline.description}
          </p>
          
          {/* CTA */}
          <div className="flex items-center gap-1 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            <span>Explore Timeline</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </article>
    </Link>
  )
}
