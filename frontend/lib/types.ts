// Types for AltEra alternate history simulator

export interface Timeline {
  slug: string
  title: string
  era: string
  coverImage: string
  description: string
  incidents: Incident[]
}

export interface Incident {
  id: string
  title: string
  date: string
  description?: string
  context?: string
  image?: string
}

export interface StoryCard {
  id: string
  year: string
  title: string
  description: string
  imagePrompt: string
  image?: string
  isAlternate: boolean
}

export interface Branch {
  id: string
  title: string
  description: string
  chaosImpact: number
}

export interface LedgerItem {
  id: string
  name: string
  description: string
  year?: string
}

export interface Simulation {
  id: string
  incidentId: string
  whatIf: string
  chaosScore: number
  status: SimulationStatus
  ripples: string[]
  branches: Branch[]
  selectedBranch?: string
  extinct: LedgerItem[]
  born: LedgerItem[]
  relicPrompt?: string
  relicImage?: string
  storyCards?: StoryCard[]
  createdAt: string
  publishedAt?: string
  authorId?: string
}

export type SimulationStatus = 
  | 'generating'
  | 'phase1_complete'
  | 'phase2_generating'
  | 'generated'
  | 'editable'
  | 'saved'
  | 'published'

export interface MuseumScan {
  id: string
  artifactImage: string
  labelImage?: string
  extractedText: string
  confidence: number
  duration: TimelineDuration
}

export type TimelineDuration = '10_years' | '50_years' | '100_years' | '500_years'

export interface StabilizeFix {
  id: string
  title: string
  description: string
  chaosReduction: number
  selected?: boolean
}

export interface StabilizeResult {
  success: boolean
  finalChaos: number
  message: string
}

export interface PublishedTimeline {
  id: string
  simulation: Simulation
  author: {
    name: string
    avatar?: string
  }
  likes: number
  remixes: number
}

// API Response types
export interface SimulationResponse {
  simulation: Simulation
  error?: string
}

export interface ScanResponse {
  scan: MuseumScan
  error?: string
}
