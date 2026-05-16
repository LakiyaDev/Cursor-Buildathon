'use client'

import { useAction, useMutation, useQuery } from 'convex/react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Share2, Bookmark, AlertTriangle, Gamepad2, Sparkles } from 'lucide-react'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { ChaosMeter } from '@/components/simulation/chaos-meter'
import { BranchChoice } from '@/components/simulation/branch-choice'
import { LedgerSplit } from '@/components/simulation/ledger-split'
import { RippleList } from '@/components/simulation/ripple-list'
import { StoryCards } from '@/components/simulation/story-cards'
import { mapConvexStatus, mapSimulationToUi } from '@/lib/convex-ui'
import { useDemoMode } from '@/lib/useDemoMode'
import type { SimulationStatus } from '@/lib/types'

interface SimulationViewerClientProps {
  simulationId: string
}

// Phase descriptions for the loading state
const PHASES = [
  { id: 'analyzing', label: 'Analyzing divergence point...', duration: 1500 },
  { id: 'calculating', label: 'Calculating ripple effects...', duration: 2000 },
  { id: 'branching', label: 'Generating timeline branches...', duration: 1500 },
  { id: 'consequences', label: 'Determining consequences...', duration: 2000 },
]

export function SimulationViewerClient({ simulationId }: SimulationViewerClientProps) {
  const demo = useDemoMode()
  const convexSim = useQuery(api.simulations.get, {
    simulationId: simulationId as Id<'simulations'>,
  })
  const selectBranch = useMutation(api.simulations.selectBranch)
  const generatePhaseTwo = useAction(api.actions.generatePhaseTwo.run)
  const generateRelicImage = useAction(api.actions.generateRelicImage.run)
  const save = useMutation(api.simulations.save)
  const publish = useMutation(api.published.publish)

  const [phase2Loading, setPhase2Loading] = useState(false)
  const [currentPhase, setCurrentPhase] = useState(0)
  const [showStoryCards, setShowStoryCards] = useState(false)

  const simulation = convexSim ? mapSimulationToUi(convexSim) : null
  const status: SimulationStatus = convexSim
    ? phase2Loading
      ? 'phase2_generating'
      : mapConvexStatus(convexSim.status)
    : 'generating'
  const selectedBranch = simulation?.selectedBranch

  useEffect(() => {
    if (
      convexSim?.status === 'editable' &&
      convexSim.relicPrompt &&
      !convexSim.relicImageUrl
    ) {
      void generateRelicImage({ simulationId: simulationId as Id<'simulations'>, demo })
    }
  }, [convexSim?.status, convexSim?.relicPrompt, convexSim?.relicImageUrl, simulationId, demo, generateRelicImage])

  useEffect(() => {
    if (status === 'generated' || status === 'published') {
      const t = setTimeout(() => setShowStoryCards(true), 400)
      return () => clearTimeout(t)
    }
  }, [status])

  useEffect(() => {
    if (convexSim !== undefined) return
    let totalDelay = 0
    PHASES.forEach((phase, index) => {
      setTimeout(() => setCurrentPhase(index), totalDelay)
      totalDelay += phase.duration
    })
  }, [convexSim])

  const handleBranchSelect = async (branchId: string) => {
    setPhase2Loading(true)
    try {
      await selectBranch({
        simulationId: simulationId as Id<'simulations'>,
        selectedBranchId: branchId,
      })
      await generatePhaseTwo({ simulationId: simulationId as Id<'simulations'>, demo })
    } finally {
      setPhase2Loading(false)
    }
  }

  if (convexSim === null) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 px-6">
          <p className="text-foreground">Simulation not found or private.</p>
        </main>
      </div>
    )
  }

  if (convexSim === undefined || !simulation) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 pb-16 px-6">
          <div className="mx-auto max-w-4xl">
            <ImmersiveLoadingScreen
              whatIf={simulation?.whatIf || 'Generating alternate timeline...'}
              currentPhase={currentPhase}
              phases={PHASES}
            />
          </div>
        </main>
      </div>
    )
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
          
          {/* Header Section */}
          <div className="rounded-lg border border-border bg-card p-6 mb-8 animate-fade-in-up">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="flex-1">
                <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-3">
                  &ldquo;{simulation.whatIf}&rdquo;
                </h1>
              </div>
              
              {/* Chaos Meter */}
              <div className="flex-shrink-0">
                <ChaosMeter score={simulation.chaosScore} size="md" />
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border">
              <Button variant="outline" size="sm" className="text-muted-foreground">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="text-muted-foreground">
                <Bookmark className="w-4 h-4 mr-2" />
                Save
              </Button>
              {simulation.chaosScore >= 40 && (
                <Link href={`/stabilize/${simulationId}`}>
                  <Button variant="outline" size="sm" className="text-chaos-amber border-chaos-amber/30 hover:bg-chaos-amber/10">
                    <Gamepad2 className="w-4 h-4 mr-2" />
                    Stabilize Timeline
                  </Button>
                </Link>
              )}
            </div>
          </div>
          
          {/* High Chaos Warning */}
          {simulation.chaosScore >= 70 && (
            <div className="rounded-lg border border-chaos-red/30 bg-chaos-red/5 p-4 mb-8 flex items-start gap-3 animate-fade-in-up">
              <AlertTriangle className="w-5 h-5 text-chaos-red flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-foreground mb-1">Timeline Fracturing</h3>
                <p className="text-sm text-muted-foreground">
                  This alternate history has high chaos. The timeline may become unstable. 
                  Consider playing the Stabilize game to reduce chaos.
                </p>
              </div>
            </div>
          )}
          
          {/* Ripple Effects */}
          <div className="rounded-lg border border-border bg-card p-6 mb-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <RippleList ripples={simulation.ripples} animated={status === 'phase1_complete'} />
          </div>
          
          {/* Branch Choice (Phase 1) */}
          {(status === 'phase1_complete' || status === 'phase2_generating') && !selectedBranch && (
            <div className="rounded-lg border border-border bg-card p-6 mb-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <BranchChoice 
                branches={simulation.branches} 
                onSelect={handleBranchSelect}
                selectedBranch={selectedBranch}
              />
            </div>
          )}
          
          {/* Phase 2 Loading - Immersive */}
          {status === 'phase2_generating' && (
            <div className="rounded-lg border border-border bg-card p-8 mb-8">
              <BranchGeneratingAnimation />
            </div>
          )}
          
          {/* Results (Phase 2 Complete) */}
          {status === 'generated' && (
            <>
              {/* Ledger Split */}
              <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <LedgerSplit 
                  extinct={simulation.extinct} 
                  born={simulation.born}
                  animated={true}
                />
              </div>
              
              {/* Story Cards - The Alternate Timeline */}
              {showStoryCards && simulation.storyCards && simulation.storyCards.length > 0 && (
                <div className="rounded-lg border border-border bg-card p-6 mb-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                  <StoryCards cards={simulation.storyCards} />
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  )
}

// Immersive loading screen with phases
function ImmersiveLoadingScreen({ 
  whatIf, 
  currentPhase,
  phases 
}: { 
  whatIf: string
  currentPhase: number
  phases: { id: string; label: string; duration: number }[]
}) {
  return (
    <div className="relative min-h-[60vh] flex items-center justify-center">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden rounded-lg border border-border bg-card">
        {/* Animated grid */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(201, 162, 39, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(201, 162, 39, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              animation: 'gridMove 20s linear infinite',
            }}
          />
        </div>
        
        {/* Floating particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${4 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
        
        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-8 max-w-2xl">
        {/* Icon */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 border-2 border-primary/20 rounded-full" />
          <div className="absolute inset-2 border-2 border-primary/30 rounded-full animate-spin" style={{ animationDuration: '3s' }} />
          <div className="absolute inset-4 border-2 border-primary/40 rounded-full animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
          <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-primary animate-pulse" />
        </div>
        
        {/* What-if question */}
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6">
          &ldquo;{whatIf}&rdquo;
        </h2>
        
        {/* Phase indicator */}
        <div className="space-y-4">
          {phases.map((phase, index) => (
            <div 
              key={phase.id}
              className={`flex items-center gap-3 transition-all duration-500 ${
                index === currentPhase 
                  ? 'opacity-100' 
                  : index < currentPhase 
                    ? 'opacity-40' 
                    : 'opacity-20'
              }`}
            >
              <div className={`w-3 h-3 rounded-full transition-colors ${
                index <= currentPhase ? 'bg-primary' : 'bg-muted'
              }`}>
                {index === currentPhase && (
                  <div className="w-full h-full bg-primary rounded-full animate-ping" />
                )}
              </div>
              <span className={`text-sm ${
                index === currentPhase ? 'text-primary font-medium' : 'text-muted-foreground'
              }`}>
                {phase.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Custom styles */}
      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </div>
  )
}

// Branch selection generating animation
function BranchGeneratingAnimation() {
  const [dots, setDots] = useState('.')
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '.' : prev + '.')
    }, 500)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="flex flex-col items-center py-8">
      {/* Timeline branching visualization */}
      <div className="relative w-48 h-32 mb-6">
        {/* Main trunk */}
        <div className="absolute left-1/2 top-0 w-0.5 h-12 bg-primary -translate-x-1/2" />
        
        {/* Branch point */}
        <div className="absolute left-1/2 top-12 w-3 h-3 rounded-full bg-primary -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        
        {/* Branches */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 192 128">
          <path 
            d="M 96 48 Q 48 64, 24 112" 
            fill="none" 
            stroke="var(--primary)" 
            strokeWidth="2"
            strokeDasharray="4 4"
            className="animate-pulse"
            style={{ animationDelay: '0ms' }}
          />
          <path 
            d="M 96 48 L 96 112" 
            fill="none" 
            stroke="var(--primary)" 
            strokeWidth="2"
            strokeDasharray="4 4"
            className="animate-pulse"
            style={{ animationDelay: '200ms' }}
          />
          <path 
            d="M 96 48 Q 144 64, 168 112" 
            fill="none" 
            stroke="var(--primary)" 
            strokeWidth="2"
            strokeDasharray="4 4"
            className="animate-pulse"
            style={{ animationDelay: '400ms' }}
          />
        </svg>
        
        {/* End points */}
        <div className="absolute left-[12.5%] bottom-0 w-2 h-2 rounded-full bg-chaos-green animate-pulse" />
        <div className="absolute left-1/2 bottom-0 w-2 h-2 rounded-full bg-chaos-amber -translate-x-1/2 animate-pulse" style={{ animationDelay: '200ms' }} />
        <div className="absolute right-[12.5%] bottom-0 w-2 h-2 rounded-full bg-chaos-red animate-pulse" style={{ animationDelay: '400ms' }} />
      </div>
      
      <p className="text-lg text-foreground font-medium">
        Following the chosen path{dots}
      </p>
      <p className="text-sm text-muted-foreground mt-2">
        Generating consequences and timeline artifacts
      </p>
    </div>
  )
}

