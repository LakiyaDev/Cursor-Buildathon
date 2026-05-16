'use client'

import Link from 'next/link'
import { Camera, BookOpen, Sparkles } from 'lucide-react'

export function EntryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
      {/* Museum Scanner Card */}
      <Link href="/museum" className="group">
        <div className="relative h-64 rounded-lg border border-border bg-card p-6 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Icon */}
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Camera className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
              Scan Museum Artifact
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Take a photo of any historical artifact and its label. Our AI will identify it and generate alternate timelines.
            </p>
          </div>
          
          {/* CTA hint */}
          <div className="relative z-10 flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            <span>Start Scanning</span>
            <Sparkles className="w-4 h-4" />
          </div>
        </div>
      </Link>
      
      {/* Browse Timelines Card */}
      <Link href="/timelines" className="group">
        <div className="relative h-64 rounded-lg border border-border bg-card p-6 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Icon */}
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
              Browse Historical Timelines
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Explore curated moments from history. Pick a pivotal event and ask &ldquo;What if?&rdquo;
            </p>
          </div>
          
          {/* CTA hint */}
          <div className="relative z-10 flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            <span>Explore History</span>
            <Sparkles className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </div>
  )
}
