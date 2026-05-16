'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  GitBranch,
  Share2,
  Sparkles,
} from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import type { StoryCard } from '@/lib/types'

interface StoryImmersiveGalleryProps {
  cards: StoryCard[]
  whatIf: string
  backHref?: string
  simulationId?: string
  incidentId?: string
  onScrollToDetails?: () => void
}

function FrostedActionButton({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex h-12 min-w-[7.5rem] items-center justify-center gap-2.5 rounded-full',
        'border border-white/25 bg-white/15 px-5 text-base font-semibold text-white',
        'backdrop-blur-xl transition-all hover:border-white/40 hover:bg-white/25',
        'active:scale-[0.98] md:h-14 md:min-w-[8.5rem] md:px-6',
        className,
      )}
    >
      {children}
    </button>
  )
}

export function StoryImmersiveGallery({
  cards,
  whatIf,
  backHref = '/timelines',
  simulationId,
  incidentId,
  onScrollToDetails,
}: StoryImmersiveGalleryProps) {
  const router = useRouter()
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [shareLabel, setShareLabel] = useState('Share')

  useEffect(() => {
    if (!api) return
    const onSelect = () => setCurrent(api.selectedScrollSnap())
    onSelect()
    api.on('select', onSelect)
    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  const scrollToDetails = useCallback(() => {
    if (onScrollToDetails) {
      onScrollToDetails()
      return
    }
    document.getElementById('simulation-details')?.scrollIntoView({ behavior: 'smooth' })
  }, [onScrollToDetails])

  const handleShare = useCallback(async () => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    const title = 'AltEra — Alternate Timeline'
    const text = whatIf

    try {
      if (navigator.share) {
        await navigator.share({ title, text, url })
        return
      }
      await navigator.clipboard.writeText(url)
      setShareLabel('Copied!')
      setTimeout(() => setShareLabel('Share'), 2000)
    } catch {
      /* user cancelled share */
    }
  }, [whatIf])

  const handleRemix = useCallback(() => {
    if (incidentId) {
      router.push(`/simulate/${incidentId}`)
      return
    }
    router.push('/timelines')
  }, [incidentId, router])

  return (
    <section className="relative h-[100dvh] w-full shrink-0 overflow-hidden bg-black">
      <Carousel
        setApi={setApi}
        opts={{ loop: true, align: 'start' }}
        className="h-full w-full"
      >
        <CarouselContent className="ml-0 h-full">
          {cards.map((card) => (
            <CarouselItem key={card.id} className="h-[100dvh] basis-full pl-0">
              <StorySlide card={card} />
            </CarouselItem>
          ))}
        </CarouselContent>

        {cards.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => api?.scrollPrev()}
              className="absolute left-3 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur-xl transition-colors hover:bg-black/60 md:left-6"
              aria-label="Previous scene"
            >
              <ChevronLeft className="h-7 w-7" />
            </button>
            <button
              type="button"
              onClick={() => api?.scrollNext()}
              className="absolute right-3 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur-xl transition-colors hover:bg-black/60 md:right-6"
              aria-label="Next scene"
            >
              <ChevronRight className="h-7 w-7" />
            </button>
          </>
        )}
      </Carousel>

      {/* Top bar: back left, frosted actions right */}
      <div className="absolute top-0 z-30 flex w-full items-start justify-between gap-3 px-4 pt-4 md:px-8 md:pt-6">
        <Link
          href={backHref}
          className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full border border-white/20 bg-black/40 px-5 text-base font-medium text-white backdrop-blur-xl transition-colors hover:bg-black/55"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="hidden sm:inline">Timelines</span>
        </Link>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <FrostedActionButton onClick={handleShare}>
            <Share2 className="h-5 w-5" />
            {shareLabel}
          </FrostedActionButton>
          <FrostedActionButton onClick={handleRemix}>
            <GitBranch className="h-5 w-5" />
            Remix
          </FrostedActionButton>
        </div>
      </div>

      {cards.length > 1 && (
        <div className="absolute bottom-28 left-0 right-0 z-20 flex flex-col items-center gap-3">
          <div className="flex gap-2.5">
            {cards.map((card, index) => (
              <button
                key={card.id}
                type="button"
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  'h-2 rounded-full transition-all',
                  index === current
                    ? 'w-10 bg-primary'
                    : 'w-2 bg-white/40 hover:bg-white/70',
                )}
                aria-label={`Go to ${card.year}`}
              />
            ))}
          </div>
          <span className="text-sm font-medium tracking-widest text-white/55 uppercase">
            {current + 1} / {cards.length}
          </span>
        </div>
      )}

      <button
        type="button"
        onClick={scrollToDetails}
        className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1.5 text-white/75 transition-colors hover:text-white"
      >
        <span className="text-sm font-medium tracking-wide uppercase">
          Scroll for timeline analysis
        </span>
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </button>
    </section>
  )
}

function StorySlide({ card }: { card: StoryCard }) {
  const imageSrc = card.image ?? '/images/relic-demo.jpg'

  return (
    <div className="group relative h-full w-full">
      <Image
        src={imageSrc}
        alt={card.title}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30" />

      <div className="pointer-events-none absolute bottom-36 left-4 z-10 md:left-8">
        <span
          className={cn(
            'inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium backdrop-blur-md md:text-base',
            card.isAlternate
              ? 'bg-primary/90 text-primary-foreground'
              : 'bg-white/15 text-white',
          )}
        >
          {card.isAlternate && <Sparkles className="h-4 w-4" />}
          {card.year}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-24 pt-16 md:px-8 md:pb-28">
        <div
          className={cn(
            'mx-auto max-w-3xl rounded-xl border border-white/15 bg-black/50 px-6 py-5 backdrop-blur-xl transition-all duration-300',
            'opacity-95 max-md:translate-y-0 md:translate-y-3 md:opacity-0',
            'md:group-hover:translate-y-0 md:group-hover:opacity-100',
          )}
        >
          <h2 className="font-serif text-xl font-semibold text-white md:text-2xl lg:text-3xl">
            {card.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-white/90 md:text-base">
            {card.description}
          </p>
        </div>
      </div>
    </div>
  )
}
