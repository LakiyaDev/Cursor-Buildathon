import Link from 'next/link'
import { ArrowLeft, Heart, GitBranch, AlertTriangle, Gamepad2, User } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { mockPublishedTimelines } from '@/lib/mock-data'

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-16 px-6">
        <div className="mx-auto max-w-4xl">
          {/* Breadcrumb */}
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          {/* Header */}
          <div className="mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Community Timelines
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Explore alternate histories created by the community. Like, remix, and stabilize chaotic timelines.
            </p>
          </div>
          
          {/* Feed */}
          <div className="space-y-6">
            {mockPublishedTimelines.map((published) => {
              const isHighChaos = published.simulation.chaosScore >= 70
              const isUnstable = published.simulation.chaosScore >= 40
              
              return (
                <article 
                  key={published.id}
                  className="rounded-lg border border-border bg-card overflow-hidden hover:border-primary/30 transition-colors"
                >
                  {/* Header */}
                  <div className="p-6 border-b border-border">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        {/* Author */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                            <User className="w-3 h-3 text-muted-foreground" />
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {published.author.name}
                          </span>
                        </div>
                        
                        {/* What-If */}
                        <h2 className="font-serif text-xl font-semibold text-foreground mb-2">
                          &ldquo;{published.simulation.whatIf}&rdquo;
                        </h2>
                        
                        {/* Chaos Badge */}
                        <div className="flex items-center gap-3">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                            isHighChaos 
                              ? 'bg-chaos-red/10 text-chaos-red' 
                              : isUnstable
                              ? 'bg-chaos-amber/10 text-chaos-amber'
                              : 'bg-chaos-green/10 text-chaos-green'
                          }`}>
                            {isHighChaos && <AlertTriangle className="w-3 h-3" />}
                            Chaos: {published.simulation.chaosScore}
                          </span>
                          
                          {isUnstable && (
                            <span className="text-xs text-muted-foreground">
                              Needs stabilizing
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Preview - Extinct/Born */}
                  <div className="grid grid-cols-2 divide-x divide-border">
                    <div className="p-4">
                      <h3 className="text-xs font-medium text-chaos-red mb-2">Extinct</h3>
                      <ul className="space-y-1">
                        {published.simulation.extinct.slice(0, 2).map((item) => (
                          <li key={item.id} className="text-sm text-muted-foreground truncate">
                            {item.name}
                          </li>
                        ))}
                        {published.simulation.extinct.length > 2 && (
                          <li className="text-xs text-muted-foreground">
                            +{published.simulation.extinct.length - 2} more
                          </li>
                        )}
                      </ul>
                    </div>
                    <div className="p-4">
                      <h3 className="text-xs font-medium text-primary mb-2">Born</h3>
                      <ul className="space-y-1">
                        {published.simulation.born.slice(0, 2).map((item) => (
                          <li key={item.id} className="text-sm text-muted-foreground truncate">
                            {item.name}
                          </li>
                        ))}
                        {published.simulation.born.length > 2 && (
                          <li className="text-xs text-muted-foreground">
                            +{published.simulation.born.length - 2} more
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="p-4 border-t border-border flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                        <Heart className="w-4 h-4" />
                        {published.likes}
                      </button>
                      <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                        <GitBranch className="w-4 h-4" />
                        {published.remixes} remixes
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {isUnstable && (
                        <Link href={`/simulation/${published.simulation.id}/stabilize`}>
                          <Button size="sm" variant="outline" className="text-chaos-amber border-chaos-amber/30 hover:bg-chaos-amber/10">
                            <Gamepad2 className="w-4 h-4 mr-2" />
                            Stabilize
                          </Button>
                        </Link>
                      )}
                      <Link href={`/simulation/${published.simulation.id}`}>
                        <Button size="sm" variant="ghost">
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
          
          {/* Empty State Hint */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              Create your own alternate timeline to share with the community.
            </p>
            <div className="flex justify-center gap-3 mt-4">
              <Link href="/museum">
                <Button variant="outline">Scan Artifact</Button>
              </Link>
              <Link href="/timelines">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Browse Timelines
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
