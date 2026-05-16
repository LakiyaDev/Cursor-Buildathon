'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Sparkles, Send, Calendar, Lightbulb } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { getIncidentById } from '@/lib/mock-data'

interface SimulatePageClientProps {
  incidentId: string
}

const whatIfExamples = [
  'What if the key figure had survived?',
  'What if the event happened 10 years later?',
  'What if a crucial decision went the other way?',
  'What if the weather had been different that day?',
  'What if a secret alliance had been discovered?',
]

export function SimulatePageClient({ incidentId }: SimulatePageClientProps) {
  const router = useRouter()
  const [whatIf, setWhatIf] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  
  const data = getIncidentById(incidentId)
  
  const maxLength = 200
  const remainingChars = maxLength - whatIf.length
  
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-2xl text-foreground mb-4">Incident Not Found</h1>
          <Link href="/timelines" className="text-primary hover:underline">
            Browse Timelines
          </Link>
        </div>
      </div>
    )
  }
  
  const { timeline, incident } = data
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!whatIf.trim() || isGenerating) return
    
    setIsGenerating(true)
    
    // Simulate API delay and redirect to simulation viewer
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // For demo, we'll use a hardcoded simulation ID
    // In production, this would create a new simulation and return its ID
    const demoSimId = incidentId === 'sarajevo-1914' ? 'demo-sarajevo-1' : `sim-${Date.now()}`
    router.push(`/simulation/${demoSimId}?whatIf=${encodeURIComponent(whatIf)}`)
  }
  
  const handleExampleClick = (example: string) => {
    setWhatIf(example)
  }
  
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-16 px-6">
        <div className="mx-auto max-w-2xl">
          {/* Breadcrumb */}
          <Link 
            href={`/timelines/${timeline.slug}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {timeline.title}
          </Link>
          
          {/* Incident Context */}
          <div className="rounded-lg border border-border bg-card p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                {incident.date}
              </span>
              <span className="text-xs text-muted-foreground">{timeline.title}</span>
            </div>
            
            <h1 className="font-serif text-2xl font-semibold text-foreground mb-3">
              {incident.title}
            </h1>
            
            {incident.context && (
              <p className="text-muted-foreground leading-relaxed">
                {incident.context}
              </p>
            )}
          </div>
          
          {/* What-If Input */}
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-semibold text-foreground">
                  Rewrite This Moment
                </h2>
                <p className="text-sm text-muted-foreground">
                  Describe your alternate scenario in one sentence
                </p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="relative mb-4">
                <textarea
                  value={whatIf}
                  onChange={(e) => setWhatIf(e.target.value.slice(0, maxLength))}
                  placeholder="What if..."
                  className="w-full h-32 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  disabled={isGenerating}
                />
                <div className={`absolute bottom-3 right-3 text-xs ${remainingChars < 20 ? 'text-destructive' : 'text-muted-foreground'}`}>
                  {remainingChars} characters remaining
                </div>
              </div>
              
              {/* Example prompts */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Need inspiration?</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {whatIfExamples.slice(0, 3).map((example, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleExampleClick(example)}
                      className="px-3 py-1.5 rounded-full border border-border bg-muted/50 text-xs text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
              
              <Button
                type="submit"
                disabled={!whatIf.trim() || isGenerating}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
              >
                {isGenerating ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Generating Timeline...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Generate Alternate Timeline
                    <Send className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
