'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { StoryImmersiveGallery } from '@/components/simulation/story-immersive-gallery'
import { SimulationDetailsBento } from '@/components/simulation/simulation-details-bento'
import {
  TimelineBuildingScreen,
  TIMELINE_BUILDING_PHASES,
} from '@/components/simulation/timeline-building-screen'
import {
  mockSimulation,
  mockSimulationHighChaos,
  getIncidentById,
  getStorySlides,
} from '@/lib/mock-data'
import type { Simulation, SimulationStatus } from '@/lib/types'

interface SimulationViewerClientProps {
  simulationId: string
}

export function SimulationViewerClient({ simulationId }: SimulationViewerClientProps) {
  const searchParams = useSearchParams()
  const whatIfParam = searchParams.get('whatIf')

  const [simulation, setSimulation] = useState<Simulation | null>(null)
  const [status, setStatus] = useState<SimulationStatus>('generating')
  const [selectedBranch, setSelectedBranch] = useState<string | undefined>()
  const [currentPhase, setCurrentPhase] = useState(0)

  const loadSimulation = useCallback(async () => {
    let sim: Simulation
    if (simulationId === 'demo-cuban-1') {
      sim = mockSimulationHighChaos
    } else {
      sim = { ...mockSimulation }
      if (whatIfParam) {
        sim.whatIf = whatIfParam
      }
    }

    setSimulation(sim)
    setStatus('phase1_complete')
  }, [simulationId, whatIfParam])

  useEffect(() => {
    if (status !== 'generating') return

    let totalDelay = 0
    const phaseTimers = TIMELINE_BUILDING_PHASES.map((phase, index) => {
      const timer = setTimeout(() => {
        setCurrentPhase(index)
      }, totalDelay)
      totalDelay += phase.duration
      return timer
    })

    const doneTimer = setTimeout(() => {
      void loadSimulation()
    }, totalDelay)

    return () => {
      phaseTimers.forEach(clearTimeout)
      clearTimeout(doneTimer)
    }
  }, [loadSimulation, status])

  const handleBranchSelect = async (branchId: string) => {
    setSelectedBranch(branchId)
    setStatus('phase2_generating')

    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (simulation) {
      const branch = simulation.branches.find((b) => b.id === branchId)
      if (branch) {
        setSimulation({
          ...simulation,
          chaosScore: Math.max(0, Math.min(100, simulation.chaosScore + branch.chaosImpact)),
          selectedBranch: branchId,
        })
      }
    }

    setStatus('generated')
  }

  if (status === 'generating' || !simulation) {
    return (
      <TimelineBuildingScreen
        whatIf={whatIfParam || 'Generating alternate timeline...'}
        currentPhase={currentPhase}
      />
    )
  }

  const incidentData = getIncidentById(simulation.incidentId)
  const storySlides = getStorySlides(simulation, incidentData?.incident.image)

  return (
    <div className="min-h-screen bg-background">
      <StoryImmersiveGallery
        cards={storySlides}
        whatIf={simulation.whatIf}
        simulationId={simulationId}
        incidentId={simulation.incidentId}
      />

      <SimulationDetailsBento
        simulation={simulation}
        simulationId={simulationId}
        status={status}
        selectedBranch={selectedBranch}
        timelineTitle={incidentData?.timeline.title}
        incidentDate={incidentData?.incident.date}
        incidentTitle={incidentData?.incident.title}
        onBranchSelect={handleBranchSelect}
        branchGeneratingSlot={
          status === 'phase2_generating' ? <BranchGeneratingAnimation /> : undefined
        }
      />
    </div>
  )
}

function BranchGeneratingAnimation() {
  const [dots, setDots] = useState('.')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '.' : prev + '.'))
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center py-10">
      <div className="relative mb-8 h-36 w-56">
        <div className="absolute top-0 left-1/2 h-14 w-0.5 -translate-x-1/2 bg-primary" />
        <div className="absolute top-14 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-primary" />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 192 128">
          <path
            d="M 96 48 Q 48 64, 24 112"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="2"
            strokeDasharray="4 4"
            className="animate-pulse"
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
        <div className="absolute bottom-0 left-[12.5%] h-3 w-3 animate-pulse rounded-full bg-chaos-green" />
        <div
          className="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 animate-pulse rounded-full bg-chaos-amber"
          style={{ animationDelay: '200ms' }}
        />
        <div
          className="absolute right-[12.5%] bottom-0 h-3 w-3 animate-pulse rounded-full bg-chaos-red"
          style={{ animationDelay: '400ms' }}
        />
      </div>

      <p className="text-xl font-medium text-foreground">Following the chosen path{dots}</p>
      <p className="mt-2 text-base text-muted-foreground">
        Generating consequences and timeline artifacts
      </p>
    </div>
  )
}
