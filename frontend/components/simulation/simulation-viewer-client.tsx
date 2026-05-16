'use client'

import { useAction, useMutation, useQuery } from 'convex/react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { StoryImmersiveGallery } from '@/components/simulation/story-immersive-gallery'
import { SimulationDetailsBento } from '@/components/simulation/simulation-details-bento'
import {
  TimelineBuildingScreen,
  TIMELINE_BUILDING_PHASES,
} from '@/components/simulation/timeline-building-screen'
import { mapConvexStatus, mapSimulationToUi } from '@/lib/convex-ui'
import { getStorySlides } from '@/lib/mock-data'
import { useDemoMode } from '@/lib/useDemoMode'
import type { SimulationStatus } from '@/lib/types'

interface SimulationViewerClientProps {
  simulationId: string
}

export function SimulationViewerClient({ simulationId }: SimulationViewerClientProps) {
  const searchParams = useSearchParams()
  const whatIfParam = searchParams.get('whatIf')
  const demo = useDemoMode()

  const convexSim = useQuery(api.simulations.get, {
    simulationId: simulationId as Id<'simulations'>,
  })
  const incidentCtx = useQuery(
    api.incidents.get,
    convexSim?.changedIncidentId
      ? { incidentId: convexSim.changedIncidentId }
      : 'skip',
  )

  const selectBranch = useMutation(api.simulations.selectBranch)
  const generatePhaseTwo = useAction(api.actions.generatePhaseTwo.run)
  const generateRelicImage = useAction(api.actions.generateRelicImage.run)

  const [phase2Loading, setPhase2Loading] = useState(false)
  const [currentPhase, setCurrentPhase] = useState(0)

  const simulation = convexSim
    ? mapSimulationToUi(convexSim, incidentCtx?.incident ?? null)
    : null
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
      void generateRelicImage({
        simulationId: simulationId as Id<'simulations'>,
        demo,
      })
    }
  }, [
    convexSim?.status,
    convexSim?.relicPrompt,
    convexSim?.relicImageUrl,
    simulationId,
    demo,
    generateRelicImage,
  ])

  useEffect(() => {
    if (convexSim !== undefined) return

    let totalDelay = 0
    const timers = TIMELINE_BUILDING_PHASES.map((phase, index) => {
      const timer = setTimeout(() => setCurrentPhase(index), totalDelay)
      totalDelay += phase.duration
      return timer
    })

    return () => timers.forEach(clearTimeout)
  }, [convexSim])

  const handleBranchSelect = async (branchId: string) => {
    setPhase2Loading(true)
    try {
      await selectBranch({
        simulationId: simulationId as Id<'simulations'>,
        selectedBranchId: branchId,
      })
      await generatePhaseTwo({
        simulationId: simulationId as Id<'simulations'>,
        demo,
      })
    } finally {
      setPhase2Loading(false)
    }
  }

  if (convexSim === null) {
    return (
      <div className="min-h-screen bg-background px-6 pt-24">
        <p className="text-foreground">Simulation not found or private.</p>
      </div>
    )
  }

  if (convexSim === undefined || !simulation) {
    return (
      <TimelineBuildingScreen
        whatIf={whatIfParam || 'Generating alternate timeline...'}
        currentPhase={currentPhase}
      />
    )
  }

  const incidentImage =
    incidentCtx?.incident.relatedImageUrl ?? simulation.relicImage
  const storySlides = getStorySlides(simulation, incidentImage)

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
        timelineTitle={incidentCtx?.timeline.title}
        incidentDate={incidentCtx?.incident.year}
        incidentTitle={incidentCtx?.incident.title}
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
