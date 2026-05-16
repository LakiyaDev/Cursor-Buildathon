import { StabilizeGameClient } from '@/components/stabilize/stabilize-game-client'

interface StabilizePageProps {
  params: Promise<{ id: string }>
}

export default async function StabilizePage({ params }: StabilizePageProps) {
  const { id } = await params
  return <StabilizeGameClient simulationId={id} />
}
