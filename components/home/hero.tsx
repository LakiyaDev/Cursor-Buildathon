'use client'

import { useEffect, useState } from 'react'

export function Hero() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative text-center mb-12">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {mounted && (
          <>
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-pulse-glow delay-500" />
          </>
        )}
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Tagline */}
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border border-border text-xs text-muted-foreground mb-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Alternate History Simulator
        </div>
        
        {/* Main headline */}
        <h1 className={`font-serif text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6 transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className="text-balance">Simulate the</span>
          <br />
          <span className="text-gradient-gold">Unseen</span>
        </h1>
        
        {/* Subheadline */}
        <p className={`text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Change one moment. Rewrite everything.
          <br className="hidden sm:block" />
          <span className="text-foreground/80">Explore what could have been.</span>
        </p>
      </div>
    </div>
  )
}
