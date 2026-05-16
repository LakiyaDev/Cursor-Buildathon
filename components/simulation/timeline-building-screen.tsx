'use client'

import SoftAurora from '@/components/simulation/soft-aurora'
import { cn } from '@/lib/utils'

export const TIMELINE_BUILDING_PHASES = [
  { id: 'analyzing', label: 'Analyzing divergence point...', duration: 1500 },
  { id: 'calculating', label: 'Calculating ripple effects...', duration: 2000 },
  { id: 'branching', label: 'Generating timeline branches...', duration: 1500 },
  { id: 'consequences', label: 'Determining consequences...', duration: 2000 },
] as const

export function getTimelineBuildingDuration() {
  return TIMELINE_BUILDING_PHASES.reduce((sum, phase) => sum + phase.duration, 0)
}

interface TimelineBuildingScreenProps {
  whatIf: string
  currentPhase: number
  phases?: readonly { id: string; label: string; duration: number }[]
}

export function TimelineBuildingScreen({
  whatIf,
  currentPhase,
  phases = TIMELINE_BUILDING_PHASES,
}: TimelineBuildingScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex h-[100dvh] w-full flex-col bg-black">
      <div className="absolute inset-0">
        <SoftAurora
          speed={0.6}
          scale={1.5}
          brightness={1.0}
          color1="#f7f7f7"
          color2="#e100ff"
          noiseFrequency={2.5}
          noiseAmplitude={1.0}
          bandHeight={0.5}
          bandSpread={1.0}
          octaveDecay={0.1}
          layerOffset={0}
          colorSpeed={1.0}
          enableMouseInteraction
          mouseInfluence={0.25}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-xl text-center">
          <p className="mb-3 text-xs font-medium tracking-[0.2em] text-white/50 uppercase">
            AltEra
          </p>
          <h1 className="font-serif text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Your what-if timeline is building
          </h1>
          <p className="mt-6 font-serif text-lg text-white/80 md:text-xl">
            &ldquo;{whatIf}&rdquo;
          </p>
        </div>

        <div className="mt-12 w-full max-w-md space-y-4">
          {phases.map((phase, index) => (
            <div
              key={phase.id}
              className={cn(
                'flex items-center gap-3 rounded-lg border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-sm transition-all duration-500',
                index === currentPhase
                  ? 'opacity-100'
                  : index < currentPhase
                    ? 'opacity-50'
                    : 'opacity-25',
              )}
            >
              <div
                className={cn(
                  'relative h-2.5 w-2.5 shrink-0 rounded-full',
                  index <= currentPhase ? 'bg-primary' : 'bg-white/30',
                )}
              >
                {index === currentPhase && (
                  <span className="absolute inset-0 animate-ping rounded-full bg-primary" />
                )}
              </div>
              <span
                className={cn(
                  'text-sm',
                  index === currentPhase
                    ? 'font-medium text-primary'
                    : 'text-white/70',
                )}
              >
                {phase.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
