'use client'

export function SimulationSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header skeleton */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="h-4 w-32 bg-muted rounded mb-4" />
        <div className="h-8 w-3/4 bg-muted rounded mb-2" />
        <div className="h-4 w-1/2 bg-muted rounded" />
      </div>
      
      {/* Loading message */}
      <div className="flex flex-col items-center justify-center py-12">
        <div className="relative w-24 h-24 mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-muted" />
          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        </div>
        <LoadingText />
        <p className="text-sm text-muted-foreground mt-2">
          This may take a moment...
        </p>
      </div>
      
      {/* Content skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="h-6 w-24 bg-muted rounded mb-4" />
          <div className="space-y-3">
            <div className="h-16 bg-muted rounded" />
            <div className="h-16 bg-muted rounded" />
            <div className="h-16 bg-muted rounded" />
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="h-6 w-24 bg-muted rounded mb-4" />
          <div className="space-y-3">
            <div className="h-16 bg-muted rounded" />
            <div className="h-16 bg-muted rounded" />
            <div className="h-16 bg-muted rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}

function LoadingText() {
  const phrases = [
    'Rewriting history...',
    'Tracing butterfly effects...',
    'Calculating chaos...',
    'Generating alternate reality...',
    'Consulting the multiverse...',
  ]
  
  // Simple rotating text effect using CSS
  return (
    <div className="h-8 overflow-hidden">
      <div className="animate-[slide_10s_infinite]">
        {phrases.map((phrase, i) => (
          <p key={i} className="h-8 flex items-center justify-center text-lg text-foreground font-medium">
            {phrase}
          </p>
        ))}
      </div>
      <style jsx>{`
        @keyframes slide {
          0%, 18% { transform: translateY(0); }
          20%, 38% { transform: translateY(-32px); }
          40%, 58% { transform: translateY(-64px); }
          60%, 78% { transform: translateY(-96px); }
          80%, 100% { transform: translateY(-128px); }
        }
      `}</style>
    </div>
  )
}

