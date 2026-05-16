'use client'

import { useEffect, useState } from 'react'

interface RippleListProps {
  ripples: string[]
  animated?: boolean
}

export function RippleList({ ripples, animated = true }: RippleListProps) {
  const [visibleCount, setVisibleCount] = useState(animated ? 0 : ripples.length)
  
  useEffect(() => {
    if (!animated) return
    
    let count = 0
    const interval = setInterval(() => {
      count++
      setVisibleCount(count)
      if (count >= ripples.length) {
        clearInterval(interval)
      }
    }, 600)
    
    return () => clearInterval(interval)
  }, [animated, ripples.length])
  
  return (
    <div className="space-y-4">
      <h3 className="font-serif text-lg font-semibold text-foreground">
        Ripple Effects
      </h3>
      <div className="relative pl-6 space-y-4">
        {/* Timeline line */}
        <div className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent" />
        
        {ripples.slice(0, visibleCount).map((ripple, index) => (
          <div
            key={index}
            className="relative animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Timeline dot */}
            <div className="absolute -left-6 top-1.5 w-4 h-4 rounded-full bg-card border-2 border-primary flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            </div>
            
            <p className="text-sm text-muted-foreground leading-relaxed pl-2">
              {ripple}
            </p>
          </div>
        ))}
        
        {visibleCount < ripples.length && (
          <div className="relative animate-fade-in-up">
            <div className="absolute -left-6 top-1.5 w-4 h-4 rounded-full bg-card border-2 border-muted flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-muted animate-pulse" />
            </div>
            <p className="text-sm text-muted-foreground italic pl-2">
              Tracing consequences...
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

