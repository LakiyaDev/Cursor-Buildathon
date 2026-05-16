import type { Timeline, Simulation, StabilizeFix, PublishedTimeline, MuseumScan, StoryCard } from './types'

// Curated historical timelines for the Browse flow
export const mockTimelines: Timeline[] = [
  {
    slug: 'world-war-1',
    title: 'World War I',
    era: '1914–1918',
    coverImage: '/images/timelines/wwi.jpg',
    description: 'The Great War that reshaped empires and set the stage for the modern world.',
    incidents: [
      {
        id: 'sarajevo-1914',
        title: 'Assassination of Archduke Franz Ferdinand',
        date: 'June 28, 1914',
        description: 'The spark that ignited a global conflict.',
        context: 'Gavrilo Princip assassinated Archduke Franz Ferdinand of Austria in Sarajevo, triggering a chain of alliances that plunged Europe into war.',
        image: '/images/incidents/sarajevo.jpg'
      },
      {
        id: 'schlieffen-plan',
        title: 'Germany Invades Belgium',
        date: 'August 4, 1914',
        description: 'The Schlieffen Plan set in motion.',
        context: 'Germany invaded neutral Belgium as part of the Schlieffen Plan, drawing Britain into the war.',
        image: '/images/incidents/belgium.jpg'
      },
      {
        id: 'lusitania',
        title: 'Sinking of the Lusitania',
        date: 'May 7, 1915',
        description: 'A turning point in American neutrality.',
        context: 'A German U-boat sank the RMS Lusitania, killing 1,198 passengers including 128 Americans.',
        image: '/images/incidents/lusitania.jpg'
      }
    ]
  },
  {
    slug: 'cold-war',
    title: 'The Cold War',
    era: '1947–1991',
    coverImage: '/images/timelines/cold-war.jpg',
    description: 'Decades of tension between superpowers that shaped the modern world.',
    incidents: [
      {
        id: 'cuban-missile-crisis',
        title: 'Cuban Missile Crisis',
        date: 'October 1962',
        description: 'The world held its breath for 13 days.',
        context: 'The US and Soviet Union came to the brink of nuclear war over Soviet missiles in Cuba.',
        image: '/images/incidents/cuban-crisis.jpg'
      },
      {
        id: 'berlin-wall',
        title: 'Construction of the Berlin Wall',
        date: 'August 13, 1961',
        description: 'A city divided overnight.',
        context: 'East Germany erected the Berlin Wall, physically dividing East and West Berlin for 28 years.',
        image: '/images/incidents/berlin-wall.jpg'
      },
      {
        id: 'moon-landing',
        title: 'Apollo 11 Moon Landing',
        date: 'July 20, 1969',
        description: 'One giant leap for mankind.',
        context: 'Neil Armstrong became the first human to walk on the moon, winning the Space Race for America.',
        image: '/images/incidents/moon-landing.jpg'
      }
    ]
  },
  {
    slug: 'french-revolution',
    title: 'French Revolution',
    era: '1789–1799',
    coverImage: '/images/timelines/french-revolution.jpg',
    description: 'When the people rose against monarchy and changed political history forever.',
    incidents: [
      {
        id: 'storming-bastille',
        title: 'Storming of the Bastille',
        date: 'July 14, 1789',
        description: 'The fortress falls, the revolution begins.',
        context: 'Revolutionaries stormed the Bastille prison, a symbol of royal tyranny, marking the start of the revolution.'
      },
      {
        id: 'louis-execution',
        title: 'Execution of Louis XVI',
        date: 'January 21, 1793',
        description: 'The king loses his head.',
        context: 'King Louis XVI was executed by guillotine, ending over a millennium of French monarchy.'
      },
      {
        id: 'reign-of-terror',
        title: 'The Reign of Terror Begins',
        date: 'September 5, 1793',
        description: 'Revolution devours its children.',
        context: 'The Committee of Public Safety began mass executions, killing thousands of perceived enemies of the revolution.'
      }
    ]
  },
  {
    slug: 'renaissance',
    title: 'The Renaissance',
    era: '1400–1600',
    coverImage: '/images/timelines/renaissance.jpg',
    description: 'A cultural rebirth that transformed art, science, and human thought.',
    incidents: [
      {
        id: 'printing-press',
        title: 'Gutenberg Invents the Printing Press',
        date: '1440',
        description: 'Knowledge becomes accessible to all.',
        context: 'Johannes Gutenberg invented movable type printing, revolutionizing the spread of information.'
      },
      {
        id: 'columbus-voyage',
        title: "Columbus's First Voyage",
        date: 'October 12, 1492',
        description: 'A new world discovered.',
        context: 'Christopher Columbus reached the Americas, forever changing the course of human history.'
      },
      {
        id: 'sistine-chapel',
        title: 'Michelangelo Paints the Sistine Chapel',
        date: '1508–1512',
        description: 'Divine artistry reaches its peak.',
        context: 'Michelangelo completed one of the greatest artistic achievements in human history.'
      }
    ]
  },
  {
    slug: 'industrial-revolution',
    title: 'Industrial Revolution',
    era: '1760–1840',
    coverImage: '/images/timelines/industrial.jpg',
    description: 'Machines transformed society and created the modern economy.',
    incidents: [
      {
        id: 'steam-engine',
        title: "Watt's Steam Engine",
        date: '1769',
        description: 'Power that changed everything.',
        context: 'James Watt improved the steam engine, enabling the mechanization of industry.'
      },
      {
        id: 'spinning-jenny',
        title: 'Invention of the Spinning Jenny',
        date: '1764',
        description: 'Textiles transformed overnight.',
        context: 'James Hargreaves invented the spinning jenny, revolutionizing textile production.'
      },
      {
        id: 'first-railway',
        title: 'First Public Railway Opens',
        date: 'September 27, 1825',
        description: 'The world shrinks forever.',
        context: 'The Stockton and Darlington Railway opened, beginning the age of rail travel.'
      }
    ]
  },
  {
    slug: 'ancient-rome',
    title: 'Fall of Rome',
    era: '27 BC – 476 AD',
    coverImage: '/images/timelines/rome.jpg',
    description: 'The rise and fall of history\'s greatest empire.',
    incidents: [
      {
        id: 'julius-caesar',
        title: 'Assassination of Julius Caesar',
        date: 'March 15, 44 BC',
        description: 'Et tu, Brute?',
        context: 'Julius Caesar was assassinated by Roman senators, ending the Roman Republic.'
      },
      {
        id: 'burning-rome',
        title: 'Great Fire of Rome',
        date: 'July 18, 64 AD',
        description: 'Rome burns while Nero plays.',
        context: 'A devastating fire destroyed much of Rome, leading to persecution of Christians.'
      },
      {
        id: 'fall-of-rome',
        title: 'Fall of the Western Roman Empire',
        date: 'September 4, 476 AD',
        description: 'An empire crumbles.',
        context: 'The last Western Roman Emperor was deposed, marking the end of ancient Rome.'
      }
    ]
  }
]

// Demo simulation for reliable judging
export const mockSimulation: Simulation = {
  id: 'demo-sarajevo-1',
  incidentId: 'sarajevo-1914',
  whatIf: 'What if the assassin hesitated for just three seconds?',
  chaosScore: 72,
  status: 'generated',
  ripples: [
    'The Archduke\'s motorcade continues past the Latin Bridge',
    'Franz Ferdinand survives and returns to Vienna',
    'Austria-Hungary has no casus belli against Serbia',
    'The web of alliances remains dormant',
    'Summer 1914 passes without major conflict'
  ],
  branches: [
    {
      id: 'branch-1',
      title: 'The Reformist Path',
      description: 'Franz Ferdinand implements his vision of a United States of Greater Austria, granting autonomy to Slavic regions.',
      chaosImpact: -15
    },
    {
      id: 'branch-2',
      title: 'The Powder Keg Holds',
      description: 'Tensions simmer but never boil over. Europe experiences decades of armed peace and technological advancement.',
      chaosImpact: -25
    },
    {
      id: 'branch-3',
      title: 'Delayed Catastrophe',
      description: 'Another incident in 1917 triggers an even more devastating war with chemical and early atomic weapons.',
      chaosImpact: +30
    }
  ],
  extinct: [
    { id: 'e1', name: 'Treaty of Versailles', description: 'Never signed—no punitive peace to fuel resentment', year: '1919' },
    { id: 'e2', name: 'Weimar Republic', description: 'Germany remains an empire under Wilhelm II', year: '1919' },
    { id: 'e3', name: 'League of Nations', description: 'No post-war body emerges without a Great War', year: '1920' },
    { id: 'e4', name: 'Russian Revolution', description: 'Without war strain, the Tsar maintains control', year: '1917' },
    { id: 'e5', name: 'Nazi Party', description: 'No post-war chaos means no rise of fascism', year: '1920' }
  ],
  born: [
    { id: 'b1', name: 'Danubian Federation', description: 'Franz Ferdinand\'s vision of a unified Central European state', year: '1920' },
    { id: 'b2', name: 'Imperial Space Program', description: 'United European powers reach the moon by 1955', year: '1955' },
    { id: 'b3', name: 'The Long Peace', description: 'A century without major European conflict', year: '1914–2014' },
    { id: 'b4', name: 'Habsburg Computing', description: 'Vienna becomes the world\'s technology capital', year: '1960' },
    { id: 'b5', name: 'Slavic Autonomy Act', description: 'Peaceful resolution of ethnic tensions', year: '1922' }
  ],
  relicPrompt: 'A sepia-toned photograph from 1964 showing Emperor Franz Ferdinand II, aged 80, at the groundbreaking ceremony for the Danubian Maglev Railway in Vienna, surrounded by dignitaries from the federated states.',
  relicImage: '/images/relic-demo.jpg',
  storyCards: [
    {
      id: 'story-1',
      year: '1914',
      title: 'The Missed Shot',
      description: 'Gavrilo Princip hesitates for three seconds. The motorcade passes. Franz Ferdinand waves to the crowd, unaware of how close history came to changing.',
      imagePrompt: 'Vintage sepia photograph of Archduke Franz Ferdinand waving from an open car in Sarajevo, crowds lining the streets, summer 1914, European royal motorcade',
      image: '/images/story/missed-shot.jpg',
      isAlternate: true
    },
    {
      id: 'story-2',
      year: '1920',
      title: 'The Danubian Federation',
      description: 'Franz Ferdinand implements his vision of a United States of Greater Austria, granting autonomy to Slavic regions and creating a new model of peaceful coexistence.',
      imagePrompt: 'Oil painting style image of a grand treaty signing ceremony in Vienna, diverse delegates from Slavic nations, Habsburg palace interior, 1920s formal attire',
      image: '/images/story/federation.jpg',
      isAlternate: true
    },
    {
      id: 'story-3',
      year: '1945',
      title: 'The Long Peace',
      description: 'Europe celebrates 30 years without major conflict. Vienna hosts the World Peace Exposition, showcasing technological marvels from the unified continent.',
      imagePrompt: 'Retro futuristic World Fair exposition in Vienna 1945, art deco architecture, airships, gleaming white pavilions, crowds in 1940s fashion',
      image: '/images/story/peace-expo.jpg',
      isAlternate: true
    },
    {
      id: 'story-4',
      year: '1955',
      title: 'Habsburg Space Program',
      description: 'The Imperial Space Agency launches Europa I, the first manned spacecraft, from the Austrian Alps. Astronaut Karl von Braun orbits Earth.',
      imagePrompt: 'Vintage space age photograph, 1950s rocket launch from mountain facility, European Space Agency, retro-futuristic spacecraft, art deco mission control',
      image: '/images/story/space.jpg',
      isAlternate: true
    },
    {
      id: 'story-5',
      year: '2014',
      title: 'A Century of Unity',
      description: 'The Danubian Federation celebrates its centennial. Vienna remains the world\'s capital of music, science, and diplomacy.',
      imagePrompt: 'Modern photograph of Vienna 2014 celebration, futuristic but elegant architecture, diverse crowds waving federation flags, fireworks over St Stephens Cathedral',
      image: '/images/story/centennial.jpg',
      isAlternate: true
    }
  ],
  createdAt: new Date().toISOString()
}

// Alternative demo with high chaos
export const mockSimulationHighChaos: Simulation = {
  id: 'demo-cuban-1',
  incidentId: 'cuban-missile-crisis',
  whatIf: 'What if a Soviet submarine captain launched his nuclear torpedo?',
  chaosScore: 94,
  status: 'generated',
  ripples: [
    'USS Beale is destroyed by nuclear torpedo',
    'US Navy retaliates against Soviet submarine fleet',
    'Kennedy orders strikes on Cuban missile sites',
    'Khrushchev authorizes tactical nuclear response',
    'Strategic weapons are released globally'
  ],
  branches: [
    {
      id: 'branch-1',
      title: 'Limited Exchange',
      description: 'Cooler heads prevail after initial strikes. A ceasefire is reached within 48 hours.',
      chaosImpact: -20
    },
    {
      id: 'branch-2',
      title: 'Full MAD Scenario',
      description: 'Mutual Assured Destruction plays out. Major cities on both sides are devastated.',
      chaosImpact: +40
    },
    {
      id: 'branch-3',
      title: 'The Southern Hemisphere Survives',
      description: 'Australia and South America emerge as the new global powers in the aftermath.',
      chaosImpact: +10
    }
  ],
  extinct: [
    { id: 'e1', name: 'New York City', description: 'Destroyed in the first exchange', year: '1962' },
    { id: 'e2', name: 'Moscow', description: 'Devastated by multiple warheads', year: '1962' },
    { id: 'e3', name: 'NATO Alliance', description: 'Dissolved in the chaos', year: '1963' },
    { id: 'e4', name: 'United Nations', description: 'Headquarters destroyed, organization collapses', year: '1962' }
  ],
  born: [
    { id: 'b1', name: 'Southern Alliance', description: 'New global power bloc led by Australia and Brazil', year: '1965' },
    { id: 'b2', name: 'Nuclear Winter', description: 'Decade of global cooling and agricultural collapse', year: '1963' },
    { id: 'b3', name: 'Reconstruction Era', description: 'Slow rebuilding begins in unaffected regions', year: '1970' }
  ],
  relicPrompt: 'A grainy photograph from 1975 showing the ruins of the Lincoln Memorial, overgrown with vegetation, with a small memorial plaque placed by survivors.',
  relicImage: '/images/relic-nuclear.jpg',
  createdAt: new Date().toISOString()
}

// Stabilize game fixes
export const mockStabilizeFixes: StabilizeFix[] = [
  {
    id: 'fix-1',
    title: 'Diplomatic Intervention',
    description: 'A neutral power mediates between factions before tensions escalate.',
    chaosReduction: 15
  },
  {
    id: 'fix-2',
    title: 'Economic Incentives',
    description: 'Trade agreements reduce the motivation for conflict.',
    chaosReduction: 12
  },
  {
    id: 'fix-3',
    title: 'Technology Diffusion',
    description: 'Key innovations spread more evenly, reducing power imbalances.',
    chaosReduction: 18
  },
  {
    id: 'fix-4',
    title: 'Cultural Exchange',
    description: 'Art and ideas flow freely, building mutual understanding.',
    chaosReduction: 10
  },
  {
    id: 'fix-5',
    title: 'Early Warning Systems',
    description: 'Communication channels prevent misunderstandings from escalating.',
    chaosReduction: 20
  }
]

// Published timelines feed
export const mockPublishedTimelines: PublishedTimeline[] = [
  {
    id: 'pub-1',
    simulation: mockSimulation,
    author: { name: 'HistoryBuff_42' },
    likes: 234,
    remixes: 12
  },
  {
    id: 'pub-2',
    simulation: mockSimulationHighChaos,
    author: { name: 'ChaosMaster' },
    likes: 567,
    remixes: 45
  }
]

// Museum scan demo
export const mockMuseumScan: MuseumScan = {
  id: 'scan-demo-1',
  artifactImage: '/demo-museum/artifact.jpg',
  labelImage: '/demo-museum/label.jpg',
  extractedText: 'Pistol used by Gavrilo Princip\nModel: FN Model 1910\nCalibur: .380 ACP\nMuseum of Military History, Vienna\n\nThis is the weapon that killed Archduke Franz Ferdinand and his wife Sophie on June 28, 1914, triggering World War I.',
  confidence: 0.94,
  duration: '100_years'
}

// Helper to get timeline by slug
export function getTimelineBySlug(slug: string): Timeline | undefined {
  return mockTimelines.find(t => t.slug === slug)
}

// Helper to get incident by id
export function getIncidentById(id: string): { timeline: Timeline; incident: Timeline['incidents'][0] } | undefined {
  for (const timeline of mockTimelines) {
    const incident = timeline.incidents.find(i => i.id === id)
    if (incident) {
      return { timeline, incident }
    }
  }
  return undefined
}

// Simulate API delay for realistic UX
export async function simulateDelay(ms: number = 1500): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
