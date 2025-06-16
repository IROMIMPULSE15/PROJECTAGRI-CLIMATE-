"use client"

import { useState, useEffect, useRef } from "react"

interface AnimatedCounterProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
}

export default function AnimatedCounter({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
  decimals = 0,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const countRef = useRef(0)
  const frameRef = useRef(0)
  const startTimeRef = useRef(0)

  useEffect(() => {
    startTimeRef.current = Date.now()
    const startValue = countRef.current
    const endValue = end

    const step = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp
      const progress = Math.min((Date.now() - startTimeRef.current) / duration, 1)

      // Easing function for smooth animation
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)

      const currentCount = startValue + (endValue - startValue) * easedProgress
      countRef.current = currentCount
      setCount(currentCount)

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step)
      }
    }

    frameRef.current = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(frameRef.current)
    }
  }, [end, duration])

  const formattedCount = count.toFixed(decimals)

  return (
    <span className="tabular-nums">
      {prefix}
      {formattedCount}
      {suffix}
    </span>
  )
}
