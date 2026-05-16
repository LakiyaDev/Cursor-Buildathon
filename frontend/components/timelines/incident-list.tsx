'use client'

import Link from 'next/link'
import { Calendar, Sparkles, ChevronRight } from 'lucide-react'
import type { Timeline } from '@/lib/types'

interface IncidentListProps {
  incidents: Timeline['incidents']
  timelineDbId?: string
}

export function IncidentList({ incidents, timelineDbId }: IncidentListProps) {
  return (
    <div className="space-y-4">
      {incidents.map((incident, index) => (
        <Link 
          key={incident.id}
          href={`/simulate/${incident.id}${timelineDbId ? `?timelineId=${timelineDbId}` : ''}`}
          className="group block"
        >
          <article 
            className="relative rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between gap-4">
              {/* Content */}
              <div className="flex-1">
                {/* Date badge */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {incident.date}
                  </span>
                </div>
                
                {/* Title */}
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {incident.title}
                </h3>
                
                {/* Description */}
                {incident.description && (
                  <p className="text-sm text-muted-foreground mb-3">
                    {incident.description}
                  </p>
                )}
                
                {/* Context preview */}
                {incident.context && (
                  <p className="text-sm text-muted-foreground/80 line-clamp-2">
                    {incident.context}
                  </p>
                )}
              </div>
              
              {/* CTA */}
              <div className="flex-shrink-0 flex flex-col items-end gap-2">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Sparkles className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <span className="flex items-center gap-1 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  What If?
                  <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  )
}

