'use client'

import Image from 'next/image'
import { Camera, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface RelicImageProps {
  imageUrl?: string
  prompt?: string
  altText?: string
}

export function RelicImage({ imageUrl, prompt, altText = 'Historical relic from alternate timeline' }: RelicImageProps) {
  // Placeholder for when no image is available
  if (!imageUrl) {
    return (
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Camera className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-foreground">
                Historical Relic
              </h3>
              <p className="text-xs text-muted-foreground">
                AI-generated artifact from this timeline
              </p>
            </div>
          </div>
        </div>
        
        <div className="aspect-video bg-muted flex items-center justify-center">
          <div className="text-center p-6">
            <div className="w-16 h-16 rounded-full bg-muted-foreground/10 flex items-center justify-center mx-auto mb-4">
              <Camera className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              Relic image generating...
            </p>
            {prompt && (
              <p className="text-xs text-muted-foreground/70 mt-2 max-w-sm mx-auto">
                {prompt}
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Camera className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-foreground">
                Historical Relic
              </h3>
              <p className="text-xs text-muted-foreground">
                AI-generated artifact from this timeline
              </p>
            </div>
          </div>
          
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Download className="w-4 h-4 mr-2" />
            Save
          </Button>
        </div>
      </div>
      
      {/* Image with vintage overlay */}
      <div className="relative vintage-overlay">
        <Image
          src={imageUrl}
          alt={altText}
          width={800}
          height={450}
          className="w-full aspect-video object-cover sepia-[0.3] contrast-[1.1]"
          onError={(e) => {
            // Fallback for missing images
            e.currentTarget.style.display = 'none'
          }}
        />
        
        {/* Vintage frame effect */}
        <div className="absolute inset-0 border-8 border-card/50 pointer-events-none" />
        
        {/* Caption */}
        {prompt && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-card to-transparent p-4 pt-12">
            <p className="text-sm text-foreground/90 italic">
              {prompt}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
