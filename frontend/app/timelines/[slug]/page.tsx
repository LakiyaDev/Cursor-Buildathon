import { TimelineDetailClient } from '@/components/timelines/timeline-detail-client'

interface TimelineDetailPageProps {
  params: Promise<{ slug: string }>
}

export default async function TimelineDetailPage({ params }: TimelineDetailPageProps) {
  const { slug } = await params
  return <TimelineDetailClient slug={slug} />
}
