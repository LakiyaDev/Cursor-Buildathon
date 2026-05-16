'use client'

import Link from 'next/link'
import {
  ArrowLeft,
  AlertTriangle,
  Bookmark,
  Gamepad2,
  GitBranch,
  Waves,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ChaosMeter } from '@/components/simulation/chaos-meter'
import { BranchChoice } from '@/components/simulation/branch-choice'
import { LedgerSplit } from '@/components/simulation/ledger-split'
import { RippleList } from '@/components/simulation/ripple-list'
import type { Simulation, SimulationStatus } from '@/lib/types'
import { cn } from '@/lib/utils'

interface SimulationDetailsBentoProps {
  simulation: Simulation
  simulationId: string
  status: SimulationStatus
  selectedBranch?: string
  incidentTitle?: string
  incidentDate?: string
  timelineTitle?: string
  onBranchSelect: (branchId: string) => void
  branchGeneratingSlot?: React.ReactNode
}

function BentoPanel({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-border bg-card p-6 md:p-7 shadow-sm',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function SimulationDetailsBento({
  simulation,
  simulationId,
  status,
  selectedBranch,
  incidentTitle,
  incidentDate,
  timelineTitle,
  onBranchSelect,
  branchGeneratingSlot,
}: SimulationDetailsBentoProps) {
  const showBranches =
    (status === 'phase1_complete' || status === 'phase2_generating') && !selectedBranch
  const showHighChaos = simulation.chaosScore >= 70
  const showStabilize = simulation.chaosScore >= 40

  return (
    <section id="simulation-details" className="relative z-10 border-t border-border bg-background">
      <main className="px-4 py-10 md:px-8 md:py-14">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/timelines"
            className="mb-8 inline-flex h-12 items-center gap-2 rounded-full border border-border bg-card px-5 text-base font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Timelines
          </Link>

          <p className="mb-6 text-sm font-medium tracking-widest text-primary uppercase">
            Timeline analysis
          </p>

          <div className="grid auto-rows-min grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
            {/* What-if context — large cell */}
            <BentoPanel className="md:col-span-8">
              {timelineTitle && incidentDate && (
                <p className="mb-2 text-sm text-muted-foreground md:text-base">
                  {timelineTitle} &middot; {incidentDate}
                </p>
              )}
              <h2 className="font-serif text-2xl font-bold leading-snug text-foreground md:text-3xl">
                &ldquo;{simulation.whatIf}&rdquo;
              </h2>
              {incidentTitle && (
                <p className="mt-4 text-base text-muted-foreground">
                  Diverged from: <span className="text-foreground">{incidentTitle}</span>
                </p>
              )}
              <div className="mt-6 flex flex-wrap gap-3 border-t border-border pt-6">
                <Button variant="outline" size="lg" className="h-12 min-w-[8.5rem] px-6 text-base">
                  <Bookmark className="mr-2 h-5 w-5" />
                  Save
                </Button>
                {showStabilize && (
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-12 min-w-[10rem] border-chaos-amber/40 px-6 text-base text-chaos-amber hover:bg-chaos-amber/10"
                    asChild
                  >
                    <Link href={`/simulation/${simulationId}/stabilize`}>
                      <Gamepad2 className="mr-2 h-5 w-5" />
                      Stabilize
                    </Link>
                  </Button>
                )}
              </div>
            </BentoPanel>

            {/* Chaos score */}
            <BentoPanel className="flex flex-col items-center justify-center md:col-span-4">
              <p className="mb-4 text-center text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Chaos score
              </p>
              <ChaosMeter score={simulation.chaosScore} size="lg" />
            </BentoPanel>

            {/* High chaos warning */}
            {showHighChaos && (
              <BentoPanel className="border-chaos-red/30 bg-chaos-red/5 md:col-span-12">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-chaos-red/15">
                    <AlertTriangle className="h-6 w-6 text-chaos-red" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Timeline fracturing</h3>
                    <p className="mt-1 text-base text-muted-foreground">
                      This alternate history has high chaos. Play Stabilize to reduce instability
                      before the timeline collapses further.
                    </p>
                  </div>
                </div>
              </BentoPanel>
            )}

            {/* Ripples — wide */}
            <BentoPanel className="md:col-span-12">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Waves className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-foreground md:text-2xl">
                    Ripple effects
                  </h3>
                  <p className="text-sm text-muted-foreground md:text-base">
                    How your change spreads through history
                  </p>
                </div>
              </div>
              <RippleList ripples={simulation.ripples} animated={status === 'phase1_complete'} />
            </BentoPanel>

            {/* Branch choices */}
            {showBranches && (
              <BentoPanel className="md:col-span-12">
                <BranchChoice
                  branches={simulation.branches}
                  onSelect={onBranchSelect}
                  selectedBranch={selectedBranch}
                />
              </BentoPanel>
            )}

            {status === 'phase2_generating' && branchGeneratingSlot && (
              <BentoPanel className="md:col-span-12">{branchGeneratingSlot}</BentoPanel>
            )}

            {/* Ledger — full width when complete */}
            {status === 'generated' && (
              <BentoPanel className="md:col-span-12">
                <LedgerSplit
                  extinct={simulation.extinct}
                  born={simulation.born}
                  animated
                />
              </BentoPanel>
            )}
          </div>
        </div>
      </main>
    </section>
  )
}
