'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-serif text-2xl font-bold tracking-tight text-foreground">
            Alt<span className="text-primary">Era</span>
          </span>
        </Link>
        
        <nav className="flex items-center gap-4">
          <Link 
            href="/timelines" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
          >
            Browse Timelines
          </Link>
          <Link 
            href="/dashboard" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
          >
            Community
          </Link>
          <Button variant="outline" size="sm" className="border-border/50 hover:border-primary/50 hover:text-primary">
            Sign In
          </Button>
        </nav>
      </div>
    </header>
  )
}
