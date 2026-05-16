'use client'

import { useEffect, useState } from 'react'

interface ChaosMeterProps {
  score: number
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
}

export function ChaosMeter({ score, size = 'md', animated = true }: ChaosMeterProps) {
  const [displayScore, setDisplayScore] = useState(animated ? 0 : score)
  
  useEffect(() => {
    if (!animated) {
      setDisplayScore(score)
      return
    }
    
    // Animate the score
    const duration = 2000
    const startTime = Date.now()
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayScore(Math.round(score * eased))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [score, animated])
  
  // Determine color based on chaos level
  const getColor = () => {
    if (displayScore < 40) return { main: 'var(--chaos-green)', bg: 'rgba(34, 197, 94, 0.1)' }
    if (displayScore < 70) return { main: 'var(--chaos-amber)', bg: 'rgba(245, 158, 11, 0.1)' }
    return { main: 'var(--chaos-red)', bg: 'rgba(220, 38, 38, 0.1)' }
  }
  
  const getLabel = () => {
    if (displayScore < 40) return 'Stable'
    if (displayScore < 70) return 'Unstable'
    return 'Fracturing'
  }
  
  const colors = getColor()
  
  const sizes = {
    sm: { width: 100, stroke: 8, fontSize: 'text-lg', labelSize: 'text-xs' },
    md: { width: 160, stroke: 12, fontSize: 'text-3xl', labelSize: 'text-sm' },
    lg: { width: 200, stroke: 16, fontSize: 'text-4xl', labelSize: 'text-base' },
  }
  
  const { width, stroke, fontSize, labelSize } = sizes[size]
  const radius = (width - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const progress = (displayScore / 100) * circumference
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width, height: width }}>
        {/* Background circle */}
        <svg width={width} height={width} className="transform -rotate-90">
          <circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            fill="none"
            stroke="var(--muted)"
            strokeWidth={stroke}
          />
          {/* Progress arc */}
          <circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            fill="none"
            stroke={colors.main}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            style={{
              transition: animated ? 'stroke-dashoffset 0.3s ease-out' : 'none',
              filter: `drop-shadow(0 0 8px ${colors.main})`,
            }}
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`font-serif font-bold ${fontSize}`} style={{ color: colors.main }}>
            {displayScore}
          </span>
          <span className={`${labelSize} text-muted-foreground`}>
            {getLabel()}
          </span>
        </div>
      </div>
      
      <div className="mt-3 text-center">
        <span className="text-xs text-muted-foreground uppercase tracking-wider">
          Chaos Index
        </span>
      </div>
    </div>
  )
}

