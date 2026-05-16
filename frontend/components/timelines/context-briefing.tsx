'use client'

import { useState } from 'react'
import { ChevronDown, BookOpen } from 'lucide-react'
import type { Timeline } from '@/lib/types'

interface ContextBriefingProps {
  timeline: Timeline
}

export function ContextBriefing({ timeline }: ContextBriefingProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  // Generate context text based on timeline
  const contextText = getTimelineContext(timeline.slug)
  
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="text-left">
            <h3 className="font-medium text-foreground">What Really Happened</h3>
            <p className="text-sm text-muted-foreground">Historical context briefing</p>
          </div>
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
        />
      </button>
      
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-border">
          <div className="pt-4 prose prose-invert prose-sm max-w-none">
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {contextText}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

function getTimelineContext(slug: string): string {
  const contexts: Record<string, string> = {
    'world-war-1': `World War I, also known as the Great War, was a global conflict that lasted from 1914 to 1918. The war was triggered by the assassination of Archduke Franz Ferdinand of Austria-Hungary in Sarajevo on June 28, 1914.

The assassination set off a chain reaction of alliance activations: Austria-Hungary declared war on Serbia, Russia mobilized in defense of Serbia, Germany declared war on Russia and France, and Britain entered when Germany invaded neutral Belgium.

The war introduced trench warfare, chemical weapons, tanks, and aircraft to modern combat. By its end, four empires had collapsed (German, Austro-Hungarian, Ottoman, and Russian), approximately 17 million people had died, and the map of Europe was redrawn entirely.

The Treaty of Versailles imposed harsh reparations on Germany, planting seeds that would grow into World War II just two decades later.`,

    'cold-war': `The Cold War was a period of geopolitical tension between the United States and the Soviet Union and their respective allies from 1947 to 1991. It was called "cold" because it never escalated into direct military confrontation between the superpowers.

The conflict was characterized by proxy wars, the nuclear arms race, space competition, and ideological propaganda. The Cuban Missile Crisis of 1962 brought the world closest to nuclear war, when Soviet missiles were discovered in Cuba.

The Berlin Wall, constructed in 1961, became the most powerful symbol of the divide between East and West. The Space Race saw both nations compete for dominance, culminating in the American moon landing in 1969.

The Cold War ended with the dissolution of the Soviet Union in 1991, leaving the United States as the world's sole superpower.`,

    'french-revolution': `The French Revolution (1789-1799) was a period of radical political and societal change in France that began with the Estates General of 1789 and ended with the formation of the French Consulate in November 1799.

Sparked by economic crisis, social inequality, and Enlightenment ideas, the revolution overthrew the monarchy, established a republic, and culminated in a dictatorship under Napoleon Bonaparte.

The storming of the Bastille on July 14, 1789, became the defining symbol of the revolution. The execution of King Louis XVI in 1793 sent shockwaves through European monarchies. The subsequent Reign of Terror saw thousands executed by guillotine.

The revolution's ideals of liberty, equality, and fraternity profoundly influenced political thought worldwide and laid the groundwork for modern democratic movements.`,

    'renaissance': `The Renaissance was a period of cultural, artistic, political, and economic "rebirth" that began in Italy in the 14th century and spread throughout Europe over the next three centuries.

This era saw a renewed interest in classical Greek and Roman culture, the development of new artistic techniques like perspective, and groundbreaking scientific discoveries. Artists like Leonardo da Vinci and Michelangelo created masterpieces that defined Western art.

The invention of the printing press by Johannes Gutenberg around 1440 revolutionized the spread of knowledge, making books accessible beyond the wealthy elite for the first time.

The Renaissance also launched the Age of Exploration, as European nations sought new trade routes and territories, fundamentally changing the world's political and cultural landscape.`,

    'industrial-revolution': `The Industrial Revolution was the transition from agrarian economies to industrial manufacturing, beginning in Britain around 1760 and spreading globally over the next century.

Key innovations included James Watt's improved steam engine (1769), which powered factories and transportation. The textile industry was transformed by inventions like the spinning jenny and power loom, dramatically increasing production.

The revolution transformed society: populations shifted from rural areas to cities, new social classes emerged, and working conditions in factories sparked labor reform movements. Child labor and dangerous working conditions were widespread before reforms.

Railways connected nations and accelerated trade. The revolution laid the foundation for modern capitalism and continues to shape our world today through its effects on technology, urbanization, and economic systems.`,

    'ancient-rome': `The Roman Empire was one of the largest and most influential civilizations in history, lasting from 27 BC (when Augustus became the first emperor) until the fall of the Western Roman Empire in 476 AD.

At its height, Rome controlled vast territories spanning Europe, North Africa, and the Middle East. The empire built roads, aqueducts, and architectural marvels that stand to this day. Latin, the Roman language, evolved into the Romance languages and influenced legal, scientific, and religious terminology.

The assassination of Julius Caesar in 44 BC marked the end of the Roman Republic and the beginning of civil wars that eventually led to the Empire. Rome experienced periods of great prosperity (Pax Romana) and devastating crises.

The fall of Rome to Germanic tribes in 476 AD traditionally marks the beginning of the Middle Ages and the end of classical antiquity.`
  }
  
  return contexts[slug] || 'Historical context for this timeline is being researched...'
}

