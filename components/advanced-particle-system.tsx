"use client"

import { useEffect, useRef, useState } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  life: number
  maxLife: number
  type: "normal" | "blast" | "feature"
  trail: { x: number; y: number }[]
}

interface AdvancedParticleSystemProps {
  isActive: boolean
  blastEffect: boolean
  featureMode: boolean
}

export default function AdvancedParticleSystem({ isActive, blastEffect, featureMode }: AdvancedParticleSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0, y: 0 })
  const [blastTriggered, setBlastTriggered] = useState(false)

  const colors = ["#7c3aed", "#06b6d4", "#8b5cf6", "#22d3ee", "#a855f7", "#0891b2", "#c084fc", "#67e8f9"]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)
    handleResize()

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = []
      const count = isActive ? 200 : 100

      for (let i = 0; i < count; i++) {
        particlesRef.current.push(createParticle())
      }
    }

    const createParticle = (type: "normal" | "blast" | "feature" = "normal"): Particle => {
      const canvas = canvasRef.current!
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * (type === "blast" ? 10 : 2),
        vy: (Math.random() - 0.5) * (type === "blast" ? 10 : 2),
        size: Math.random() * (type === "blast" ? 8 : 4) + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: type === "blast" ? 60 : 100,
        maxLife: type === "blast" ? 60 : 100,
        type,
        trail: [],
      }
    }

    const createBlastEffect = () => {
      const canvas = canvasRef.current!
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      for (let i = 0; i < 50; i++) {
        const angle = (i / 50) * Math.PI * 2
        const speed = Math.random() * 15 + 5
        const particle: Particle = {
          x: centerX,
          y: centerY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 6 + 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 120,
          maxLife: 120,
          type: "blast",
          trail: [],
        }
        particlesRef.current.push(particle)
      }
    }

    const createFeatureParticles = () => {
      const canvas = canvasRef.current!
      const features = [
        { x: canvas.width * 0.2, y: canvas.height * 0.3, text: "AI Matching" },
        { x: canvas.width * 0.8, y: canvas.height * 0.3, text: "Smart Analytics" },
        { x: canvas.width * 0.2, y: canvas.height * 0.7, text: "Video Interviews" },
        { x: canvas.width * 0.8, y: canvas.height * 0.7, text: "Real-time Chat" },
      ]

      features.forEach((feature, index) => {
        setTimeout(() => {
          for (let i = 0; i < 20; i++) {
            const angle = (i / 20) * Math.PI * 2
            const radius = 50
            const particle: Particle = {
              x: feature.x + Math.cos(angle) * radius,
              y: feature.y + Math.sin(angle) * radius,
              vx: Math.cos(angle) * 2,
              vy: Math.sin(angle) * 2,
              size: Math.random() * 4 + 2,
              color: colors[index % colors.length],
              life: 200,
              maxLife: 200,
              type: "feature",
              trail: [],
            }
            particlesRef.current.push(particle)
          }
        }, index * 500)
      })
    }

    const updateParticles = () => {
      const canvas = canvasRef.current!

      particlesRef.current = particlesRef.current.filter((particle) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Add to trail
        particle.trail.push({ x: particle.x, y: particle.y })
        if (particle.trail.length > 10) {
          particle.trail.shift()
        }

        // Apply gravity and friction
        if (particle.type === "blast") {
          particle.vy += 0.1
          particle.vx *= 0.99
          particle.vy *= 0.99
        } else if (particle.type === "feature") {
          particle.vx *= 0.95
          particle.vy *= 0.95
        }

        // Mouse interaction
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          const force = (100 - distance) / 100
          particle.vx += (dx / distance) * force * 0.5
          particle.vy += (dy / distance) * force * 0.5
        }

        // Boundary collision
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -0.8
          particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -0.8
          particle.y = Math.max(0, Math.min(canvas.height, particle.y))
        }

        // Update life
        particle.life--

        return particle.life > 0
      })

      // Add new particles continuously
      if (isActive && particlesRef.current.length < 150) {
        particlesRef.current.push(createParticle())
      }
    }

    const drawParticles = () => {
      const canvas = canvasRef.current!
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle) => {
        const alpha = particle.life / particle.maxLife

        // Draw trail
        if (particle.trail.length > 1) {
          ctx.beginPath()
          ctx.moveTo(particle.trail[0].x, particle.trail[0].y)

          for (let i = 1; i < particle.trail.length; i++) {
            ctx.lineTo(particle.trail[i].x, particle.trail[i].y)
          }

          ctx.strokeStyle = `${particle.color}${Math.floor(alpha * 0.3 * 255)
            .toString(16)
            .padStart(2, "0")}`
          ctx.lineWidth = particle.size * 0.5
          ctx.stroke()
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)

        // Create gradient
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size)
        gradient.addColorStop(
          0,
          `${particle.color}${Math.floor(alpha * 255)
            .toString(16)
            .padStart(2, "0")}`,
        )
        gradient.addColorStop(1, `${particle.color}00`)

        ctx.fillStyle = gradient
        ctx.fill()

        // Add glow effect for blast particles
        if (particle.type === "blast") {
          ctx.shadowColor = particle.color
          ctx.shadowBlur = 20
          ctx.fill()
          ctx.shadowBlur = 0
        }
      })

      // Draw connections
      if (featureMode) {
        drawConnections()
      }
    }

    const drawConnections = () => {
      const canvas = canvasRef.current!

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i]
          const p2 = particlesRef.current[j]

          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            const alpha = ((150 - distance) / 150) * 0.3
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      updateParticles()
      drawParticles()
      animationRef.current = requestAnimationFrame(animate)
    }

    initParticles()

    // Trigger blast effect
    if (blastEffect && !blastTriggered) {
      setBlastTriggered(true)
      createBlastEffect()

      if (featureMode) {
        setTimeout(() => {
          createFeatureParticles()
        }, 1000)
      }
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationRef.current)
    }
  }, [isActive, blastEffect, featureMode, blastTriggered, colors])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-10"
      style={{ mixBlendMode: "screen" }}
    />
  )
}
