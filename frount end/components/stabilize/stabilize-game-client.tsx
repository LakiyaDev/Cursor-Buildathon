'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Check, Trophy, RefreshCw, AlertTriangle } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { ChaosMeter } from '@/components/simulation/chaos-meter'
import { mockSimulation, mockStabilizeFixes } from '@/lib/mock-data'
import type { StabilizeFix } from '@/lib/types'

interface StabilizeGameClientProps {
  simulationId: string
}

export function StabilizeGameClient({ simulationId }: StabilizeGameClientProps) {
  const initialChaos = simulationId === 'demo-cuban-1' ? 94 : mockSimulation.chaosScore
  
  const [fixes, setFixes] = useState<StabilizeFix[]>(mockStabilizeFixes.map(f => ({ ...f, selected: false })))
  const [currentChaos, setCurrentChaos] = useState(initialChaos)
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing')
  const [isApplying, setIsApplying] = useState(false)
  
  const selectedFixes = fixes.filter(f => f.selected)
  const totalReduction = selectedFixes.reduce((sum, f) => sum + f.chaosReduction, 0)
  const projectedChaos = Math.max(0, initialChaos - totalReduction)
  
  const handleFixToggle = (fixId: string) => {
    if (gameState !== 'playing') return
    
    setFixes(prev => prev.map(f => 
      f.id === fixId ? { ...f, selected: !f.selected } : f
    ))
  }
  
  const handleApplyFixes = async () => {
    if (selectedFixes.length === 0 || gameState !== 'playing') return
    
    setIsApplying(true)
    
    // Animate chaos reduction
    const targetChaos = projectedChaos
    const steps = 20
    const stepDelay = 50
    const chaosStep = (currentChaos - targetChaos) / steps
    
    for (let i = 0; i < steps; i++) {
      await new Promise(resolve => setTimeout(resolve, stepDelay))
      setCurrentChaos(prev => Math.max(targetChaos, prev - chaosStep))
    }
    
    setCurrentChaos(targetChaos)
    setIsApplying(false)
    
    // Determine win/lose
    if (targetChaos < 40) {
      setGameState('won')
    } else {
      setGameState('lost')
    }
  }
  
  const handleRetry = () => {
    setFixes(mockStabilizeFixes.map(f => ({ ...f, selected: false })))
    setCurrentChaos(initialChaos)
    setGameState('playing')
  }
  
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-16 px-6">
        <div className="mx-auto max-w-2xl">
          {/* Breadcrumb */}
          <Link 
            href={`/simulation/${simulationId}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Simulation
          </Link>
          
          {/* Game Header */}
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
              Stabilize the Timeline
            </h1>
            <p className="text-muted-foreground">
              Pick fixes until chaos drops below 40
            </p>
          </div>
          
          {/* Chaos Display */}
          <div className="flex justify-center mb-8">
            <ChaosMeter score={Math.round(currentChaos)} size="lg" animated={false} />
          </div>
          
          {/* Projected Chaos */}
          {selectedFixes.length > 0 && gameState === 'playing' && (
            <div className="text-center mb-8">
              <p className="text-sm text-muted-foreground">
                Projected chaos after fixes: 
                <span className={`ml-2 font-bold ${projectedChaos < 40 ? 'text-chaos-green' : 'text-chaos-amber'}`}>
                  {projectedChaos}
                </span>
              </p>
            </div>
          )}
          
          {/* Win State */}
          {gameState === 'won' && (
            <div className="rounded-lg border border-chaos-green/30 bg-chaos-green/5 p-6 mb-8 text-center">
              <div className="w-16 h-16 rounded-full bg-chaos-green/20 flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-chaos-green" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
                Timeline Stabilized!
              </h2>
              <p className="text-muted-foreground mb-4">
                You&apos;ve successfully restored balance to this alternate history.
              </p>
              <div className="flex justify-center gap-3">
                <Link href={`/simulation/${simulationId}`}>
                  <Button variant="outline">View Timeline</Button>
                </Link>
                <Link href="/dashboard">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Browse More
                  </Button>
                </Link>
              </div>
            </div>
          )}
          
          {/* Lose State */}
          {gameState === 'lost' && (
            <div className="rounded-lg border border-chaos-red/30 bg-chaos-red/5 p-6 mb-8 text-center">
              <div className="w-16 h-16 rounded-full bg-chaos-red/20 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-chaos-red" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
                Timeline Still Unstable
              </h2>
              <p className="text-muted-foreground mb-4">
                The chaos level is still above 40. Try different combinations of fixes.
              </p>
              <Button onClick={handleRetry} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          )}
          
          {/* Fix Cards */}
          {gameState === 'playing' && (
            <>
              <div className="space-y-3 mb-8">
                {fixes.map((fix) => (
                  <button
                    key={fix.id}
                    onClick={() => handleFixToggle(fix.id)}
                    disabled={isApplying}
                    className={`w-full p-4 rounded-lg border text-left transition-all ${
                      fix.selected
                        ? 'border-primary bg-primary/5'
                        : 'border-border bg-card hover:border-primary/50'
                    } ${isApplying ? 'opacity-50' : ''}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground mb-1">
                          {fix.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {fix.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-chaos-green font-medium">
                          -{fix.chaosReduction}
                        </span>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                          fix.selected
                            ? 'border-primary bg-primary'
                            : 'border-muted'
                        }`}>
                          {fix.selected && <Check className="w-4 h-4 text-primary-foreground" />}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Apply Button */}
              <Button
                onClick={handleApplyFixes}
                disabled={selectedFixes.length === 0 || isApplying}
                className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-lg"
              >
                {isApplying ? (
                  <span className="flex items-center gap-3">
                    <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Applying Fixes...
                  </span>
                ) : (
                  `Apply ${selectedFixes.length} Fix${selectedFixes.length !== 1 ? 'es' : ''}`
                )}
              </Button>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
