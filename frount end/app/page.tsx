import { Header } from '@/components/layout/header'
import { Hero } from '@/components/home/hero'
import { EntryCards } from '@/components/home/entry-cards'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-24">
        <Hero />
        <EntryCards />
        
        {/* Bottom hint */}
        <p className="mt-16 text-xs text-muted-foreground/60 text-center max-w-md">
          Powered by AI. Built for curiosity. What pivotal moment would you change?
        </p>
      </main>
      
      {/* Subtle grid pattern overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}
      />
    </div>
  )
}
