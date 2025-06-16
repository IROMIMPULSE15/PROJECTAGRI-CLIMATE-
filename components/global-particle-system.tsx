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
  type: "normal" | "blast" | "feature" | "connection" | "floating"
  trail: { x: number; y: number; alpha: number }[]
  angle: number
  speed: number
}

interface GlobalParticleSystemProps {
  isActive: boolean
  blastEffect: boolean
  featureMode: boolean
  page: "landing" | "dashboard" | "profile" | "auth" | "interview"
}

export default function GlobalParticleSystem({ isActive, blastEffect, featureMode, page }: GlobalParticleSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0, y: 0 })
  const [blastTriggered, setBlastTriggered] = useState(false)

  const colorSchemes = {
    landing: ["#7c3aed", "#06b6d4", "#8b5cf6", "#22d3ee", "#a855f7", "#0891b2", "#ec4899", "#f59e0b"],
    dashboard: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"],
    profile: ["#ec4899", "#f59e0b", "#10b981", "#3b82f6"],
    auth: ["#7c3aed", "#ec4899", "#06b6d4", "#f59e0b"],
    interview: ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b"],
  }

  const colors = colorSchemes[page] || colorSchemes.landing

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

      // Create mouse trail particles
      if (isActive && Math.random() > 0.8) {
        particlesRef.current.push(createParticle("floating", e.clientX, e.clientY))
      }
    }

    const handleClick = (e: MouseEvent) => {
      // Create click burst
      for (let i = 0; i < 10; i++) {
        const angle = (i / 10) * Math.PI * 2
        const speed = Math.random() * 5 + 2
        const particle = createParticle("blast", e.clientX, e.clientY)
        particle.vx = Math.cos(angle) * speed
        particle.vy = Math.sin(angle) * speed
        particlesRef.current.push(particle)
      }
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("click", handleClick)
    handleResize()

    const createParticle = (
      type: "normal" | "blast" | "feature" | "connection" | "floating" = "normal",
      x?: number,
      y?: number,
    ): Particle => {
      const canvas = canvasRef.current!
      return {
        x: x ?? Math.random() * canvas.width,
        y: y ?? Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * (type === "blast" ? 15 : type === "floating" ? 3 : 2),
        vy: (Math.random() - 0.5) * (type === "blast" ? 15 : type === "floating" ? 3 : 2),
        size: Math.random() * (type === "blast" ? 8 : type === "floating" ? 6 : 4) + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: type === "blast" ? 60 : type === "floating" ? 40 : 120,
        maxLife: type === "blast" ? 60 : type === "floating" ? 40 : 120,
        type,
        trail: [],
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 2 + 1,
      }
    }

    const createBlastEffect = () => {
      const canvas = canvasRef.current!
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Main blast
      for (let i = 0; i < 100; i++) {
        const angle = (i / 100) * Math.PI * 2
        const speed = Math.random() * 20 + 5
        const particle: Particle = {
          x: centerX,
          y: centerY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 8 + 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 150,
          maxLife: 150,
          type: "blast",
          trail: [],
          angle: angle,
          speed: speed,
        }
        particlesRef.current.push(particle)
      }

      // Secondary waves
      setTimeout(() => {
        for (let i = 0; i < 50; i++) {
          const angle = Math.random() * Math.PI * 2
          const radius = 100 + Math.random() * 200
          const x = centerX + Math.cos(angle) * radius
          const y = centerY + Math.sin(angle) * radius

          particlesRef.current.push(createParticle("feature", x, y))
        }
      }, 500)
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
          // Create spiral effect
          for (let i = 0; i < 30; i++) {
            const angle = (i / 30) * Math.PI * 4
            const radius = 20 + i * 2
            const x = feature.x + Math.cos(angle) * radius
            const y = feature.y + Math.sin(angle) * radius

            const particle: Particle = {
              x,
              y,
              vx: Math.cos(angle) * 1,
              vy: Math.sin(angle) * 1,
              size: Math.random() * 4 + 2,
              color: colors[index % colors.length],
              life: 300,
              maxLife: 300,
              type: "feature",
              trail: [],
              angle: angle,
              speed: 1,
            }
            particlesRef.current.push(particle)
          }
        }, index * 300)
      })
    }

    const updateParticles = () => {
      const canvas = canvasRef.current!

      particlesRef.current = particlesRef.current.filter((particle) => {
        // Update position based on type
        if (particle.type === "floating") {
          particle.angle += 0.02
          particle.vx += Math.cos(particle.angle) * 0.1
          particle.vy += Math.sin(particle.angle) * 0.1
        }

        particle.x += particle.vx
        particle.y += particle.vy

        // Add to trail with alpha
        particle.trail.push({
          x: particle.x,
          y: particle.y,
          alpha: particle.life / particle.maxLife,
        })
        if (particle.trail.length > 15) {
          particle.trail.shift()
        }

        // Physics
        if (particle.type === "blast") {
          particle.vy += 0.15 // gravity
          particle.vx *= 0.98
          particle.vy *= 0.98
        } else if (particle.type === "feature") {
          particle.vx *= 0.95
          particle.vy *= 0.95
        } else if (particle.type === "floating") {
          particle.vx *= 0.99
          particle.vy *= 0.99
        }

        // Mouse interaction
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 150) {
          const force = (150 - distance) / 150
          const angle = Math.atan2(dy, dx)
          particle.vx += Math.cos(angle) * force * 0.3
          particle.vy += Math.sin(angle) * force * 0.3
        }

        // Boundary handling with wrapping
        if (particle.x < -50) particle.x = canvas.width + 50
        if (particle.x > canvas.width + 50) particle.x = -50
        if (particle.y < -50) particle.y = canvas.height + 50
        if (particle.y > canvas.height + 50) particle.y = -50

        // Update life
        particle.life--

        return particle.life > 0
      })

      // Add new particles continuously
      if (isActive && particlesRef.current.length < 200) {
        if (Math.random() > 0.95) {
          particlesRef.current.push(createParticle())
        }
      }
    }

    const drawParticles = () => {
      const canvas = canvasRef.current!
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections first
      if (featureMode) {
        drawConnections()
      }

      // Draw particles
      particlesRef.current.forEach((particle) => {
        const alpha = particle.life / particle.maxLife

        // Draw trail
        if (particle.trail.length > 1) {
          ctx.beginPath()
          ctx.moveTo(particle.trail[0].x, particle.trail[0].y)

          for (let i = 1; i < particle.trail.length; i++) {
            ctx.lineTo(particle.trail[i].x, particle.trail[i].y)
          }

          const gradient = ctx.createLinearGradient(particle.trail[0].x, particle.trail[0].y, particle.x, particle.y)
          gradient.addColorStop(0, `${particle.color}00`)
          gradient.addColorStop(
            1,
            `${particle.color}${Math.floor(alpha * 0.6 * 255)
              .toString(16)
              .padStart(2, "0")}`,
          )

          ctx.strokeStyle = gradient
          ctx.lineWidth = particle.size * 0.3
          ctx.lineCap = "round"
          ctx.stroke()
        }

        // Draw particle with advanced effects
        ctx.save()

        // Glow effect
        if (particle.type === "blast" || particle.type === "feature") {
          ctx.shadowColor = particle.color
          ctx.shadowBlur = particle.size * 2
        }

        // Main particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)

        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size)
        gradient.addColorStop(
          0,
          `${particle.color}${Math.floor(alpha * 255)
            .toString(16)
            .padStart(2, "0")}`,
        )
        gradient.addColorStop(
          0.7,
          `${particle.color}${Math.floor(alpha * 0.5 * 255)
            .toString(16)
            .padStart(2, "0")}`,
        )
        gradient.addColorStop(1, `${particle.color}00`)

        ctx.fillStyle = gradient
        ctx.fill()

        // Inner core for special particles
        if (particle.type === "feature" || particle.type === "blast") {
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size * 0.3, 0, Math.PI * 2)
          ctx.fillStyle = `${particle.color}${Math.floor(alpha * 255)
            .toString(16)
            .padStart(2, "0")}`
          ctx.fill()
        }

        ctx.restore()
      })
    }

    const drawConnections = () => {
      const canvas = canvasRef.current!
      const connectionDistance = 120

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i]
          const p2 = particlesRef.current[j]

          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            const alpha = ((connectionDistance - distance) / connectionDistance) * 0.3

            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)

            const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y)
            gradient.addColorStop(
              0,
              `${p1.color}${Math.floor(alpha * 255)
                .toString(16)
                .padStart(2, "0")}`,
            )
            gradient.addColorStop(
              1,
              `${p2.color}${Math.floor(alpha * 255)
                .toString(16)
                .padStart(2, "0")}`,
            )

            ctx.strokeStyle = gradient
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

    // Initialize particles
    const particleCount = isActive ? 150 : 80
    particlesRef.current = []
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(createParticle())
    }

    // Trigger effects
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
      window.removeEventListener("click", handleClick)
      cancelAnimationFrame(animationRef.current)
    }
  }, [isActive, blastEffect, featureMode, blastTriggered, colors, page])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-5"
      style={{ mixBlendMode: "screen" }}
    />
  )
}
