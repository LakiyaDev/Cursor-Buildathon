'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Camera, FileText, Check, Upload, X } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'

type Step = 'artifact' | 'label'

export default function MuseumPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('artifact')
  const [artifactImage, setArtifactImage] = useState<string | null>(null)
  const [labelImage, setLabelImage] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'artifact' | 'label') => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        if (type === 'artifact') {
          setArtifactImage(result)
        } else {
          setLabelImage(result)
        }
      }
      reader.readAsDataURL(file)
    }
  }
  
  const handleDrop = (e: React.DragEvent, type: 'artifact' | 'label') => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        if (type === 'artifact') {
          setArtifactImage(result)
        } else {
          setLabelImage(result)
        }
      }
      reader.readAsDataURL(file)
    }
  }
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }
  
  const handleDragLeave = () => {
    setIsDragging(false)
  }
  
  const handleContinue = () => {
    if (step === 'artifact' && artifactImage) {
      setStep('label')
    } else if (step === 'label') {
      // Navigate to scan confirmation page
      router.push('/museum/scan/demo-scan-1')
    }
  }
  
  const handleBack = () => {
    if (step === 'label') {
      setStep('artifact')
    }
  }
  
  const clearImage = (type: 'artifact' | 'label') => {
    if (type === 'artifact') {
      setArtifactImage(null)
    } else {
      setLabelImage(null)
    }
  }
  
  const currentImage = step === 'artifact' ? artifactImage : labelImage
  
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-16 px-6">
        <div className="mx-auto max-w-xl">
          {/* Breadcrumb */}
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          {/* Progress Steps */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                step === 'artifact' ? 'bg-primary text-primary-foreground' : 'bg-primary/20 text-primary'
              }`}>
                {artifactImage ? <Check className="w-4 h-4" /> : '1'}
              </div>
              <span className={`text-sm ${step === 'artifact' ? 'text-foreground' : 'text-muted-foreground'}`}>
                Artifact Photo
              </span>
            </div>
            
            <div className="flex-1 h-px bg-border" />
            
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                step === 'label' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                {labelImage ? <Check className="w-4 h-4" /> : '2'}
              </div>
              <span className={`text-sm ${step === 'label' ? 'text-foreground' : 'text-muted-foreground'}`}>
                Label Photo
              </span>
            </div>
          </div>
          
          {/* Upload Card */}
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                {step === 'artifact' ? (
                  <Camera className="w-5 h-5 text-primary" />
                ) : (
                  <FileText className="w-5 h-5 text-primary" />
                )}
              </div>
              <div>
                <h1 className="font-serif text-xl font-semibold text-foreground">
                  {step === 'artifact' ? 'Photograph the Artifact' : 'Photograph the Label'}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {step === 'artifact' 
                    ? 'Take a clear photo of the museum artifact'
                    : 'Capture the museum label or description card'
                  }
                </p>
              </div>
            </div>
            
            {/* Upload Zone */}
            {currentImage ? (
              <div className="relative rounded-lg overflow-hidden mb-6">
                <img 
                  src={currentImage} 
                  alt={step === 'artifact' ? 'Artifact' : 'Label'}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => clearImage(step)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors"
                >
                  <X className="w-4 h-4 text-foreground" />
                </button>
              </div>
            ) : (
              <label
                onDrop={(e) => handleDrop(e, step)}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`block rounded-lg border-2 border-dashed p-12 text-center cursor-pointer transition-all mb-6 ${
                  isDragging 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, step)}
                />
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-foreground font-medium mb-1">
                  {isDragging ? 'Drop your image here' : 'Click to upload or drag and drop'}
                </p>
                <p className="text-sm text-muted-foreground">
                  PNG, JPG or HEIC up to 10MB
                </p>
              </label>
            )}
            
            {/* Tips */}
            <div className="rounded-lg bg-muted/50 p-4 mb-6">
              <h3 className="text-sm font-medium text-foreground mb-2">Tips for best results:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                {step === 'artifact' ? (
                  <>
                    <li>- Ensure the artifact is well-lit and in focus</li>
                    <li>- Capture the full object without cropping</li>
                    <li>- Avoid reflections from glass cases if possible</li>
                  </>
                ) : (
                  <>
                    <li>- Make sure all text is readable</li>
                    <li>- Include the full museum label</li>
                    <li>- Dates and descriptions are most important</li>
                  </>
                )}
              </ul>
            </div>
            
            {/* Actions */}
            <div className="flex gap-3">
              {step === 'label' && (
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1"
                >
                  Back
                </Button>
              )}
              <Button
                onClick={handleContinue}
                disabled={step === 'artifact' ? !artifactImage : false}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {step === 'artifact' ? 'Continue to Label' : (labelImage ? 'Analyze Artifact' : 'Skip Label')}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
