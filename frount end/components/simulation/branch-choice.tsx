'use client'

import { useState } from 'react'
import { ChevronRight, Sparkles } from 'lucide-react'
import type { Branch } from '@/lib/types'

interface BranchChoiceProps {
  branches: Branch[]
  onSelect: (branchId: string) => void
  selectedBranch?: string
}

export function BranchChoice({ branches, onSelect, selectedBranch }: BranchChoiceProps) {
  const [hoveredBranch, setHoveredBranch] = useState<string | null>(null)
  
  const getChaosImpactLabel = (impact: number) => {
    if (impact < 0) return { text: `${impact} chaos`, color: 'text-chaos-green' }
    if (impact > 0) return { text: `+${impact} chaos`, color: 'text-chaos-red' }
    return { text: 'No change', color: 'text-muted-foreground' }
  }
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-serif text-xl font-semibold text-foreground">
            Choose Your Path
          </h3>
          <p className="text-sm text-muted-foreground">
            Select how history diverges from this point
          </p>
        </div>
      </div>
      
      <div className="grid gap-4">
        {branches.map((branch, index) => {
          const impact = getChaosImpactLabel(branch.chaosImpact)
          const isSelected = selectedBranch === branch.id
          const isHovered = hoveredBranch === branch.id
          
          return (
            <button
              key={branch.id}
              onClick={() => onSelect(branch.id)}
              onMouseEnter={() => setHoveredBranch(branch.id)}
              onMouseLeave={() => setHoveredBranch(null)}
              disabled={!!selectedBranch}
              className={`relative p-6 rounded-lg border text-left transition-all duration-300 ${
                isSelected
                  ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                  : selectedBranch
                  ? 'border-border bg-card/50 opacity-50'
                  : 'border-border bg-card hover:border-primary/50 hover:shadow-md'
              }`}
              style={{
                animationDelay: `${index * 150}ms`,
              }}
            >
              {/* Branch number badge */}
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center">
                <span className="text-sm font-medium text-foreground">{index + 1}</span>
              </div>
              
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-serif text-lg font-semibold text-foreground mb-2">
                    {branch.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {branch.description}
                  </p>
                  <span className={`text-xs font-medium ${impact.color}`}>
                    {impact.text}
                  </span>
                </div>
                
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  isSelected || isHovered ? 'bg-primary/20' : 'bg-muted'
                }`}>
                  <ChevronRight className={`w-4 h-4 transition-colors ${
                    isSelected || isHovered ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                </div>
              </div>
              
              {isSelected && (
                <div className="mt-4 pt-4 border-t border-primary/20">
                  <span className="text-xs text-primary font-medium">
                    Timeline selected - generating consequences...
                  </span>
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
