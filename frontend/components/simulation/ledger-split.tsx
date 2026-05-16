'use client'

import { useEffect, useState } from 'react'
import { Skull, Sparkles } from 'lucide-react'
import type { LedgerItem } from '@/lib/types'

interface LedgerSplitProps {
  extinct: LedgerItem[]
  born: LedgerItem[]
  animated?: boolean
}

export function LedgerSplit({ extinct, born, animated = true }: LedgerSplitProps) {
  const [visibleExtinct, setVisibleExtinct] = useState<number>(animated ? 0 : extinct.length)
  const [visibleBorn, setVisibleBorn] = useState<number>(animated ? 0 : born.length)
  
  useEffect(() => {
    if (!animated) return
    
    // Stagger the reveal of items
    const revealExtinct = () => {
      let count = 0
      const interval = setInterval(() => {
        count++
        setVisibleExtinct(count)
        if (count >= extinct.length) {
          clearInterval(interval)
          // Start revealing born items after extinct
          setTimeout(revealBorn, 300)
        }
      }, 200)
    }
    
    const revealBorn = () => {
      let count = 0
      const interval = setInterval(() => {
        count++
        setVisibleBorn(count)
        if (count >= born.length) {
          clearInterval(interval)
        }
      }, 200)
    }
    
    // Start after a short delay
    const timeout = setTimeout(revealExtinct, 500)
    return () => clearTimeout(timeout)
  }, [animated, extinct.length, born.length])
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Extinct Column */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="p-4 border-b border-border bg-chaos-red/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-chaos-red/10 flex items-center justify-center">
              <Skull className="w-5 h-5 text-chaos-red" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-foreground">
                Extinct
              </h3>
              <p className="text-xs text-muted-foreground">
                What never came to be
              </p>
            </div>
          </div>
        </div>
        
        <div className="p-4 space-y-3">
          {extinct.slice(0, visibleExtinct).map((item, index) => (
            <div
              key={item.id}
              className="p-3 rounded-lg bg-chaos-red/5 border border-chaos-red/10 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-medium text-foreground text-sm">
                    {item.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.description}
                  </p>
                </div>
                {item.year && (
                  <span className="text-xs text-chaos-red font-mono flex-shrink-0">
                    {item.year}
                  </span>
                )}
              </div>
            </div>
          ))}
          
          {visibleExtinct < extinct.length && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-chaos-red animate-pulse" />
              Loading...
            </div>
          )}
        </div>
      </div>
      
      {/* Born Column */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="p-4 border-b border-border bg-primary/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-foreground">
                Born
              </h3>
              <p className="text-xs text-muted-foreground">
                What emerged instead
              </p>
            </div>
          </div>
        </div>
        
        <div className="p-4 space-y-3">
          {born.slice(0, visibleBorn).map((item, index) => (
            <div
              key={item.id}
              className="p-3 rounded-lg bg-primary/5 border border-primary/10 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-medium text-foreground text-sm">
                    {item.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.description}
                  </p>
                </div>
                {item.year && (
                  <span className="text-xs text-primary font-mono flex-shrink-0">
                    {item.year}
                  </span>
                )}
              </div>
            </div>
          ))}
          
          {visibleBorn < born.length && visibleExtinct >= extinct.length && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Loading...
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

