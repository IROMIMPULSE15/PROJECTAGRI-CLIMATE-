"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe } from "lucide-react"

export default function CandidateGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 300
    canvas.height = 300

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = 120

    // Sample candidate locations
    const candidates = [
      { lat: 40.7128, lng: -74.006, count: 45, city: "New York" },
      { lat: 37.7749, lng: -122.4194, count: 38, city: "San Francisco" },
      { lat: 51.5074, lng: -0.1278, count: 32, city: "London" },
      { lat: 52.52, lng: 13.405, count: 28, city: "Berlin" },
      { lat: 43.6532, lng: -79.3832, count: 25, city: "Toronto" },
      { lat: 35.6762, lng: 139.6503, count: 22, city: "Tokyo" },
      { lat: -33.8688, lng: 151.2093, count: 18, city: "Sydney" },
      { lat: 55.7558, lng: 37.6176, count: 15, city: "Moscow" },
    ]

    let rotation = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw globe outline
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.strokeStyle = "#374151"
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw grid lines
      ctx.strokeStyle = "#1f2937"
      ctx.lineWidth = 1

      // Latitude lines
      for (let i = -60; i <= 60; i += 30) {
        const y = centerY + (i / 90) * radius * 0.8
        ctx.beginPath()
        ctx.ellipse(centerX, y, radius * Math.cos((i * Math.PI) / 180), radius * 0.3, 0, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Longitude lines
      for (let i = 0; i < 360; i += 30) {
        const angle = ((i + rotation) * Math.PI) / 180
        ctx.beginPath()
        ctx.ellipse(centerX, centerY, radius * Math.abs(Math.cos(angle)), radius, 0, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Draw candidate locations
      candidates.forEach((candidate, index) => {
        const lng = candidate.lng + rotation
        const lat = candidate.lat

        // Convert lat/lng to screen coordinates
        const x = centerX + (lng / 180) * radius * Math.cos((lat * Math.PI) / 180)
        const y = centerY - (lat / 90) * radius * 0.8

        // Only draw if on visible side of globe
        const isVisible = Math.cos((lng * Math.PI) / 180) > 0

        if (isVisible) {
          // Draw pulsing dot
          const pulseSize = 3 + Math.sin(Date.now() * 0.005 + index) * 2

          ctx.beginPath()
          ctx.arc(x, y, pulseSize, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(124, 58, 237, ${0.8 + Math.sin(Date.now() * 0.005 + index) * 0.2})`
          ctx.fill()

          // Draw glow effect
          ctx.beginPath()
          ctx.arc(x, y, pulseSize * 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(124, 58, 237, 0.3)`
          ctx.fill()

          // Draw candidate count
          ctx.fillStyle = "#ffffff"
          ctx.font = "10px Arial"
          ctx.textAlign = "center"
          ctx.fillText(candidate.count.toString(), x, y - 15)
        }
      })

      rotation += 0.5
      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Globe className="mr-2 h-5 w-5 text-cyan-400" />
          Global Candidates
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <canvas ref={canvasRef} className="mb-4" />
        <div className="grid grid-cols-2 gap-4 w-full text-sm">
          <div className="text-center">
            <div className="text-white font-bold text-lg">247</div>
            <div className="text-gray-400">Active Candidates</div>
          </div>
          <div className="text-center">
            <div className="text-white font-bold text-lg">8</div>
            <div className="text-gray-400">Countries</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
