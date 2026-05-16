'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Check, Clock, Sparkles, Edit3 } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { mockMuseumScan } from '@/lib/mock-data'
import type { TimelineDuration } from '@/lib/types'

const durationOptions: { value: TimelineDuration; label: string; description: string }[] = [
  { value: '10_years', label: '10 Years', description: 'Immediate ripples and direct consequences' },
  { value: '50_years', label: '50 Years', description: 'Generational shift and cultural change' },
  { value: '100_years', label: '100 Years', description: 'New world order and lasting legacy' },
  { value: '500_years', label: '500 Years', description: 'Civilization-altering transformation' },
]

export default function ScanConfirmPage() {
  const router = useRouter()
  const [extractedText, setExtractedText] = useState(mockMuseumScan.extractedText)
  const [selectedDuration, setSelectedDuration] = useState<TimelineDuration>('100_years')
  const [isEditing, setIsEditing] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  
  const handleGenerate = async () => {
    setIsGenerating(true)
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Navigate to simulation viewer with demo data
    router.push('/simulation/demo-sarajevo-1')
  }
  
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-16 px-6">
        <div className="mx-auto max-w-2xl">
          {/* Breadcrumb */}
          <Link 
            href="/museum"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Upload
          </Link>
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-bold text-foreground mb-3">
              Confirm Artifact Details
            </h1>
            <p className="text-muted-foreground">
              Review the extracted information and choose how far into the future to simulate.
            </p>
          </div>
          
          {/* Extracted Text */}
          <div className="rounded-lg border border-border bg-card p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Edit3 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-medium text-foreground">Extracted Information</h2>
                  <p className="text-sm text-muted-foreground">
                    Confidence: {Math.round(mockMuseumScan.confidence * 100)}%
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-sm text-primary hover:underline"
              >
                {isEditing ? 'Done' : 'Edit'}
              </button>
            </div>
            
            {isEditing ? (
              <textarea
                value={extractedText}
                onChange={(e) => setExtractedText(e.target.value)}
                className="w-full h-40 px-4 py-3 rounded-lg border border-border bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
            ) : (
              <div className="rounded-lg bg-muted/50 p-4">
                <p className="text-foreground whitespace-pre-line leading-relaxed">
                  {extractedText}
                </p>
              </div>
            )}
          </div>
          
          {/* Duration Picker */}
          <div className="rounded-lg border border-border bg-card p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-medium text-foreground">Simulation Duration</h2>
                <p className="text-sm text-muted-foreground">
                  How far should history diverge?
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {durationOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedDuration(option.value)}
                  className={`relative p-4 rounded-lg border text-left transition-all ${
                    selectedDuration === option.value
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">{option.label}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {option.description}
                      </p>
                    </div>
                    {selectedDuration === option.value && (
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-lg"
          >
            {isGenerating ? (
              <span className="flex items-center gap-3">
                <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Rewriting History...
              </span>
            ) : (
              <span className="flex items-center gap-3">
                <Sparkles className="w-5 h-5" />
                Generate Alternate Timeline
              </span>
            )}
          </Button>
          
          <p className="text-xs text-muted-foreground text-center mt-4">
            This will use AI to generate a speculative alternate history based on the artifact.
          </p>
        </div>
      </main>
    </div>
  )
}
